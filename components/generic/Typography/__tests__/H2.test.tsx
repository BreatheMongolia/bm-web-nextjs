import React from 'react'
import { render, screen } from '@testing-library/react'
import { H2 } from '../H2' // Adjust the path as needed

describe('H2 component', () => {
  test('renders title correctly', () => {
    render(<H2 title="Test Title" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })
})
