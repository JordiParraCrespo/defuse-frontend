import type { PropsWithChildren } from "react"
import clsx from "clsx"

interface Props extends PropsWithChildren {
  title: string
  className?: string
}

const Section = ({ title, className = "", children }: Props) => {
  return (
    <section className="flex flex-col items-center pt-[64px] md:pt-[74px] pb-[42px] md:pb-[54px]">
      <h2 className="font-black mb-5 text-black-400 text-[32px] md:text-5xl text-center">
        {title}
      </h2>
      <div className={clsx("w-full", className && className)}>{children}</div>
    </section>
  )
}

export default Section
