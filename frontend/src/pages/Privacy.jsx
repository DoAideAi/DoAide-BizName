import { useEffect } from 'react'
import { setPageMeta } from '../lib/seo'

export default function Privacy() {
  useEffect(() => {
    setPageMeta({
      title: 'Privacy Policy | DoAide BizName',
      description: 'Privacy policy for DoAide BizName. Learn how we collect, use, and protect your data.',
      path: '/privacy',
    })
  }, [])

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--da-text)' }}>Privacy Policy</h1>
      <p className="text-sm mb-8" style={{ color: 'var(--da-text-muted)' }}>Last updated: October 2026</p>

      <div className="space-y-6 text-base" style={{ color: 'var(--da-text-secondary)' }}>
        <section>
          <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--da-text)' }}>Overview</h2>
          <p>
            DoAide BizName (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a product of DoAide. This policy explains
            what data we collect when you use bizname.doaide.com and how we handle it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--da-text)' }}>Information We Collect</h2>
          <p>
            <strong>Usage data:</strong> We use Umami, a privacy-focused analytics tool, to collect anonymous
            page-view statistics. Umami does not use cookies and does not collect personal information.
          </p>
          <p className="mt-2">
            <strong>Account data:</strong> If you create a Pro account, we store your email address and
            authentication tokens to provide the service. We do not share this with third parties.
          </p>
          <p className="mt-2">
            <strong>Generated names:</strong> Names you generate are processed by our AI model and are not stored
            unless you explicitly save them to your account.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--da-text)' }}>How We Use Your Data</h2>
          <p>We use your data only to provide and improve the BizName service. We do not sell your data to third parties, serve ads, or track you across other websites.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--da-text)' }}>Cookies</h2>
          <p>DoAide BizName does not use tracking cookies. We use localStorage only to persist your authentication session and saved preferences.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--da-text)' }}>Data Retention</h2>
          <p>Anonymous analytics data is retained for 12 months. Account data is retained as long as your account is active. You can request deletion by emailing us.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--da-text)' }}>Contact</h2>
          <p>For privacy-related questions, contact us at <a href="mailto:hello@doaide.com" style={{ color: 'var(--da-teal)' }}>hello@doaide.com</a>.</p>
        </section>
      </div>
    </div>
  )
}
