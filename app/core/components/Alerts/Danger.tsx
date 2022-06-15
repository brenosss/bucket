import { XCircleIcon } from "@heroicons/react/solid"

export default function Danger({ message }) {
  return (
    <div className="rounded-md px-4 mt-2">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{message}</h3>
        </div>
      </div>
    </div>
  )
}
