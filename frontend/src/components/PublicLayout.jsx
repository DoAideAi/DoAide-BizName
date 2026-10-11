import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function PublicLayout({ title, description, jsonLd, children }) {
  useEffect(() => {
    if (title) document.title = `${title} | DoAide BizName`
    return () => { document.title = 'DoAide | BizName' }
  }, [title])

  useEffect(() => {
    if (!description) return
    let meta = document.querySelector('meta[name="description"]')
    const original = meta?.getAttribute('content') || ''
    if (meta) meta.setAttribute('content', description)
    return () => { if (meta) meta.setAttribute('content', original) }
  }, [description])

  useEffect(() => {
    if (!jsonLd) return
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(jsonLd)
    document.head.appendChild(script)
    return () => { document.head.removeChild(script) }
  }, [jsonLd])

  return (
    <>
      <div className="mx-auto max-w-4xl px-4 py-8">
        {children}
      </div>

      <div className="border-t py-10 text-center" style={{ borderColor: 'var(--da-border)', background: 'var(--da-teal-bg)' }}>
        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--da-text)' }}>Need the perfect business name?</h3>
        <p className="text-sm mb-4" style={{ color: 'var(--da-text-muted)' }}>AI-powered business name generator with domain availability and branding insights.</p>
        <Link to="/" className="inline-block rounded-lg px-6 py-2.5 font-medium no-underline" style={{ background: 'var(--da-teal)', color: 'var(--da-text-on-teal)' }}>
          Try DoAide BizName Free
        </Link>
      </div>
    </>
  )
}
