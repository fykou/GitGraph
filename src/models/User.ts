import { Model } from './Model'

export interface IUser {
  id: number
  name: string
  avatarUrl: string
}

export class User extends Model<IUser> {
  public getId(): number {
    return this.props.id
  }

  public getName(): string {
    return this.props.name
  }

  public getAvatarUrl(): string {
    return this.props.avatarUrl
  }
}
