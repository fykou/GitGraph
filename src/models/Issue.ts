import { Model } from './Model'
import { User } from './User'
export interface IIssue {
  id: number
  title: string
  description: string
  assignees: User[] | undefined
  state: string
}
export class Issue extends Model<IIssue> {
  public getId(): number {
    return this.props.id
  }

  public getTitle(): string {
    return this.props.title
  }

  public getDescription(): string {
    return this.props.description
  }

  public getAssigneeIds(): number[] | undefined {
    if (!this.props.assignees) {
      return undefined
    }
    return this.props.assignees.map((user) => user.getId())
  }

  public getState(): string {
    return this.props.state
  }
}
