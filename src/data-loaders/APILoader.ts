import {
  IGitLabIssue,
  IGitLabUser,
  IGitLabCommit,
  IGitLabContributor,
} from '../content/types'
import axios from '../http-common'
import { AxiosError, AxiosResponse } from 'axios'
import { User, Issue, Commit, Contributor } from '../models'
import { arrayOrUndefined } from '../utils/arrayOrUndefined'
import { WebStorageCache } from './WebStorageCache'

export class APILoader {
  readonly cahce: WebStorageCache

  constructor() {
    this.cahce = new WebStorageCache()
  }

  private async load<T>(parameter: string): Promise<AxiosResponse<T>> {
    return axios.get<T>(parameter)
  }

  private getCache<T>(key: string): AxiosResponse<T> | undefined {
    return this.cahce.getCache(key)
  }

  private async getFeed<T>(key: string): Promise<AxiosResponse<T>> {
    const sessionChace = this.getCache<T>(key)

    if (!sessionChace) {
      const response = await this.load<T>(key)
      this.cahce.setCahce(key, response)
      return response
    }
    return sessionChace
  }

  public async getIssues(): Promise<Array<Issue> | undefined | string> {
    try {
      const response = await this.getFeed<IGitLabIssue[]>('issues')

      return arrayOrUndefined(
        response.data.map((issue: IGitLabIssue) => {
          return new Issue({
            id: issue.id,
            title: issue.title,
            description: issue.description,
            assignees: this.getIssueAssignee(issue),
            state: issue.state,
          })
        })
      )
    } catch (e) {
      const error = e as AxiosError
      if (!error.response) {
        return undefined
      }
      return `Status: ${error.response.status}`
    }
  }

  private getIssueAssignee(issue: IGitLabIssue): User[] | undefined {
    if (!issue.assignees) {
      return undefined
    }
    return arrayOrUndefined(
      issue.assignees.map((user: IGitLabUser) => {
        return new User({
          id: user.id,
          name: user.name,
          avatarUrl: user.avatar_url,
        })
      })
    )
  }

  public async getCommits(): Promise<Array<Commit> | undefined | string> {
    try {
      const response = await this.getFeed<IGitLabCommit[]>(
        'repository/commits?per_page=100'
      )

      return arrayOrUndefined(
        response.data.map((commit: IGitLabCommit) => {
          return new Commit({
            id: commit.short_id,
            title: commit.title,
            committerName: commit.committer_name,
            createdAt: commit.created_at,
            message: commit.message,
            webUrl: commit.web_url,
          })
        })
      )
    } catch (e) {
      const error = e as AxiosError
      if (!error.response) {
        return undefined
      }
      return `Status: ${error.response.status}`
    }
  }

  public async getUsers(): Promise<Array<User> | undefined | string> {
    try {
      const response = await this.getFeed<IGitLabUser[]>('users')

      return arrayOrUndefined(
        response.data.map((user: IGitLabUser) => {
          return new User({
            id: user.id,
            name: user.name,
            avatarUrl: user.avatar_url,
          })
        })
      )
    } catch (e) {
      const error = e as AxiosError
      if (!error.response) {
        return undefined
      }
      return `Status: ${error.response.status}`
    }
  }

  public async getUserIssues(user: User): Promise<Array<Issue> | undefined> {
    // TODO add cache/state
    const response = await this.getIssues()
    if (!response) {
      return undefined
    }
    if (typeof response === 'string') {
      return undefined
    }

    arrayOrUndefined(
      response.filter((issue) => {
        const assigneeIds = issue.getAssigneeIds()
        if (assigneeIds) {
          return assigneeIds.includes(user.getId())
        }
        return false
      })
    )
  }

  public async geContributors(): Promise<
    Array<Contributor> | undefined | string
  > {
    try {
      const response = await this.getFeed<IGitLabContributor[]>(
        'repository/contributors'
      )

      return arrayOrUndefined(
        response.data.map((contributor: IGitLabContributor) => {
          return new Contributor({
            commits: contributor.commits,
            email: contributor.email,
            name: contributor.name,
          })
        })
      )
    } catch (e) {
      const error = e as AxiosError
      if (!error.response) {
        return undefined
      }
      return `Status: ${error.response.status}`
    }
  }

  public async getPrecentageIssuesCompleted(): Promise<number | undefined> {
    const issues = await this.getIssues()

    if (!issues || typeof issues === 'string') {
      return undefined
    }

    return (
      issues.filter((issue) => issue.getState() === 'closed').length /
      issues.length
    )
  }
}
