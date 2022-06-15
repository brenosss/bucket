import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateTransaction = z.object({
  description: z.string().min(3),
  date: z.date(),
  value: z.number(),
  bucketId: z.number(),
})

export default resolver.pipe(
  resolver.zod(CreateTransaction),
  resolver.authorize(),
  async (input) => {
    const transaction = await db.transaction.create({ data: input })

    return transaction
  }
)
