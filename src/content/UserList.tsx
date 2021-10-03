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
//class that retrieves users in the repository and displays it in the infobox.
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

  public getTopContributors(n: number): Map<User, number> {
    const topNContributors = [...this.state.contributors]
      .filter(c => this.state.users.map(u => u.getName()).includes(c.getName())).
      sort((a, b) => {
        return b.getCommitNumber() - a.getCommitNumber()
      })
      .slice(0, n)

    console.warn(topNContributors)
    console.warn(this.state.users)
    const topNUsersAndCommits = new Map<User, number>();

    topNContributors.forEach(contributor => {
      this.state.users.forEach(user => {
        if (user.getName() === contributor.getName()) {
          topNUsersAndCommits.set(user, contributor.getCommitNumber())
        }
      })
    })

    return topNUsersAndCommits
  }

  render() {
    const { errorMessage } = this.state
    return (
      <div className={`text-center-main ${this.getClassName()}`}>
        <h1 className="text-center header py-10 font-bold my-6">Top 3 contributors</h1>
        {Array.from(this.getTopContributors(3)).map(([user, commits]: [User, number]) => (
          <UserCard user={user} key={user.getId()} commits={commits} />
        ))}
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>)
  }
}