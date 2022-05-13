import { MouseEventHandler, ButtonHTMLAttributes } from "react"

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
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

export function BlueButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      {...{
        ...props,
        className: `text-white bg-indigo-600 hover:bg-indigo-700 ${props.className}`,
      }}
    />
  )
}
