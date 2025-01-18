import Link from "next/link"
import { type PropsWithChildren, useContext } from "react"

import { FeatureFlagsContext } from "@src/providers/FeatureFlagsProvider"
import AuroraLogo from "../../public/static/logos/blockchain-strips/aurora.svg"
import NearLogo from "../../public/static/logos/blockchain-strips/near.svg"
import TurboLogoFrog from "../../public/static/templates/turboswap/logotype-frog.svg"

interface Props extends PropsWithChildren {
  title?: string
  description?: string
}

const Paper = ({ children, title, description }: Props) => {
  const { whitelabelTemplate } = useContext(FeatureFlagsContext)

  if (whitelabelTemplate === "turboswap") {
    return (
      <div className="flex flex-col flex-1 justify-start items-center sm:mt-[5.5rem] md:mt-0">
        <div className="w-full px-3">
          <div className="flex flex-col mb-8 text-center md:text-left">
            {title && <h1 className="mb-3 font-black">{title}</h1>}
            {description && (
              <span className="text-sm text-gray-600 dark:text-gray-500">
                {description}
              </span>
            )}
          </div>
          <div className="flex justify-center md:justify-start">{children}</div>

          <div className="w-full flex justify-center md:justify-start items-center pt-7">
            <Link
              href="https://auroralabs.dev"
              target="_blank"
              rel="noreferrer"
              className="flex justify-center items-center gap-1.5 text-sm font-medium bg-white dark:bg-black px-3 py-1.5 rounded-full shadow"
            >
              <span className="text-secondary">Built by</span>
              <AuroraLogo className="text-black dark:text-white" />
              <span className="text-secondary">with love for</span>
              <span className="text-black dark:text-white text-nowrap flex items-center gap-1">
                <TurboLogoFrog width={26} height={26} /> Turbo
              </span>
            </Link>
          </div>
        </div>
      </div>
    )
  }
  if (whitelabelTemplate === "trumpswap") {
    return (
      <div className="flex flex-col flex-1 justify-start items-center sm:mt-[5.5rem] md:mt-0">
        <div className="w-full px-3">
          <div className="flex flex-col mb-8 text-center md:text-left">
            {title && <h1 className="mb-3 font-black">{title}</h1>}
            {description && (
              <span className="text-sm text-gray-600 dark:text-gray-500">
                {description}
              </span>
            )}
          </div>
          <div className="flex justify-center md:justify-start">{children}</div>

          <div className="w-full flex justify-center md:justify-start items-center pt-7">
            <div className="flex justify-center items-center gap-1.5 text-sm font-medium bg-white dark:bg-black px-3 py-1.5 rounded-full shadow">
              <span className="text-secondary">Built by</span>
              <NearLogo className="text-black dark:text-white" />
              <span className="text-secondary">with love for</span>
              <span className="text-black dark:text-white">Mr. President</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 justify-start items-center mt-[5.5rem] min-w-0">
      <div className="w-full px-3">
        <div className="flex flex-col mb-8 text-center">
          {title && <h1 className="mb-3 font-black">{title}</h1>}
          {description && (
            <span className="text-sm text-gray-600 dark:text-gray-500">
              {description}
            </span>
          )}
        </div>
        <div className="flex justify-center">{children}</div>
      </div>
    </div>
  )
}

export default Paper
