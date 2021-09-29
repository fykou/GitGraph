// https://docs.gitlab.com/ee/api/repositories.html#contributors
export interface IContributor {
  name: string
  email: string
  commits: number
}

// https://docs.gitlab.com/ee/api/issues.html
export interface IIssue {
  state: string
  description: string
  assignees: []
  closed_at: string
  id: number
  title: string
}

// https://docs.gitlab.com/ee/api/commits.html
export interface ICommit {
  short_id: string
  title: string
  committer_name: string
  created_at: string
  message: string
  web_url: string
}
