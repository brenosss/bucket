import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetBucketsInput
  extends Pick<Prisma.BucketFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetBucketsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: buckets,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.bucket.count({ where }),
      query: (paginateArgs) => db.bucket.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      buckets,
      nextPage,
      hasMore,
      count,
    }
  }
)
