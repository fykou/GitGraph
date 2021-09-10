import React from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { Header } from './Header'

import '../styles/global.css'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Layout({ children }: { children: any }) {
  return (
    <div className="flex flex-col min-h-screen max-w-screen-xl my-0 mx-auto ">
      <Navbar />
      <Header />

      <div className="flex-grow">{children}</div>

      <Footer />
    </div>
  )
}
