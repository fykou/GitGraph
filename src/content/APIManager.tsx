import React, { useEffect, useState } from 'react'
import { IIssue, IContributor, ICommit } from './types'
import axios from '../http-common'
import { AxiosError } from 'axios'

export default function FetchData() {
  const Icontributor: IContributor[] = []
  const IIssue: IIssue[] = []
  const ICommit: ICommit[] = []

  const [contributors, setContributors] = useState(Icontributor)
  const [issues, setIssues] = useState(IIssue)
  const [commits, setCommits] = useState(ICommit)
  const [error, setError]: [string, (error: string) => void] = useState('')

  useEffect(() => {
    getContributors()
    getIssues()
    getCommits()
  }, [])

  const getContributors = () => {
    axios
      .get<IContributor[]>('repository/contributors')
      .then((response) => {
        setContributors(response.data)
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          if (error.response.status === 429) {
            setError(`Status: ${error.response.status} - Too many requests`)
          } else {
            setError(error.response.data)
          }
          console.error(error.response)
        } else {
          console.error('ERROR:', error.message)
          setError(error.message)
        }
      })
  }

  const getIssues = () => {
    axios
      .get<IIssue[]>('issues')
      .then((response) => {
        setIssues(response.data)
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          if (error.response.status === 429) {
            setError(`Status: ${error.response.status} - Too many requests`)
          } else {
            setError(error.response.data)
          }
          console.error(error.response)
        } else {
          console.error('ERROR:', error.message)
          setError(error.message)
        }
      })
  }

  const getCommits = () => {
    axios
      .get<ICommit[]>('repository/commits')
      .then((response) => {
        setCommits(response.data)
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          if (error.response.status === 429) {
            setError(`Status: ${error.response.status} - Too many requests`)
          } else {
            setError(error.response.data)
          }
          console.error(error.response)
        } else {
          console.error('ERROR:', error.message)
          setError(error.message)
        }
      })
  }

  return (
    <div className="w-3/6 m-auto text-center">
      <ul className="posts">
        {contributors.map((contributor) => (
          <li key={contributor.name}>
            <h3>{contributor.name}</h3>
            <p className="mt-1 mb-1">{contributor.email}</p>
            <p className="mt-1 mb-8">{contributor.commits}</p>
          </li>
        ))}

        {issues.map((issue) => (
          <li key={issue.id}>
            <h3>{issue.title}</h3>
            <p className="mt-1 mb-1">{issue.description}</p>
            <p className="mt-1 mb-8">{issue.closed_at}</p>
          </li>
        ))}

        {commits.map((commit) => (
          <li key={commit.short_id}>
            <h3>{commit.title}</h3>
            <p className="mt-1 mb-1">{commit.committer_name}</p>
            <p className="mt-1 mb-1">{commit.created_at}</p>
            <p className="mt-1 mb-8">{commit.message}</p>
          </li>
        ))}
      </ul>
      {error && <p className="error">{error}</p>}
    </div>
  )
}
