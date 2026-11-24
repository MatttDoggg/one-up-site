// One Up home page: the beta link, the navigation's glass, scroll reveals, the pricing switch and the palette preview.
// No tracking, no cookies, nothing stored.
(function () {
  var doc = document.documentElement;
  doc.classList.add('js');

  // Where "Get the beta" goes (config.js): TestFlight now, the App Store page after launch.
  var download = window.ONE_UP_DOWNLOAD;
  var gets = document.querySelectorAll('[data-get]');
  if (download) {
    for (var i = 0; i < gets.length; i++) gets[i].href = download;
  } else {
    var note = document.getElementById('beta-note');
    if (note) note.textContent = 'One Up is in beta on iPhone. Ask your society organiser for an invitation.';
    var b = document.getElementById('get-beta');
    if (b) b.style.display = 'none';
  }

  // Android phones: One Up for Android (a test build) downloads from here; TestFlight is iPhone only.
  var apk = /Android/i.test(navigator.userAgent) ? window.ONE_UP_ANDROID_DOWNLOAD : null;
  if (apk) {
    for (var j = 0; j < gets.length; j++) gets[j].href = apk;
    var testflight = document.querySelectorAll('a[href*="apps.apple.com/app/testflight"]');
    for (var k = 0; k < testflight.length; k++) testflight[k].style.display = 'none';
    var getBeta = document.getElementById('get-beta');
    if (getBeta) { getBeta.style.display = ''; getBeta.textContent = 'Download One Up for Android'; }
    var betaNote = document.getElementById('beta-note');
    if (betaNote) betaNote.textContent = 'One Up for Android is in testing and free. Tap Download, open the file, and allow your browser to install it when Android asks.';
    // The iPhone wording at the top and in the swing and privacy lines, in Android's words.
    var eyebrows = document.querySelectorAll('.eyebrow');
    for (var e = 0; e < eyebrows.length; e++) {
      if (eyebrows[e].textContent.trim() === 'For iPhone and Apple Watch') eyebrows[e].textContent = 'For Android and iPhone';
    }
    var strips = document.querySelectorAll('.platforms');
    for (var s = 0; s < strips.length; s++) {
      var spans = strips[s].querySelectorAll('span');
      if (spans.length === 3 && spans[2].textContent.trim() === 'Free beta on TestFlight') {
        spans[0].textContent = 'Android'; spans[1].textContent = 'iPhone'; spans[2].textContent = 'Free while in testing';
      }
    }
    var swaps = [['pick it from Photos, and your iPhone finds your body', 'pick it from your photos, and your phone finds your body'],
                 ['Swing videos are read on your iPhone and never uploaded.', 'Swing videos are read on your phone and never uploaded.']];
    var texts = document.querySelectorAll('p.body, .trust span, section span');
    for (var t = 0; t < texts.length; t++) {
      for (var w = 0; w < swaps.length; w++) {
        if (texts[t].childElementCount === 0 && texts[t].textContent.indexOf(swaps[w][0]) >= 0) texts[t].textContent = texts[t].textContent.replace(swaps[w][0], swaps[w][1]);
      }
    }
  }

  // Navigation: clear over the hero, glass after it.
  var nav = document.getElementById('nav');
  function onScroll() { nav.classList.toggle('solid', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on scroll (immediately when the browser can't observe).
  var items = document.querySelectorAll('.reveal, .arc-card');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    items.forEach(function (el, n) {
      // Stagger siblings slightly.
      var sib = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      if (el.classList.contains('reveal')) el.style.transitionDelay = Math.min(sib, 6) * 60 + 'ms';
      io.observe(el);
    });
    // Whatever is already on screen shows at once, even where the observer is slow to report (a background tab).
    var h = window.innerHeight || 800;
    items.forEach(function (el) { var r = el.getBoundingClientRect(); if (r.top < h && r.bottom > 0) el.classList.add('in'); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Pricing: monthly or season ticket.
  var tabs = document.querySelectorAll('.toggle button');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      var period = t.getAttribute('data-period');
      tabs.forEach(function (x) { x.setAttribute('aria-selected', String(x === t)); });
      document.querySelectorAll('.price').forEach(function (p) {
        var s = p.querySelector('[data-' + period + ']');
        if (!s) return;
        p.classList.add('swap');
        setTimeout(function () {
          p.querySelectorAll('[data-month]').forEach(function (n) { n.textContent = n.getAttribute('data-' + period); });
          p.classList.remove('swap');
        }, 180);
      });
    });
  });

  // Palette preview: the same colours as the app's palettes.
  var palettes = {
    clubhouse: { a: '#133c29', a2: '#06170f', b: '#9edbb3', card: '#eef3ee' },
    classic:   { a: '#121212', a2: '#0a1a12', b: '#9edbb3', card: '#f2f1ee' },
    links:     { a: '#12264a', a2: '#050f24', b: '#a8cdf2', card: '#eef1f6' },
    claret:    { a: '#5c1726', a2: '#21050c', b: '#f2b3bf', card: '#f5f0ef' },
    heath:     { a: '#452b54', a2: '#1a0d24', b: '#d6c0ed', card: '#f2f0f5' },
    sand:      { a: '#433021', a2: '#1a1209', b: '#edd4a3', card: '#f5f2eb' }
  };
  var mini = document.getElementById('mini');
  var sw = document.querySelectorAll('.swatches button');
  sw.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var p = palettes[btn.getAttribute('data-palette')];
      sw.forEach(function (x) { x.setAttribute('aria-checked', String(x === btn)); });
      if (!p || !mini) return;
      mini.style.setProperty('--a', p.a); mini.style.setProperty('--a2', p.a2);
      mini.style.setProperty('--b', p.b); mini.style.setProperty('--card', p.card);
    });
  });
})();

// Live leaderboard demo (18 Nov 2026): made-up golfers on a made-up match day, a hole at a time, the way the real
// leaderboard updates as markers enter scores. Rows slide into their new places. Still for reduced motion.
(function () {
  var boxes = document.querySelectorAll('[data-live-demo]');
  if (!boxes.length) return;
  var golfers = [['Sam Hale', 'SH'], ['Priya Nair', 'PN'], ['Dan Okafor', 'DO'], ['Leo Grant', 'LG'], ['Jess Moore', 'JM'], ['Tom Reid', 'TR'], ['Ali Khan', 'AK'], ['Ben Shaw', 'BS']];
  // Points per hole for each golfer (Stableford), holes 1 to 18.
  var cards = [
    [2,3,2,1,2,2,3,2,1,2,2,3,2,2,1,2,3,2], [2,2,2,2,3,2,1,2,2,3,2,2,1,2,2,3,2,2], [3,2,1,2,2,2,2,3,2,1,2,2,2,3,2,2,1,2],
    [1,2,2,3,2,1,2,2,2,2,3,2,2,1,3,2,2,2], [2,2,3,2,1,2,2,2,3,2,2,1,2,2,2,2,3,1], [2,1,2,2,2,3,2,1,2,2,2,2,3,2,2,1,2,2],
    [1,2,2,2,2,2,1,2,3,2,1,2,2,2,2,2,2,3], [2,2,1,2,2,1,2,2,2,1,2,2,2,2,1,2,2,2]
  ];
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  boxes.forEach(function (box) {
    var rowsEl = box.querySelector('.lb-rows');
    var thru = golfers.map(function (_, i) { return 3 + (i % 3); });
    var rows = golfers.map(function (g, i) {
      var r = document.createElement('div');
      r.className = 'lb-row';
      r.innerHTML = '<span class="pos"></span><span class="who"><i>' + g[1] + '</i>' + g[0] + '</span><span class="thru"></span><span class="pts"></span>';
      rowsEl.appendChild(r);
      return r;
    });
    var rowH = 0;
    function pts(i) { var s = 0; for (var h = 0; h < thru[i]; h++) s += cards[i][h]; return s; }
    function draw(changed) {
      var order = golfers.map(function (_, i) { return i; }).sort(function (a, b) { return pts(b) - pts(a) || thru[a] - thru[b] || a - b; });
      if (!rowH) rowH = rows[0].getBoundingClientRect().height || 41;
      rowsEl.style.height = rowH * rows.length + 'px';
      var prev = null, place = 0;
      order.forEach(function (i, n) {
        var p = pts(i);
        if (p !== prev) place = n + 1;
        var tied = order.some(function (j) { return j !== i && pts(j) === p; });
        prev = p;
        var r = rows[i];
        r.style.position = 'absolute'; r.style.left = 0; r.style.right = 0; r.style.top = 0;
        r.style.transform = 'translateY(' + n * rowH + 'px)';
        r.querySelector('.pos').textContent = (tied ? 'T' : '') + place;
        r.querySelector('.thru').textContent = thru[i] >= 18 ? 'F' : thru[i];
        r.querySelector('.pts').textContent = p;
        r.classList.toggle('bump', i === changed);
      });
    }
    draw(-1);
    if (reduce) return;
    var visible = true;
    if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(box);
    setInterval(function () {
      if (!visible || document.hidden) return;
      var open = thru.map(function (t, i) { return t < 18 ? i : -1; }).filter(function (i) { return i >= 0; });
      if (!open.length) { thru = golfers.map(function (_, i) { return 3 + (i % 3); }); draw(-1); return; }
      var i = open[Math.floor(Math.random() * open.length)];
      thru[i]++;
      draw(i);
    }, 1600);
  });
})();
