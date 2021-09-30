import { render, screen } from '@testing-library/react'
import { Navbar } from '../Navbar'

test('test', () => {
  render(<Navbar />)
  const navbar = screen.getByTestId('nav')

  expect(navbar).toBeInTheDocument()
})
