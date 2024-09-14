import type { Metadata } from "next"
import Script from "next/script"

import "./globals.css"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script src="https://cdn.tailwindcss.com"></Script>
        <Script
          async
          src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
          integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        ></Script>

        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
