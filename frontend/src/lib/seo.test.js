import { beforeEach, describe, expect, it } from 'vitest'
import { canonicalFor, setPageMeta } from './seo'

describe('setPageMeta', () => {
  beforeEach(() => { document.head.innerHTML = '<meta name="description" content="home">' })

  it('sets title, description, canonical and social tags for the current path', () => {
    window.history.replaceState(null, '', '/tools/domain-checker/')
    setPageMeta({ title: 'Domain Checker | DoAide BizName', description: 'Check domains.' })
    expect(document.title).toBe('Domain Checker | DoAide BizName')
    expect(document.querySelector('link[rel="canonical"]').href).toBe('https://bizname.doaide.com/tools/domain-checker')
    expect(document.querySelector('meta[property="og:url"]').content).toBe('https://bizname.doaide.com/tools/domain-checker')
    expect(document.querySelectorAll('meta[name="description"]')).toHaveLength(1)
    expect(document.querySelector('meta[name="description"]').content).toBe('Check domains.')
    expect(document.querySelector('meta[property="og:title"]').content).toBe('Domain Checker | DoAide BizName')
  })

  it('keeps the homepage canonical with a trailing slash', () => {
    expect(canonicalFor('/')).toBe('https://bizname.doaide.com/')
    expect(canonicalFor('')).toBe('https://bizname.doaide.com/')
  })
})
