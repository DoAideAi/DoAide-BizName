import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import App from './App'

vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('no backend'))))

describe('App', () => {
  it('renders the navbar with DoAide BizName branding', () => {
    render(<MemoryRouter><App /></MemoryRouter>)
    expect(screen.getAllByText(/DoAide/).length).toBeGreaterThan(0)
  })

  it('renders the home page hero', () => {
    render(<MemoryRouter><App /></MemoryRouter>)
    expect(screen.getByText(/Find the Perfect Name/)).toBeInTheDocument()
  })

  it('renders pricing page (lazy-loaded)', async () => {
    render(<MemoryRouter initialEntries={['/pricing']}><App /></MemoryRouter>)
    expect(await screen.findByText(/Simple, Transparent/)).toBeInTheDocument()
  })

  it('renders login page (lazy-loaded)', async () => {
    render(<MemoryRouter initialEntries={['/login']}><App /></MemoryRouter>)
    expect(await screen.findByText(/Welcome Back/)).toBeInTheDocument()
  })

  it('home page has no fabricated testimonials', () => {
    render(<MemoryRouter><App /></MemoryRouter>)
    expect(screen.queryByText(/Trusted by/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Priya Sharma/)).not.toBeInTheDocument()
  })
})
