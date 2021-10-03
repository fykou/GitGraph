import React from 'react'
import { render } from 'react-dom'
import './styles/global.css'
import './styles/cards.css'
import { Main } from './content'
import { Layout } from './components'
import 'font-awesome/css/font-awesome.min.css'

render(
  <Layout>
    <Main />
  </Layout>,
  document.getElementById('root') as HTMLElement
)
