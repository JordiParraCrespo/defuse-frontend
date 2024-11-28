import {
  type BaseTokenInfo,
  type UnifiedTokenInfo,
  isBaseToken,
  isUnifiedToken,
} from "@defuse-protocol/defuse-sdk"
import type { WhitelabelTemplateValue } from "@src/config/featureFlags"
import { useFlatTokenList } from "@src/hooks/useFlatTokenList"
import { FeatureFlagsContext } from "@src/providers/FeatureFlagsProvider"
import { useContext } from "react"

const TEMPLATE_PRIORITY_TOKENS: Record<WhitelabelTemplateValue, string[]> = {
  "near-intents": [
    "nep141:eth-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.omft.near",
    "nep141:wrap.near",
  ],
  solswap: ["nep141:sol.omft.near", "nep141:wrap.near"],
  dogecoinswap: ["nep141:doge.omft.near", "nep141:wrap.near"],
  turboswap: [],
}

export function useTokenList(tokenList: (BaseTokenInfo | UnifiedTokenInfo)[]) {
  let list = useFlatTokenList(tokenList)
  const flags = useContext(FeatureFlagsContext)

  if (!flags.dogecoin) {
    list = list.filter((token) => {
      if (isBaseToken(token)) {
        return token.chainName !== "dogecoin"
      }
      return true
    })
  }

  list = sortTokensWithPriority(
    list,
    TEMPLATE_PRIORITY_TOKENS[flags.whitelabelTemplate]
  )

  return list
}

function sortTokensWithPriority(
  tokens: (BaseTokenInfo | UnifiedTokenInfo)[],
  priorityTokenIds: string[]
): (BaseTokenInfo | UnifiedTokenInfo)[] {
  if (!priorityTokenIds.length) return tokens

  const priorityMap = new Map(priorityTokenIds.map((id, index) => [id, index]))

  return tokens.toSorted((a, b) => {
    const aIndex = getTokenPriorityIndex(priorityMap, a)
    const bIndex = getTokenPriorityIndex(priorityMap, b)

    if (aIndex !== undefined) {
      if (bIndex !== undefined) {
        return aIndex - bIndex // Both are priority tokens
      }
      return -1 // Only a is priority token
    }
    if (bIndex !== undefined) {
      return 1 // Only b is priority token
    }
    return 0 // Neither are priority tokens
  })
}

function getTokenPriorityIndex(
  priorityMap: Map<string, number>,
  token: BaseTokenInfo | UnifiedTokenInfo
): number | undefined {
  if (isBaseToken(token)) {
    return priorityMap.get(token.defuseAssetId)
  }
  if (isUnifiedToken(token)) {
    // Check if any of the grouped tokens match priority
    return token.groupedTokens
      .map((t) => priorityMap.get(t.defuseAssetId))
      .find((index) => index !== undefined)
  }
  return undefined
}
