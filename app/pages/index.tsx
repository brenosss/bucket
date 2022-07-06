import { BlitzPage } from "blitz"

import Head from "next/head"

import { CallToAction } from "app/landing/CallToAction"
import { Footer } from "app/landing/Footer"
import { Header } from "app/landing/Header"
import { Hero } from "app/landing/Hero"
import { PrimaryFeatures } from "app/landing/PrimaryFeatures"
import { SecondaryFeatures } from "app/landing/SecondaryFeatures"

const Home: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>TaxPal - Accounting made simple for small businesses</title>
        <meta
          name="description"
          content="Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited."
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
      </main>
      <Footer />
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <>{page}</>

export default Home
