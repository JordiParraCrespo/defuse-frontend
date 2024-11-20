import type {
  BaseTokenInfo,
  UnifiedTokenInfo,
} from "@defuse-protocol/defuse-sdk"
import type { NetworkTokenWithSwapRoute } from "@src/types/interfaces"

const environment = process.env.environment || "production"
const NEXT_PUBLIC_SOLANA_ENABLED =
  process?.env?.NEXT_PUBLIC_SOLANA_ENABLED === "true"

/** @deprecated */
export const NEAR_TOKEN_META = {
  defuse_asset_id: "near:mainnet:native",
  blockchain: "near",
  chainName: "NEAR",
  chainId: "1313161554",
  address: "native",
  name: "NEAR",
  symbol: "NEAR",
  chainIcon: "/static/icons/network/near.svg",
  icon: "https://assets.coingecko.com/coins/images/10365/standard/near.jpg?1696510367",
  decimals: 24,
  routes: ["wrap.near", "near:mainnet:wrap.near"],
}

/** @deprecated */
export const W_NEAR_TOKEN_META = {
  defuse_asset_id: "near:mainnet:wrap.near",
  blockchain: "near",
  chainId: "mainnet",
  address: "wrap.near",
  chainName: "NEAR",
  name: "Wrapped NEAR fungible token",
  symbol: "wNEAR",
  chainIcon: "/static/icons/network/near.svg",
  icon: "https://assets.coingecko.com/coins/images/10365/standard/near.jpg",
  decimals: 24,
}

/** @deprecated */
export const W_BASE_TOKEN_META = {
  defuse_asset_id: "eth:8453:native",
  blockchain: "eth",
  chainId: "8453",
  address: "0x4200000000000000000000000000000000000006",
  chainName: "BASE",
  name: "Wrapped Ether",
  symbol: "WETH",
  chainIcon: "/static/icons/network/base.svg",
  icon: "https://assets.coingecko.com/coins/images/279/standard/ethereum.png",
  decimals: 18,
}

export const LIST_TOKENS: (BaseTokenInfo | UnifiedTokenInfo)[] = [
  {
    unifiedAssetId: "usdc",
    decimals: 6,
    symbol: "USDC",
    name: "USD Coin",
    icon: "https://assets.coingecko.com/coins/images/6319/standard/usdc.png",
    groupedTokens: [
      {
        defuseAssetId:
          "nep141:eth-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.omft.near",
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        decimals: 6,
        icon: "https://assets.coingecko.com/coins/images/6319/standard/usdc.png",
        chainId: "",
        chainIcon: "/static/icons/network/ethereum.svg",
        chainName: "eth",
        routes: [],
        symbol: "USDC",
        name: "USDC",
      },
      {
        defuseAssetId:
          "nep141:17208628f84f5d6ad33f0da3bbbeb27ffcb398eac501a31bd6ad2011e36133a1",
        address:
          "17208628f84f5d6ad33f0da3bbbeb27ffcb398eac501a31bd6ad2011e36133a1",
        decimals: 6,
        icon: "https://assets.coingecko.com/coins/images/6319/standard/usdc.png",
        chainId: "",
        chainIcon: "/static/icons/network/near.svg",
        chainName: "near",
        routes: [],
        symbol: "USDC",
        name: "USDC",
      },
      {
        defuseAssetId:
          "nep141:base-0x833589fcd6edb6e08f4c7c32d4f71b54bda02913.omft.near",
        address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        decimals: 6,
        icon: "https://assets.coingecko.com/coins/images/6319/standard/usdc.png",
        chainId: "",
        chainIcon: "/static/icons/network/base.svg",
        chainName: "base",
        routes: [],
        symbol: "USDC",
        name: "USDC",
      },
      {
        defuseAssetId:
          "nep141:arb-0xaf88d065e77c8cc2239327c5edb3a432268e5831.omft.near",
        address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        decimals: 6,
        icon: "https://assets.coingecko.com/coins/images/6319/standard/usdc.png",
        chainId: "",
        chainIcon: "/static/icons/network/arbitrum.svg",
        chainName: "arbitrum",
        routes: [],
        symbol: "USDC",
        name: "USDC",
      },
    ],
  },
  {
    unifiedAssetId: "usdt",
    decimals: 6,
    symbol: "USDT",
    name: "Tether USD",
    icon: "https://assets.coingecko.com/coins/images/325/standard/Tether.png",
    groupedTokens: [
      {
        defuseAssetId:
          "nep141:eth-0xdac17f958d2ee523a2206206994597c13d831ec7.omft.near",
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        decimals: 6,
        icon: "https://assets.coingecko.com/coins/images/325/standard/Tether.png",
        chainId: "",
        chainIcon: "/static/icons/network/ethereum.svg",
        chainName: "eth",
        routes: [],
        symbol: "USDT",
        name: "Tether USD",
      },
      {
        defuseAssetId: "nep141:usdt.tether-token.near",
        address: "usdt.tether-token.near",
        decimals: 6,
        icon: "https://assets.coingecko.com/coins/images/325/standard/Tether.png",
        chainId: "mainnet",
        chainIcon: "/static/icons/network/near.svg",
        chainName: "near",
        routes: [],
        symbol: "USDT",
        name: "USDt",
      },
      {
        defuseAssetId:
          "nep141:arb-0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9.omft.near",
        address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
        decimals: 6,
        icon: "https://assets.coingecko.com/coins/images/325/standard/Tether.png",
        chainId: "",
        chainIcon: "/static/icons/network/arbitrum.svg",
        chainName: "arbitrum",
        routes: [],
        symbol: "USDT",
        name: "Tether USD",
      },
    ],
  },
  {
    unifiedAssetId: "eth",
    decimals: 18,
    symbol: "ETH",
    name: "ETH",
    icon: "https://assets.coingecko.com/coins/images/279/standard/ethereum.png",
    groupedTokens: [
      {
        defuseAssetId: "nep141:eth.omft.near",
        type: "native",
        address: "native",
        decimals: 18,
        icon: "https://assets.coingecko.com/coins/images/279/standard/ethereum.png",
        chainId: "",
        chainIcon: "/static/icons/network/ethereum.svg",
        chainName: "eth",
        routes: [],
        symbol: "ETH",
        name: "ETH",
      },
      {
        defuseAssetId: "nep141:aurora",
        address: "aurora",
        decimals: 18,
        icon: "https://assets.coingecko.com/coins/images/279/standard/ethereum.png",
        chainId: "",
        chainIcon: "/static/icons/network/near.svg",
        chainName: "near",
        routes: [],
        symbol: "ETH",
        name: "ETH",
      },
      {
        defuseAssetId: "nep141:base.omft.near",
        type: "native",
        address: "native",
        decimals: 18,
        icon: "https://assets.coingecko.com/coins/images/279/standard/ethereum.png",
        chainId: "",
        chainIcon: "/static/icons/network/base.svg",
        chainName: "base",
        routes: [],
        symbol: "ETH",
        name: "ETH",
      },
      {
        defuseAssetId: "nep141:arb.omft.near",
        type: "native",
        address: "native",
        decimals: 18,
        icon: "https://assets.coingecko.com/coins/images/279/standard/ethereum.png",
        chainId: "",
        chainIcon: "/static/icons/network/arbitrum.svg",
        chainName: "arbitrum",
        routes: [],
        symbol: "ETH",
        name: "ETH",
      },
    ],
  },
  {
    defuseAssetId:
      "nep141:aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near",
    address: "aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near",
    decimals: 18,
    icon: "https://assets.coingecko.com/coins/images/20582/standard/aurora.jpeg?1696519989",
    chainId: "mainnet",
    chainIcon: "/static/icons/network/near.svg",
    chainName: "near",
    routes: [],
    symbol: "AURORA",
    name: "Aurora",
  },
  {
    defuseAssetId: "nep141:wrap.near",
    address: "wrap.near",
    decimals: 24,
    icon: "https://assets.coingecko.com/coins/images/10365/standard/near.jpg",
    chainId: "mainnet",
    chainIcon: "/static/icons/network/near.svg",
    chainName: "near",
    routes: [],
    symbol: "NEAR",
    name: "Near",
  },
  {
    defuseAssetId: "nep141:btc.omft.near",
    type: "native",
    address: "native",
    decimals: 8,
    icon: "https://assets.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400",
    chainId: "",
    chainIcon: "/static/icons/network/btc.svg",
    chainName: "bitcoin",
    routes: [],
    symbol: "BTC",
    name: "Bitcoin",
  },
  {
    defuseAssetId:
      "nep141:eth-0x6982508145454ce325ddbe47a25d4ec3d2311933.omft.near",
    address: "0x6982508145454Ce325dDbE47a25d4ec3d2311933",
    decimals: 18,
    icon: "https://assets.coingecko.com/coins/images/29850/standard/pepe-token.jpeg?1696528776",
    chainId: "",
    chainIcon: "/static/icons/network/ethereum.svg",
    chainName: "eth",
    routes: [],
    symbol: "PEPE",
    name: "Pepe",
  },
  {
    defuseAssetId:
      "nep141:eth-0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce.omft.near",
    address: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
    decimals: 18,
    icon: "https://assets.coingecko.com/coins/images/11939/standard/shiba.png?1696511800",
    chainId: "",
    chainIcon: "/static/icons/network/ethereum.svg",
    chainName: "eth",
    routes: [],
    symbol: "SHIB",
    name: "Shiba Inu",
  },
  {
    defuseAssetId:
      "nep141:eth-0x514910771af9ca656af840dff83e8264ecf986ca.omft.near",
    address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    decimals: 18,
    icon: "https://assets.coingecko.com/coins/images/877/standard/chainlink-new-logo.png?1696502009",
    chainId: "",
    chainIcon: "/static/icons/network/ethereum.svg",
    chainName: "eth",
    routes: [],
    symbol: "LINK",
    name: "Chainlink",
  },
  {
    defuseAssetId:
      "nep141:eth-0x1f9840a85d5af5bf1d1762f925bdaddc4201f984.omft.near",
    address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    decimals: 18,
    icon: "https://assets.coingecko.com/coins/images/12504/standard/uniswap-logo.png?1720676669",
    chainId: "",
    chainIcon: "/static/icons/network/ethereum.svg",
    chainName: "eth",
    routes: [],
    symbol: "UNI",
    name: "Uniswap",
  },
  {
    defuseAssetId:
      "nep141:arb-0x912ce59144191c1204e64559fe8253a0e49e6548.omft.near",
    address: "0x912CE59144191C1204E64559FE8253a0e49E6548",
    decimals: 18,
    icon: "https://assets.coingecko.com/coins/images/16547/standard/arb.jpg?1721358242",
    chainId: "",
    chainIcon: "/static/icons/network/arbitrum.svg",
    chainName: "arbitrum",
    routes: [],
    symbol: "ARB",
    name: "Arbitrum",
  },
  {
    defuseAssetId:
      "nep141:eth-0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.omft.near",
    address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
    decimals: 18,
    icon: "https://assets.coingecko.com/coins/images/12645/standard/aave-token-round.png?1720472354",
    chainId: "",
    chainIcon: "/static/icons/network/ethereum.svg",
    chainName: "eth",
    routes: [],
    symbol: "AAVE",
    name: "Aave",
  },
  {
    defuseAssetId:
      "nep141:arb-0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a.omft.near",
    address: "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a",
    decimals: 18,
    icon: "https://assets.coingecko.com/coins/images/18323/standard/arbit.png?1696517814",
    chainId: "",
    chainIcon: "/static/icons/network/arbitrum.svg",
    chainName: "arbitrum",
    routes: [],
    symbol: "GMX",
    name: "GMX",
  },
  {
    defuseAssetId:
      "nep141:eth-0xaaee1a9723aadb7afa2810263653a34ba2c21c7a.omft.near",
    address: "0xaaeE1A9723aaDB7afA2810263653A34bA2C21C7a",
    decimals: 18,
    icon: "https://assets.coingecko.com/coins/images/31059/standard/MOG_LOGO_200x200.png?1696529893",
    chainId: "",
    chainIcon: "/static/icons/network/ethereum.svg",
    chainName: "eth",
    routes: [],
    symbol: "MOG",
    name: "Mog Coin",
  },
  {
    defuseAssetId:
      "nep141:base-0x532f27101965dd16442e59d40670faf5ebb142e4.omft.near",
    address: "0x532f27101965dd16442E59d40670FaF5eBB142E4",
    decimals: 18,
    icon: "https://assets.coingecko.com/coins/images/35529/standard/1000050750.png?1709031995",
    chainId: "",
    chainIcon: "/static/icons/network/base.svg",
    chainName: "base",
    routes: [],
    symbol: "BRETT",
    name: "Brett",
  },
  {
    defuseAssetId: "nep141:token.sweat",
    address: "token.sweat",
    decimals: 18,
    icon: "https://assets.coingecko.com/coins/images/25057/standard/fhD9Xs16_400x400.jpg?1696524208",
    chainId: "",
    chainIcon: "/static/icons/network/near.svg",
    chainName: "near",
    routes: [],
    symbol: "SWEAT",
    name: "Sweat Economy",
  },
]

NEXT_PUBLIC_SOLANA_ENABLED &&
  LIST_TOKENS.unshift({
    defuseAssetId: "near:native.omft.near",
    address: "native",
    decimals: 9,
    icon: "https://assets.coingecko.com/coins/images/4128/standard/solana.png?1718769756",
    chainId: "",
    chainIcon: "/static/icons/network/solana.svg",
    chainName: "solana",
    routes: [],
    symbol: "SOL",
    name: "Solana",
  })

/** @deprecated */
const listNativeTokensTestnet = [
  {
    defuse_asset_id: "near:testnet:native",
    blockchain: "near",
    chainName: "NEAR",
    chainId: "1313161554",
    address: "native",
    name: "NEAR",
    symbol: "NEAR",
    chainIcon: "/static/icons/network/near.svg",
    icon: "https://assets.coingecko.com/coins/images/10365/standard/near.jpg?1696510367",
    decimals: 24,
    routes: ["wrap.testnet"],
  },
]
/** @deprecated */
const listNativeTokensMainnet = [NEAR_TOKEN_META]

/** @deprecated */
export const LIST_NATIVE_TOKENS: NetworkTokenWithSwapRoute[] =
  environment === "development"
    ? listNativeTokensTestnet
    : listNativeTokensMainnet
