import React from "react";
import { APILoader } from '../APILoader'
import { UserCard } from "../components";
import { User } from '../models'

interface IIssueListState {
  users: User[]
  loader: APILoader
  errorMessage: string
}
export default class IssueList extends React.Component<{ loader: APILoader }, IIssueListState> {

  constructor(props: { loader: APILoader }) {
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
      this.setUsers(response)
    }

  }

  render() {
    const { users, errorMessage } = this.state
    return (
      <div className="w-3/6 m-auto text-center flex justify-between flex-wrap">
        {users.map((user: User) => (
          <UserCard user={user} />
        ))}
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>)
  }
}