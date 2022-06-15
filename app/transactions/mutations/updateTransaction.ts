import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateTransaction = z.object({
  id: z.number(),
  description: z.string().min(3),
  date: z.date(),
  value: z.number(),
  bucketId: z.number(),
})
export default resolver.pipe(
  resolver.zod(UpdateTransaction),
  resolver.authorize(),
  async ({ id, ...data }) => {
    const transaction = await db.transaction.update({ where: { id }, data })

    return transaction
  }
)
