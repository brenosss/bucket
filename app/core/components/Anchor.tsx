import { AnchorHTMLAttributes } from "react"

import { Link, RouteUrlObject } from "blitz"
import { Children } from "react-test-renderer/node_modules/@types/react"

type AnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: RouteUrlObject | string
}

export function AnchorLink(props: AnchorProps) {
  const { href, ...AnchorProps } = props
  return (
    <Link href={href}>
      <a
        className="rounded-lg py-1 px-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
        {...AnchorProps}
      />
    </Link>
  )
}
