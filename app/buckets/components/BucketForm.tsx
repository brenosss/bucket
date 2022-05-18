import { Button, BlueButton } from "app/core/components/Buttons"
import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function BucketForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <LabeledTextField name="description" label="Description" placeholder="Description" />
      <LabeledTextField
        name="expectedValue"
        label="Expected value"
        placeholder="$00.00"
        type="number"
      />
      <div className="flex">
        <BlueButton type="submit" className="ml-auto">
          Create bucket
        </BlueButton>
      </div>
    </Form>
  )
}
