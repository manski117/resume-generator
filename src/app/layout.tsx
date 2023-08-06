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
        <div className="flex items-center justify-between flex-col space-y-10 min-h-screen">
          <Navbar />
          <main>{children}</main>
          <footer className="footer footer-center p-4 bg-base-200 w-[100vw] h-24 md:h-fit text-base-content">
            <div className='flex flex-col md:flex-row md:w-full md:justify-between md:h-fit' >
              <p className='md:p-4 text-sm md:text-base' >Web app by <a className='footer-link' href="https://github.com/manski117/resume-generator">manski117</a></p>
              <p className='md:p-4 text-sm md:text-base hidden md:block' >No data is collected. Information stays on <em>your device</em> only. </p>
              <p className='md:p-4 text-sm md:text-base' >Built using <a className='footer-link' href="https://create.t3.gg/">T3 stack</a></p>
            </div>
          </footer>
        </div>
        </body>
      </html>
    )
  }