import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteBucket = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteBucket), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const bucket = await db.bucket.deleteMany({ where: { id } })

  return bucket
})
