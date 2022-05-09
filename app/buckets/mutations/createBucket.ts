import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateBucket = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateBucket), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const bucket = await db.bucket.create({ data: input })

  return bucket
})
