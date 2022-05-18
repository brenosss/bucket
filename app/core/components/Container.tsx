export default function Container({ children, className }: ComponentProps) {
  return <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}

type ComponentProps = {
  children: React.ReactNode
  className?: string
}
