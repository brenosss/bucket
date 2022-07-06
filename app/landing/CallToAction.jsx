import Image from "next/image"

import { Routes } from "blitz"

import { ButtonLink } from "app/core/components/Buttons"
import Container from "app/core/components/Container"
import backgroundImage from "public/images/background-call-to-action.jpg"

export function CallToAction() {
  return (
    <section id="get-started-today" className="relative overflow-hidden bg-blue-600 py-32">
      <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
        <Image src={backgroundImage} alt="" width={2347} height={1244} layout="fixed" unoptimized />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Get started today
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            It’s time to take control of your money. Start using our software so you can feel like
            you’re doing something productive.
          </p>
          <ButtonLink href={Routes.SignupPage()} color="white" className="mt-10">
            Get for free
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
