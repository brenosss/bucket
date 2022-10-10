import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteBank = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteBank), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const bank = await db.bank.deleteMany({ where: { id } })

  return bank
})
