import { describe, expect, it } from 'vitest'
import { MARKDOWN_POSTS, extractFaq, parseFrontmatter } from './markdownPosts'
import { ARTICLES } from './articles'
import { routes } from '../../seo/routes'

describe('markdown blog posts', () => {
  it('loads every post with the frontmatter the page needs', () => {
    expect(MARKDOWN_POSTS.length).toBeGreaterThanOrEqual(3)
    for (const post of MARKDOWN_POSTS) {
      expect(post.slug).toMatch(/^[a-z0-9-]+$/)
      expect(post.title.length).toBeGreaterThan(10)
      expect(post.description.length).toBeGreaterThan(50)
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(post.html).toContain('<h2')
      expect(post.faq.length).toBeGreaterThan(0)
    }
  })

  it('merges posts into ARTICLES, which drives the index, prerender and sitemap', () => {
    const slugs = ARTICLES.map((a) => a.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const { slug } of MARKDOWN_POSTS) {
      expect(slugs).toContain(slug)
      expect(routes).toContain(`/blog/${slug}`)
    }
  })

  it('parses frontmatter values containing colons', () => {
    const { data, body } = parseFrontmatter('---\ntitle: A: B\nslug: a-b\n---\nHello')
    expect(data).toEqual({ title: 'A: B', slug: 'a-b' })
    expect(body).toBe('Hello')
  })

  it('moves the FAQ section out of the body', () => {
    const { faq, rest } = extractFaq('Intro\n\n## Frequently Asked Questions\n\n### Q1?\n\nA [link](/x).\n\n## After\n\nEnd')
    expect(faq).toEqual([{ q: 'Q1?', a: 'A link.' }])
    expect(rest).not.toContain('Q1?')
    expect(rest).toContain('## After')
  })
})
