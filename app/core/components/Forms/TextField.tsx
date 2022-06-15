import Danger from "app/core/components/Alerts/Danger"
import { InputField } from "app/core/components/Forms/Input"

function TextField({ name, label, placeholder, onChange, error }: InputField) {
  const errorStyle = "outline-red-800 outline-1 outline text-red-800 placeholder-red-800"
  function TextFieldOnChange(event) {
    onChange(name, event.target.value)
  }
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 py-2">
        {label}
      </label>
      <input
        name={name}
        placeholder={placeholder}
        className={`
            appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
          placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
            sm:text-sm ${error ? errorStyle : ""}
          `}
        onChange={TextFieldOnChange}
      />
      {error && <Danger message={error} />}
    </div>
  )
}

export default TextField
