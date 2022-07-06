import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react"

import { Link, RouteUrlObject } from "blitz"
import clsx from "clsx"

export function _Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...{
        ...props,
        className: `whitespace-nowrap inline-flex items-center justify-center
          px-4 py-2 border border-transparent rounded-md shadow-sm
          text-base font-medium ${props.className}`,
      }}
    />
  )
}

export function _BlueButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <_Button
      {...{
        ...props,
        className: `text-white bg-indigo-600 hover:bg-indigo-700 ${props.className}`,
      }}
    />
  )
}

const baseStyles = {
  solid:
    "group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
  outline:
    "group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none",
}

const variantStyles = {
  solid: {
    slate:
      "bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900",
    blue: "bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600",
    white:
      "bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600 focus-visible:outline-white",
  },
  outline: {
    slate:
      "ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300",
    white:
      "ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white",
  },
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: string
  color?: string
  className?: string
}

type ButtonLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  variant?: string
  color?: string
  className?: string
  href: RouteUrlObject
}

export function Button(props: ButtonProps) {
  const { variant = "solid", color = "slate", className = "" } = props
  return (
    <button
      {...props}
      className={clsx(baseStyles[variant], variantStyles[variant][color], className)}
    />
  )
}

export function ButtonLink(props: ButtonLinkProps) {
  const { variant = "solid", color = "slate", className = "", href, ...AnchorProps } = props
  return (
    <Link href={href}>
      <a
        {...AnchorProps}
        className={clsx(baseStyles[variant], variantStyles[variant][color], className)}
      />
    </Link>
  )
}
