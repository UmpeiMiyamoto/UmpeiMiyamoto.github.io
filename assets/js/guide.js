(function () {
  'use strict';
  let root = document.documentElement.dataset.root || '';
  let en = !document.documentElement.lang.startsWith('ja');
  let base = root + 'assets/guide/';
  let page = location.pathname.split('/').pop() || 'index.html';
  let home = page === 'index.html';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const pages = ['research', 'education', 'album', 'career', 'access', 'funding', 'links', 'oitachi'];
  const t = (ja, english) => en ? english : ja;
  let topic = pages.includes(page.replace('.html', '')) ? page.replace('.html', '') : 'welcome';
  let shell = document.querySelector('.nav-shell');
  let hero = document.querySelector(home ? '.hero-inner' : '.page-hero > .container');
  if (!shell || !hero) return;
  document.body.classList.add('has-page-guide');
  hero.classList.add('with-page-guide');
  if (!home) {
    const copy = document.createElement('div'); copy.className = 'guide-copy';
    while (hero.firstChild) copy.append(hero.firstChild);
    hero.append(copy);
  }
  const figure = document.createElement('figure');
  figure.className = 'guide-film';
  figure.innerHTML = `
    <video class="guide-video-source" autoplay muted loop playsinline preload="auto" width="1280" height="640" aria-hidden="true" tabindex="-1" disablepictureinpicture>
      <source src="${base}guide-motion-alpha_20261009.mp4" type="video/mp4">
    </video>
    <div class="guide-visual"><img class="guide-poster" src="${base}guide-poster_20261009.png" alt=""><canvas class="guide-person" width="640" height="640"></canvas></div>`;
  figure.setAttribute('aria-hidden', 'true');
  hero.append(figure);
  // 言語切替で基準URLが変わっても，同じ映像・ポスターを保持する．
  figure.querySelectorAll('[src]').forEach(element => { element.src = new URL(element.getAttribute('src'), location.href).href; });
  const movie = figure.querySelector('video');
  const canvas = figure.querySelector('.guide-person');
  // RGBと輪郭マスクを別々に読み，人物の内側を不透明に描画する．
  let renderFrame = () => {};
  try {
    const gl = canvas.getContext('webgl', {alpha: true, premultipliedAlpha: true});
    if (!gl) throw new Error('WebGL unavailable');
    const shader = (type, source) => {
      const value = gl.createShader(type); gl.shaderSource(value, source); gl.compileShader(value);
      if (!gl.getShaderParameter(value, gl.COMPILE_STATUS)) throw new Error('Shader compilation failed');
      return value;
    };
    const program = gl.createProgram();
    gl.attachShader(program, shader(gl.VERTEX_SHADER, 'attribute vec2 p; varying vec2 uv; void main(){uv=vec2((p.x+1.0)*0.5,(1.0-p.y)*0.5);gl_Position=vec4(p,0.0,1.0);}'));
    gl.attachShader(program, shader(gl.FRAGMENT_SHADER, 'precision mediump float; varying vec2 uv; uniform sampler2D frame; void main(){vec3 rgb=texture2D(frame,vec2(uv.x*0.5,uv.y)).rgb;float a=texture2D(frame,vec2(0.5+uv.x*0.5,uv.y)).r;a=smoothstep(0.02,0.98,a);gl_FragColor=vec4(min(rgb,vec3(a)),a);}'));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Shader linking failed');
    gl.useProgram(program);
    const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'p');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
    gl.bindTexture(gl.TEXTURE_2D,gl.createTexture());
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.viewport(0,0,640,640);
    renderFrame = () => {
      if (movie.readyState < 2 || gl.isContextLost()) return;
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,movie);
      gl.drawArrays(gl.TRIANGLE_STRIP,0,4);figure.classList.add('guide-ready');
    };
    canvas.addEventListener('webglcontextlost', event => {event.preventDefault();figure.classList.remove('guide-ready');});
    // WebGLが使えない・復旧できない環境では透過PNGの静止画を表示．
    const draw = () => {
      if (!document.hidden) renderFrame();
      if (movie.requestVideoFrameCallback) movie.requestVideoFrameCallback(draw);
      else requestAnimationFrame(draw);
    };
    movie.addEventListener('loadeddata', renderFrame);
    draw();
  } catch (_) { /* 静止画像を維持．背景は人物を透過しない． */ }

  // 映像と音声を分離．動画自体には音声トラックも操作ボタンもない．
  movie.muted = true; movie.defaultMuted = true; movie.autoplay = !reduce.matches;
  const button = document.createElement('button');
  button.type = 'button'; button.className = 'nav-voice'; button.dataset.voice = '';
  button.setAttribute('aria-pressed', 'false');
  button.setAttribute('aria-controls', 'page-guide-narration');
  const resume = document.createElement('button');
  resume.type = 'button'; resume.className = 'nav-voice';
  resume.addEventListener('click', () => playVoice());
  const status = document.createElement('span');
  status.className = 'guide-sr-status'; status.setAttribute('role', 'status');
  const narration = document.createElement('audio');
  narration.id = 'page-guide-narration'; narration.preload = 'none'; narration.muted = true; narration.volume = .85;
  narration.dataset.guideAudio = ''; narration.lang = en ? 'en' : 'ja';
  narration.src = en ? base + 'en/' + topic + '_20261009.mp3'
    : base + topic + (['welcome', 'education'].includes(topic) ? '_20261009b.mp3' : '.mp3');
  shell.append(button, status); document.body.append(narration);
  // 明示した設定をページ移動・再読み込み後も維持．未設定なら消音．
  const preferenceKey = 'umpei-guide-voice';
  function readPreference() {
    try { return localStorage.getItem(preferenceKey) === 'on'; } catch (_) { return false; }
  }
  let voiceOn = readPreference(), generation = 0, pendingPlayback = false;
  function paint() {
    button.textContent = voiceOn ? t('音声ガイド：オン', 'Voice: on') : t('音声ガイド：オフ', 'Voice: off');
    button.setAttribute('aria-pressed', String(voiceOn));
    button.title = t('全ページの音声ガイドをオン・オフ', 'Toggle voice guidance across all pages');
    resume.textContent = t('音声を再開', 'Resume voice');
    if (voiceOn && pendingPlayback) shell.append(resume); else resume.remove();
  }
  function pauseVoice() {
    generation++; narration.pause(); narration.muted = true;
  }
  async function playVoice(restart = false) {
    if (!voiceOn || document.hidden || (document.querySelector('.lesson-video') && !document.querySelector('.lesson-video').paused)) return;
    const token = ++generation;
    if (restart) narration.currentTime = 0;
    narration.muted = false; pendingPlayback = false;
    try {
      await narration.play();
      if (token === generation) paint();
    } catch (error) {
      if (token !== generation) return;
      pendingPlayback = error.name === 'NotAllowedError';
      status.textContent = pendingPlayback
        ? t('音声ガイドはオンです．ページを操作すると再生します．', 'Voice is on. Interact with the page to start playback.')
        : t('音声を再生できませんでした．', 'Audio could not play.');
      paint();
    }
  }
  button.addEventListener('click', () => {
    voiceOn = !voiceOn;
    try { localStorage.setItem(preferenceKey, voiceOn ? 'on' : 'off'); } catch (_) { /* 保存不可でも現在のページでは切替可能． */ }
    paint();
    if (voiceOn) {
      status.textContent = t('音声ガイドをオンにしました．', 'Voice guide is on.');
      playVoice(true);
    } else {
      pendingPlayback = false; pauseVoice();
      status.textContent = t('音声ガイドをオフにしました．', 'Voice guide is off.');
    }
  });
  // 読み上げ終了でもオン設定を維持し，次ページの案内を再生する．
  narration.addEventListener('ended', () => {
    pendingPlayback = false; paint();
    status.textContent = t('このページの音声ガイドが終わりました．', 'This page’s guide has finished.');
  });
  narration.addEventListener('error', () => {
    pendingPlayback = false;
    if (voiceOn) status.textContent = t('音声を読み込めませんでした．', 'Audio is unavailable.');
  });
  function retryVoice(event) {
    if (pendingPlayback && voiceOn && !button.contains(event.target)) playVoice();
  }
  document.addEventListener('click', retryVoice);
  document.addEventListener('keydown', retryVoice);
  window.addEventListener('storage', event => {
    if (event.key !== preferenceKey) return;
    voiceOn = readPreference(); paint();
    if (voiceOn) playVoice(true); else { pendingPlayback = false; pauseVoice(); }
  });
  // 授業動画の操作は独立．再生時だけ案内音声を一時停止して重複を避ける．
  document.addEventListener('play', event => {
    if (event.target.matches('.lesson-video')) { pendingPlayback = false; pauseVoice(); }
  }, true);
  function playMovie() {
    if (document.hidden || reduce.matches) { movie.pause(); return; }
    movie.play().catch(() => { /* 自動再生不可の環境ではポスターを表示．次の操作で再試行する． */ });
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pauseVoice();
    else if (voiceOn && !narration.ended) playVoice();
    playMovie();
  });
  window.addEventListener('pagehide', () => { pauseVoice(); movie.pause(); });
  window.addEventListener('pageshow', event => {
    if (event.persisted) { voiceOn = readPreference(); paint(); if (voiceOn) playVoice(); }
    playMovie();
  });
  reduce.addEventListener('change', playMovie);
  document.addEventListener('pointerdown', () => { if (movie.paused) playMovie(); }, {passive: true});
  // 同一document内では，ユーザーが許可した音声要素をページ間で共有する．
  window.refreshPageGuide = () => {
    pauseVoice(); pendingPlayback = false;
    root = document.documentElement.dataset.root || '';
    en = !document.documentElement.lang.startsWith('ja');
    base = root + 'assets/guide/';
    page = location.pathname.split('/').pop() || 'index.html';
    home = page === 'index.html';
    topic = pages.includes(page.replace('.html', '')) ? page.replace('.html', '') : 'welcome';
    shell = document.querySelector('.nav-shell');
    hero = document.querySelector(home ? '.hero-inner' : '.page-hero > .container');
    document.body.classList.add('has-page-guide');
    hero.classList.add('with-page-guide');
    if (!home) {
      const copy = document.createElement('div'); copy.className = 'guide-copy';
      while (hero.firstChild) copy.append(hero.firstChild);
      hero.append(copy);
    }
    hero.append(figure); shell.append(button, status);
    status.textContent = '';
    narration.lang = en ? 'en' : 'ja';
    narration.src = en ? base + 'en/' + topic + '_20261009.mp3'
      : base + topic + (['welcome', 'education'].includes(topic) ? '_20261009b.mp3' : '.mp3');
    paint(); playMovie(); if (voiceOn) playVoice();
  };
  paint(); playMovie(); if (voiceOn) playVoice();
}());
