import { resolver, Ctx } from "blitz"

import NuBankAPI from "integrations/nubank/api"

export default resolver.pipe(resolver.authorize(), async (input, ctx: Ctx) => {
  const privateData = await ctx.session.$getPrivateData()
  const nuApi = new NuBankAPI(privateData.nubankSession)
  const response = await nuApi.validateQRCode({ qrCodeId: input })
  if (!Object.keys(response).includes("error")) {
    await ctx.session.$setPrivateData({
      nubankSession: response,
    })
  }

  return response
})
