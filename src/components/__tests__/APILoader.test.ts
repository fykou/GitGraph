import { APILoader } from '../../data-loaders'

const loader = new APILoader()
const TIMEOUT = 10000

async function testClosedIssues() {
  const response = await loader.getIssues()
  if (typeof response === 'string') {
    throw Error(response)
  }

  if (response) {
    const closedIssues = response.filter(
      (issue) => issue.getState() === 'closed'
    )
    expect(closedIssues).toMatchSnapshot()
  }
}

describe('APILoader test', () => {
  it('Test closed issues', () => testClosedIssues(), TIMEOUT)
})
