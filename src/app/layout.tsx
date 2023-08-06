import './globals.css'
import { Inter } from 'next/font/google'
import { Navbar } from '~/components/Navbar' 

export const metadata = {
    title: "Easy Free Resume Builder",
    description: "Free online resume building app by manski117"
}

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en" data-theme="business">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body>
        <div className="flex items-center flex-col p-8 space-y-10 min-h-screen">
          <Navbar />
          <main>{children}</main>
        </div>
        </body>
      </html>
    )
  }