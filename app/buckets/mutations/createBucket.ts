import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const CreateBucket = z.object({
  name: z.string(),
  description: z.string(),
  expectedValue: z.number(),
})

export default resolver.pipe(
  resolver.zod(CreateBucket),
  resolver.authorize(),
  async (input, ctx) => {
    console.log(input)
    const bucket = await db.bucket.create({
      data: { ...input, userId: ctx.session.userId, currentValue: 0 },
    })

    return bucket
  }
)
