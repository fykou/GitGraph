import { APILoader } from "../APILoader"
import React from "react"
import { IssueList } from "./IssueList"
import { UserList } from './UserList'
import { Charts } from "../components"

interface IContentState {
  loader: APILoader
}
export default class Content extends React.Component<Record<string, unknown>, IContentState> {

  state: IContentState = {
    loader: new APILoader()
  }

  render() {
    const { loader } = this.state;
    return (
      <>
        <Charts loader={loader} />
        <h2 className="text-center-main">Issues</h2>
        <IssueList loader={loader} />
        <h2 className="text-center-main">Users</h2>
        <UserList loader={loader} />
      </>
    )
  }
}
