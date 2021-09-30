/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react'
import './styles/global.css'
import { InfoBox } from './components/Infobox'
import FetchData from './content/APIManager'

export default function Main() {
  return (
    <div className="Main">
      <InfoBox>
        <FetchData />
      </InfoBox>
    </div>
  )
}
