import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetBucket = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetBucket), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const bucket = await db.bucket.findFirst({ where: { id } })

  if (!bucket) throw new NotFoundError()

  return bucket
})
