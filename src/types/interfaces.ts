import type { AccountView } from "near-api-js/lib/providers/provider"

import { HistoryStatus } from "@src/stores/historyStore"

export type DefuseBaseIds = {
  defuse_asset_id: string
  blockchain: string
}

export type Account = AccountView & {
  account_id: string
}

export enum TokenConvertEnum {
  USD = "usd",
}

export type TokenBalance = {
  balance?: string
  balanceUsd?: number
  convertedLast?: {
    [key in TokenConvertEnum]: number
  }
}

export interface TokenInfo extends TokenBalance {
  address: string
  symbol: string
  name: string
  decimals: number
  icon?: string
}

export interface NetworkToken extends TokenInfo, DefuseBaseIds {
  chainId?: string
  chainIcon?: string
  chainName?: string
}

export interface NetworkTokenWithSwapRoute extends NetworkToken {
  routes?: string[]
}

export enum QueueTransactions {
  "DEPOSIT" = "deposit",
  "WITHDRAW" = "withdraw",
  "STORAGE_DEPOSIT_TOKEN_IN" = "storageDepositTokenIn",
  "STORAGE_DEPOSIT_TOKEN_OUT" = "storageDepositTokenOut",
  "CREATE_INTENT" = "createIntent",
}

export interface Result<T> {
  result: T
  error?: NearTXError
}

export interface NearTXTransaction {
  hash: string
  actions: {
    FunctionCall: {
      method_name: string
      args: string
    }
  }[]
  signer_id: string
  receiver_id: string
}

export type NearTxReceiptsOutcomeFailure = {
  ActionError: {
    index: number
    kind: {
      FunctionCallError: {
        ExecutionError: string
      }
    }
  }
}

export type NearTxReceiptsOutcome = {
  block_hash: string
  id: string
  outcome: {
    logs: string[]
    status: {
      SuccessReceiptId?: string
      SuccessValue?: string
      Failure?: NearTxReceiptsOutcomeFailure
    }
  }
}[]

export type NearTXError = {
  message: string
  data: string
}

export type NearTX = {
  transaction: NearTXTransaction
  receipts_outcome: NearTxReceiptsOutcome
}

export interface NearHeader {
  height: number
  prev_height: number
  timestamp: number
}

export type NearBlock = Result<{
  chunks: unknown
  header: NearHeader
}>

export type NearIntentStatus = {
  intent: {
    initiator: string
    send: {
      token_id: string
      amount: string
    }
    receive: {
      token_id: string
      amount: string
    }
    expiration: {
      Block: number
    }
    referral: string
  }
  status: HistoryStatus
  created_at: number
  min_ttl: number
  proof?: string
}

type TransferToken = {
  token_id: string
  amount: string
}

type ExpirationEnum = {
  Null: string
  Time: string
  Block: string
}

export interface NearIntentCreate {
  CreateIntent: {
    id: string
    IntentStruct: {
      initiator: string
      send: TransferToken
      receive: TransferToken
      expiration: ExpirationEnum
      referral: string
    }
  }
}

enum Status {
  "Available",
  "available",
}

export interface NearIntent1CreateCrossChain {
  type: "create"
  id: string
  asset_out: {
    type: "cross_chain"
    oracle: string
    asset: string
    amount: string
    account: string
  }
  lockup_until: {
    block_number: number
  }
  expiration: {
    block_number: number
  }
  referral: string
}

export interface NearIntent1CreateSingleChain {
  type: "create"
  id: string
  asset_out: {
    type: "nep141" | "native"
    token: string
    amount: string
    account: string
  }
  lockup_until: {
    block_number: number
  }
  expiration: {
    block_number: number
  }
  referral: string
}

export interface RecoverDetails {
  initiator: string
  send: TransferToken
  receive: TransferToken
  expiration: ExpirationEnum
  referral: string
  msg?: string
  amount?: string
  receiverId?: string
}

export type JobsDetails = {
  team?: string
  applicationLink?: boolean
  position: string
  link: string
}

export enum BlockchainEnum {
  Near = "near",
  Eth = "eth",
  Btc = "btc",
}

export enum NetworkEnum {
  Mainnet = "mainnet",
  Base = "8453",
}

export enum ContractIdEnum {
  Native = "native",
}

export interface NearViewAccount {
  amount: string
  block_hash: string
  block_height: number
  code_hash: string
  locked: string
  storage_paid_at: number
  storage_usage: number
}

export interface BitcoinBalanceEntity {
  hash160: string
  address: string
  n_tx: number
  n_unredeemed: number
  total_received: number
  total_sent: number
  final_balance: number
}

export interface BitcoinPriceInUsdEntity {
  bitcoin: {
    usd: number
  }
}
