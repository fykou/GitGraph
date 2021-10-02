import { Model } from './Model'

export interface ICommit {
  id: string
  title: string
  committerName: string
  createdAt: string
  message: string
  webUrl: string
}

export class Commit extends Model<ICommit> {
  public getId(): string {
    return this.props.id
  }

  public getTitle(): string {
    return this.props.title
  }

  public getCommitterName(): string {
    return this.props.committerName
  }

  public getCreatedAt(): string {
    return new Date(this.props.createdAt).toLocaleString()
  }

  public getCreatedAtDays(): string {
    return this.getCreatedAt().split(',')[0]
  }

  public getMessage(): string {
    return this.props.message
  }

  public getWebUrl(): string {
    return this.props.webUrl
  }
}
