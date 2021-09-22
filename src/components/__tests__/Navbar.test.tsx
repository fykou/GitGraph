import { render, screen } from '@testing-library/react'
import { Navbar } from '../Navbar'

test('test', () => {
    render(<Navbar/>)
    const navbar = screen.getByTestId('nav-1')
    
    expect(navbar).toBeInTheDocument();
})