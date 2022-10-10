import fetch from "node-fetch"

export const REQUEST_HEADERS_SAUCE = {
  "Content-Type": "application/json",
  "X-Correlation-Id": "WEB-APP.jO4x1",
  "User-Agent":
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36",
  Origin: "https://conta.nubank.com.br",
  Referer: "https://conta.nubank.com.br/",
}

const URLS = {
  token:
    "https://prod-s0-webapp-proxy.nubank.com.br/api/proxy/AJxL5LBUC2Tx4PB-W6VD1SEIOd2xp14EDQ.aHR0cHM6Ly9wcm9kLWdsb2JhbC1hdXRoLm51YmFuay5jb20uYnIvYXBpL3Rva2Vu",
  customers: "https://prod-customers.nubank.com.br/api/customers",
  qrCode:
    "https://prod-global-webapp-proxy.nubank.com.br/api/proxy/AJxL5LD1_tXTsdl5luooo69vWaMYPjMJww.aHR0cHM6Ly9wcm9kLWdsb2JhbC1hdXRoLm51YmFuay5jb20uYnIvYXBpL2xpZnQ",
}

const account_feed_query = `
{
    viewer {
        savingsAccount {
            id
            feed {
                id
                __typename
                title
                detail
                postDate
                ... on TransferInEvent {
                    amount
                    originAccount {
                        name
                    }
                }
                ... on TransferOutEvent {
                    amount
                    destinationAccount {
                        name
                    }
                }
                ... on TransferOutReversalEvent {
                    amount
                }
                ... on BillPaymentEvent {
                    amount
                }
                ... on DebitPurchaseEvent {
                    amount
                }
                ... on BarcodePaymentEvent {
                    amount
                }
                ... on DebitWithdrawalFeeEvent {
                    amount
                }
                ... on DebitWithdrawalEvent {
                    amount
                }
            }
        }
    }
}
`

export default class NuBankAPI {
  _signInData = {
    access_token: "",
    _links: {
      account_emergency: "",
      purchases: { href: "" },
      events: { href: "" },
    },
  }

  constructor(session = null) {
    if (session) {
      this._signInData = session
    }
  }

  isSignedInUser() {
    return this._signInData.access_token !== ""
  }

  async getLoginToken({ password, login }) {
    await fetch(URLS.token, {
      body: JSON.stringify({
        password,
        login,
        grant_type: "password",
        client_id: "other.conta",
        client_secret: "",
      }),
      method: "POST",
      headers: {
        ...REQUEST_HEADERS_SAUCE,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this._signInData = data
      })
  }

  validateQRCode({ qrCodeId }) {
    return fetch(URLS.qrCode, {
      body: JSON.stringify({
        qr_code_id: qrCodeId,
        type: "login-webapp",
      }),
      method: "POST",
      headers: {
        ...REQUEST_HEADERS_SAUCE,
        Authorization: `Bearer ${this.signInData.access_token}`,
      },
    }).then((res) => {
      return res.json()
    })
  }

  getEvents() {
    return fetch(this.links.events.href, {
      headers: {
        ...REQUEST_HEADERS_SAUCE,
        Authorization: `Bearer ${this.signInData.access_token}`,
      },
    }).then((res) => {
      return res.json()
    })
  }

  getPurchases() {
    return fetch(this.links.savings_account.href, {
      headers: {
        ...REQUEST_HEADERS_SAUCE,
        Authorization: `Bearer ${this.signInData.access_token}`,
      },
    }).then((res) => {
      return res.json()
    })
  }

  get signInData() {
    return this._signInData
  }
  get links() {
    return this._signInData._links
  }
}
