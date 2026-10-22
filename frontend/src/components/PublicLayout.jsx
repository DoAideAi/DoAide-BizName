import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setPageMeta } from '../lib/seo'

export default function PublicLayout({ title, description, jsonLd, children }) {
  // Pages without an explicit description fall back to the one in their JSON-LD.
  const schemaDescription = (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).find((d) => d?.description)?.description
  const metaDescription = description || schemaDescription

  useEffect(() => {
    setPageMeta({ title: title && `${title} | DoAide BizName`, description: metaDescription })
  }, [title, metaDescription])

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
