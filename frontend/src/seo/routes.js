// Every indexable URL. scripts/prerender.mjs renders each one to dist/<route>/index.html
// and writes dist/sitemap.xml from this list, so the sitemap can't drift from the app.
// /embed, /login, /saved and /name/:name are deliberately absent: they get the
// noindex app shell.
import { ARTICLES } from '../pages/blog/articles'
import { INDUSTRIES } from '../pages/IndustryGenerator'

export const routes = [
  '/',
  '/pricing',
  '/tools',
  '/tools/domain-checker',
  '/tools/trademark-search',
  '/tools/trademark-class-finder',
  '/tools/brand-name-scorer',
  '/tools/tagline-generator',
  ...Object.keys(INDUSTRIES).map((key) => `/industry/${key}`),
  '/blog',
  ...ARTICLES.map((a) => `/blog/${a.slug}`),
]
