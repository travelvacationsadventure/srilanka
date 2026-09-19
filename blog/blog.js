(() => {
  'use strict';
  const posts = (window.BLOG_POSTS || []).filter(p => !p.draft)
    .slice().sort((a, b) => b.date.localeCompare(a.date));
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
  const url = p => 'post.html?post=' + encodeURIComponent(p.slug);
  const image = p => /^(https?:\/\/|\.\.\/|\/)/.test(p.image || '') ? p.image : '../' + (p.image || 'images/coast.jpg');
  const date = p => {
    const d = new Date(p.date + 'T12:00:00Z');
    return Number.isNaN(d.getTime()) ? p.date : d.toLocaleDateString('en-GB', {day:'numeric', month:'short', year:'numeric', timeZone:'UTC'});
  };
  const minutes = p => Math.max(1, Math.ceil(p.content.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).length / 220));
  const card = p => `<article class="card"><a href="${escape(url(p))}"><div class="card-image"><img src="${escape(image(p))}" alt="${escape(p.imageAlt)}" loading="lazy" decoding="async" width="900" height="600"><span class="card-category">${escape(p.category || 'Travel')}</span></div><div class="card-content"><div class="card-meta"><time datetime="${escape(p.date)}">${escape(date(p))}</time><span>·</span><span>${minutes(p)} min read</span></div><h3>${escape(p.title)}</h3></div></a><p>${escape(p.description)}</p><a class="read" href="${escape(url(p))}">Read story <span aria-hidden="true">↗</span></a></article>`;
  const cards = document.getElementById('blog-cards');
  if (cards) {
    document.getElementById('story-count').textContent = `${posts.length} ${posts.length === 1 ? 'story' : 'stories'}`;
    cards.innerHTML = posts.length ? posts.map(card).join('') : '<p>New stories coming soon.</p>';
  }
  const target = document.getElementById('blog-post');
  if (!target) return;
  const slug = new URLSearchParams(location.search).get('post') || decodeURIComponent(location.pathname.split('/').pop()).replace(/\.html$/, '');
  const p = posts.find(p => p.slug === slug);
  if (!p) {
    document.title = 'Story not found | Travel Vacation Adventure';
    target.innerHTML = '<h1>Story not found</h1><p><a href="index.html">See all stories</a></p>';
    return;
  }
  document.title = p.title + ' | Travel Vacation Adventure';
  const meta = (key, value, attr = 'name') => {
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.append(el); }
    el.content = value;
  };
  const canonicalURL = new URL(url(p), location.href).href;
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); }
  canonical.href = canonicalURL;
  meta('description', p.description);
  for (const [key, value] of Object.entries({title:p.title, description:p.description, url:canonicalURL, image:new URL(image(p), location.href).href, type:'article'})) meta('og:' + key, value, 'property');
  document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());
  const structured = document.createElement('script'); structured.type = 'application/ld+json';
  structured.textContent = JSON.stringify({'@context':'https://schema.org','@type':'BlogPosting', headline:p.title, description:p.description, datePublished:p.date, image:new URL(image(p),location.href).href, mainEntityOfPage:canonicalURL, author:{'@type':'Organization',name:p.author || 'Travel Vacation Adventure'}});
  document.head.append(structured);
  target.innerHTML = `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="../index.html">Home</a><span>/</span><a href="index.html">Blog</a></nav><header class="article-heading"><p class="eyebrow">${escape(p.category || 'Travel')}</p><h1>${escape(p.title)}</h1><p class="dek">${escape(p.description)}</p><div class="card-meta"><span>By ${escape(p.author || 'Travel Vacation Adventure')}</span><span>·</span><time datetime="${escape(p.date)}">${escape(date(p))}</time><span>·</span><span>${minutes(p)} min read</span></div></header><img class="article-cover" src="${escape(image(p))}" alt="${escape(p.imageAlt)}" width="1600" height="700"><div class="article-layout"><aside class="toc" aria-label="In this article"><b>In this article</b><div id="post-toc"></div><a href="index.html">← All stories</a></aside><article class="article-body">${p.content}</article></div><section class="related"><h2>More from the journal</h2><div class="cards">${posts.filter(other => other.slug !== p.slug).slice(0,3).map(card).join('')}</div></section>`;
  const toc = document.getElementById('post-toc');
  target.querySelectorAll('.article-body h2').forEach((heading, i) => {
    if (!heading.id) heading.id = 'section-' + (i + 1);
    const link = document.createElement('a'); link.href = '#' + heading.id; link.textContent = heading.textContent; toc.append(link);
  });
  if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
})();
