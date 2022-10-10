import { Head, BlitzPage, useMutation } from "blitz"
import getAuthToken from "app/banks/mutations/nuBank/getAuthToken"
import validateQRCode from "app/banks/mutations/nuBank/validateQRCode"
import getEvents from "app/banks/mutations/nuBank/getEvents"
import { Button } from "app/core/components/Buttons"
import AuthenticatedLayout from "app/core/layouts/AuthenticatedLayout"
import { v4 as uuidv4 } from "uuid"
import { useState } from "react"
import QRCode from "react-qr-code"

export const BankIntegration = () => {
  return <div></div>
}

const BanksPage: BlitzPage = () => {
  const [nubankLoginMutation] = useMutation(getAuthToken)
  const [nubankQRCodeMutation] = useMutation(validateQRCode)
  const [nubankGetEvents] = useMutation(getEvents)
  const [qrCodeId, setQrCodeId] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <>
      <Head>
        <title>Banks</title>
      </Head>
      <p>{qrCodeId}</p>
      {qrCodeId === "" && (
        <div>
          <p>Integration with Nubank</p>
          <p>
            <Button
              onClick={async () => {
                const result = await nubankLoginMutation()
                setQrCodeId(uuidv4())
              }}
            >
              Run integration
            </Button>
          </p>
        </div>
      )}
      {!isAuthenticated && qrCodeId !== "" && (
        <div>
          <p>Please read the QR code</p>
          <div className="p-5">
            <QRCode value={qrCodeId} />
          </div>
          <Button
            onClick={async () => {
              const result = await nubankQRCodeMutation(qrCodeId)
              setIsAuthenticated(true)
            }}
          >
            Done
          </Button>
        </div>
      )}
      {!!isAuthenticated && (
        <div>
          <Button
            onClick={async () => {
              const result = await nubankGetEvents()
              console.log(result)
            }}
          >
            Get events
          </Button>
        </div>
      )}
    </>
  )
}

BanksPage.authenticate = true
BanksPage.getLayout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>

export default BanksPage
