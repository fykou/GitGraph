import React from 'react'
import { APILoader } from '../data-loaders/APILoader'
import { IssueList } from './IssueList'
import { UserList } from './UserList'
import { ShowPrecentage } from '../components/ShowPrecentage'
import { ReactComponent } from './ReactComponent'

interface IInfoBoxState {
  loader: APILoader
  precentage: number
}

interface IInfoxBoxProps {
  loader: APILoader
  className?: string
}
export class InfoBox extends ReactComponent<IInfoxBoxProps, IInfoBoxState> {

  state: IInfoBoxState = {
    loader: this.props.loader,
    precentage: 0,
  }

  async componentDidMount() {
    const precentage = await this.state.loader.getPrecentageIssuesCompleted()

    this.setState({
      precentage: precentage ? parseFloat(precentage.toFixed(2)) : 0
    })
  }

  render() {
    const { loader, precentage } = this.state
    return (
      <div className="flex flex-col">
        <ShowPrecentage precentage={precentage} className="m-auto my-8" />
        <div className="infobox-flex-container flex flex-row justify-between">
          <UserList loader={loader} />
          <IssueList loader={loader} />
        </div>
      </div>
    )
  }
}
