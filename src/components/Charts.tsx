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
import { APILoader } from '../APILoader'
import { Commit, Contributor } from '../models'
import { getRandomColor } from '../utils/getRandomColor'

interface IChartsState {
  loader: APILoader
  errorMessage: string
  commits: Commit[]
  contributors: Contributor[]
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

  async getCommits(): Promise<void> {
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

  getLineChartData() {
    const groupByDate: Record<string, Commit[]> = _.groupBy(
      this.state.commits,
      (commit: Commit) => {
        return commit.getCreatedAtDays()
      }
    )

    console.warn(groupByDate)

    const contributorNames = this.state.contributors.map(
      (contributor: Contributor) => {
        return contributor.getName()
      }
    )

    return Object.entries(groupByDate).map(
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

  render() {
    const { contributors } = this.state
    return (
      <div className="charts-container">
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
            <XAxis dataKey="date" label={{ value: 'Date', position: 'bottom' }} />
            <YAxis label={{ value: 'Number of commits', angle: -90, position: 'insideLeft', fill: 'white' }} />
            <Legend />
            <Tooltip />
            {contributors.map((contributor: Contributor) => (
              <Line
                type="monotone"
                stroke={getRandomColor()}
                activeDot={{ r: 8 }}
                dataKey={contributor.getName()}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    )

  }
}