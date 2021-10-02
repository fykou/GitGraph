import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function InfoBox({ children }: { children: any }) {
  return (
    <div id="infobox" className="infobox">
      {children}
    </div>
  )
}
