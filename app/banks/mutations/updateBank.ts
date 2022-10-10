import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateBank = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateBank),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const bank = await db.bank.update({ where: { id }, data })

    return bank
  }
)
