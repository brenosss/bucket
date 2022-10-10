import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateBank = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateBank), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const bank = await db.bank.create({ data: input })

  return bank
})
