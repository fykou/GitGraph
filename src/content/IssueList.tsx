import React from "react";
import { APILoader } from '../APILoader'
import { IssueCard } from "../components/IssueCard";
import { Issue } from "../models";

interface IIssueListState {
  issues: Issue[]
  loader: APILoader
  errorMessage: string
}
export class IssueList extends React.Component<{ loader: APILoader }, IIssueListState> {

  constructor(props: { loader: APILoader }) {
    super(props)
    this.state = {
      issues: [],
      loader: props.loader,
      errorMessage: ''
    }
  }

  setIssues(issues: Issue[]) {
    this.setState({
      issues
    })
  }
  setError(errorMessage: string) {
    this.setState({
      errorMessage
    })
  }

  async componentDidMount() {
    const response = await this.state.loader.getIssues()

    if (!response) {
      return;
    }

    if (typeof response === "string") {
      this.setError(response)
    }

    else {
      this.setIssues(response)
    }

  }

  render() {
    const { issues, errorMessage } = this.state
    return (
      <div className="text-center-main">
        {issues.map((issue: Issue) => (
          <IssueCard issue={issue} />
        ))}
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>)
  }
}