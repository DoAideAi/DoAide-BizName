export const SITE_URL = 'https://bizname.doaide.com'

export function canonicalFor(pathname) {
  const clean = (pathname || '/').replace(/\/+$/, '')
  return clean ? SITE_URL + clean : SITE_URL + '/'
}

function upsertTag(tag, attr, key) {
  let el = document.head.querySelector(`${tag}[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement(tag)
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  return el
}

// Sets the page's own title, description, canonical and Open Graph / Twitter tags.
// scripts/prerender.mjs bakes the result into dist/<route>/index.html at build time.
export function setPageMeta({ title, description, path }) {
  if (title) {
    document.title = title
    upsertTag('meta', 'property', 'og:title').setAttribute('content', title)
    upsertTag('meta', 'name', 'twitter:title').setAttribute('content', title)
  }
  const url = canonicalFor(path || window.location.pathname)
  upsertTag('link', 'rel', 'canonical').setAttribute('href', url)
  upsertTag('meta', 'property', 'og:url').setAttribute('content', url)
  if (description) {
    upsertTag('meta', 'name', 'description').setAttribute('content', description)
    upsertTag('meta', 'property', 'og:description').setAttribute('content', description)
    upsertTag('meta', 'name', 'twitter:description').setAttribute('content', description)
  }
}
