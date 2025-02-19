"use client"

import React from "react"

import WidgetCardTransaction from "@src/components/History/Widget/WidgetCardTransaction"
import WidgetEmpty from "@src/components/History/Widget/WidgetEmpty"
import WidgetTransactionsList from "@src/components/History/Widget/WidgetTransactionsList"
import { useHistoryStore } from "@src/providers/HistoryStoreProvider"
import { useWalletSelector } from "@src/providers/WalletSelectorProvider"
import type { HistoryData } from "@src/stores/historyStore"

const Widget = () => {
  const { accountId } = useWalletSelector()
  const { active, data } = useHistoryStore((state) => state)
  if (!active) {
    return null
  }

  const getHistoryFromStore: HistoryData[] = []
  if (data.size) {
    for (const setOfData of data.values()) {
      if (
        typeof setOfData === "object" &&
        !setOfData?.isClosed &&
        accountId === setOfData.details?.transaction?.signer_id
      )
        getHistoryFromStore.push(setOfData)
    }
  }

  return (
    <div className="min-w-full md:min-w-auto md:w-[300px]">
      {data.size && getHistoryFromStore.length ? (
        <WidgetTransactionsList<HistoryData>
          Component={WidgetCardTransaction}
          data={getHistoryFromStore.toReversed()}
        />
      ) : (
        <WidgetEmpty />
      )}
    </div>
  )
}

export default Widget
