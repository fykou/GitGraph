import { render, screen } from '@testing-library/react'
import { Navbar } from '../Navbar'

test('Render navbar', () => {
  render(<Navbar />)
  const navbar = screen.getByTestId('nav')

  expect(navbar).toBeInTheDocument()
})
