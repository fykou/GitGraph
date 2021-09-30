import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function InfoBox({ children }: { children: any }) {
  return (
    <div className="infobox">
      {children}
    </div>
  )
}
