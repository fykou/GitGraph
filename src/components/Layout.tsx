import React, { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { Header } from './Header'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col min-h-screen max-w-screen-xl my-0 mx-auto ">
        <Header />
        <div className="flex-grow">{children}</div>
      </div>
      <Footer />
    </div>
  )
}