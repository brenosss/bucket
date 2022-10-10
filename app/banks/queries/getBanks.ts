import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetBanksInput
  extends Pick<Prisma.BankFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetBanksInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: banks,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.bank.count({ where }),
      query: (paginateArgs) => db.bank.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      banks,
      nextPage,
      hasMore,
      count,
    }
  }
)
