/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react'
import './styles/global.css'
import Content from './content/Content'
import { InfoBox } from './components/Infobox'

export default function Main() {
  return (
    <div className="Main">
      <InfoBox>
        <Content />
      </InfoBox>
    </div>
  )
}
