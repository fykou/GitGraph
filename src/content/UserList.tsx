import React from "react";
import { APILoader } from '../APILoader'
import { UserCard } from "../components";
import { User } from '../models'
import { ReactComponent } from "./ReactComponent";

interface IUserListState {
  users: User[]
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
      loader: props.loader,
      errorMessage: ''
    }
  }

  setUsers(users: User[]) {
    this.setState({
      users
    })
  }
  setError(errorMessage: string) {
    this.setState({
      errorMessage
    })
  }

  async componentDidMount() {
    const response = await this.state.loader.getUsers()

    if (!response) {
      return;
    }

    if (typeof response === "string") {
      this.setError(response)
    }

    else {
      this.setUsers(response.slice(0, 4))
    }

  }

  render() {
    const { users, errorMessage } = this.state
    return (
      <div className={`w-3/6 m-auto text-center flex justify-between flex-wrap ${this.getClassName()}`}>
        <h1 className=" font-bold md:px-40">Top contributors</h1>
        {users.map((user: User) => (
          <UserCard user={user} />
        ))}
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>)
  }
}