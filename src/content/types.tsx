export interface IGitLabIssue {
  id: number
  title: string
  description: string
  state: string;
  milestone?: IGitLabMilestone;
  labels: string[]
  closed_by?: IGitLabUser;
  assignees?: IGitLabUser[];
}

export interface IGitLabUser {
  id: number;
  name: string;
  username: string;
  state: string;
  avatar_url: string;
  web_url: string;
}

export interface IGitLabCommit {
  id: string;
  tag: string;
  description?: string;
}

export interface IGitLabMilestone {
  id: number;
  project_id: number;
  title: string;
  state: string;
}

export interface IContributor {
  name: string
  email: string
  commits: number
}

// https://docs.gitlab.com/ee/api/issues.html
export interface IIssue {
  id: number
  title: string
  state: string
  description: string
  assignees: []
  closed_at: string
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