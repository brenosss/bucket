import { resolver, Ctx } from "blitz"

import NuBankAPI from "integrations/nubank/api"

export default resolver.pipe(resolver.authorize(), async (input, ctx: Ctx) => {
  const nuApi = new NuBankAPI()
  await nuApi.getLoginToken({ login: "", password: "" })
  await ctx.session.$setPrivateData({
    nubankSession: nuApi.signInData,
  })
  return nuApi.isSignedInUser()
})
