import React, { useEffect, useState } from 'react'
import { IIssue, IContributor, ICommit } from './types'
import axios from '../http-common'
import { AxiosError } from 'axios'
import _ from 'lodash'

export default function FetchData() {
  const Icontributor: IContributor[] = []
  const IIssue: IIssue[] = []
  const ICommit: ICommit[] = []

  const [contributors, setContributors] = useState(Icontributor)
  const [issues, setIssues] = useState(IIssue)
  const [commits, setCommits] = useState(ICommit)
  const [error, setError]: [string, (error: string) => void] = useState('')

  const top5Contributors = contributors
    .sort((a, b) => (a.commits < b.commits ? 1 : -1))
    .slice(0, 5)

  const last5ClosedIssues = issues
    .filter((issue) => issue.state === 'closed')
    .sort((a, b) => (Date.parse(b.closed_at) - Date.parse(a.closed_at)))
    .slice(0, 5)

  const presentageIssuesCompleted =
    issues.filter((issue) => issue.state === 'closed').length / issues.length

  const commitsPrPerson = _.groupBy(commits, 'committer_name')

  //TODO: Total commits

  //TODO: Burndown issue chart?

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
    <div className="m-auto text-center">
      <p>Issues completed: {presentageIssuesCompleted * 100}%</p>
      <div className="grid grid-cols-3 gap-4 p-1">
      <ul className="posts">
        <h1 className="text-4xl">Top 5 Contributors</h1>
        {top5Contributors.map((contributor) => (
          <li key={contributor.name}>
            <h3>{contributor.name}</h3>
            <p className="mt-1 mb-1">{contributor.email}</p>
            <p className="mt-1 mb-8">
              Number of commits: {contributor.commits}
            </p>
          </li>
        ))}
        </ul>

        <ul className="posts">
        <h1 className="text-4xl">Last 5 Closed Issues</h1>
        {last5ClosedIssues.map((issue) => (
          <li key={issue.id}>
            <h3>{issue.title}</h3>
            <p className="mt-1 mb-1">{issue.description}</p>
            <p className="mt-1 mb-8">Closed at: {issue.closed_at}</p>
          </li>
        ))}
        </ul>

        <ul className="posts">
        <h1 className="text-4xl">Commits Pr Person</h1>
        {Object.entries(commitsPrPerson).map(([key, value]) => {
          return (
            <li className="mt-1 mb-8" key={key}>
              <h3 className="mt-1 mb-1 text-2xl">{key}</h3>

              <ul>
                {value.map((commit) => {
                  return (
                    <li key={commit.short_id}>
                      <p className="mt-1 mb-1">{commit.title}</p>
                      <p className="mt-1 mb-4 text-sm">
                        Created at: {commit.created_at}
                      </p>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>
      {error && <p className="error">{error}</p>}
      </div>
    </div>
  )
}
