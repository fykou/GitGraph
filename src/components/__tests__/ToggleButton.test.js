import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ToggleButton } from '../ToggleButton'

let mockLocalStorage = {}

// All credit goes to https://bholmes.dev/blog/mocking-browser-apis-fetch-localstorage-dates-the-easy-way-with-jest/
beforeAll(() => {
  global.Storage.prototype.setItem = jest.fn((key, value) => {
    // eslint-disable-next-line
    mockLocalStorage[key] = value
  })
  // eslint-disable-next-line
  global.Storage.prototype.getItem = jest.fn((key) => mockLocalStorage[key])
})

beforeEach(() => {
  // make sure the fridge starts out empty for each test
  mockLocalStorage = {}
})

afterAll(() => {
  // return our mocks to their original values
  // 🚨 THIS IS VERY IMPORTANT to avoid polluting future tests!
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  global.Storage.prototype.setItem.mockReset()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  global.Storage.prototype.getItem.mockReset()
})

it('Stores data to localStorage', () => {
  let bool = false
  function setBool(newBool) {
    // eslint-disable-next-line
    bool = newBool
  }
  render(<ToggleButton buttonId="testToggleButton" setFunc={setBool} />)
  const testToggle = screen.getByTestId('testToggle')
  expect(testToggle).toBeInTheDocument()
  // eslint-disable-next-line @typescript-eslint/unbound-method
  expect(global.Storage.prototype.getItem).toHaveBeenCalledTimes(1)
  // eslint-disable-next-line @typescript-eslint/unbound-method
  expect(global.Storage.prototype.setItem).toHaveBeenCalledTimes(1)

  const testSwitch = screen.getByTestId('testSwitch')

  userEvent.click(testSwitch)
  expect(testSwitch).toBeChecked()
  // eslint-disable-next-line @typescript-eslint/unbound-method
  expect(global.Storage.prototype.setItem).toHaveBeenCalledTimes(2)
  // eslint-disable-next-line @typescript-eslint/unbound-method
  expect(global.Storage.prototype.getItem).toHaveBeenCalledTimes(1)

  userEvent.click(testSwitch)
  // eslint-disable-next-line @typescript-eslint/unbound-method
  expect(global.Storage.prototype.setItem).toHaveBeenCalledTimes(3)
  // eslint-disable-next-line @typescript-eslint/unbound-method
  expect(global.Storage.prototype.getItem).toHaveBeenCalledTimes(1)
})
