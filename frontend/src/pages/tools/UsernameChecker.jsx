import { useState } from 'react'
import PublicLayout from '../../components/PublicLayout'
import ShareButtons from '../../components/ShareButtons'
import { checkUsernames } from '../../lib/api'
import { trackCalculation } from '../../lib/analytics'

const STATUS_META = {
  available: { label: 'Likely Available', bg: 'rgba(52,211,153,0.15)', color: 'var(--da-success)' },
  taken: { label: 'Taken', bg: 'rgba(248,113,113,0.15)', color: 'var(--da-error)' },
  unknown: { label: 'Unknown', bg: 'rgba(156,163,175,0.15)', color: 'var(--da-text-muted)' },
  manual: { label: 'Check on site', bg: 'rgba(96,165,250,0.15)', color: 'var(--da-info, #60a5fa)' },
  invalid: { label: 'Invalid handle', bg: 'rgba(251,191,36,0.15)', color: 'var(--da-warning, #fbbf24)' },
}

export default function UsernameChecker() {
  const [name, setName] = useState('')
  const [data, setData] = useState(null)
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState('')

  async function handleCheck(e) {
    e.preventDefault()
    const clean = name.trim()
    if (!clean) return
    setChecking(true)
    setError('')
    try {
      const result = await checkUsernames(clean)
      setData(result)
      trackCalculation('UsernameChecker', { handle: clean })
    } catch (err) {
      setError(err.message || 'Failed to check usernames. Please try again.')
    } finally {
      setChecking(false)
    }
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Social Media Username Checker',
    url: 'https://bizname.doaide.com/tools/username-checker',
    description: 'Check if your business name is available as a username on GitHub, YouTube, Pinterest, Instagram, X, LinkedIn and Facebook. Free, no sign-up required.',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  }

  return (
    <PublicLayout title="Free Social Media Username Checker" jsonLd={jsonLd}>
      <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--da-text)' }}>Social Media Username Checker</h1>
      <p className="mb-6" style={{ color: 'var(--da-text-muted)' }}>
        Check if your business name is free as a handle on GitHub, YouTube, Pinterest, Instagram, X (Twitter), LinkedIn and Facebook. Free, no login required.
      </p>

      <form onSubmit={handleCheck} className="flex gap-3 mb-6">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter your brand name (e.g., mybrand)"
          className="flex-1 rounded-lg px-4 py-2.5 text-sm border-0 outline-none focus:ring-2"
          style={{ background: 'var(--da-surface)', color: 'var(--da-text)', '--tw-ring-color': 'var(--da-teal-dim)' }}
        />
        <button
          type="submit"
          disabled={!name.trim() || checking}
          className="rounded-lg px-6 py-2.5 font-medium cursor-pointer border-0 disabled:opacity-40"
          style={{ background: 'var(--da-teal)', color: 'var(--da-text-on-teal)' }}
        >
          {checking ? 'Checking...' : 'Check Usernames'}
        </button>
      </form>

      {error && (
        <div className="rounded-lg px-4 py-3 mb-6 text-sm" style={{ background: 'rgba(248,113,113,0.1)', color: 'var(--da-error)', border: '1px solid rgba(248,113,113,0.2)' }}>
          {error}
        </div>
      )}

      {data && data.results.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--da-text-muted)' }}>
            Results for <span style={{ color: 'var(--da-text)' }}>@{data.handle}</span>
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {data.results.map(r => {
              const meta = STATUS_META[r.status] || STATUS_META.unknown
              return (
                <div key={r.platform} className="rounded-xl p-4 flex items-center justify-between gap-3" style={{ background: 'var(--da-surface)', border: '1px solid var(--da-border)' }}>
                  <div className="min-w-0">
                    <span className="font-semibold block" style={{ color: 'var(--da-text)' }}>{r.label}</span>
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-xs break-all" style={{ color: 'var(--da-text-muted)' }}>
                      {r.url}
                    </a>
                  </div>
                  <span className="rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap" style={{ background: meta.bg, color: meta.color }}>
                    {meta.label}
                  </span>
                </div>
              )
            })}
          </div>

          <p className="text-xs mt-4" style={{ color: 'var(--da-text-muted)' }}>
            GitHub and YouTube are checked live. Pinterest, Instagram, X, LinkedIn and Facebook block
            automated checks — use the profile link to verify in one click. &ldquo;Likely available&rdquo; means the
            profile page does not exist right now; platforms may still reserve or restrict handles.
          </p>
        </div>
      )}

      <div className="mt-10 rounded-xl p-5" style={{ background: 'var(--da-surface)', border: '1px solid var(--da-border)' }}>
        <h2 className="text-base font-semibold mb-2" style={{ color: 'var(--da-text)' }}>Why a matching username matters</h2>
        <p className="text-sm mb-2" style={{ color: 'var(--da-text-muted)' }}>
          A consistent handle across Instagram, X and LinkedIn makes your brand easier to find, protects you
          from impersonators, and keeps your marketing materials clean — one @name everywhere.
        </p>
        <p className="text-sm" style={{ color: 'var(--da-text-muted)' }}>
          Still deciding on a name? Try the <a href="/" style={{ color: 'var(--da-teal)' }}>AI business name generator</a> and
          the <a href="/tools/domain-checker" style={{ color: 'var(--da-teal)' }}>domain availability checker</a> first,
          then lock in the social handles.
        </p>
      </div>

      <div className="mt-8">
        <ShareButtons url="https://bizname.doaide.com/tools/username-checker" title="Free Social Media Username Checker by DoAide BizName" />
      </div>
    </PublicLayout>
  )
}
