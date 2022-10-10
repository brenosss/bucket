import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetBank = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetBank), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const bank = await db.bank.findFirst({ where: { id } })

  if (!bank) throw new NotFoundError()

  return bank
})
