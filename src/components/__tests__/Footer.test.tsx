import { render, screen } from '@testing-library/react'
import { Footer } from '../Footer'

test('test', () => {
    render(<Footer/>)
    const footer = screen.getByTestId('footer-1')
    expect(footer).toBeInTheDocument();
})