import React from "react";
import { APILoader } from '../data-loaders'
import { IssueCard } from "../components/IssueCard";
import { Issue } from "../models";
import { ReactComponent } from "./ReactComponent";

interface IIssueListState {
  issues: Issue[]
  loader: APILoader
  errorMessage: string
}

interface IIssueListProps {
  loader: APILoader
  className?: string
}
//class that retrieves the last issues and displays it in the infobox
export class IssueList extends ReactComponent<IIssueListProps, IIssueListState> {

  constructor(props: IIssueListProps) {
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

  getIssues(): Issue[] {
    return this.state.issues
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
      <>
        <div className={`text-center-main ${this.getClassName()}`}>
          <h1 className="text-center header py-10 font-bold my-6">Last 5 issues</h1>
          {issues.slice(0, 5).map((issue: Issue) => (
            <IssueCard issue={issue} key={issue.getId()} />
          ))}
          {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
      </>
    )
  }
}