import { Suspense, useState } from "react"
import { BlueButton } from "app/core/components/Buttons"
import MoneyField from "app/core/components/Forms/MoneyField"
import ComboboxField from "app/core/components/Forms/ComboboxField"
import DatePickerField from "app/core/components/Forms/DatePickerField"
import TextField from "app/core/components/Forms/TextField"
export { FORM_ERROR } from "app/core/components/Form"
import getBuckets from "app/buckets/queries/getBuckets"
import { usePaginatedQuery } from "blitz"
import { InputValue } from "app/core/components/Forms/Input"

type TransactionFields = {
  description?: string
  bucketId?: string
  date?: Date
  value?: number
}

type TransactionFieldsErrors = {
  description: string
  bucketId: string
  date: string
  value: string
}

function BucketsComboboxField({ onChange, error }) {
  const [{ buckets }] = usePaginatedQuery(getBuckets, {
    orderBy: { id: "asc" },
  })
  return (
    <ComboboxField
      name="bucketId"
      label="Bucket"
      options={buckets}
      onChange={onChange}
      error={error}
    />
  )
}

export function TransactionForm({ submitText, onSubmit }) {
  async function handleSubmit(event) {
    event.stopPropagation()
    event.preventDefault()
    try {
      await onSubmit(fields)
    } catch (error) {
      const errors = JSON.parse(error.message)
      const fieldsErrors = errors.reduce((a, v) => ({ ...a, [v.path[0]]: v.message }), {})
      setFieldsErrors(fieldsErrors)
    }
  }
  function setField(name: string, value: InputValue): void {
    setFields({ ...fields, [name]: value })
    setFieldsErrors({ ...fieldsErrors, [name]: "" })
  }
  const [fields, setFields] = useState<TransactionFields>({})
  const [fieldsErrors, setFieldsErrors] = useState<TransactionFieldsErrors>({
    description: "",
    bucketId: "",
    date: "",
    value: "",
  })

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="description"
        label="Description"
        placeholder="Description"
        onChange={setField}
        error={fieldsErrors.description}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <BucketsComboboxField onChange={setField} error={fieldsErrors.bucketId} />
      </Suspense>
      <DatePickerField name="date" label="Date" onChange={setField} error={fieldsErrors.date} />
      <MoneyField label="Value" name="value" onChange={setField} error={fieldsErrors.value} />
      <div className="flex">
        <BlueButton type="submit" className="ml-auto mt-2">
          Create transaction
        </BlueButton>
      </div>
    </form>
  )
}
