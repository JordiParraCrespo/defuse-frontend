import { NetworkToken, NetworkTokenWithSwapRoute } from "@src/types/interfaces"

const environment = process.env.environment || "production"

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

const listNetworksTokensTestnet = [
  {
    defuse_asset_id: "near:testnet:wrap.testnet",
    blockchain: "near",
    chainId: "testnet",
    address: "wrap.testnet",
    chainName: "NEAR",
    name: "Wrapped NEAR fungible token",
    symbol: "wNEAR",
    chainIcon: "/static/icons/network/near.svg",
    icon: "https://assets.coingecko.com/coins/images/18280/standard/EX4mrWMW_400x400.jpg?1696517773",
    decimals: 24,
  },
  {
    defuse_asset_id: "near:testnet:aurora.fakes.testnet",
    blockchain: "near",
    chainId: "testnet",
    address: "aurora.fakes.testnet",
    chainName: "NEAR",
    name: "Aurora",
    symbol: "AURORA",
    chainIcon: "/static/icons/network/near.svg",
    icon: "https://assets.coingecko.com/coins/images/20582/standard/aurora.jpeg?1696519989",
    decimals: 18,
  },
  {
    defuse_asset_id: "near:testnet:usdt.fakes.testnet",
    blockchain: "near",
    chainId: "testnet",
    address: "usdt.fakes.testnet",
    chainName: "NEAR",
    name: "Tether USD",
    symbol: "USDT.e",
    chainIcon: "/static/icons/network/near.svg",
    icon: "https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661",
    decimals: 6,
  },
  {
    defuse_asset_id: "near:testnet:usdc.fakes.testnet",
    blockchain: "near",
    chainId: "testnet",
    address: "usdc.fakes.testnet",
    chainName: "NEAR",
    name: "USD Coin",
    symbol: "USDC",
    chainIcon: "/static/icons/network/near.svg",
    icon: "https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694",
    decimals: 6,
  },
  {
    defuse_asset_id: "near:testnet:wbtc.fakes.testnet",
    blockchain: "near",
    chainId: "testnet",
    address: "wbtc.fakes.testnet",
    chainName: "NEAR",
    name: "Wrapped BTC",
    symbol: "wBTC",
    chainIcon: "/static/icons/network/near.svg",
    icon: "https://assets.coingecko.com/coins/images/7598/standard/wrapped_bitcoin_wbtc.png?1696507857",
    decimals: 8,
  },
  {
    defuse_asset_id:
      "near:testnet:14b2bc0c-32bc-4ac0-8eab-416c700d7c3d.testnet",
    blockchain: "near",
    chainId: "testnet",
    address: "14b2bc0c-32bc-4ac0-8eab-416c700d7c3d.testnet",
    chainName: "NEAR",
    name: "Sweat",
    symbol: "SWEAT",
    chainIcon: "/static/icons/network/near.svg",
    icon: "https://assets.coingecko.com/coins/images/25057/standard/fhD9Xs16_400x400.jpg?1696524208",
    decimals: 18,
  },
  {
    defuse_asset_id: "near:testnet:ref.fakes.testnet",
    blockchain: "near",
    chainId: "testnet",
    address: "ref.fakes.testnet",
    chainName: "NEAR",
    name: "Ref Finance Token",
    symbol: "REF",
    chainIcon: "/static/icons/network/near.svg",
    icon: "https://assets.coingecko.com/coins/images/18279/standard/ref.png?1696517772",
    decimals: 18,
  },
  {
    defuse_asset_id: "near:testnet:blackdragon.fakes.testnet",
    blockchain: "near",
    chainId: "testnet",
    address: "blackdragon.fakes.testnet",
    chainName: "NEAR",
    name: "Black Dragon",
    symbol: "BLACKDRAGON",
    chainIcon: "/static/icons/network/near.svg",
    icon: "https://assets.coingecko.com/coins/images/35502/standard/Untitled-8.png?1709390396",
    decimals: 16,
  },
  {
    defuse_asset_id: "near:testnet:deltalonk.testnet",
    blockchain: "near",
    chainId: "testnet",
    address: "deltalonk.testnet",
    chainName: "NEAR",
    name: "LONK fungible token",
    symbol: "LONK",
    chainIcon: "/static/icons/network/near.svg",
    icon: "https://assets.coingecko.com/coins/images/36497/standard/Logo_Long_square.png?1717541650",
    decimals: 8,
  },
]

const listNetworksTokensMainnet = [
  W_NEAR_TOKEN_META,
  {
    defuse_asset_id:
      "near:mainnet:aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near",
    blockchain: "near",
    chainId: "mainnet",
    address: "aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near",
    chainName: "NEAR",
    name: "Aurora",
    symbol: "AURORA",
    chainIcon: "/static/icons/network/near.svg",
    icon: "https://assets.coingecko.com/coins/images/20582/standard/aurora.jpeg?1696519989",
    decimals: 18,
  },
  {
    defuse_asset_id: "near:mainnet:usm.tkn.near",
    blockchain: "near",
    chainId: "mainnet",
    address: "usm.tkn.near",
    chainName: "NEAR",
    name: "USMeme",
    symbol: "USM",
    chainIcon: "/static/icons/network/near.svg",
    icon: "https://assets.coingecko.com/coins/images/38114/standard/usmeme.jpeg?1716536863",
    decimals: 18,
  },
  {
    defuse_asset_id:
      "near:mainnet:2260fac5e5542a773aa44fbcfedf7c193bc2c599.factory.bridge.near",
    blockchain: "near",
    chainId: "mainnet",
    address: "2260fac5e5542a773aa44fbcfedf7c193bc2c599.factory.bridge.near",
    chainName: "NEAR",
    name: "Wrapped BTC",
    symbol: "wBTC",
    chainIcon: "/static/icons/network/near.svg",
    icon: "https://assets.coingecko.com/coins/images/7598/standard/wrapped_bitcoin_wbtc.png",
    decimals: 18,
  },
  {
    defuse_asset_id: "near:mainnet:token.v2.ref-finance.near",
    blockchain: "near",
    chainId: "mainnet",
    address: "token.v2.ref-finance.near",
    chainName: "NEAR",
    name: "Ref Finance Token",
    symbol: "REF",
    chainIcon: "/static/icons/network/near.svg",
    icon: "https://assets.coingecko.com/coins/images/18279/standard/ref.png?1696517772",
    decimals: 18,
  },
  {
    defuse_asset_id: "near:mainnet:aurora",
    blockchain: "near",
    chainId: "mainnet",
    address: "aurora",
    chainName: "NEAR",
    name: "ETH",
    symbol: "ETH",
    chainIcon: "/static/icons/network/near.svg",
    icon: "https://assets.coingecko.com/coins/images/279/standard/ethereum.png",
    decimals: 18,
  },
]

export const LIST_NETWORKS_TOKENS: NetworkToken[] =
  environment === "development"
    ? listNetworksTokensTestnet
    : listNetworksTokensMainnet

export const LIST_TOKENS = [
  {
    defuseAssetId:
      "near:mainnet:17208628f84f5d6ad33f0da3bbbeb27ffcb398eac501a31bd6ad2011e36133a1",
    address: "17208628f84f5d6ad33f0da3bbbeb27ffcb398eac501a31bd6ad2011e36133a1",
    decimals: 6,
    icon: "https://assets.coingecko.com/coins/images/6319/standard/usdc.png",
    chainId: "mainnet",
    chainIcon: "/static/icons/network/near.svg",
    chainName: "NEAR",
    routes: [],
    symbol: "USDC",
    name: "USDC",
  },
  {
    defuseAssetId: "near:mainnet:usdt.tether-token.near",
    address: "usdt.tether-token.near",
    decimals: 6,
    icon: "https://assets.coingecko.com/coins/images/325/standard/Tether.png",
    chainId: "mainnet",
    chainIcon: "/static/icons/network/near.svg",
    chainName: "NEAR",
    routes: [],
    symbol: "USDT",
    name: "USDt",
  },
  {
    defuseAssetId: "near:mainnet:aurora",
    address: "aurora",
    decimals: 18,
    icon: "https://assets.coingecko.com/coins/images/279/standard/ethereum.png",
    chainId: "mainnet",
    chainIcon: "/static/icons/network/near.svg",
    chainName: "NEAR",
    routes: ["near:mainnet:aurora"],
    symbol: "ETH",
    name: "ETH",
  },
]

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
const listNativeTokensMainnet = [NEAR_TOKEN_META]

export const LIST_NATIVE_TOKENS: NetworkTokenWithSwapRoute[] =
  environment === "development"
    ? listNativeTokensTestnet
    : listNativeTokensMainnet
