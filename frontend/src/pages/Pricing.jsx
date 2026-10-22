import { useEffect, useState } from 'react'
import { getPricing } from '../lib/api'
import { setPageMeta } from '../lib/seo'

export default function Pricing() {
  const [plans, setPlans] = useState([])

  useEffect(() => {
    setPageMeta({
      title: 'Pricing | DoAide BizName',
      description: 'BizName is free for 5 searches a day with domain and trademark checks. Pro is ₹299/month for unlimited searches and saved names.',
    })
    getPricing().then((data) => setPlans(data.plans)).catch(() => {})
  }, [])

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1
        className="text-4xl font-bold text-center mb-4"
        style={{ fontFamily: 'var(--da-font-display)', color: 'var(--da-text)' }}
      >
        Simple, Transparent <span style={{ color: 'var(--da-teal)' }}>Pricing</span>
      </h1>
      <p className="text-center mb-12" style={{ color: 'var(--da-text-secondary)' }}>
        Start free. Upgrade when you need more.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <div
            key={plan.name}
            className="rounded-xl p-6 flex flex-col"
            style={{
              background: 'var(--da-surface)',
              border: i === 1 ? '2px solid var(--da-teal)' : '1px solid var(--da-border)',
              boxShadow: i === 1 ? 'var(--da-shadow-teal)' : 'none',
            }}
          >
            {i === 1 && (
              <span
                className="text-xs font-bold uppercase tracking-wider mb-3 self-start px-2 py-0.5 rounded"
                style={{ background: 'var(--da-teal-bg)', color: 'var(--da-teal)' }}
              >
                Popular
              </span>
            )}
            <h3 className="text-xl font-bold" style={{ color: 'var(--da-text)' }}>{plan.name}</h3>
            <div className="my-4">
              <span className="text-3xl font-bold" style={{ color: 'var(--da-teal)' }}>
                {plan.price === 0 ? 'Free' : `₹${plan.price}`}
              </span>
              {plan.period && (
                <span className="text-sm" style={{ color: 'var(--da-text-muted)' }}>
                  /{plan.period}
                </span>
              )}
            </div>
            <ul className="list-none p-0 m-0 space-y-2 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm" style={{ color: 'var(--da-text-secondary)' }}>
                  <span style={{ color: 'var(--da-success)' }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <button
              className="mt-6 w-full py-2.5 rounded-lg font-medium cursor-pointer transition-colors text-sm"
              style={{
                background: i === 1 ? 'var(--da-teal)' : 'transparent',
                color: i === 1 ? 'var(--da-text-on-teal)' : 'var(--da-teal)',
                border: i === 1 ? 'none' : '1px solid var(--da-teal)',
              }}
            >
              {plan.price === 0 ? 'Get Started' : 'Subscribe'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
