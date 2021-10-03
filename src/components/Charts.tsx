import React from 'react'
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip
} from 'recharts'
import _ from 'lodash'
import { APILoader } from '../data-loaders'
import { Commit, Contributor } from '../models'
import { getRandomColor } from '../utils/getRandomColor'
import { ToggleButton } from './ToggleButton'
import { stringToUnixDate } from '../utils/stringToUnixDate'

interface IChartsState {
  [key: string]: unknown
  loader: APILoader
  errorMessage: string
  commits: Commit[]
  contributors: Contributor[]
  last5: boolean
}
export class Charts extends React.Component<
  { loader: APILoader },
  IChartsState
> {
  constructor(props: { loader: APILoader }) {
    super(props)
    this.state = {
      commits: [],
      contributors: [],
      loader: props.loader,
      errorMessage: '',
      last5: false
    }
  }

  setCommits(commits: Commit[]) {
    this.setState({ commits })
  }

  setContributors(contributors: Contributor[]) {
    this.setState({ contributors })
  }

  setError(errorMessage: string) {
    this.setState({ errorMessage })
  }

  componentDidMount() {
    void this.getCommits()
    void this.getContributors()
  }

  componentDidUpdate() {
    this.getLineChartData()
  }

  setLast5(bool: boolean) {
    this.setState({
      last5: bool
    })
  }
  /**
   * Function that retrieves the amount of commits per person during the last 5 days from today
   * @param days this value is 5 but can be changed to show the last 10 days for example
   * @returns the amount of commits per date
   */
  public getCommitFromLastDays(days: number) {
    const MS_IN_DAY = 24 * 60 * 60 * 1000

    const groupByDate: Record<string, Commit[]> = _.groupBy(
      this.state.commits,
      (commit: Commit) => {
        if (Date.now() - stringToUnixDate(commit.getCreatedAt()).getTime() <= days * MS_IN_DAY) {
          return commit.getCreatedAtDays()
        }
      }
    )
    return this.getCommitsPerDate(groupByDate);
  }


  private async getCommits(): Promise<void> {
    const response = await this.state.loader.getCommits()

    if (!response) {
      return
    }

    if (typeof response === 'string') {
      this.setError(response)
    } else {
      this.setCommits(response)
    }
  }

  async getContributors(): Promise<void> {
    const response = await this.state.loader.geContributors()

    if (!response) {
      return
    }

    if (typeof response === 'string') {
      this.setError(response)
    } else {
      this.setContributors(response)
    }
  }

  public getLineChartData() {
    const groupByDate: Record<string, Commit[]> = _.groupBy(
      this.state.commits,
      (commit: Commit) => {
        return commit.getCreatedAtDays()
      }
    )
    return this.getCommitsPerDate(groupByDate)
  }

  /**
   * Create list of objects with names and values, in the specific format for Recharts
   * @param groupByDate Object with dates and list of commits grouped to each date value
   * @returns A of objects specified to Recharts desired structure. 
   */
  private getCommitsPerDate(groupByDate: Record<string, Commit[]>): Record<string, string | number>[] {
    const contributorNames = this.state.contributors.map(
      (contributor: Contributor) => {
        return contributor.getName()
      }
    )

    return Object.entries(groupByDate).filter(([date, _commits]: [string, Commit[]]) => date !== "undefined").map(
      ([date, commits]: [string, Commit[]]) => {

        const lineChartValue: Record<string, number | string> = {
          "date": date
        }

        contributorNames.forEach((name: string) => {
          if (!(name in lineChartValue)) {
            lineChartValue[name] = 0
          }
        })

        commits.forEach((commit: Commit) => {
          (lineChartValue[commit.getCommitterName()] as number)++
        })
        return lineChartValue
      }
    )
  }

  private createLines() {
    const { contributors } = this.state
    return (
      contributors.map((contributor: Contributor) => (
        <Line
          type="monotone"
          stroke={getRandomColor()}
          activeDot={{ r: 8 }}
          dataKey={contributor.getName()}
          key={contributor.getEmail()}
        />
      ))
    )
  }

  render() {
    return (
      <div>
        <div className="charts-container">
          <div hidden={!this.state.last5}>
            <ResponsiveContainer width="90%" height={400}>
              <LineChart
                data={this.getCommitFromLastDays(5).reverse()}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}

              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis xAxisId="0" dataKey="date" label={{ value: 'Date', position: 'bottom' }} />
                <YAxis label={{ value: 'Number of commits', angle: -90, position: 'insideLeft', fill: 'white' }} />
                <Legend />
                <Tooltip />
                {this.createLines()}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div hidden={this.state.last5}>
            <ResponsiveContainer width="90%" height={400}>
              <LineChart
                data={this.getLineChartData().reverse()}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}

              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis xAxisId="0" dataKey="date" />
                <YAxis label={{ value: 'Number of commits', angle: -90, position: 'insideLeft', fill: 'white' }} />
                <Legend />
                <Tooltip />
                {this.createLines()}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <ToggleButton className="mt-4 ml-4" text='Toggle last 5 days' buttonId='chartToggle' setFunc={(bool) => this.setLast5(bool)} />
      </div>
    )
  }
}