"use client"

import Image from "next/image"
import { useContext } from "react"

import { FeatureFlagsContext } from "@src/providers/FeatureFlagsProvider"
import solswapBg from "../../public/static/templates/solswap/bg.png"

const PageBackground = () => {
  const { whitelabelTemplate } = useContext(FeatureFlagsContext)

  if (whitelabelTemplate === "solswap") {
    return (
      <div className="absolute bottom-0 w-full h-full -z-[1]">
        <Image
          src={solswapBg}
          unoptimized
          alt={""}
          className="w-full h-full object-cover object-bottom"
        />
      </div>
    )
  }

  if (whitelabelTemplate === "turboswap") {
    return (
      <div className="absolute bottom-0 w-full h-full -z-[1]">
        <div className="bg-[linear-gradient(180deg,#F9F9F8_0%,#F9F8E6_81.5%,#F9F8E6_100%)] w-full h-full" />
        <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-1/2 lg:left-[75%] -translate-x-1/2 w-[620px] h-[620px]">
          <Image
            src="/static/templates/turboswap/coin-frog.png"
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    )
  }

  if (whitelabelTemplate === "dogecoinswap") {
    return (
      <div className="hidden md:block absolute bottom-0 w-full h-full -z-[1]">
        <div className="w-full h-full bg-no-repeat bg-center bg-cover bg-[url('/static/templates/dogecoinswap/bg-light.jpg')]" />
      </div>
    )
  }

  return (
    <div className="absolute bottom-0 w-full h-full -z-[1] bg-gray-50 dark:bg-black-900">
      <div className="w-full h-full bg-no-repeat bg-bottom bg-page-light--mobile md:bg-page-light dark:bg-page-dark--mobile dark:md:bg-page-dark" />
    </div>
  )
}

export default PageBackground
