(function () {
  'use strict';
  if (!window.fetch || !window.initializeSitePage || !window.refreshPageGuide) return;
  const siteRoot = new URL('../../', document.currentScript.src);
  const names = ['index', 'career', 'research', 'education', 'links', 'album', 'access', 'funding', 'oitachi'];
  const supported = new Set(names.map(name => new URL(name + '.html', siteRoot).pathname));
  names.filter(name => name !== 'oitachi').forEach(name => supported.add(new URL('en/' + name + '.html', siteRoot).pathname));
  supported.add(siteRoot.pathname);
  supported.add(new URL('en/', siteRoot).pathname);
  let displayedURL = new URL(location.href), request = null, revision = 0, mathLoading = null;
  history.replaceState({...history.state, guidePage: true}, '', location.href);
  history.scrollRestoration = 'manual';

  function saveScroll() {
    history.replaceState({...history.state, guideScroll: [scrollX, scrollY]}, '', location.href);
  }
  function restorePosition(url, position) {
    if (position) { window.scrollTo(...position); return; }
    let id;
    try { id = decodeURIComponent(url.hash.slice(1)); } catch (_) { id = ''; }
    const anchor = id && document.getElementById(id);
    if (anchor) anchor.scrollIntoView(); else window.scrollTo(0, 0);
  }
  async function typeset(main, needsMath) {
    if (!needsMath) return;
    try {
      if (!mathLoading) {
        const existing = document.querySelector('script[src*="mathjax@3"]');
        if (!existing) {
          window.MathJax = {
            loader: {load: ['[tex]/boldsymbol']},
            tex: {inlineMath: [['\\(', '\\)'], ['$', '$']], packages: {'[+]': ['boldsymbol']}, macros: {bm: ['\\boldsymbol{#1}', 1]}},
            svg: {fontCache: 'global'}
          };
          mathLoading = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
            script.onload = resolve; script.onerror = reject; document.head.append(script);
          });
        } else if (!window.MathJax?.startup?.promise) {
          mathLoading = new Promise((resolve, reject) => {
            existing.addEventListener('load', resolve, {once: true});
            existing.addEventListener('error', reject, {once: true});
          });
        } else mathLoading = Promise.resolve();
      }
      await mathLoading;
      await window.MathJax.startup.promise;
      if (main.isConnected) await window.MathJax.typesetPromise([main]);
    } catch (_) { /* 通信失敗時も本文とページ移動を維持する． */ }
  }
  async function navigate(url, options = {}) {
    const ticket = ++revision;
    if (request) request.abort();
    request = new AbortController();
    document.documentElement.setAttribute('aria-busy', 'true');
    try {
      const response = await fetch(url.href, {signal: request.signal});
      if (!response.ok || response.redirected) throw new Error('Page unavailable');
      const next = new DOMParser().parseFromString(await response.text(), 'text/html');
      const parts = ['.site-header', 'main', '.site-footer'];
      if (parts.some(selector => !next.querySelector(selector)) || !next.querySelector('script[src*="/guide.js"]')) throw new Error('Unsupported page');
      if (ticket !== revision) return;
      if (!options.pop) {
        saveScroll();
        history.pushState({guidePage: true}, '', url.href);
      }
      const oldMain = document.querySelector('main');
      oldMain.querySelectorAll('.lesson-video').forEach(video => video.pause());
      window.MathJax?.typesetClear?.([oldMain]);
      // 人物映像・音声・操作ボタンは元の要素を使い続ける．
      const figure = document.querySelector('.guide-film');
      if (figure) document.body.append(figure);
      parts.forEach(selector => document.querySelector(selector).replaceWith(document.importNode(next.querySelector(selector), true)));
      document.title = next.title;
      document.documentElement.lang = next.documentElement.lang;
      document.documentElement.dataset.root = next.documentElement.dataset.root || '';
      document.body.className = next.body.className;
      const description = document.querySelector('meta[name="description"]');
      if (description) description.content = next.querySelector('meta[name="description"]')?.content || '';
      displayedURL = new URL(url.href);
      window.initializeSitePage();
      window.refreshPageGuide();
      const main = document.querySelector('main');
      main.tabIndex = -1;
      main.focus({preventScroll: true});
      restorePosition(url, options.position);
      const needsMath = !!next.querySelector('script[src*="mathjax@3"]');
      typeset(main, needsMath);
    } catch (error) {
      if (ticket !== revision || error.name === 'AbortError') return;
      // 取得できない場合は通常のページ遷移に戻す．
      if (options.pop) location.reload(); else location.assign(url.href);
    } finally {
      if (ticket === revision) document.documentElement.removeAttribute('aria-busy');
    }
  }
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const url = new URL(link.href);
    if (url.origin !== location.origin || !supported.has(url.pathname)) return;
    if (url.pathname === displayedURL.pathname && url.search === displayedURL.search && url.hash) return;
    event.preventDefault();
    navigate(url);
  });
  window.addEventListener('popstate', event => {
    const url = new URL(location.href);
    if (url.pathname === displayedURL.pathname && url.search === displayedURL.search) {
      ++revision; request?.abort(); document.documentElement.removeAttribute('aria-busy');
      displayedURL = url; restorePosition(url, event.state?.guideScroll); return;
    }
    navigate(url, {pop: true, position: event.state?.guideScroll});
  });
  // 戻る際の位置を記録．fetch待機中のURLを誤って上書きしない．
  let scrollTimer = 0;
  window.addEventListener('scroll', () => {
    if (scrollTimer) return;
    scrollTimer = setTimeout(() => {
      scrollTimer = 0;
      if (location.href === displayedURL.href) saveScroll();
    }, 500);
  }, {passive: true});
}());
