import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateBucket = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateBucket),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const bucket = await db.bucket.update({ where: { id }, data })

    return bucket
  }
)
