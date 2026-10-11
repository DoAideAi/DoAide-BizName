import { Link } from 'react-router-dom'

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="border-b border-[var(--da-border)] bg-[var(--da-bg)]">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <span className="text-xl font-bold" style={{ color: 'var(--da-teal)' }}>
            DoAide<span style={{ color: 'var(--da-text-muted)' }}> | </span><span style={{ color: 'var(--da-text)' }}>BizName</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/tools" className="text-sm hover:text-[var(--da-teal)]" style={{ color: 'var(--da-text-secondary)' }}>
            Tools
          </Link>
          <Link to="/pricing" className="text-sm hover:text-[var(--da-teal)]" style={{ color: 'var(--da-text-secondary)' }}>
            Pricing
          </Link>
          {user ? (
            <>
              <Link to="/saved" className="text-sm hover:text-[var(--da-teal)]" style={{ color: 'var(--da-text-secondary)' }}>
                Saved
              </Link>
              <button
                onClick={onLogout}
                className="text-sm px-3 py-1.5 rounded-lg border cursor-pointer"
                style={{
                  borderColor: 'var(--da-border)',
                  background: 'transparent',
                  color: 'var(--da-text-secondary)',
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm px-4 py-1.5 rounded-lg font-medium no-underline"
              style={{
                background: 'var(--da-teal)',
                color: 'var(--da-text-on-teal)',
              }}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
