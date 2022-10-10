import { resolver, Ctx } from "blitz"
import fs from "fs"
import NuBankAPI from "integrations/nubank/api"

export default resolver.pipe(resolver.authorize(), async (input, ctx: Ctx) => {
  const privateData = await ctx.session.$getPrivateData()
  const nuApi = new NuBankAPI(privateData.nubankSession)
  let response = await nuApi.getEvents()
  console.log(response)
  if (!Object.keys(response).includes("error")) {
    let data = JSON.stringify(response)
    fs.writeFileSync("accounts.json", data)
  }
  return response
})
