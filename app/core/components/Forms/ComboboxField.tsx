import { useState } from "react"
import { CheckIcon } from "@heroicons/react/solid"
import { Combobox } from "@headlessui/react"
import Danger from "app/core/components/Alerts/Danger"
import { InputField } from "app/core/components/Forms/Input"

type ComboboxInputField = {
  options: Array<Option>
}

type Option = {
  name: string
  id: number
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function ComboboxField({
  name,
  label,
  options,
  onChange,
  error,
}: InputField & ComboboxInputField) {
  const errorStyle = "outline-red-800 outline-1 outline text-red-800 placeholder-red-800"
  const [query, setQuery] = useState<string>("")
  const [selected, setSelected] = useState<Option>()

  async function comboboxOnChange(value) {
    setSelected(value)
    onChange(name, value.id)
  }

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option: Option) => {
          return option.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <div>
      <Combobox as="div" value={selected} onChange={comboboxOnChange}>
        <Combobox.Label className="block text-sm font-medium text-gray-700 py-2">
          {label}
        </Combobox.Label>
        <div className="relative mt-1">
          <Combobox.Button as="div">
            <Combobox.Input
              name={name}
              className={`w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1
                focus:ring-indigo-500 sm:text-sm ${error ? errorStyle : ""}`}
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(option: Option) => (option ? option.name : "")}
              autoComplete="off"
            />
          </Combobox.Button>

          {filteredOptions.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredOptions.map((option) => (
                <Combobox.Option
                  key={option.id}
                  value={option}
                  className={({ active }) =>
                    classNames(
                      "relative cursor-default select-none py-2 pl-8 pr-4",
                      active ? "bg-indigo-600 text-white" : "text-gray-900"
                    )
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <span className={classNames("block truncate", selected && "font-semibold")}>
                        {option.name}
                      </span>

                      {selected && (
                        <span
                          className={classNames(
                            "absolute inset-y-0 left-0 flex options-center pl-1.5",
                            active ? "text-white" : "text-indigo-600"
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
      {error && <Danger message={error} />}
    </div>
  )
}
