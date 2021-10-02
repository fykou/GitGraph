import React from "react";
import { APILoader } from '../APILoader'
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
  showPrecentage?: boolean
}
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

  presentageIssuesCompleted() {
    return this.state.issues.filter((issue) => issue.getState() === 'closed').length / this.state.issues.length
  }

  render() {
    const { issues, errorMessage } = this.state
    const { showPrecentage } = this.props
    return (
      <>
        <div className={`text-center-main ${this.getClassName()}`}>
          <h1 className="text-center px-20 font-bold">Last 5 issues</h1>
          {issues.slice(0, 5).map((issue: Issue) => (
            <IssueCard issue={issue} />
          ))}
          {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
        {showPrecentage &&
          <div className={`text-center-main ${this.getClassName()}`}>
            <p className="md:text-4xl">Issues completed: {this.presentageIssuesCompleted() * 100}%</p>
          </div>
        }
      </>
    )
  }
}