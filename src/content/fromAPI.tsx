import React, { useEffect, useState } from 'react'
import { IIssue } from './types'
import axios from '../http-common'

export default function Content() {
  const defaultIssue: IIssue[] = []

  const [data, setData] = useState(defaultIssue)
  const [error, setError]: [string, (error: string) => void] = useState('')

  useEffect(() => {
    getIssues()
  })

  const getIssues = () => {
    axios
      .get<IIssue[]>(`issues`)
      .then((response) => {
        setData(response.data)
      })
      .catch((error: Error) => {
        setError(error.message)
      })
  }

  return (
    <div className="w-3/6 m-auto text-center">
      <ul className="posts">
        {data.map((issue) => (
          <li key={issue.id}>
            <h3>{issue.title}</h3>
            <p className="mt-1 mb-8">{issue.description}</p>
          </li>
        ))}
      </ul>
      {error && <p className="error">{error}</p>}
    </div>
  )
}
