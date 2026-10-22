import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'

vi.mock('../../lib/api', () => ({
  checkUsernames: vi.fn(),
}))

import { checkUsernames } from '../../lib/api'
import UsernameChecker from './UsernameChecker'

describe('UsernameChecker', () => {
  it('renders the heading and form', () => {
    render(
      <MemoryRouter>
        <UsernameChecker />
      </MemoryRouter>
    )
    expect(screen.getByText('Social Media Username Checker')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/mybrand/)).toBeInTheDocument()
    expect(screen.getByText('Check Usernames')).toBeInTheDocument()
  })

  it('shows per-platform results after a check', async () => {
    checkUsernames.mockResolvedValue({
      handle: 'mybrand',
      results: [
        { platform: 'github', label: 'GitHub', handle: 'mybrand', url: 'https://github.com/mybrand', status: 'available' },
        { platform: 'x', label: 'X (Twitter)', handle: 'mybrand', url: 'https://x.com/mybrand', status: 'manual' },
      ],
    })
    render(
      <MemoryRouter>
        <UsernameChecker />
      </MemoryRouter>
    )
    await userEvent.type(screen.getByPlaceholderText(/mybrand/), 'MyBrand')
    await userEvent.click(screen.getByText('Check Usernames'))
    await waitFor(() => {
      expect(screen.getByText('GitHub')).toBeInTheDocument()
    })
    expect(screen.getByText('Likely Available')).toBeInTheDocument()
    expect(screen.getByText('Check on site')).toBeInTheDocument()
    expect(checkUsernames).toHaveBeenCalledWith('MyBrand')
  })
})
