import { lazy, Suspense, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import FeedbackWidget from './components/FeedbackWidget'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { getMe, logout } from './lib/api'
import Home from './pages/Home'

const IndustryGenerator = lazy(() => import('./pages/IndustryGenerator'))
const Login = lazy(() => import('./pages/Login'))
const NameDetail = lazy(() => import('./pages/NameDetail'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Saved = lazy(() => import('./pages/Saved'))
const BlogIndex = lazy(() => import('./pages/blog/BlogIndex'))
const BlogPost = lazy(() => import('./pages/blog/BlogPost'))
const ToolsIndex = lazy(() => import('./pages/tools/ToolsIndex'))
const TaglineGenerator = lazy(() => import('./pages/tools/TaglineGenerator'))
const BrandNameScorer = lazy(() => import('./pages/tools/BrandNameScorer'))
const DomainChecker = lazy(() => import('./pages/tools/DomainChecker'))
const TrademarkClassFinder = lazy(() => import('./pages/tools/TrademarkClassFinder'))
const TrademarkSearch = lazy(() => import('./pages/tools/TrademarkSearch'))
const Embed = lazy(() => import('./pages/Embed'))

function RouteFallback() {
  return (
    <div className="flex items-center justify-center py-24" role="status" aria-label="Loading page">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2"
        style={{ borderColor: 'var(--da-teal)', borderTopColor: 'transparent' }}
      />
    </div>
  )
}

export default function App() {
  const [user, setUser] = useState(null)

  const loadUser = () => {
    const token = localStorage.getItem('bizname_token')
    if (!token) { setUser(null); return }
    getMe().then(setUser).catch(() => {
      logout()
      setUser(null)
    })
  }

  useEffect(() => { loadUser() }, [])

  const handleLogout = () => {
    logout()
    setUser(null)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar user={user} onLogout={handleLogout} />
      <main style={{ flex: 1 }}>
        <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login onLogin={loadUser} />} />
          <Route path="/saved" element={<Saved user={user} />} />
          <Route path="/name/:name" element={<NameDetail />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/tools" element={<ToolsIndex />} />
          <Route path="/tools/tagline-generator" element={<TaglineGenerator />} />
          <Route path="/tools/brand-name-scorer" element={<BrandNameScorer />} />
          <Route path="/tools/domain-checker" element={<DomainChecker />} />
          <Route path="/tools/trademark-class-finder" element={<TrademarkClassFinder />} />
          <Route path="/tools/trademark-search" element={<TrademarkSearch />} />
          <Route path="/industry/:industry" element={<IndustryGenerator user={user} />} />
          <Route path="/embed" element={<Embed />} />
        </Routes>
        </Suspense>
      </main>
      <Footer />
      <FeedbackWidget />
    </div>
  )
}
