export default function Footer() {
  return (
    <footer
      className="border-t mt-16 py-8"
      style={{ borderColor: 'var(--da-border)', background: 'var(--da-bg-alt)' }}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-bold" style={{ color: 'var(--da-teal)' }}>DoAide | BizName</h4>
              <span
                className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                style={{ background: 'var(--da-teal-bg)', color: 'var(--da-teal)' }}
              >
                A DoAide Product
              </span>
            </div>
            <p className="text-sm" style={{ color: 'var(--da-text-muted)' }}>
              AI-powered business name generator. Generate creative names, check domain availability, and build your brand.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-2" style={{ color: 'var(--da-text)' }}>DoAide Products</h4>
            <ul className="list-none p-0 m-0 space-y-1 text-sm">
              <li><a href="https://gst.doaide.com" target="_blank" rel="noreferrer" style={{ color: 'var(--da-text-secondary)' }}>DoAide | GST</a></li>
              <li><a href="https://contracts.doaide.com" target="_blank" rel="noreferrer" style={{ color: 'var(--da-text-secondary)' }}>DoAide | Contracts</a></li>
              <li><a href="https://doaide.com" target="_blank" rel="noreferrer" style={{ color: 'var(--da-teal)' }}>All Products</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2" style={{ color: 'var(--da-text)' }}>Legal</h4>
            <ul className="list-none p-0 m-0 space-y-1 text-sm">
              <li><a href="https://doaide.com/privacy" style={{ color: 'var(--da-text-secondary)' }}>Privacy Policy</a></li>
              <li><a href="https://doaide.com/terms" style={{ color: 'var(--da-text-secondary)' }}>Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-4 text-center text-xs" style={{ borderTop: '1px solid var(--da-border)', color: 'var(--da-text-muted)' }}>
          © {new Date().getFullYear()} DoAide. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
