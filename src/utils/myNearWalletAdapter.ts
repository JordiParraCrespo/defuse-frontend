import type { WalletSelector } from "@near-wallet-selector/core"
import type {
  SignMessageParams,
  SignedMessage,
} from "@near-wallet-selector/core/src/lib/wallet/wallet.types"
import { z } from "zod"

// Define substitute types
type SignAndSendTransactionsParams = Parameters<
  // @ts-expect-error TODO: fix this
  WalletSelector["signAndSendTransactions"]
>[0]
type TransactionHashes = string[]

const signedMessageSchema = z.object({
  accountId: z.string(),
  publicKey: z.string(),
  signature: z.string(),
  state: z.string().optional(),
})

const errorSchema = z.object({
  error: z.string(),
})

const signMessageSchema = z.object({
  message: z.string(),
  recipient: z.string(),
  nonce: z.instanceof(Buffer),
  callbackUrl: z.string().optional(),
  state: z.string().optional(),
})

const windowMessageSchema = z.union([signedMessageSchema, errorSchema])

export const signMessageInNewWindow = async ({
  params,
  signal,
}: {
  signal: AbortSignal
  params: SignMessageParams
}): Promise<SignedMessage> => {
  const completeAbortCtrl = new AbortController()

  const promise = new Promise<SignedMessage>((resolve, reject) => {
    openWindowWithMessageHandler({
      url: makeSignUrl(params),
      onMessage: (message) => {
        const parsedMessage = windowMessageSchema.safeParse(message)

        if (!parsedMessage.success) {
          reject(new Error("Invalid message", { cause: parsedMessage.error }))
          return
        }

        switch (true) {
          case "signature" in parsedMessage.data:
            resolve(parsedMessage.data)
            return
          case "error" in parsedMessage.data:
            reject(new Error(parsedMessage.data.error))
            return
          default:
            throw new Error("exhaustive check")
        }
      },
      onClose: () => {
        reject(new Error("Window closed"))
      },
      signal: AbortSignal.any([signal, completeAbortCtrl.signal]),
    })
  })

  return abortablePromise(promise, signal).finally(() => {
    // Teardown `openWindowWithMessageHandler`
    completeAbortCtrl.abort()
  })
}

export const signAndSendTransactionsInNewWindow = async ({
  params,
  signal,
}: {
  signal: AbortSignal
  params: SignAndSendTransactionsParams
}): Promise<TransactionHashes> => {
  const completeAbortCtrl = new AbortController()

  const promise = new Promise<TransactionHashes>((resolve, reject) => {
    openWindowWithMessageHandler({
      url: makeSignAndSendTransactionsUrl(params),
      onMessage: (message) => {
        const parsedMessage = windowMessageSchema.safeParse(message)

        if (!parsedMessage.success) {
          reject(new Error("Invalid message", { cause: parsedMessage.error }))
          return
        }

        switch (true) {
          case "transactionHashes" in parsedMessage.data:
            resolve(parsedMessage?.data?.transactionHashes as TransactionHashes)
            return
          case "error" in parsedMessage.data:
            reject(new Error(parsedMessage.data.error))
            return
          default:
            throw new Error("exhaustive check")
        }
      },
      onClose: () => {
        reject(new Error("Window closed"))
      },
      signal: AbortSignal.any([signal, completeAbortCtrl.signal]),
    })
  })

  return promise
}

function makeSignUrl(params: SignMessageParams) {
  const serializedParams = serializeSignMessageParams(params)
  return `/my-near-wallet-gateway/?action=signMessage&params=${encodeURIComponent(serializedParams)}`
}

function makeSignAndSendTransactionsUrl(params: SignAndSendTransactionsParams) {
  const serializedParams = serializeSignAndSendTransactionsParams(params)
  return `/my-near-wallet-gateway/?action=signAndSendTransactions&params=${encodeURIComponent(serializedParams)}`
}

export function serializeSignAndSendTransactionsParams(
  params: SignAndSendTransactionsParams
) {
  const encodedParams = {
    ...params,
  }
  return JSON.stringify(encodedParams)
}

export function deserializeSignAndSendTransactionsParams(
  params: string
): SignAndSendTransactionsParams {
  return JSON.parse(params)
}

export function serializeSignMessageParams(params: SignMessageParams) {
  const encodedParams = {
    ...params,
    nonce: params.nonce.toString("base64"),
  }
  return JSON.stringify(encodedParams)
}

export function deserializeSignMessageParams(
  params: string
): SignMessageParams {
  const obj = JSON.parse(params)
  return signMessageSchema.parse({
    ...obj,
    nonce: Buffer.from(obj.nonce, "base64"),
  })
}

function openWindowWithMessageHandler({
  url,
  onMessage,
  onClose,
  signal,
}: {
  url: string
  onMessage: (data: unknown) => void
  onClose: () => void
  signal: AbortSignal
}) {
  const width = 800
  const height = 800
  const left = window.screen.width / 2 - width / 2
  const top = window.screen.height / 2 - height / 2

  const win = window.open(
    url,
    "_blank",
    `width=${width},height=${height},top=${top},left=${left},resizable,scrollbars`
  )

  const interval = setInterval(() => {
    if (win?.closed) {
      cleanup()
      onClose?.()
    }
  }, 1000)

  const messageHandler = (event: MessageEvent) => {
    if (event.origin !== window.location.origin) return
    if (event.source !== win) return

    onMessage(event.data)
  }

  window.addEventListener("message", messageHandler, { signal })
  signal.addEventListener("abort", cleanup, { once: true })

  function cleanup() {
    clearInterval(interval)
  }
}

/**
 * Returns a promise that resolves when either the promise or the signal is aborted
 */
function abortablePromise<T>(
  promise: Promise<T>,
  signal: AbortSignal
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      if (signal.aborted) {
        return reject(signal.reason || new Error("Operation aborted"))
      }
      signal.addEventListener("abort", () => {
        reject(signal.reason || new Error("Operation aborted"))
      })
    }),
  ])
}
