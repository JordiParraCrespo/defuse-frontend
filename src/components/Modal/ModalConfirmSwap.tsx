"use client"

import React, { useEffect, useId, useState } from "react"
import { Spinner, Text } from "@radix-ui/themes"
import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { parseUnits } from "viem"
import { v4 } from "uuid"

import ModalDialog from "@src/components/Modal/ModalDialog"
import { useModalStore } from "@src/providers/ModalStoreProvider"
import {
  CallRequestIntentProps,
  EstimateQueueTransactions,
  useSwap,
} from "@src/hooks/useSwap"
import { useWalletSelector } from "@src/providers/WalletSelectorProvider"
import { UseQueryCollectorKeys } from "@src/hooks/useQuery"
import { ModalReviewSwapPayload } from "@src/components/Modal/ModalReviewSwap"
import { ModalType } from "@src/stores/modalStore"
import { sha256 } from "@src/actions/crypto"
import { useHistoryStore } from "@src/providers/HistoryStoreProvider"
import { usePublishIntentSolver0 } from "@src/api/hooks/Intent/usePublishIntentSolver0"
import { CONFIRM_SWAP_LOCAL_KEY } from "@src/constants/contracts"
import { smallBalanceToFormat } from "@src/utils/token"
import { LIST_NATIVE_TOKENS } from "@src/constants/tokens"

export interface ModalConfirmSwapPayload extends CallRequestIntentProps {}

const ModalConfirmSwap = () => {
  const [transactionQueue, setTransactionQueue] = useState(0)
  const [dataFromLocal, setDataFromLocal] = useState<ModalConfirmSwapPayload>()
  const [isReadingHistory, setIsReadingHistory] = useState(false)
  const { selector, accountId } = useWalletSelector()
  const {
    callRequestCreateIntent,
    nextEstimateQueueTransactions,
    getEstimateQueueTransactions,
    isProcessing,
  } = useSwap({
    selector,
    accountId,
  })
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { onCloseModal, payload } = useModalStore((state) => state)
  const modalPayload = payload as ModalReviewSwapPayload
  const { data: historyData, isFetched } = useHistoryStore((state) => state)
  const { mutate } = usePublishIntentSolver0()

  const getSwapFromLocal = (): ModalConfirmSwapPayload | null => {
    const getConfirmSwapFromLocal = localStorage.getItem(CONFIRM_SWAP_LOCAL_KEY)
    if (!getConfirmSwapFromLocal) return null
    const parsedData: { data: ModalConfirmSwapPayload } = JSON.parse(
      getConfirmSwapFromLocal
    )
    return parsedData.data
  }

  // Storing data for recovering progress of transaction track
  const setSwapToLocal = (inputs: ModalConfirmSwapPayload) => {
    localStorage.setItem(
      CONFIRM_SWAP_LOCAL_KEY,
      JSON.stringify({ data: inputs })
    )
  }

  const handleBatchCleanupQuery = (keys: string[]) => {
    const params = new URLSearchParams(searchParams.toString())
    keys.forEach((key) => params.delete(key))
    router.replace(pathname + "?" + params)
  }

  const handleBatchCreateSwapQuery = ({
    clientId,
  }: {
    clientId: string
  }): boolean => {
    try {
      const queryParams = new URLSearchParams(searchParams.toString())
      queryParams.set("modalType", ModalType.MODAL_CONFIRM_SWAP)
      queryParams.set("clientId", clientId)
      const updatedQueryString = queryParams.toString()
      router.replace(pathname + "?" + updatedQueryString)
      return true
    } catch (e) {
      console.log(`ModalConfirmSwap handleBatchCreateSwapQuery: `, e)
      return false
    }
  }

  const handleEstimateQueueTransactions = async (
    clientId: string
  ): Promise<EstimateQueueTransactions> => {
    const { queueInTrack, queueTransactionsTrack } =
      await getEstimateQueueTransactions({
        tokenIn: modalPayload.tokenIn,
        tokenOut: modalPayload.tokenOut,
        selectedTokenIn: modalPayload.selectedTokenIn,
        selectedTokenOut: modalPayload.selectedTokenOut,
        clientId,
        useNative: modalPayload.isNativeInSwap,
      })
    setTransactionQueue(queueInTrack)
    return {
      queueInTrack,
      queueTransactionsTrack,
    }
  }

  const handlePublishIntentToSolver = (
    inputs: ModalConfirmSwapPayload
  ): void => {
    historyData.forEach((value) => {
      if (value.clientId === inputs.clientId) {
        mutate({
          hash: value.hash,
          defuseAssetIdIn: inputs.selectedTokenIn.defuse_asset_id,
          accountId: accountId as string,
          clientId: inputs.clientId,
          defuseAssetIdOut: inputs.selectedTokenOut.defuse_asset_id,
          unitsAmountIn: parseUnits(
            inputs.tokenIn,
            inputs.selectedTokenIn?.decimals as number
          ).toString(),
          unitsAmountOut: parseUnits(
            inputs.tokenOut,
            inputs.selectedTokenOut?.decimals as number
          ).toString(),
        })
      }
    })
  }

  const handleTrackSwap = async () => {
    if (!modalPayload) {
      const data = getSwapFromLocal()

      if (data) {
        setDataFromLocal(data)

        // TODO Linked to [#1]
        const receivedHash = searchParams.get(
          UseQueryCollectorKeys.TRANSACTION_HASHS
        )

        const isBatchHashes = receivedHash?.split(",")
        if (!isBatchHashes) {
          console.log(
            "EstimateQueueTransactions has stopped due to the hash is missing, UseQueryCollectorKeys.TRANSACTION_HASHS"
          )
          return
        }
        const lastInTransactionHashes =
          isBatchHashes?.length > 1 ? isBatchHashes.at(-1) : isBatchHashes[0]

        const { value, done } = await nextEstimateQueueTransactions({
          estimateQueue: data.estimateQueue,
          receivedHash: lastInTransactionHashes as string,
        })

        setIsReadingHistory(true)

        const isNativeTokenIn = data!.selectedTokenIn.address === "0x1"
        const tokenNearNative = LIST_NATIVE_TOKENS.find(
          (token) => token.defuse_asset_id === "near:mainnet:0x1"
        )
        const mutateSelectedTokenIn = isNativeTokenIn
          ? {
              ...data!.selectedTokenIn,
              defuse_asset_id: tokenNearNative?.routes
                ? tokenNearNative?.routes[1]
                : "",
            }
          : data!.selectedTokenIn

        const inputs = {
          tokenIn: data!.tokenIn,
          tokenOut: data!.tokenOut,
          selectedTokenIn: mutateSelectedTokenIn,
          selectedTokenOut: data!.selectedTokenOut,
          clientId: data.clientId,
          estimateQueue: value,
        }

        if (done) {
          handlePublishIntentToSolver(inputs)
          onCloseModal()
          router.replace(pathname)
          return
        }

        handleBatchCleanupQuery([
          UseQueryCollectorKeys.CLIENT_ID,
          UseQueryCollectorKeys.TRANSACTION_HASHS,
        ])

        setSwapToLocal(inputs)
        handleBatchCreateSwapQuery({
          clientId: data.clientId as string,
        })
        await callRequestCreateIntent(inputs)
      }
      return
    }

    const newClientId = await sha256(v4())
    if (
      handleBatchCreateSwapQuery({
        clientId: newClientId,
      })
    ) {
      const estimateQueue = await handleEstimateQueueTransactions(newClientId)

      setIsReadingHistory(true)

      const inputs = {
        tokenIn: modalPayload.tokenIn,
        tokenOut: modalPayload.tokenOut,
        selectedTokenIn: modalPayload.selectedTokenIn,
        selectedTokenOut: modalPayload.selectedTokenOut,
        clientId: newClientId,
        estimateQueue,
      }

      setSwapToLocal(inputs)
      await callRequestCreateIntent(inputs, (mutate) => setSwapToLocal(mutate))
    }
  }

  useEffect(() => {
    if (isFetched && !isProcessing) {
      handleTrackSwap()
    }
  }, [historyData, isFetched, isProcessing])

  if (!isReadingHistory) {
    return null
  }

  return (
    <ModalDialog>
      <div className="flex flex-col min-h-[256px] max-h-[680px] h-full p-5">
        <div className="relative flex justify-between items-start mb-[44px]">
          <div className="w-full shrink absolute relative top-[30px] left-[50%] -translate-x-2/4 flex justify-center items-center">
            <div className="relative w-[56px] h-[56px]">
              <Image
                src="/static/icons/Wallet.svg"
                alt="Wallet Icon"
                width={56}
                height={56}
              />
              <div className="absolute -top-[6px] -right-[10px] w-[20px] h-[20px] flex justify-center items-center rounded-full bg-primary">
                <Text size="2" weight="medium" className="text-white">
                  {transactionQueue}
                </Text>
              </div>
            </div>
          </div>
          <button
            className="shrink-0 w-[40px] h-[40px] flex justify-center items-center"
            onClick={onCloseModal}
          >
            <Image
              src="/static/icons/close.svg"
              alt="Close Icon"
              width={14}
              height={14}
            />
          </button>
        </div>
        <div className="flex justify-center">
          <Spinner loading={isProcessing} />
        </div>
        <div className="w-full flex flex-col text-center text-black-400 gap-1 mb-4">
          <Text size="4" weight="bold">
            Confirm swap
          </Text>
          <Text size="2" weight="bold" className="text-gray-600">
            Please confirm transaction in your wallet.
          </Text>
        </div>
        <div className="flex justify-center">
          <div className="flex justify-center items-center gap-1 px-2.5 py-1 bg-gray-950 rounded-full">
            <Text size="2" weight="medium" className="text-black-400">
              {`${smallBalanceToFormat(modalPayload?.tokenIn || dataFromLocal?.tokenIn || "", 7)} ${modalPayload?.selectedTokenIn?.symbol || dataFromLocal?.selectedTokenIn?.symbol || ""}`}
            </Text>
            <Image
              src="/static/icons/arrow-right.svg"
              alt="Arrow Icon"
              width={24}
              height={24}
            />
            <Text size="2" weight="medium" className="text-black-400">
              {`${smallBalanceToFormat(modalPayload?.tokenOut || dataFromLocal?.tokenOut || "", 7)} ${modalPayload?.selectedTokenOut?.symbol || dataFromLocal?.selectedTokenOut?.symbol || ""}`}
            </Text>
          </div>
        </div>
      </div>
    </ModalDialog>
  )
}

export default ModalConfirmSwap
