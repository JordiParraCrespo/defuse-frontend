"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

import Navbar from "@src/components/Navbar"
import { LINKS_HEADER, Navigation } from "@src/constants/routes"
import { useHistoryStore } from "@src/providers/HistoryStoreProvider"

const NavbarMobile = () => {
  const pathname = usePathname()
  const isMarketPage = pathname === Navigation.JOBS
  const { active, openWidget, closeWidget } = useHistoryStore((state) => state)

  const handleOpenHistory = () => {
    if (!active) {
      return openWidget()
    }
    closeWidget()
  }

  return (
    <>
      <div className="fixed bottom-0 z-50 left-0 md:hidden w-full px-5 py-3 bg-white border-t-[1px] border-white-200">
        {!isMarketPage && <Navbar links={[...LINKS_HEADER]} />}
        {isMarketPage && (
          <div className="flex justify-center items-center gap-4">
            <Link
              href={Navigation.JOBS}
              className="relative px-3 py-1.5 rounded-full text-sm"
            >
              Jobs
            </Link>
          </div>
        )}
      </div>
      <div className="block md:hidden h-[56px]" />
    </>
  )
}

export default NavbarMobile
