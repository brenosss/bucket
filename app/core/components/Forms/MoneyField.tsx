import Danger from "app/core/components/Alerts/Danger"
import { InputField } from "app/core/components/Forms/Input"

export default function MoneyField({ label, name, onChange, error }: InputField) {
  const errorStyle = "outline-red-800 outline-1 outline text-red-800 placeholder-red-800"
  function MoneyFieldOnChange(event) {
    onChange(name, Number(event.target.value))
  }

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 py-2">
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className={`sm:text-sm ${error ? "text-red-800" : ""} `}>R$</span>
        </div>
        <input
          type="text"
          name={name}
          id={name}
          onChange={MoneyFieldOnChange}
          className={`appearance-none block w-full pl-8 pr-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-700
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              error ? errorStyle : ""
            } `}
          placeholder="0.00"
          aria-describedby="price-currency"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className={`sm:text-sm ${error ? "text-red-800" : ""} `} id="price-currency">
            BRL
          </span>
        </div>
      </div>
      {error && <Danger message={error} />}
    </div>
  )
}
