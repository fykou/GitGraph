import React from "react";
import { APILoader } from '../data-loaders'
import { UserCard } from "../components";
import { User, Contributor } from '../models'
import { ReactComponent } from "./ReactComponent";

interface IUserListState {
  users: User[]
  contributors: Contributor[]
  loader: APILoader
  errorMessage: string
}

interface IUserListProps {
  loader: APILoader
  className?: string
}
export class UserList extends ReactComponent<IUserListProps, IUserListState> {

  constructor(props: IUserListProps) {
    super(props)
    this.state = {
      users: [],
      contributors: [],
      loader: props.loader,
      errorMessage: ''
    }
  }

  setUsers(users: User[]) {
    this.setState({
      users
    })
  }

  setContributors(contributors: Contributor[]) {
    this.setState({
      contributors
    })
  }

  setError(errorMessage: string) {
    this.setState({
      errorMessage
    })
  }

  componentDidMount() {
    void this.loadUsers()
    void this.loadContributors()
    this.getTopContributors(3)
  }

  componentDidUpdate() {
    this.getTopContributors(3)
  }

  async loadUsers() {
    const response = await this.state.loader.getUsers()

    if (!response) {
      return;
    }

    if (typeof response === "string") {
      this.setError(response)
    }

    else {
      this.setUsers(response)
    }
  }

  async loadContributors() {
    const response = await this.state.loader.geContributors()

    if (!response) {
      return;
    }

    if (typeof response === "string") {
      this.setError(response)
    }

    else {
      this.setContributors(response)
    }
  }

  public getTopContributors(n: number): User[] {
    const topNContributors = [...this.state.contributors]
      .filter(c => this.state.users.map(u => u.getName()).includes(c.getName())).
      sort((a, b) => {
        return b.getCommitNumber() - a.getCommitNumber()
      })
      .slice(0, n)

    console.warn(topNContributors)
    console.warn(this.state.users)
    const topNUsers: User[] = []

    topNContributors.forEach(contributor => {
      this.state.users.forEach(user => {
        if (user.getName() === contributor.getName()) {
          console.warn(user)
          topNUsers.push(user)
        }
      })
    })

    return topNUsers
  }

  render() {
    const { errorMessage } = this.state
    return (
      <div className={`text-center-main ${this.getClassName()}`}>
        <h1 className="text-center header px-20 font-bold">Top 3 contributors</h1>
        {this.getTopContributors(3).map((user: User) => (
          <UserCard user={user} key={user.getId()} />
        ))}
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>)
  }
}