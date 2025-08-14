document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('blog-cards');
  if (!container) return;

  try {
    const res = await fetch('posts/posts.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to load posts manifest');
    const data = await res.json();
    const posts = Array.isArray(data.posts) ? data.posts : [];

    if (!posts.length) {
      container.innerHTML = '<p class="muted">No blog posts yet. Check back soon!</p>';
      return;
    }

    const fragment = document.createDocumentFragment();

    posts
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
      .forEach(post => {
        const card = document.createElement('article');
        card.className = 'card blog-card';

        const actions = document.createElement('div');
        actions.className = 'card-actions';
        if (post.sourceUrl) {
          const mediumBtn = document.createElement('a');
          mediumBtn.className = 'btn primary small';
          mediumBtn.href = post.sourceUrl;
          mediumBtn.target = '_blank';
          mediumBtn.rel = 'noopener';
          mediumBtn.textContent = 'Read on Medium';
          actions.appendChild(mediumBtn);
        }

        const title = document.createElement('h3');
        title.textContent = post.title || 'Untitled';

        const meta = document.createElement('p');
        meta.className = 'meta muted';
        const dateStr = post.displayDate || post.date || '';
        meta.textContent = dateStr;

        const excerpt = document.createElement('p');
        excerpt.className = 'excerpt muted';
        excerpt.textContent = post.excerpt || '';

        const tagsWrap = document.createElement('div');
        tagsWrap.className = 'tags';
        (post.tags || []).forEach(t => {
          const tag = document.createElement('span');
          tag.className = 'tag';
          tag.textContent = t;
          tagsWrap.appendChild(tag);
        });

        // Place button block on top
        card.appendChild(actions);
        card.appendChild(title);
        card.appendChild(meta);
        card.appendChild(excerpt);
        if (tagsWrap.childNodes.length) card.appendChild(tagsWrap);

        fragment.appendChild(card);
      });

    container.innerHTML = '';
    container.appendChild(fragment);
  } catch (err) {
    console.error(err);
    container.innerHTML = '<p class="muted">Failed to load blogs. Please refresh.</p>';
  }
});
