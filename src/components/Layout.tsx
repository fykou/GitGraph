import React from 'react'
import Navbar from './Navbar'

export default function Layout({ children }: { children: any }) {
  return (
    <div className="layout">
      <Navbar />

      <div className="content">{children}</div>

      <footer></footer>
    </div>
  )
}
