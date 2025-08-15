document.addEventListener('DOMContentLoaded', async () => {
  try { console.log('blogs.js version: more-chip-1'); } catch (e) {}
  const container = document.getElementById('blog-cards');
  if (!container) return;

  try {
    const res = await fetch('posts/posts.json?v=more-chip-1', { cache: 'no-store' });
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
        if (post.repoUrl) {
          const repoBtn = document.createElement('a');
          repoBtn.className = 'btn primary small';
          repoBtn.href = post.repoUrl;
          repoBtn.target = '_blank';
          repoBtn.rel = 'noopener';
          repoBtn.textContent = 'GitHub Repository';
          actions.appendChild(repoBtn);
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

    // Setup "More" callout chip on blogs scroller
    const scroller = container.closest('.blogs-scroll');
    if (scroller) {
      const ensureChip = () => {
        const hasOverflow = scroller.scrollWidth > (scroller.clientWidth + 1);
        const alreadyScrolled = scroller.scrollLeft > 0;
        let chip = scroller.querySelector('.more-chip');
        if (!hasOverflow || alreadyScrolled) {
          if (chip) chip.remove();
          return;
        }
        if (!chip) {
          chip = document.createElement('button');
          chip.type = 'button';
          chip.className = 'more-chip';
          chip.setAttribute('aria-label', 'Scroll to see more');
          chip.textContent = 'More';
          chip.addEventListener('click', () => {
            try { scroller.scrollBy({ left: Math.floor(scroller.clientWidth * 0.9), behavior: 'smooth' }); } catch (e) { scroller.scrollLeft += Math.floor(scroller.clientWidth * 0.9); }
            // Hide immediately on user action
            chip.remove();
          });
          scroller.appendChild(chip);
        }
      };

      const onScrollOnce = () => {
        const chip = scroller.querySelector('.more-chip');
        if (scroller.scrollLeft > 0 && chip) chip.remove();
      };

      scroller.addEventListener('scroll', onScrollOnce, { passive: true });
      window.addEventListener('resize', ensureChip);
      // Initial evaluation
      ensureChip();
      // In case fonts/layout cause late overflow, re-check shortly after
      setTimeout(ensureChip, 200);
    }
  } catch (err) {
    console.error(err);
    container.innerHTML = '<p class="muted">Failed to load blogs. Please refresh.</p>';
  }
});
