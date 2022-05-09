import { MouseEventHandler } from "react"

type ButtonProps = {
  children: React.ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>
  style?: String
}

export function Button({ children, onClick, style = "" }: ButtonProps) {
  return (
    <>
      <button
        className={`whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium ${style}`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  )
}

export function BlueButton({ children, onClick, style = "" }: ButtonProps) {
  const blueStyle = `text-white bg-indigo-600 hover:bg-indigo-700 ${style}`
  return (
    <Button onClick={onClick} style={blueStyle}>
      {children}
    </Button>
  )
}
