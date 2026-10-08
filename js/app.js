/*
 * Orbita · lógica de la aplicación
 * ---------------------------------------------------------------
 * Aplicación web progresiva sin dependencias de framework.
 * - Enrutador por hash (#/menu, #/modulo/2, #/ficha/probeta, …)
 * - Estado guardado en el propio celular (localStorage), sin cuentas
 * - Visor 3D con <model-viewer>, vista alternativa con 8 imágenes
 * - Lectura en voz alta con la síntesis de voz del navegador
 */
(function () {
  'use strict';

  var D = window.ORBITA;
  var root = document.documentElement;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* =========================================================
   * Íconos (trazos estilo Lucide, licencia ISC)
   * ======================================================= */
  var ICONS = {
    back: '<path d="m15 18-6-6 6-6"/>',
    next: '<path d="m9 18 6-6-6-6"/>',
    arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    volume: '<path d="M11 4.7a.7.7 0 0 0-1.2-.5L6.4 7.6A1.4 1.4 0 0 1 5.4 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.4a1.4 1.4 0 0 1 1 .4l3.4 3.4a.7.7 0 0 0 1.2-.5z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.4 18.4a9 9 0 0 0 0-12.8"/>',
    stop: '<rect x="6" y="6" width="12" height="12" rx="2"/>',
    wifiOff: '<path d="M12 20h.01"/><path d="M8.5 16.4a5 5 0 0 1 7 0"/><path d="M5 12.9a10 10 0 0 1 5.2-2.7"/><path d="M19 12.9a10 10 0 0 0-2-1.5"/><path d="M2 8.8a15 15 0 0 1 4.2-2.6"/><path d="M22 8.8a15 15 0 0 0-11.3-3.8"/><path d="m2 2 20 20"/>',
    cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.7-9h1.8a4.5 4.5 0 1 1 0 9Z"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/>',
    home: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .7-1.5l7-6a2 2 0 0 1 2.6 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    layers: '<path d="M12.8 2.2a2 2 0 0 0-1.7 0L2.6 6.1a1 1 0 0 0 0 1.8l8.6 3.9a2 2 0 0 0 1.7 0l8.6-3.9a1 1 0 0 0 0-1.8Z"/><path d="m22 17.6-9.2 4.2a2 2 0 0 1-1.7 0L2 17.6"/><path d="m22 12.6-9.2 4.2a2 2 0 0 1-1.7 0L2 12.6"/>',
    flask: '<path d="M10 2v7.5a2 2 0 0 1-.2.9L4.7 20.6a1 1 0 0 0 .9 1.4h12.8a1 1 0 0 0 .9-1.4l-5.1-10.2a2 2 0 0 1-.2-.9V2"/><path d="M8.5 2h7M7 16h10"/>',
    puzzle: '<path d="M19.4 7.9c-.1.3.1.6.3.9l1.6 1.6c.5.5.7 1.1.7 1.7s-.2 1.2-.7 1.7l-1.6 1.6a1 1 0 0 1-.8.3c-.5-.1-.8-.5-1-.9a2.5 2.5 0 1 0-3.2 3.2c.4.2.9.5.9 1a1 1 0 0 1-.3.8l-1.6 1.6a2.4 2.4 0 0 1-3.4 0l-1.6-1.6a1 1 0 0 0-.9-.3c-.5.1-.8.5-1 1a2.5 2.5 0 1 1-3.2-3.2c.5-.2.9-.5 1-1a1 1 0 0 0-.3-.9l-1.6-1.6a2.4 2.4 0 0 1 0-3.4l1.5-1.5c.2-.2.6-.4.9-.3.5.1.9.5 1.1 1a2.5 2.5 0 1 0 3.3-3.3c-.5-.2-.9-.6-1-1.1 0-.3.1-.7.3-.9l1.5-1.5a2.4 2.4 0 0 1 3.4 0l1.6 1.6c.2.2.6.3.9.3.5-.1.8-.5 1-1a2.5 2.5 0 1 1 3.2 3.2c-.4.2-.9.5-.9 1Z"/>',
    clipboard: '<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
    trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.7V17c0 .6-.5 1-1 1.2C7.9 18.8 7 20.2 7 22"/><path d="M14 14.7V17c0 .6.5 1 1 1.2 1.1.6 2 2 2 3.8"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
    book: '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
    rotate: '<path d="M3 12a9 9 0 1 0 9-9 9.8 9.8 0 0 0-6.7 2.7L3 8"/><path d="M3 3v5h5"/>',
    play: '<path d="M21 12a9 9 0 1 1-6.2-8.6"/><path d="m21 3-6 6"/><path d="M21 3v6h-6"/>',
    zoomIn: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6"/>',
    zoomOut: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3M8 11h6"/>',
    zoom: '<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>',
    reset: '<path d="M3 2v6h6"/><path d="M3 13a9 9 0 1 0 3-7.7L3 8"/>',
    cube: '<path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>',
    images: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
    hand: '<path d="M18 11V6a2 2 0 0 0-4 0"/><path d="M14 10V4a2 2 0 0 0-4 0v2"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.9-6-2.3l-3.6-3.6a2 2 0 0 1 2.8-2.8L7 15"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    xCircle: '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/>',
    checkCircle: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    bulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6M10 22h4"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    grid: '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
    split: '<path d="M16 3h5v5M8 3H3v5"/><path d="M12 22v-8.3a4 4 0 0 0-1.2-2.8L3 3M21 3l-7.8 7.8"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    pencil: '<path d="M21.2 6.8a1 1 0 0 0-4-4L3.8 16.2a2 2 0 0 0-.5.8L2 21.4a.5.5 0 0 0 .6.6l4.4-1.3a2 2 0 0 0 .8-.5z"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8M16 17H8M10 9H8"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>',
    settings: '<path d="M20 7h-9M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/>',
    trash: '<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 12.9 17 22l-5-3-5 3 1.5-9.1"/>',
    tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>'
  };
  function icon(name, cls) {
    return '<span class="ic ' + (cls || '') + '" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[name] || '') + '</svg></span>';
  }
  function logo(cls) {
    return '<svg class="logo ' + (cls || '') + '" viewBox="0 0 48 48" aria-hidden="true">' +
      '<circle cx="24" cy="24" r="23" fill="#3a4cca"/>' +
      '<ellipse cx="24" cy="27" rx="19" ry="7" fill="none" stroke="#9fe7dd" stroke-width="2.2" transform="rotate(-18 24 27)"/>' +
      '<path d="M20 11h8M21.5 11v8.5l-7 12.5a2 2 0 0 0 1.8 3h15.4a2 2 0 0 0 1.8-3l-7-12.5V11" fill="#fff" stroke="#fff" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M17.2 28.5h13.6l2.4 4.3a1.3 1.3 0 0 1-1.2 1.9H16a1.3 1.3 0 0 1-1.2-1.9z" fill="#2bb3a3"/>' +
      '<circle cx="39" cy="18" r="2.6" fill="#f5b51b"/></svg>';
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function inst(id) { var o = D.INSTRUMENTOS[id]; return o ? Object.assign({ id: id }, o) : null; }
  function modulo(id) { return D.MODULOS.filter(function (m) { return m.id === Number(id); })[0]; }
  function LETTERS(i) { return 'ABCDEFGH'[i]; }

  /* =========================================================
   * Estado (se guarda solo en este celular, sin cuentas)
   * ======================================================= */
  var KEY = 'orbita:v1';
  function fresh() {
    return {
      tutorialVisto: false,
      ajustes: { texto: 0, contraste: false, velocidad: 1, vista: '3d' },
      explorados: {},      // { probeta: { tabs: ['caracteristicas','uso'], hecho: true } }
      ultima: null,        // última ficha abierta
      diag: null,          // { respuestas: [...], fecha }
      mini: {},            // { '2': { intentos: [ { aciertos, respuestas, fecha } ] } }
      semaforo: {},        // { '2': 'claro' | 'dudas' | 'repasar' }
      actividades: {}      // { 'cada-cosa': {...}, 'quien-soy': {...}, 'parecidos': {...} }
    };
  }
  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return fresh();
      var s = JSON.parse(raw), f = fresh();
      Object.keys(f).forEach(function (k) { if (s[k] === undefined) s[k] = f[k]; });
      s.ajustes = Object.assign(f.ajustes, s.ajustes || {});
      return s;
    } catch (e) { return fresh(); }
  }
  var S = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* almacenamiento no disponible */ } }

  function applySettings() {
    root.setAttribute('data-texto', String(S.ajustes.texto || 0));
    if (S.ajustes.contraste) root.setAttribute('data-contraste', 'alto'); else root.removeAttribute('data-contraste');
  }
  applySettings();

  /* =========================================================
   * Exploración de fichas
   * ======================================================= */
  var TABS = [{ id: 'caracteristicas', label: 'Características' }, { id: 'uso', label: 'Uso' }, { id: 'cuidado', label: 'Cuidado' }];
  function exp(id) { return S.explorados[id] || (S.explorados[id] = { tabs: [], hecho: false }); }
  function markTab(id, tab) {
    var e = exp(id);
    if (e.tabs.indexOf(tab) < 0) e.tabs.push(tab);
    var was = e.hecho;
    e.hecho = TABS.every(function (t) { return e.tabs.indexOf(t.id) >= 0; });
    save();
    return !was && e.hecho;
  }
  function isDone(id) { return !!(S.explorados[id] && S.explorados[id].hecho); }
  function opened(id) { return !!S.explorados[id]; }
  function modProgress(m) {
    var done = m.instrumentos.filter(isDone).length;
    return { done: done, total: m.instrumentos.length, all: m.instrumentos.length > 0 && done === m.instrumentos.length };
  }
  function totalExplored() { return Object.keys(D.INSTRUMENTOS).filter(isDone).length; }
  function miniData(id) { return S.mini[id] || null; }
  function hasBadge(mid) {
    var m = miniData(mid);
    return !!(m && m.intentos.some(function (i) { return i.aciertos >= D.MINIRETOS[mid].minimo; }));
  }
  function badgeCount() { return D.MODULOS.filter(function (m) { return D.MINIRETOS[m.id] && hasBadge(m.id); }).length; }

  /* =========================================================
   * Lectura en voz alta
   * ======================================================= */
  var Voice = {
    ok: 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window,
    voice: null,
    pick: function () {
      if (!this.ok) return;
      var vs = window.speechSynthesis.getVoices() || [];
      var pref = ['es-CO', 'es-419', 'es-MX', 'es-US', 'es-ES', 'es'];
      for (var i = 0; i < pref.length; i++) {
        var f = vs.filter(function (v) { return (v.lang || '').replace('_', '-').indexOf(pref[i]) === 0; })[0];
        if (f) { this.voice = f; return; }
      }
    },
    speak: function (text, onEnd) {
      if (!this.ok || !text) { toast('La lectura en voz alta no está disponible en este navegador.'); return; }
      this.stop();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = this.voice ? this.voice.lang : 'es-CO';
      if (this.voice) u.voice = this.voice;
      u.rate = S.ajustes.velocidad === 0 ? 0.8 : 1;
      u.onend = u.onerror = function () { setSpeaking(false); if (onEnd) onEnd(); };
      setSpeaking(true);
      window.speechSynthesis.speak(u);
    },
    stop: function () { if (this.ok) window.speechSynthesis.cancel(); setSpeaking(false); }
  };
  if (Voice.ok) { Voice.pick(); window.speechSynthesis.onvoiceschanged = function () { Voice.pick(); }; }
  function setSpeaking(on) {
    var b = $('#speakBtn');
    if (!b) return;
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
    b.innerHTML = icon(on ? 'stop' : 'volume');
    b.setAttribute('aria-label', on ? 'Detener la lectura' : 'Leer en voz alta');
  }

  /* =========================================================
   * Uso sin conexión (service worker + descarga por módulos)
   * ======================================================= */
  var MODULE_CACHE = 'orbita-modulos-v1';
  var Offline = {
    state: 'none', // none | wait | ready
    init: function () {
      if (window.ORBITA_DEMO || !('serviceWorker' in navigator) || !/^https?:$/.test(location.protocol)) return;
      Offline.state = 'wait';
      try {
        navigator.serviceWorker.register('sw.js').then(function () {
          return navigator.serviceWorker.ready;
        }).then(function () { Offline.state = 'ready'; refreshOfflineChip(); })
          .catch(function () { Offline.state = 'none'; refreshOfflineChip(); });
      } catch (e) { Offline.state = 'none'; }
    },
    moduleAssets: function (mid) {
      var m = modulo(mid), list = [];
      m.instrumentos.forEach(function (id) {
        var it = inst(id);
        if (!it.modelo) return;
        list.push(it.modelo, it.imagen);
        for (var k = 0; k < 8; k++) list.push(it.vistas + '-' + k + '.webp');
      });
      if (mid === 2) list.push('recursos/Orbita_Ficha_Modulo_2.pdf');
      return list;
    },
    moduleStatus: function (mid) {
      if (!('caches' in window)) return Promise.resolve('na');
      var list = Offline.moduleAssets(mid);
      if (!list.length) return Promise.resolve('na');
      return Promise.all(list.map(function (u) { return caches.match(u); })).then(function (r) {
        return r.every(Boolean) ? 'ok' : 'missing';
      }).catch(function () { return 'na'; });
    },
    downloadModule: function (mid) {
      return caches.open(MODULE_CACHE).then(function (c) { return c.addAll(Offline.moduleAssets(mid)); });
    }
  };
  function offlineChip() {
    if (Offline.state === 'ready') return '<span class="chip teal" id="offChip">' + icon('wifiOff') + 'Disponible sin conexión</span>';
    if (Offline.state === 'wait') return '<span class="chip amber" id="offChip">' + icon('download') + 'Preparando uso sin conexión</span>';
    return '<span class="chip slate" id="offChip">' + icon('cloud') + 'Versión en línea</span>';
  }
  function refreshOfflineChip() { var c = $('#offChip'); if (c) c.outerHTML = offlineChip(); }

  /* =========================================================
   * Utilidades de interfaz
   * ======================================================= */
  var toastTimer = null;
  function toast(msg) {
    var t = $('#toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 3200);
  }
  function sheet(html, onMount) {
    var ov = document.createElement('div');
    ov.className = 'overlay';
    ov.innerHTML = '<div class="sheet" role="dialog" aria-modal="true">' + html + '</div>';
    document.body.appendChild(ov);
    var close = function () { ov.remove(); document.removeEventListener('keydown', onKey); };
    var onKey = function (e) { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
    if (onMount) onMount($('.sheet', ov), close);
    var f = $('button, a', ov); if (f) f.focus();
    return close;
  }
  function confirmSheet(title, text, okLabel) {
    return new Promise(function (resolve) {
      sheet('<h2 class="h2">' + esc(title) + '</h2><p class="lead">' + esc(text) + '</p>' +
        '<div class="btn-row even"><button class="btn outline" data-r="no">Cancelar</button><button class="btn primary" data-r="si">' + esc(okLabel) + '</button></div>',
        function (el, close) {
          $$('[data-r]', el).forEach(function (b) {
            b.addEventListener('click', function () { close(); resolve(b.getAttribute('data-r') === 'si'); });
          });
        });
    });
  }
  function openTutorial(done) {
    var i = 0;
    sheet('<div id="tut"></div>', function (el, close) {
      function paint() {
        var s = D.TUTORIAL[i];
        $('#tut', el).innerHTML =
          '<div class="stack">' +
          '<p class="section-label">Cómo usar Orbita · paso ' + (i + 1) + ' de 3</p>' +
          '<div class="tut-art">' + icon(s.icono) + '</div>' +
          '<h2 class="h1">' + esc(s.titulo) + '</h2><p class="lead">' + esc(s.texto) + '</p>' +
          '<div class="steps-dots">' + D.TUTORIAL.map(function (_, k) { return '<i class="' + (k === i ? 'on' : '') + '"></i>'; }).join('') + '</div>' +
          '<div class="btn-row"><button class="btn ghost" id="tutSkip">Saltar</button><button class="btn primary" id="tutNext">' + (i < 2 ? 'Siguiente' + icon('arrow') : 'Empezar a explorar') + '</button></div>' +
          '</div>';
        $('#tutNext', el).focus();
        $('#tutNext', el).onclick = function () { if (i < 2) { i++; paint(); } else finish(); };
        $('#tutSkip', el).onclick = finish;
      }
      function finish() { S.tutorialVisto = true; save(); close(); if (done) done(); }
      paint();
    });
  }

  /* =========================================================
   * Visor 3D y vista alternativa
   * ======================================================= */
  var webglOK = (function () {
    try { var c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl'))); }
    catch (e) { return false; }
  })();
  function use3D() { return webglOK && S.ajustes.vista !== 'fotos'; }

  function viewerHTML(it, o) {
    o = o || {};
    var hot = o.hotspots === false ? '' : (it.partes || []).map(function (p) {
      return '<button class="hotspot" slot="hotspot-' + p.n + '" data-part="' + p.n + '" data-position="' + p.pos + '" data-normal="' + p.normal + '" data-visibility-attribute="visible" aria-label="Parte ' + p.n + ': ' + esc(p.nombre) + '">' + p.n + '</button>';
    }).join('');
    var mode3d = o.force === 'fotos' ? false : (o.force === '3d' ? webglOK : use3D());
    var body = mode3d
      ? '<model-viewer src="' + modelSrc(it) + '" poster="' + it.imagen + '" alt="Modelo 3D de ' + esc(o.anon ? 'un instrumento sin nombre' : it.nombre) + '" camera-controls touch-action="pan-y" ' +
        'auto-rotate auto-rotate-delay="2500" rotation-per-second="18deg" interaction-prompt="none" shadow-intensity="0.7" exposure="1.05" environment-image="neutral" ' +
        'camera-orbit="20deg 75deg auto" loading="eager">' + hot + '</model-viewer>'
      : altHTML(it, o.anon);
    var side = o.controls === false ? '' :
      '<div class="side">' +
      (mode3d ? '<button class="icon-btn" data-v="spin" aria-pressed="true" aria-label="Rotación automática">' + icon('play') + '</button>' +
        '<button class="icon-btn" data-v="in" aria-label="Acercar">' + icon('zoomIn') + '</button>' +
        '<button class="icon-btn" data-v="out" aria-label="Alejar">' + icon('zoomOut') + '</button>' +
        '<button class="icon-btn" data-v="reset" aria-label="Restablecer la vista">' + icon('reset') + '</button>' : '') +
      '</div>';
    var chip = o.chip === false ? '' : (webglOK
      ? '<button class="chip mode-chip" data-v="mode" aria-label="Cambiar a ' + (mode3d ? 'vista en fotos' : 'vista 3D') + '">' + icon(mode3d ? 'cube' : 'images') + (mode3d ? 'Vista 3D' : 'Vista en fotos') + '</button>'
      : '<span class="chip mode-chip">' + icon('images') + 'Vista en fotos</span>');
    var hint = mode3d && o.hint !== false ? '<span class="hint" data-v="hint">' + icon('hand') + 'Desliza para girar · Pellizca para ampliar</span>' : '';
    return '<div class="viewer-card no-swipe" data-mode="' + (mode3d ? '3d' : 'fotos') + '">' + chip + body + side + hint + '</div>';
  }
  // La versión demo publica los modelos incrustados; la app usa los archivos .glb
  function modelSrc(it) { return window.ORBITA_MODEL_SRC ? window.ORBITA_MODEL_SRC(it.id) : it.modelo; }
  function altHTML(it, anon) {
    return '<div class="alt-view" data-alt="' + it.id + '">' +
      '<img src="' + it.vistas + '-0.webp" alt="' + (anon ? 'Instrumento sin nombre' : esc(it.nombre)) + ', vista 1 de 8" draggable="false">' +
      '<label class="sr-only" for="alt-' + it.id + '">Girar el instrumento</label>' +
      '<input id="alt-' + it.id + '" type="range" min="0" max="7" step="1" value="0" aria-valuetext="Vista 1 de 8">' +
      '</div>';
  }
  function mountViewer(card, it, o) {
    o = o || {};
    var mv = $('model-viewer', card);
    var hint = $('[data-v="hint"]', card);
    var hideHint = function () { if (hint) hint.remove(); hint = null; };
    if (hint) setTimeout(hideHint, 4500);
    if (mv) {
      mv.addEventListener('camera-change', function (e) { if (e.detail && e.detail.source === 'user-interaction') hideHint(); });
      var zoom = function (f) {
        var c = mv.getCameraOrbit();
        mv.cameraOrbit = c.theta + 'rad ' + c.phi + 'rad ' + (c.radius * f) + 'm';
        hideHint();
      };
      $$('[data-v]', card).forEach(function (b) {
        var v = b.getAttribute('data-v');
        if (v === 'spin') b.onclick = function () { mv.autoRotate = !mv.autoRotate; b.setAttribute('aria-pressed', mv.autoRotate ? 'true' : 'false'); };
        if (v === 'in') b.onclick = function () { zoom(0.75); };
        if (v === 'out') b.onclick = function () { zoom(1.3); };
        if (v === 'reset') b.onclick = function () { mv.cameraOrbit = '20deg 75deg auto'; mv.cameraTarget = 'auto auto auto'; mv.fieldOfView = 'auto'; };
      });
      $$('.hotspot', card).forEach(function (h) {
        h.addEventListener('click', function () { if (o.onPart) o.onPart(Number(h.getAttribute('data-part'))); });
      });
      mv.addEventListener('error', function () {
        if (window.ORBITA_MODEL_FALLBACK && !mv.getAttribute('data-retry')) { mv.setAttribute('data-retry', '1'); mv.src = window.ORBITA_MODEL_FALLBACK(it.id); return; }
        swapToPhotos(card, it, o);
      });
    } else {
      mountAlt(card);
    }
    var modeBtn = $('[data-v="mode"]', card);
    if (modeBtn) modeBtn.onclick = function () {
      swapViewer(card, it, o, card.getAttribute('data-mode') === '3d' ? 'fotos' : '3d');
    };
  }
  function swapViewer(card, it, o, force) {
    var tmp = document.createElement('div');
    tmp.innerHTML = viewerHTML(it, Object.assign({}, o, { force: force }));
    var nc = tmp.firstChild;
    card.replaceWith(nc);
    mountViewer(nc, it, o);
  }
  function swapToPhotos(card, it, o) { swapViewer(card, it, o, 'fotos'); }
  function mountAlt(card) {
    var box = $('.alt-view', card); if (!box) return;
    var img = $('img', box), range = $('input', box), base = img.getAttribute('src').replace(/-0\.webp$/, '');
    for (var k = 1; k < 8; k++) { var p = new Image(); p.src = base + '-' + k + '.webp'; }
    var set = function (k) {
      k = (k + 8) % 8; range.value = k; img.src = base + '-' + k + '.webp';
      img.alt = img.alt.replace(/vista \d de 8/, 'vista ' + (k + 1) + ' de 8');
      range.setAttribute('aria-valuetext', 'Vista ' + (k + 1) + ' de 8');
    };
    range.addEventListener('input', function () { set(Number(range.value)); });
    var sx = null;
    box.addEventListener('pointerdown', function (e) { if (e.target === range) return; sx = e.clientX; });
    box.addEventListener('pointerup', function (e) {
      if (sx === null) return;
      var dx = e.clientX - sx; sx = null;
      if (Math.abs(dx) > 24) set(Number(range.value) + (dx < 0 ? 1 : -1));
    });
  }

  /* =========================================================
   * Enrutador
   * ======================================================= */
  var current = '/';
  var cleanup = null;
  function path() {
    var h = (location.hash || '').replace(/^#/, '');
    return h || current || '/';
  }
  function go(p) {
    current = p;
    try {
      if (location.hash !== '#' + p) { location.hash = p; return; }
    } catch (e) { /* entornos sin hash */ }
    render();
  }
  window.addEventListener('hashchange', function () { current = path(); render(); });

  var ROUTES = [
    [/^\/?$/, viewSplash],
    [/^\/menu$/, viewMenu],
    [/^\/modulos$/, viewModulos],
    [/^\/modulo\/(\d)$/, viewModulo],
    [/^\/ficha\/([\w-]+)$/, viewFicha],
    [/^\/laboratorio$/, viewLaboratorio],
    [/^\/actividades$/, viewActividades],
    [/^\/actividad\/explora$/, viewExplora],
    [/^\/actividad\/quien-soy$/, viewQuienSoy],
    [/^\/actividad\/cada-cosa$/, viewCadaCosa],
    [/^\/actividad\/parecidos$/, viewParecidos],
    [/^\/actividad\/parecidos\/([\w-]+)$/, viewPareja],
    [/^\/evaluacion$/, viewEvaluacion],
    [/^\/evaluacion\/diagnostica$/, function () { return viewQuiz('diagnostica'); }],
    [/^\/evaluacion\/minireto\/(\d)$/, function (m) { return viewQuiz('mini', Number(m)); }],
    [/^\/resultados\/(\d)$/, viewResultados],
    [/^\/diagnostica\/resultado$/, viewDiagResultado],
    [/^\/logros$/, viewLogros],
    [/^\/recursos$/, viewRecursos],
    [/^\/glosario$/, viewGlosario],
    [/^\/ayuda$/, viewAyuda]
  ];

  function render() {
    Voice.stop();
    var t = $('#toast'); if (t) t.hidden = true;
    if (cleanup) { try { cleanup(); } catch (e) { /* */ } cleanup = null; }
    var p = path(), v = null;
    for (var i = 0; i < ROUTES.length; i++) {
      var m = p.match(ROUTES[i][0]);
      if (m) { v = ROUTES[i][1].apply(null, m.slice(1)); break; }
    }
    if (!v) { go('/menu'); return; }
    paintTop(v);
    var main = $('#view');
    main.className = v.nav === false ? 'no-nav' : '';
    main.innerHTML = v.html;
    main.setAttribute('aria-label', v.title || 'Orbita');
    paintNav(v);
    window.scrollTo(0, 0); main.scrollTop = 0;
    if (v.mount) cleanup = v.mount(main) || null;
    currentView = v;
    var h = $('h1, .h1', main) || $('.topbar strong');
    if (h && document.activeElement && document.activeElement !== document.body) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
  }
  var currentView = null;

  function paintTop(v) {
    var top = $('#top');
    var tools = '<div class="tools">' +
      '<button class="icon-btn" id="sizeBtn" aria-label="Tamaño del texto: ' + ['normal', 'grande', 'muy grande'][S.ajustes.texto || 0] + '">Aa</button>' +
      '<button class="icon-btn" id="speakBtn" aria-pressed="false" aria-label="Leer en voz alta">' + icon('volume') + '</button></div>';
    if (v.kind === 'splash') {
      top.className = 'topbar home';
      top.innerHTML = '<div>' + offlineChip() + '</div>' + tools;
    } else if (v.kind === 'home') {
      top.className = 'topbar home';
      top.innerHTML = '<div class="brand">' + logo('sm') + 'Orbita</div>' + tools;
    } else {
      top.className = 'topbar';
      top.innerHTML = '<button class="icon-btn" id="backBtn" aria-label="Volver">' + icon(v.close ? 'close' : 'back') + '</button>' +
        '<div class="title">' + (v.eyebrow ? '<span class="eyebrow">' + esc(v.eyebrow) + '</span>' : '') + '<strong>' + esc(v.title) + '</strong></div>' + tools;
      $('#backBtn').onclick = function () { go(v.back || '/menu'); };
    }
    $('#sizeBtn').onclick = function () {
      S.ajustes.texto = ((S.ajustes.texto || 0) + 1) % 3; save(); applySettings();
      this.setAttribute('aria-label', 'Tamaño del texto: ' + ['normal', 'grande', 'muy grande'][S.ajustes.texto]);
      toast('Tamaño del texto: ' + ['normal', 'grande', 'muy grande'][S.ajustes.texto]);
    };
    $('#speakBtn').onclick = function () {
      if (this.getAttribute('aria-pressed') === 'true') { Voice.stop(); return; }
      var txt = currentView && currentView.speak ? currentView.speak() : $('#view').innerText;
      Voice.speak(txt);
    };
  }
  function paintNav(v) {
    var nav = $('#nav');
    nav.hidden = v.nav === false;
    $$('a', nav).forEach(function (a) {
      if (a.getAttribute('data-k') === v.navKey) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  }

  /* =========================================================
   * Vistas
   * ======================================================= */

  /* 1 · Pantalla de inicio */
  function viewSplash() {
    return {
      kind: 'splash', title: 'Inicio', nav: false,
      speak: function () { return 'Orbita. Explora en 3D los instrumentos y materiales del laboratorio de química.'; },
      html:
        '<section class="splash">' +
        '<div class="hero-art" aria-hidden="true"><div class="glow"></div>' +
        '<svg class="orbits" viewBox="0 0 300 300"><ellipse cx="150" cy="168" rx="138" ry="56" fill="none" stroke="#9aa6ea" stroke-width="2" stroke-dasharray="7 7" transform="rotate(-14 150 168)"/>' +
        '<ellipse cx="150" cy="160" rx="120" ry="40" fill="none" stroke="#7fd6cb" stroke-width="2.5" transform="rotate(12 150 160)"/>' +
        '<circle cx="270" cy="128" r="7" fill="#f5b51b"/><circle cx="40" cy="214" r="6" fill="#0b8f81"/></svg>' +
        '<img class="tube-a" src="img/instrumentos/tubo.webp" alt=""><img class="flask" src="img/instrumentos/erlenmeyer.webp" alt=""><img class="tube-b" src="img/instrumentos/tubo.webp" alt=""></div>' +
        '<div class="logo-row">' + logo() + '<h1 class="wordmark">Orbita</h1></div>' +
        '<p class="lead">Explora en 3D los instrumentos y materiales del laboratorio de química</p>' +
        '<div class="actions"><button class="btn primary block" id="startBtn">Comenzar' + icon('arrow') + '</button>' +
        '<button class="btn outline block" id="howBtn">' + icon('help') + '¿Cómo usar Orbita?</button></div>' +
        '<p class="place">I.E. La Rada · Bahía Rada · Grado noveno</p>' +
        '</section>',
      mount: function () {
        $('#startBtn').onclick = function () { if (S.tutorialVisto) go('/menu'); else openTutorial(function () { go('/menu'); }); };
        $('#howBtn').onclick = function () { openTutorial(); };
      }
    };
  }

  /* 2 · Menú principal */
  function viewMenu() {
    var last = S.ultima && inst(S.ultima);
    var lastMod = last ? last.modulo : 2;
    if (!last) last = inst(modulo(2).instrumentos.filter(function (id) { return !isDone(id); })[0] || 'vaso');
    var pct = Math.round(totalExplored() / Object.keys(D.INSTRUMENTOS).length * 100);
    var tiles = [
      ['/modulos', 'layers', 'c-primary', 'Módulos', '4 módulos'],
      ['/laboratorio', 'flask', 'c-teal', 'Laboratorio 3D', '18 instrumentos'],
      ['/actividades', 'puzzle', 'c-orange', 'Actividades', '5 actividades'],
      ['/evaluacion', 'clipboard', 'c-violet', 'Evaluación', 'Mini-retos y reto final'],
      ['/logros', 'trophy', 'c-amber', 'Mis logros', badgeCount() === 1 ? '1 insignia' : badgeCount() + ' insignias'],
      ['/recursos', 'book', 'c-slate', 'Recursos', 'Fichas y glosario']
    ];
    return {
      kind: 'home', title: 'Menú principal', navKey: 'inicio',
      speak: function () { return '¡Hola! ¿Qué quieres explorar hoy? Puedes continuar con ' + last.nombre + ', o entrar a módulos, laboratorio 3D, actividades, evaluación, mis logros o recursos.'; },
      html:
        '<h1 class="h1">¡Hola! ¿Qué quieres<br>explorar hoy?</h1>' +
        '<section class="progress-card" aria-label="Tu avance">' +
        '<div class="row between"><span>Tu avance</span><span>Módulo ' + lastMod + ' de 4</span></div>' +
        '<div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '" aria-label="Instrumentos explorados"><i style="width:' + Math.max(pct, 3) + '%"></i></div>' +
        '<button class="continue" data-go="/ficha/' + last.id + '"><span class="thumb"><img src="' + last.imagen + '" alt=""></span>' +
        '<span><small>' + (S.ultima ? 'Continuar donde quedaste' : 'Empieza por') + '</small><strong>' + esc(last.nombre) + '</strong></span>' +
        '<span class="go">' + icon('next') + '</span></button>' +
        '</section>' +
        '<nav class="tiles" aria-label="Secciones">' + tiles.map(function (t) {
          return '<a class="tile" href="#' + t[0] + '"><span class="badge-ic ' + t[2] + '">' + icon(t[1]) + '</span><strong>' + t[3] + '</strong><small>' + t[4] + '</small></a>';
        }).join('') + '</nav>',
      mount: bindGo
    };
  }
  function bindGo(el) { $$('[data-go]', el).forEach(function (b) { b.addEventListener('click', function () { go(b.getAttribute('data-go')); }); }); }

  /* 3 · Lista de módulos */
  function viewModulos() {
    var colors = ['c-primary', 'c-teal', 'c-orange', 'c-violet'];
    return {
      title: 'Módulos', eyebrow: 'Orden sugerido · 5 semanas', back: '/menu', navKey: 'modulos',
      html:
        '<p class="lead">El orden es sugerido: puedes entrar a cualquier módulo. Dentro de cada uno, el mini-reto se activa cuando exploras todas las fichas.</p>' +
        '<div class="list">' + D.MODULOS.map(function (m, i) {
          var pr = modProgress(m);
          var status = m.estado === 'disponible'
            ? '<span class="chip teal">' + pr.done + ' de ' + pr.total + ' explorados</span>' + (hasBadge(m.id) ? '<span class="chip amber">' + icon('award') + esc(m.insignia) + '</span>' : '')
            : '<span class="chip slate">' + icon('tool') + 'En construcción</span>';
          return '<a class="card module-card" href="#/modulo/' + m.id + '"><span class="num ' + colors[i] + '">' + m.id + '</span>' +
            '<span><span class="small muted">Semana ' + m.semana + '</span><strong class="h3" style="display:block">' + esc(m.titulo) + '</strong>' +
            '<span class="meta">' + status + '</span></span></a>';
        }).join('') +
        '<div class="card dashed module-card"><span class="num c-amber">' + icon('flask') + '</span><span><span class="small muted">Semana 5</span><strong class="h3" style="display:block">Cierre: reto final</strong>' +
        '<span class="meta"><span class="chip slate">' + icon('lock') + 'Se activa al completar los 4 módulos</span></span></span></div>' +
        '</div>'
    };
  }

  /* 4 · Vista de un módulo */
  function viewModulo(id) {
    var m = modulo(id);
    if (!m) return null;
    var pr = modProgress(m);
    var circ = 2 * Math.PI * 26, off = circ * (1 - (pr.total ? pr.done / pr.total : 0));
    if (m.estado !== 'disponible') {
      return {
        title: 'Módulo ' + m.id, back: '/modulos', navKey: 'modulos',
        html:
          '<section class="module-head" style="background:var(--slate)"><div><h1 class="h1" style="font-size:1.3rem">' + esc(m.titulo) + '</h1><small>Semana ' + m.semana + '</small></div></section>' +
          '<div class="banner">' + icon('tool') + '<p><b>Módulo en construcción.</b> Su estructura ya está lista; las fichas, la actividad y el mini-reto llegan en el próximo avance.</p></div>' +
          '<div class="goal">' + icon('target') + '<p><b>Al terminar podrás</b> ' + esc(m.objetivo) + '</p></div>' +
          '<section class="card stack"><h2 class="h3">Temas</h2><ul class="parts">' + m.temas.map(function (t, i) { return '<li><span class="n" style="background:var(--slate)">' + (i + 1) + '</span><span>' + esc(t) + '</span></li>'; }).join('') + '</ul></section>' +
          (m.instrumentos.length ? '<section class="stack"><h2 class="section-label">Instrumentos</h2><div class="list">' + m.instrumentos.map(function (iid) {
            var it = inst(iid);
            return '<div class="item locked"><span class="thumb">' + icon('flask') + '</span><span><strong>' + esc(it.nombre) + '</strong><small>' + esc(it.resumen) + '</small></span><span class="state soon">Pronto</span></div>';
          }).join('') + '</div></section>' : '')
      };
    }
    var actHTML = m.actividades.filter(function (a) { return a !== 'explora'; }).map(function (aid) {
      var a = D.ACTIVIDADES.filter(function (x) { return x.id === aid; })[0];
      var done = S.actividades[aid] && S.actividades[aid].veces;
      return '<a class="item" href="#/actividad/' + aid + '"><span class="thumb c-orange">' + icon(a.icono) + '</span><span><strong>' + esc(a.nombre) + '</strong><small>' + esc(a.resumen) + '</small></span>' +
        (done ? '<span class="state done" aria-label="Realizada">' + icon('check') + '</span>' : '<span class="state new">Nueva</span>') + '</a>';
    }).join('');
    var mini = pr.all
      ? '<a class="item" href="#/evaluacion/minireto/' + m.id + '"><span class="thumb c-violet">' + icon('clipboard') + '</span><span><strong>Mini-reto del módulo</strong><small>5 preguntas · sin límite de tiempo</small></span>' +
        (hasBadge(m.id) ? '<span class="state done" aria-label="Logrado">' + icon('check') + '</span>' : '<span class="state viewing">Listo</span>') + '</a>'
      : '<div class="item locked" aria-disabled="true"><span class="thumb">' + icon('lock') + '</span><span><strong>Mini-reto del módulo</strong><small>Se activa al explorar los ' + pr.total + ' instrumentos</small></span><span></span></div>';
    return {
      title: 'Módulo ' + m.id, back: '/modulos', navKey: 'modulos',
      speak: function () { return 'Módulo ' + m.id + ': ' + m.titulo + '. Al terminar podrás ' + m.objetivo + ' Has explorado ' + pr.done + ' de ' + pr.total + ' instrumentos.'; },
      html:
        '<section class="module-head"><div><h1 class="h1" style="font-size:1.3rem">' + esc(m.titulo) + '</h1><small>' + pr.total + ' instrumentos · ' + (m.actividades.length - 1) + ' actividades</small></div>' +
        '<div class="ring" role="img" aria-label="' + pr.done + ' de ' + pr.total + ' instrumentos explorados"><svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="26" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="6"/>' +
        '<circle cx="30" cy="30" r="26" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-dasharray="' + circ.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '"/></svg><span>' + pr.done + '/' + pr.total + '</span></div></section>' +
        '<div class="goal">' + icon('target') + '<p><b>Al terminar podrás</b> ' + esc(m.objetivo) + '</p></div>' +
        '<section class="stack"><h2 class="section-label">Instrumentos</h2><div class="list">' + m.instrumentos.map(function (iid) {
          var it = inst(iid), st;
          if (isDone(iid)) st = '<span class="state done" aria-label="Explorado">' + icon('check') + '</span>';
          else if (S.ultima === iid) st = '<span class="state viewing">Viendo</span>';
          else if (opened(iid)) st = '<span class="state viewing">En curso</span>';
          else st = '<span class="state new">Nuevo</span>';
          return '<a class="item' + (S.ultima === iid && !isDone(iid) ? ' current' : '') + '" href="#/ficha/' + iid + '"><span class="thumb"><img src="' + it.imagen + '" alt=""></span>' +
            '<span><strong>' + esc(it.nombre) + '</strong><small>' + esc(it.resumen) + '</small></span>' + st + '</a>';
        }).join('') + '</div></section>' +
        '<section class="stack"><h2 class="section-label">Actividades y evaluación</h2><div class="list">' + actHTML + mini + '</div></section>'
    };
  }

  /* 5 · Ficha del instrumento */
  function viewFicha(id) {
    var it = inst(id);
    if (!it) return null;
    if (!it.modelo) return viewFichaPronto(it);
    var m = modulo(it.modulo), idx = m.instrumentos.indexOf(id), nextId = m.instrumentos[idx + 1];
    var tab = 'caracteristicas', activePart = null;
    S.ultima = id; exp(id); save();
    function panel() {
      if (tab === 'caracteristicas') {
        return '<p>' + esc(it.caracteristicas) + '</p><ul class="parts">' + it.partes.map(function (p) {
          return '<li data-part="' + p.n + '" class="' + (activePart === p.n ? 'on' : '') + '"><span class="n">' + p.n + '</span><span><b>' + esc(p.nombre) + ':</b> ' + esc(p.texto) + '</span></li>';
        }).join('') + '</ul>';
      }
      return '<p>' + esc(it[tab]) + '</p>';
    }
    function tabText() {
      if (tab === 'caracteristicas') return it.nombre + '. ' + it.caracteristicas + ' ' + it.partes.map(function (p) { return 'Parte ' + p.n + ', ' + p.nombre + ': ' + p.texto; }).join(' ');
      return it.nombre + '. ' + (tab === 'uso' ? 'Uso. ' : 'Cuidado. ') + it[tab];
    }
    function checkHTML() {
      var e = exp(id);
      return '<div class="explore-check' + (e.hecho ? ' done' : '') + '" id="expCheck">' +
        '<span class="dots">' + TABS.map(function (t) { return '<i class="' + (e.tabs.indexOf(t.id) >= 0 ? 'on' : '') + '"></i>'; }).join('') + '</span>' +
        (e.hecho ? icon('checkCircle') + 'Instrumento explorado' : 'Revisa las 3 pestañas para marcarlo como explorado') + '</div>';
    }
    var nextLabel = nextId ? 'Siguiente: ' + inst(nextId).nombre.split(' ')[0] : (modProgress(m).all ? 'Ir al mini-reto' : 'Volver al módulo');
    return {
      title: it.nombre, eyebrow: 'Módulo ' + m.id + ' · ' + (idx + 1) + ' de ' + m.instrumentos.length, back: '/modulo/' + m.id, navKey: 'modulos',
      speak: tabText,
      html:
        viewerHTML(it) +
        '<div class="tabs" role="tablist" aria-label="Información del instrumento">' + TABS.map(function (t) {
          return '<button role="tab" id="tab-' + t.id + '" aria-controls="panel" aria-selected="' + (t.id === tab) + '" data-tab="' + t.id + '">' + t.label + (exp(id).tabs.indexOf(t.id) >= 0 && t.id !== tab ? '<span class="seen" aria-hidden="true"></span>' : '') + '</button>';
        }).join('') + '</div>' +
        '<section class="tab-panel" id="panel" role="tabpanel" aria-live="polite">' + panel() + '</section>' +
        '<div id="checkWrap">' + checkHTML() + '</div>' +
        '<div class="notebook">' + icon('pencil') + '<span>Anota en tu cuaderno el nombre del instrumento y dos características que observes en el modelo.</span></div>' +
        '<div class="btn-row"><button class="btn outline" id="listenBtn">' + icon('volume') + 'Escuchar</button>' +
        '<button class="btn primary" id="nextBtn">' + esc(nextLabel) + icon('next') + '</button></div>',
      mount: function (el) {
        var card = $('.viewer-card', el);
        function selectPart(n) {
          activePart = n;
          if (tab !== 'caracteristicas') setTab('caracteristicas'); else $('#panel').innerHTML = panel();
          $$('.hotspot', el).forEach(function (h) { h.setAttribute('aria-pressed', Number(h.getAttribute('data-part')) === n ? 'true' : 'false'); });
          var p = it.partes.filter(function (x) { return x.n === n; })[0];
          if (p) toast(p.nombre + ': ' + p.texto);
        }
        mountViewer(card, it, { onPart: selectPart });
        function setTab(t) {
          tab = t;
          var newly = markTab(id, t);
          $$('.tabs button', el).forEach(function (b) {
            var tid = b.getAttribute('data-tab');
            b.setAttribute('aria-selected', tid === tab ? 'true' : 'false');
            b.innerHTML = TABS.filter(function (x) { return x.id === tid; })[0].label + (exp(id).tabs.indexOf(tid) >= 0 && tid !== tab ? '<span class="seen" aria-hidden="true"></span>' : '');
          });
          $('#panel').innerHTML = panel();
          $('#checkWrap').innerHTML = checkHTML();
          if (newly) {
            var pr = modProgress(m);
            toast(pr.all ? '¡Exploraste los ' + pr.total + ' instrumentos! El mini-reto ya está activo.' : '¡' + it.nombre + ' explorado! Llevas ' + pr.done + ' de ' + pr.total + '.');
            if (!nextId) $('#nextBtn').innerHTML = esc(pr.all ? 'Ir al mini-reto' : 'Volver al módulo') + icon('next');
          }
        }
        markTab(id, 'caracteristicas');
        $('#checkWrap').innerHTML = checkHTML();
        $$('.tabs button', el).forEach(function (b) { b.onclick = function () { setTab(b.getAttribute('data-tab')); }; });
        $('#listenBtn').onclick = function () { Voice.speak(tabText()); };
        $('#nextBtn').onclick = function () {
          if (nextId) go('/ficha/' + nextId);
          else go(modProgress(m).all ? '/evaluacion/minireto/' + m.id : '/modulo/' + m.id);
        };
      }
    };
  }
  function viewFichaPronto(it) {
    var fn = it.funciones.map(function (f) { return D.FUNCIONES.filter(function (x) { return x.id === f; })[0].label; }).join(', ');
    var mt = it.materiales.map(function (f) { return D.MATERIALES.filter(function (x) { return x.id === f; })[0].label; }).join(', ');
    return {
      title: it.nombre, eyebrow: 'Módulo ' + it.modulo, back: '/laboratorio', navKey: 'laboratorio',
      html:
        '<div class="viewer-card" style="height:220px;display:grid;place-items:center;background:repeating-linear-gradient(135deg,#f1f2f8 0 12px,#eceef6 12px 24px)">' +
        '<span class="chip slate">' + icon('tool') + 'Modelo 3D en construcción</span></div>' +
        '<h1 class="h1">' + esc(it.nombre) + '</h1>' +
        '<dl class="kv card"><dt>Función</dt><dd>' + esc(fn) + '</dd><dt>Material</dt><dd>' + esc(mt) + '</dd><dt>Para qué sirve</dt><dd>' + esc(it.resumen) + '</dd></dl>' +
        '<div class="banner">' + icon('info') + '<p>Su modelo 3D y su ficha completa llegan con el <b>módulo ' + it.modulo + '</b>.</p></div>'
    };
  }

  /* 6 · Laboratorio 3D */
  function viewLaboratorio() {
    var fFun = null, fMat = null;
    function cards() {
      var ids = Object.keys(D.INSTRUMENTOS).filter(function (id) {
        var it = D.INSTRUMENTOS[id];
        return (!fFun || it.funciones.indexOf(fFun) >= 0) && (!fMat || it.materiales.indexOf(fMat) >= 0);
      });
      $('#labCount').textContent = ids.length + (ids.length === 1 ? ' instrumento' : ' instrumentos');
      $('#catalog').innerHTML = ids.length ? ids.map(function (id) {
        var it = inst(id);
        return '<a class="inst-card' + (it.modelo ? '' : ' soon') + '" href="#/ficha/' + id + '"><span class="pic">' + (it.imagen ? '<img src="' + it.imagen + '" alt="" loading="lazy">' : icon('flask')) + '</span>' +
          '<strong>' + esc(it.nombre) + '</strong><small>' + (it.modelo ? (isDone(id) ? '✓ Explorado' : esc(it.resumen)) : 'Módulo ' + it.modulo + ' · pronto') + '</small></a>';
      }).join('') : '<p class="muted">Ningún instrumento cumple los dos filtros. Prueba con otra combinación.</p>';
    }
    function chips(list, key) {
      return '<button class="chip" aria-pressed="true" data-' + key + '="">Todos</button>' + list.map(function (x) {
        return '<button class="chip" aria-pressed="false" data-' + key + '="' + x.id + '">' + esc(x.label) + '</button>';
      }).join('');
    }
    return {
      title: 'Laboratorio 3D', eyebrow: 'Catálogo', back: '/menu', navKey: 'laboratorio',
      html:
        '<p class="lead">Recorre libremente los 18 instrumentos y materiales. Filtra por lo que hacen o por el material del que están hechos.</p>' +
        '<div class="stack" style="gap:8px"><span class="section-label">Función</span><div class="filters" role="group" aria-label="Filtrar por función">' + chips(D.FUNCIONES, 'fun') + '</div>' +
        '<span class="section-label">Material</span><div class="filters" role="group" aria-label="Filtrar por material">' + chips(D.MATERIALES, 'mat') + '</div></div>' +
        '<p class="small muted" id="labCount" aria-live="polite"></p>' +
        '<div class="catalog" id="catalog"></div>',
      mount: function (el) {
        cards();
        $$('[data-fun]', el).forEach(function (b) { b.onclick = function () { fFun = b.getAttribute('data-fun') || null; $$('[data-fun]', el).forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); }); cards(); }; });
        $$('[data-mat]', el).forEach(function (b) { b.onclick = function () { fMat = b.getAttribute('data-mat') || null; $$('[data-mat]', el).forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); }); cards(); }; });
      }
    };
  }

  /* 7 · Actividades */
  function viewActividades() {
    return {
      title: 'Actividades', eyebrow: '5 actividades en Orbita', back: '/menu', navKey: 'inicio',
      html:
        '<p class="lead">Cada actividad dice qué hacer en una o dos frases, muestra un ejemplo y se puede repetir sin penalización.</p>' +
        '<div class="list">' + D.ACTIVIDADES.map(function (a) {
          var st = S.actividades[a.id] && S.actividades[a.id].veces ? '<span class="state done" aria-label="Realizada">' + icon('check') + '</span>' : (a.estado === 'bloqueada' ? '<span class="state soon">' + 'Bloqueada' + '</span>' : '<span class="state new">Nueva</span>');
          var inner = '<span class="thumb ' + (a.estado === 'bloqueada' ? '' : 'c-orange') + '">' + icon(a.estado === 'bloqueada' ? 'lock' : a.icono) + '</span>' +
            '<span><strong>' + esc(a.nombre) + '</strong><small>' + esc(a.resumen) + '</small><small>' + a.oe.join(' · ') + ' · ' + esc(a.donde) + '</small></span>' + st;
          return a.estado === 'bloqueada' ? '<div class="item locked">' + inner + '</div>' : '<a class="item" href="#/actividad/' + a.id + '">' + inner + '</a>';
        }).join('') + '</div>' +
        '<div class="banner">' + icon('users') + '<p>La sexta actividad, <b>Explícalo con tus palabras</b>, se hace en clase: cada estudiante explica un instrumento de forma oral, escrita o con un dibujo rotulado.</p></div>'
    };
  }

  function viewExplora() {
    var m = modulo(2);
    return {
      title: 'Explora y descubre', eyebrow: 'Actividad base · OE1 · OE2', back: '/actividades', navKey: 'inicio',
      html:
        '<div class="goal">' + icon('bulb') + '<p>Abre la ficha de cada instrumento, gíralo, amplíalo y toca los puntos numerados. Después revisa sus pestañas.</p></div>' +
        '<section class="card stack"><h2 class="h3">En tu cuaderno</h2><p class="lead">Para cada instrumento, anota su nombre y dos características que hayas observado en el modelo. Ese registro te servirá para estudiar sin pantalla.</p>' +
        '<div class="table-wrap"><table class="cuadro"><thead><tr><th>Instrumento</th><th>Característica 1</th><th>Característica 2</th></tr></thead><tbody>' +
        '<tr><td>Ejemplo: Probeta graduada</td><td>Tiene escala en mL</td><td>Tiene base ancha</td></tr>' +
        '<tr><td class="blank">…</td><td class="blank">…</td><td class="blank">…</td></tr></tbody></table></div></section>' +
        '<section class="stack"><h2 class="section-label">Módulo 2 · ' + esc(m.titulo) + '</h2><div class="list">' + m.instrumentos.map(function (iid) {
          var it = inst(iid);
          return '<a class="item" href="#/ficha/' + iid + '"><span class="thumb"><img src="' + it.imagen + '" alt=""></span><span><strong>' + esc(it.nombre) + '</strong><small>' + esc(it.resumen) + '</small></span>' +
            (isDone(iid) ? '<span class="state done" aria-label="Explorado">' + icon('check') + '</span>' : '<span class="state new">Abrir</span>') + '</a>';
        }).join('') + '</div></section>'
    };
  }

  /* ¿Quién soy? */
  function viewQuienSoy() {
    var ids = modulo(2).instrumentos;
    var st = { started: false, order: shuffle(ids), i: 0, hints: 0, answered: null, points: 0, correct: 0, opts: [] };
    function newRound() { st.hints = 0; st.answered = null; var cur = st.order[st.i]; st.opts = shuffle([cur].concat(shuffle(ids.filter(function (x) { return x !== cur; })).slice(0, 3))); }
    function worth() { return Math.max(1, 4 - st.hints); }
    function paint(el) {
      if (!st.started) {
        el.innerHTML =
          '<div class="goal">' + icon('bulb') + '<p>Un instrumento gira en pantalla sin su nombre. Elige cuál es entre cuatro opciones.</p></div>' +
          '<section class="card stack"><h2 class="h3">Cómo se juega</h2>' +
          '<ul class="parts"><li><span class="n">1</span><span>Observa el modelo. Puedes girarlo y ampliarlo.</span></li><li><span class="n">2</span><span>Si dudas, pide hasta 3 pistas: forma, material y uso. Cada pista resta un punto.</span></li><li><span class="n">3</span><span>Elige tu respuesta. Siempre verás en qué detalle debías fijarte.</span></li></ul>' +
          '<p class="small muted">Ejemplo: si ves un tubo alto con escala y base ancha, piensa en los instrumentos que sirven para medir.</p></section>' +
          '<button class="btn primary block" id="go">Empezar · 6 rondas</button>';
        $('#go', el).onclick = function () { st.started = true; newRound(); paint(el); };
        return;
      }
      if (st.i >= st.order.length) {
        var best = Math.max(st.points, (S.actividades['quien-soy'] || {}).mejor || 0);
        S.actividades['quien-soy'] = { mejor: best, ultimo: st.points, aciertos: st.correct, veces: ((S.actividades['quien-soy'] || {}).veces || 0) + 1, fecha: Date.now() };
        save();
        el.innerHTML =
          '<section class="award"><svg viewBox="0 0 64 64" aria-hidden="true">' + medal('#3a4cca') + '</svg><div><small>¡Terminaste!</small><strong>' + st.points + ' de 24 puntos</strong><span class="muted">' + st.correct + ' de 6 instrumentos reconocidos</span></div></section>' +
          '<p class="lead">Tu mejor puntaje: ' + best + ' puntos. Puedes repetir la actividad las veces que quieras.</p>' +
          '<div class="btn-row even"><button class="btn outline" id="again">' + icon('rotate') + 'Repetir</button><a class="btn primary" href="#/modulo/2">Volver al módulo</a></div>';
        $('#again', el).onclick = function () { st = { started: true, order: shuffle(ids), i: 0, hints: 0, answered: null, points: 0, correct: 0, opts: [] }; newRound(); paint(el); };
        return;
      }
      var cur = inst(st.order[st.i]);
      var hintKeys = ['forma', 'material', 'uso'];
      el.innerHTML =
        '<div class="qhead"><div class="row between small"><b>Ronda ' + (st.i + 1) + ' de 6</b><span class="points">Vale ' + worth() + (worth() === 1 ? ' punto' : ' puntos') + ' · Total ' + st.points + '</span></div>' +
        '<div class="segments" style="grid-template-columns:repeat(6,1fr)">' + st.order.map(function (_, k) { return '<i class="' + (k < st.i ? 'ok' : k === st.i ? 'now' : '') + '"></i>'; }).join('') + '</div></div>' +
        viewerHTML(cur, { hotspots: false, anon: true, controls: false, hint: false }) +
        '<div class="hints">' + hintKeys.slice(0, st.hints).map(function (k, n) { return '<div class="hint-line">' + icon('bulb') + '<p><b>Pista ' + (n + 1) + ' · ' + k + ':</b> ' + esc(cur.pistas[k]) + '</p></div>'; }).join('') +
        (st.hints < 3 && !st.answered ? '<button class="btn ghost" id="hintBtn">' + icon('bulb') + 'Pedir pista ' + (st.hints + 1) + ' de 3: ' + hintKeys[st.hints] + '</button>' : '') + '</div>' +
        '<div class="options text" role="radiogroup" aria-label="¿Quién soy?">' + st.opts.map(function (oid, k) {
          var o = inst(oid), cls = '';
          if (st.answered) { if (oid === cur.id) cls = ' is-ok'; else if (oid === st.answered) cls = ' is-bad'; }
          return '<button class="opt' + cls + '" role="radio" aria-checked="' + (st.answered === oid) + '" data-o="' + oid + '"' + (st.answered ? ' disabled' : '') + '><span class="letter">' + LETTERS(k) + '</span>' + esc(o.nombre) + '</button>';
        }).join('') + '</div>' +
        (st.answered ? '<div class="feedback ' + (st.answered === cur.id ? 'ok' : 'bad') + '" role="status">' + icon(st.answered === cur.id ? 'checkCircle' : 'xCircle') +
          '<div><b>' + (st.answered === cur.id ? '¡Sí! Soy ' + esc(cur.nombre) + '.' : 'No. Soy ' + esc(cur.nombre) + '.') + '</b><p>' + esc(cur.fijate) + '</p></div></div>' +
          '<button class="btn primary block" id="nextR">' + (st.i < 5 ? 'Siguiente ronda' : 'Ver mi puntaje') + icon('next') + '</button>' : '');
      var card = $('.viewer-card', el); if (card) mountViewer(card, cur, { hotspots: false, anon: true, controls: false, hint: false });
      var hb = $('#hintBtn', el); if (hb) hb.onclick = function () { st.hints++; paint(el); };
      $$('.opt', el).forEach(function (b) {
        b.onclick = function () {
          st.answered = b.getAttribute('data-o');
          if (st.answered === cur.id) { st.points += worth(); st.correct++; }
          paint(el);
          var f = $('.feedback', el); if (f) f.scrollIntoView({ behavior: 'smooth', block: 'center' });
        };
      });
      var nb = $('#nextR', el); if (nb) nb.onclick = function () { st.i++; if (st.i < st.order.length) newRound(); paint(el); window.scrollTo(0, 0); $('#view').scrollTop = 0; };
    }
    return {
      title: '¿Quién soy?', eyebrow: 'Actividad · Módulo 2', back: '/modulo/2', navKey: 'modulos',
      speak: function () {
        if (!st.started || st.i >= st.order.length) return $('#view').innerText;
        var cur = inst(st.order[st.i]);
        return '¿Quién soy? Opciones: ' + st.opts.map(function (o, k) { return LETTERS(k) + ', ' + inst(o).nombre; }).join('. ') + '.' +
          (st.hints ? ' Pistas: ' + ['forma', 'material', 'uso'].slice(0, st.hints).map(function (k) { return cur.pistas[k]; }).join(' ') : '');
      },
      html: '<div id="game" class="stack" style="gap:14px"></div>',
      mount: function (el) { paint($('#game', el)); }
    };
  }

  /* Cada cosa en su lugar */
  function viewCadaCosa() {
    var C = D.CLASIFICACION_M2;
    var st = { started: false, pool: shuffle(Object.keys(C.items)), placed: { contener: [], medir: [] }, sel: null, msg: null, errors: 0 };
    function paint(el) {
      if (!st.started) {
        el.innerHTML =
          '<div class="goal">' + icon('bulb') + '<p>Toca un instrumento y luego la bandeja a la que pertenece.</p></div>' +
          '<section class="card stack"><h2 class="h3">Cómo se juega</h2><ul class="parts">' +
          '<li><span class="n">1</span><span>Toca un instrumento de la lista <b>Por ubicar</b>.</span></li>' +
          '<li><span class="n">2</span><span>Toca la bandeja donde crees que va: <b>Sirven para contener</b> o <b>Sirven para medir volumen</b>.</span></li>' +
          '<li><span class="n">3</span><span>Si aciertas, queda en la bandeja. Si no, verás por qué y el instrumento vuelve a la lista para intentarlo otra vez.</span></li></ul></section>' +
          '<button class="btn primary block" id="go">Empezar</button>';
        $('#go', el).onclick = function () { st.started = true; paint(el); };
        return;
      }
      var total = Object.keys(C.items).length, placedN = st.placed.contener.length + st.placed.medir.length;
      if (placedN === total) {
        var prev = S.actividades['cada-cosa'] || {};
        S.actividades['cada-cosa'] = { veces: (prev.veces || 0) + 1, errores: st.errors, fecha: Date.now() };
        save();
      }
      el.innerHTML =
        '<div class="goal">' + icon('bulb') + '<p>Toca un instrumento y luego la bandeja a la que pertenece.</p></div>' +
        '<div class="trays">' + C.bandejas.map(function (b) {
          return '<button class="tray' + (st.sel ? ' armed' : '') + '" data-tray="' + b.id + '" aria-label="Bandeja: ' + esc(b.nombre) + '"><h3>' + icon(b.icono) + esc(b.nombre) + '</h3><span class="placed">' +
            st.placed[b.id].map(function (id) { var it = inst(id); return '<span class="placed-item"><img src="' + it.imagen + '" alt="">' + esc(it.nombre) + icon('checkCircle') + '</span>'; }).join('') +
            '</span>' + (placedN < total ? '<span class="drop-hint">' + (st.sel ? 'Toca aquí para ubicar' : 'Bandeja') + '</span>' : '') + '</button>';
        }).join('') + '</div>' +
        (placedN < total
          ? '<div class="row between"><h2 class="section-label">Por ubicar</h2><span class="small muted">' + placedN + ' de ' + total + ' ubicados</span></div>' +
            '<div class="pool" role="group" aria-label="Instrumentos por ubicar">' + st.pool.map(function (id) {
              var it = inst(id);
              return '<button aria-pressed="' + (st.sel === id) + '" data-item="' + id + '"><img src="' + it.imagen + '" alt="">' + esc(it.nombre) + '</button>';
            }).join('') + '</div>' +
            (st.sel ? '<div class="feedback info">' + icon('info') + '<p>Elegiste <b>' + esc(inst(st.sel).nombre) + '</b>. Ahora toca la bandeja donde va.</p></div>' : '')
          : '<section class="award"><svg viewBox="0 0 64 64" aria-hidden="true">' + medal('#0b8f81') + '</svg><div><small>¡Actividad completada!</small><strong>6 de 6 ubicados</strong><span class="muted">' + (st.errors === 0 ? 'Sin errores' : st.errors + (st.errors === 1 ? ' intento por corregir' : ' intentos por corregir')) + '</span></div></section>') +
        (st.msg ? '<div class="feedback ' + st.msg.kind + '" role="status">' + icon(st.msg.kind === 'ok' ? 'checkCircle' : 'xCircle') + '<p><b>' + (st.msg.kind === 'ok' ? '¡Muy bien!' : 'Todavía no.') + '</b> ' + esc(st.msg.text) + '</p></div>' : '') +
        '<div class="btn-row' + (placedN === total ? ' even' : '') + '"><button class="btn outline" id="restart">' + icon('rotate') + 'Empezar de nuevo</button>' +
        (placedN === total ? '<a class="btn primary" href="#/modulo/2">Volver al módulo</a>' : '<span></span>') + '</div>';
      $$('[data-item]', el).forEach(function (b) { b.onclick = function () { st.sel = st.sel === b.getAttribute('data-item') ? null : b.getAttribute('data-item'); st.msg = null; paint(el); }; });
      $$('[data-tray]', el).forEach(function (b) {
        b.onclick = function () {
          if (!st.sel) { toast('Primero toca un instrumento de la lista.'); return; }
          var item = C.items[st.sel], tray = b.getAttribute('data-tray');
          if (item.bandeja === tray) {
            st.placed[tray].push(st.sel); st.pool = st.pool.filter(function (x) { return x !== st.sel; });
            st.msg = { kind: 'ok', text: item.ok };
          } else { st.errors++; st.msg = { kind: 'bad', text: item.no }; }
          st.sel = null; paint(el);
        };
      });
      $('#restart', el).onclick = function () { st = { started: true, pool: shuffle(Object.keys(C.items)), placed: { contener: [], medir: [] }, sel: null, msg: null, errors: 0 }; paint(el); };
    }
    return {
      title: 'Cada cosa en su lugar', eyebrow: 'Actividad · Módulo 2', back: '/modulo/2', navKey: 'modulos',
      html: '<div id="game" class="stack" style="gap:14px"></div>',
      mount: function (el) { paint($('#game', el)); }
    };
  }

  /* Parecidos pero diferentes */
  function viewParecidos() {
    var done = (S.actividades.parecidos || {}).parejas || {};
    return {
      title: 'Parecidos pero diferentes', eyebrow: 'Actividad en parejas · OE2 · OE4', back: '/actividades', navKey: 'inicio',
      html:
        '<div class="goal">' + icon('users') + '<p>En parejas, comparen dos instrumentos que suelen confundirse y completen en el cuaderno un cuadro de semejanzas y diferencias.</p></div>' +
        '<div class="banner">' + icon('info') + '<p>Esta actividad se trabaja en el módulo 3. Por ahora están disponibles las parejas del módulo 2; las pinzas, el trípode y el soporte llegan con su módulo.</p></div>' +
        '<div class="list">' + D.PAREJAS.map(function (p) {
          var a = inst(p.a), b = inst(p.b);
          return '<a class="item" href="#/actividad/parecidos/' + p.id + '"><span class="thumb"><img src="' + a.imagen + '" alt=""></span><span><strong>' + esc(a.nombre) + ' y ' + esc(b.nombre.toLowerCase()) + '</strong><small>Comparar forma, material, escala y uso</small></span>' +
            (done[p.id] ? '<span class="state done" aria-label="Realizada">' + icon('check') + '</span>' : '<span class="state new">Nueva</span>') + '</a>';
        }).join('') +
        '<div class="item locked"><span class="thumb">' + icon('lock') + '</span><span><strong>Pinza para tubo y pinza con nuez</strong><small>Llega con el módulo 3</small></span><span></span></div>' +
        '<div class="item locked"><span class="thumb">' + icon('lock') + '</span><span><strong>Trípode y soporte universal</strong><small>Llega con el módulo 3</small></span><span></span></div></div>'
    };
  }
  function viewPareja(pid) {
    var p = D.PAREJAS.filter(function (x) { return x.id === pid; })[0];
    if (!p) return null;
    var a = inst(p.a), b = inst(p.b), swapped = false, reveal = false;
    function cuadro() {
      return '<div class="table-wrap"><table class="cuadro"><thead><tr><th></th><th>' + esc(a.nombre) + '</th><th>' + esc(b.nombre) + '</th></tr></thead><tbody>' +
        p.cuadro.map(function (r) {
          if (r[0] === 'Se parecen en…') return '<tr><th>' + r[0] + '</th><td colspan="2" class="' + (reveal ? '' : 'blank') + '">' + (reveal ? esc(r[1]) : '…') + '</td></tr>';
          return '<tr><th>' + r[0] + '</th><td class="' + (reveal ? '' : 'blank') + '">' + (reveal ? esc(r[1]) : '…') + '</td><td class="' + (reveal ? '' : 'blank') + '">' + (reveal ? esc(r[2]) : '…') + '</td></tr>';
        }).join('') + '</tbody></table></div>';
    }
    function roles() {
      var r = swapped ? ['Estudiante B', 'Estudiante A'] : ['Estudiante A', 'Estudiante B'];
      return '<div class="role"><b>' + icon('hand') + ' Explorador: ' + r[0] + '</b>Gira, amplía y compara los dos modelos.</div><div class="role"><b>' + icon('pencil') + ' Relator: ' + r[1] + '</b>Anota en el cuaderno lo que observan.</div>';
    }
    return {
      title: 'Parecidos pero diferentes', eyebrow: a.nombre + ' y ' + b.nombre.toLowerCase(), back: '/actividad/parecidos', navKey: 'inicio',
      html:
        '<div class="pair">' + [a, b].map(function (it) {
          return '<div>' + viewerHTML(it, { hotspots: false, controls: false, hint: false, chip: false }) + '<p class="label">' + esc(it.nombre) + '</p></div>';
        }).join('') + '</div>' +
        '<section class="stack"><h2 class="section-label">Roles</h2><div class="roles" id="roles">' + roles() + '</div>' +
        '<button class="btn outline" id="swap">' + icon('rotate') + 'Cambiar roles a mitad de la actividad</button></section>' +
        '<section class="card stack"><h2 class="h3">Conversen y respondan</h2><ul class="parts">' +
        '<li><span class="n">1</span><span>¿En qué se parecen por su forma y su material?</span></li>' +
        '<li><span class="n">2</span><span>¿Cuál tiene escala de medida? ¿Es precisa o aproximada?</span></li>' +
        '<li><span class="n">3</span><span>¿Para qué sirve cada uno? ¿Qué detalle permite diferenciarlos?</span></li></ul></section>' +
        '<section class="stack"><h2 class="section-label">Cuadro para el cuaderno</h2><div id="cuadro">' + cuadro() + '</div>' +
        '<button class="btn ghost" id="reveal">' + icon('checkCircle') + 'Comparar con el cuadro sugerido</button></section>' +
        '<button class="btn primary block" id="doneBtn">Terminamos la comparación</button>',
      mount: function (el) {
        $$('.viewer-card', el).forEach(function (c, k) { mountViewer(c, k ? b : a, { hotspots: false, controls: false, hint: false, chip: false }); });
        $('#swap', el).onclick = function () { swapped = !swapped; $('#roles', el).innerHTML = roles(); toast('Cambien de rol: ahora el otro estudiante manipula los modelos.'); };
        $('#reveal', el).onclick = function () { reveal = !reveal; $('#cuadro', el).innerHTML = cuadro(); this.innerHTML = icon(reveal ? 'x' : 'checkCircle') + (reveal ? 'Ocultar el cuadro sugerido' : 'Comparar con el cuadro sugerido'); };
        $('#doneBtn', el).onclick = function () {
          var cur = S.actividades.parecidos || { parejas: {}, veces: 0 };
          cur.parejas[p.id] = true; cur.veces = (cur.veces || 0) + 1; cur.fecha = Date.now();
          S.actividades.parecidos = cur; save();
          toast('¡Listo! Preparen su cuadro para la puesta en común.');
          go('/actividad/parecidos');
        };
      }
    };
  }

  /* 8 · Evaluación */
  function viewEvaluacion() {
    var m2 = modProgress(modulo(2));
    var d = S.diag;
    return {
      title: 'Evaluación', eyebrow: 'Diagnóstica, mini-retos y reto final', back: '/menu', navKey: 'inicio',
      html:
        '<p class="lead">La evaluación es para aprender: no hay límite de tiempo y siempre verás por qué una respuesta es correcta o no.</p>' +
        '<section class="stack"><h2 class="section-label">Antes de empezar</h2>' +
        '<a class="item" href="#/evaluacion/diagnostica"><span class="thumb c-primary">' + icon('help') + '</span><span><strong>¿Qué sé del laboratorio?</strong><small>Prueba diagnóstica · 8 preguntas · sin calificación</small></span>' +
        (d ? '<span class="state done" aria-label="Realizada">' + icon('check') + '</span>' : '<span class="state new">Nueva</span>') + '</a></section>' +
        '<section class="stack"><h2 class="section-label">Mini-retos por módulo</h2><div class="list">' + D.MODULOS.map(function (m) {
          if (m.id === 2) {
            if (!m2.all) return '<div class="item locked"><span class="thumb">' + icon('lock') + '</span><span><strong>Mini-reto · Módulo 2</strong><small>Explora los 6 instrumentos para activarlo (' + m2.done + ' de 6)</small></span><a class="state viewing" href="#/modulo/2">Ir</a></div>';
            var md = miniData(2);
            return '<a class="item" href="#/evaluacion/minireto/2"><span class="thumb c-violet">' + icon('clipboard') + '</span><span><strong>Mini-reto · Módulo 2</strong><small>' + (md ? 'Último intento: ' + md.intentos[md.intentos.length - 1].aciertos + ' de 5' : '5 preguntas · logro con 4 aciertos') + '</small></span>' +
              (hasBadge(2) ? '<span class="state done" aria-label="Logrado">' + icon('check') + '</span>' : '<span class="state viewing">Listo</span>') + '</a>';
          }
          return '<div class="item locked"><span class="thumb">' + icon('tool') + '</span><span><strong>Mini-reto · Módulo ' + m.id + '</strong><small>En construcción</small></span><span></span></div>';
        }).join('') + '</div></section>' +
        '<section class="stack"><h2 class="section-label">Cierre</h2><div class="item locked"><span class="thumb">' + icon('lock') + '</span><span><strong>Reto final: Arma tu mesa de trabajo</strong><small>Se activa al completar los 4 módulos · se valora con rúbrica</small></span><span></span></div></section>'
    };
  }

  /* Motor de cuestionarios (diagnóstica y mini-retos) */
  function viewQuiz(kind, mid) {
    var def = kind === 'diagnostica' ? D.DIAGNOSTICA : D.MINIRETOS[mid];
    if (!def) return null;
    if (kind === 'mini' && !modProgress(modulo(mid)).all) {
      return {
        title: 'Mini-reto', back: '/modulo/' + mid, navKey: 'modulos',
        html: '<div class="banner">' + icon('lock') + '<p>El mini-reto se activa cuando exploras todas las fichas del módulo. Así la evaluación llega después de la exploración.</p></div><a class="btn primary block" href="#/modulo/' + mid + '">Ir al módulo ' + mid + '</a>'
      };
    }
    var Q = def.preguntas, st = { i: 0, sel: null, checked: false, answers: [] };
    function optLabel(o) { return o.label || (inst(o.id) ? inst(o.id).nombre : o.id); }
    function paint(el) {
      var q = Q[st.i];
      var illustrated = q.tipo === 'opciones-imagen';
      var isOk = st.checked && st.sel === q.correcta;
      el.innerHTML =
        '<div class="qhead"><div class="row between small"><b>Pregunta ' + (st.i + 1) + ' de ' + Q.length + '</b><span class="row" style="gap:4px">' + icon('clock') + 'Sin límite de tiempo</span></div>' +
        '<div class="segments" style="grid-template-columns:repeat(' + Q.length + ',1fr)">' + Q.map(function (_, k) {
          var c = '';
          if (k < st.i) c = def.califica ? (st.answers[k].ok ? 'ok' : 'bad') : 'now';
          else if (k === st.i) c = 'now';
          return '<i class="' + c + '"></i>';
        }).join('') + '</div></div>' +
        '<section class="qcard"><p class="q" id="qtext">' + esc(q.texto) + '</p>' +
        (q.instrumento ? '<div class="qimg"><img src="' + inst(q.instrumento).imagen + '" alt="Imagen de un instrumento de laboratorio"></div>' : '') +
        '<button class="listen" id="listenQ">' + icon('volume') + 'Escuchar pregunta</button></section>' +
        '<div class="options' + (illustrated ? '' : ' text') + '" role="radiogroup" aria-labelledby="qtext">' + q.opciones.map(function (o, k) {
          var cls = '';
          if (st.checked && def.califica) { if (o.id === q.correcta) cls = ' is-ok'; else if (o.id === st.sel) cls = ' is-bad'; }
          var lab = optLabel(o);
          return '<button class="opt' + cls + '" role="radio" aria-checked="' + (st.sel === o.id) + '" data-o="' + o.id + '"' + (st.checked ? ' disabled' : '') + '>' +
            '<span class="letter">' + LETTERS(k) + '</span><span class="tick">' + (st.sel === o.id ? icon('check') : '') + '</span>' +
            (illustrated ? '<img src="' + inst(o.id).imagen + '" alt="">' : '') + '<span>' + esc(lab) + '</span></button>';
        }).join('') + '</div>' +
        (st.checked && def.califica ? '<div class="feedback ' + (isOk ? 'ok' : 'bad') + '" role="status">' + icon(isOk ? 'checkCircle' : 'xCircle') + '<div><b>' + (isOk ? '¡Correcto!' : 'Respuesta incorrecta.') + '</b><p>' + esc(isOk ? q.ok : (q.no && q.no[st.sel]) || q.ok) + '</p></div></div>' : '') +
        (st.checked || !def.califica
          ? '<button class="btn primary block" id="nextQ"' + (!def.califica && !st.sel ? ' disabled' : '') + '>' + (st.i < Q.length - 1 ? 'Siguiente pregunta' : 'Ver resultados') + icon('next') + '</button>'
          : '<button class="btn primary block" id="checkQ"' + (st.sel ? '' : ' disabled') + '>Comprobar respuesta</button>');
      $$('.opt', el).forEach(function (b) {
        b.onclick = function () { st.sel = b.getAttribute('data-o'); paint(el); };
      });
      $('#listenQ', el).onclick = function () { Voice.speak(q.texto + ' Opciones: ' + q.opciones.map(function (o, k) { return LETTERS(k) + ', ' + optLabel(o); }).join('. ')); };
      var c = $('#checkQ', el); if (c) c.onclick = function () { st.checked = true; paint(el); var f = $('.feedback', el); if (f) f.scrollIntoView({ behavior: 'smooth', block: 'center' }); };
      var n = $('#nextQ', el); if (n) n.onclick = function () {
        st.answers.push({ q: st.i, elegida: st.sel, ok: st.sel === q.correcta });
        if (st.i < Q.length - 1) { st.i++; st.sel = null; st.checked = false; paint(el); window.scrollTo(0, 0); $('#view').scrollTop = 0; }
        else finish();
      };
    }
    function finish() {
      if (kind === 'diagnostica') {
        S.diag = { respuestas: st.answers, fecha: Date.now() }; save(); go('/diagnostica/resultado');
      } else {
        var aciertos = st.answers.filter(function (a) { return a.ok; }).length;
        var md = S.mini[mid] || { intentos: [] };
        md.intentos.push({ aciertos: aciertos, respuestas: st.answers, fecha: Date.now() });
        S.mini[mid] = md; save(); go('/resultados/' + mid);
      }
    }
    return {
      title: def.titulo, eyebrow: kind === 'diagnostica' ? 'Evaluación diagnóstica' : 'Módulo ' + mid + ' · Evaluación', back: kind === 'diagnostica' ? '/evaluacion' : '/modulo/' + mid, close: true, nav: false,
      speak: function () { var q = Q[st.i]; return q.texto + ' Opciones: ' + q.opciones.map(function (o, k) { return LETTERS(k) + ', ' + optLabel(o); }).join('. '); },
      html: (kind === 'diagnostica' ? '<div class="banner">' + icon('info') + '<p>Esta prueba no tiene calificación. Sirve para que tú y tu docente sepan qué instrumentos ya reconoces.</p></div>' : '') + '<div id="quiz" class="stack" style="gap:14px"></div>',
      mount: function (el) { paint($('#quiz', el)); }
    };
  }

  function medal(color) {
    return '<path d="M20 4h10l-4 16h-8zM44 4H34l4 16h8z" fill="' + color + '" opacity=".85"/>' +
      '<polygon points="32,16 48,25 48,43 32,52 16,43 16,25" fill="#f5b51b" stroke="#c98a0c" stroke-width="2"/>' +
      '<polygon points="32,22 43,28 43,40 32,46 21,40 21,28" fill="#fcd25a"/>' +
      '<rect x="29" y="27" width="6" height="15" rx="2" fill="#fff"/><rect x="29.8" y="34" width="4.4" height="7.4" rx="1.4" fill="#0b8f81"/>';
  }

  /* Resultados del mini-reto */
  function viewResultados(mid) {
    var def = D.MINIRETOS[mid], md = miniData(mid), m = modulo(mid);
    if (!def || !md) return null;
    var last = md.intentos[md.intentos.length - 1], ok = last.aciertos >= def.minimo;
    var wrong = last.respuestas.filter(function (r) { return !r.ok; });
    var sem = S.semaforo[mid];
    var nextMod = D.MODULOS.filter(function (x) { return x.id > Number(mid); })[0];
    return {
      title: 'Resultados', eyebrow: 'Mini-reto · Módulo ' + mid, back: '/modulo/' + mid, close: true, navKey: 'modulos',
      speak: function () { return 'Obtuviste ' + last.aciertos + ' de 5 respuestas correctas. ' + (ok ? 'Lograste la insignia ' + m.insignia + '.' : 'Repasa las fichas sugeridas e inténtalo de nuevo.'); },
      html:
        (ok ? '<section class="award"><svg viewBox="0 0 64 64" aria-hidden="true">' + medal('#3a4cca') + '</svg><div><small>¡Nueva insignia!</small><strong>' + esc(m.insignia) + '</strong><span class="muted small">Completaste el módulo ' + mid + '</span></div></section>'
          : '<section class="award pending"><svg viewBox="0 0 64 64" aria-hidden="true" style="filter:grayscale(1);opacity:.5">' + medal('#3a4cca') + '</svg><div><small style="color:var(--slate)">Insignia pendiente</small><strong>' + esc(m.insignia) + '</strong><span class="muted small">Se logra con ' + def.minimo + ' de 5 aciertos</span></div></section>') +
        '<section class="card stack"><div class="row between"><div class="score"><b>' + last.aciertos + '</b><span class="muted">de 5 correctas</span></div>' +
        (ok ? '<span class="chip ok">' + icon('checkCircle') + 'Logrado</span>' : '<span class="chip amber">' + icon('rotate') + 'Por repasar</span>') + '</div>' +
        '<div class="qdots">' + last.respuestas.map(function (r, k) { return '<span><i class="' + (r.ok ? 'ok' : 'bad') + '">' + icon(r.ok ? 'check' : 'x') + '</i>P' + (k + 1) + '</span>'; }).join('') + '</div></section>' +
        wrong.map(function (r) {
          var q = def.preguntas[r.q], chosen = inst(r.elegida);
          return '<section class="review"><h3>' + icon('xCircle') + 'Pregunta ' + (r.q + 1) + ': para repasar</h3>' +
            '<p>Elegiste ' + esc(chosen ? chosen.nombre : r.elegida) + '. ' + esc((q.no && q.no[r.elegida]) || q.ok) + '</p>' +
            '<a href="#/ficha/' + (chosen && chosen.modelo ? chosen.id : q.correcta) + '">' + icon('book') + 'Ver ficha: ' + esc(chosen && chosen.modelo ? chosen.nombre : inst(q.correcta).nombre) + '</a></section>';
        }).join('') +
        '<section class="stack"><h2 class="h3">¿Cómo te fue en este módulo?</h2><div class="semaforo" role="group" aria-label="Autoevaluación">' +
        [['claro', '#2fa866', 'Lo tengo claro'], ['dudas', '#f0a92c', 'Tengo algunas dudas'], ['repasar', '#e05a5a', 'Necesito repasar']].map(function (s) {
          return '<button aria-pressed="' + (sem === s[0]) + '" data-s="' + s[0] + '"><i style="background:' + s[1] + '"></i>' + s[2] + '</button>';
        }).join('') + '</div></section>' +
        (md.intentos.length > 1 ? '<p class="small muted">Intento ' + md.intentos.length + '. Tu docente ve el primer intento (' + md.intentos[0].aciertos + ' de 5); los siguientes son de práctica.</p>' : '<p class="small muted">Este primer intento queda visible para tu docente en Mis logros. Los siguientes intentos son de práctica.</p>') +
        '<div class="btn-row"><a class="btn outline" href="#/evaluacion/minireto/' + mid + '">' + icon('rotate') + 'Repetir</a>' +
        '<a class="btn primary" href="#/' + (nextMod ? 'modulo/' + nextMod.id : 'logros') + '">' + (nextMod ? 'Siguiente módulo' : 'Mis logros') + icon('next') + '</a></div>',
      mount: function (el) {
        $$('[data-s]', el).forEach(function (b) {
          b.onclick = function () {
            S.semaforo[mid] = b.getAttribute('data-s'); save();
            $$('[data-s]', el).forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
            toast('Autoevaluación guardada en Mis logros.');
          };
        });
      }
    };
  }

  function viewDiagResultado() {
    if (!S.diag) return null;
    var Q = D.DIAGNOSTICA.preguntas, r = S.diag.respuestas;
    var know = [], learn = [];
    r.forEach(function (a) {
      var q = Q[a.q], label = q.instrumento ? inst(q.instrumento).nombre : (q.correcta === 'vidrio' ? 'Material del laboratorio' : inst(q.correcta).nombre);
      (a.ok ? know : learn).push(label);
    });
    return {
      title: '¿Qué sé del laboratorio?', eyebrow: 'Resultado diagnóstico', back: '/evaluacion', navKey: 'inicio',
      html:
        '<div class="banner">' + icon('info') + '<p>No hay nota: este resultado le muestra a tu docente desde dónde empiezas.</p></div>' +
        '<section class="card stack"><h2 class="h3" style="color:var(--ok)">Ya reconoces (' + know.length + ')</h2>' + (know.length ? '<ul class="parts">' + know.map(function (k) { return '<li><span class="n" style="background:var(--ok)">' + icon('check') + '</span><span>' + esc(k) + '</span></li>'; }).join('') + '</ul>' : '<p class="muted">Todavía ninguno. ¡Para eso es Orbita!</p>') + '</section>' +
        '<section class="card stack"><h2 class="h3" style="color:var(--primary)">Vas a descubrir (' + learn.length + ')</h2>' + (learn.length ? '<ul class="parts">' + learn.map(function (k) { return '<li><span class="n">' + icon('flask') + '</span><span>' + esc(k) + '</span></li>'; }).join('') + '</ul>' : '<p class="muted">¡Reconociste todo! Igual vale la pena explorar las fichas.</p>') + '</section>' +
        '<a class="btn primary block" href="#/modulos">Empezar los módulos' + icon('next') + '</a>'
    };
  }

  /* 9 · Mis logros */
  function viewLogros() {
    var md = miniData(2), qs = S.actividades['quien-soy'], cc = S.actividades['cada-cosa'], pa = S.actividades.parecidos;
    var semLabel = { claro: 'Lo tengo claro', dudas: 'Tengo algunas dudas', repasar: 'Necesito repasar' };
    var diagOk = S.diag ? S.diag.respuestas.filter(function (a) { return a.ok; }).length : null;
    return {
      title: 'Mis logros', back: '/menu', navKey: 'logros',
      html:
        '<section class="stack"><h2 class="section-label">Insignias</h2><div class="badges">' + D.MODULOS.map(function (m) {
          var on = D.MINIRETOS[m.id] && hasBadge(m.id);
          return '<div class="badge-card' + (on ? '' : ' off') + '"><svg viewBox="0 0 64 64" aria-hidden="true">' + medal('#3a4cca') + '</svg><strong>' + esc(m.insignia) + '</strong><small>' + (on ? 'Lograda' : 'Módulo ' + m.id) + '</small></div>';
        }).join('') + '</div><p class="small muted">Las insignias se guardan solo en este celular y no se comparan con las de otros estudiantes.</p></section>' +
        '<section class="card stack"><h2 class="h3">Progreso por módulo</h2>' + D.MODULOS.map(function (m) {
          var pr = modProgress(m);
          return '<div class="mod-progress"><span>Módulo ' + m.id + ' · ' + esc(m.corto) + '</span><span class="small muted">' + (m.estado === 'disponible' ? pr.done + ' de ' + pr.total : 'Pronto') + '</span><div class="bar"><i style="width:' + (pr.total ? pr.done / pr.total * 100 : 0) + '%"></i></div></div>';
        }).join('') + '</section>' +
        '<section class="card stack"><div class="row between"><h2 class="h3">Resumen para el docente</h2>' + icon('clipboard') + '</div>' +
        '<p class="small muted">Muestra esta pantalla en clase o toma una captura para compartirla.</p>' +
        '<dl class="kv">' +
        '<dt>Diagnóstica</dt><dd>' + (S.diag ? diagOk + ' de 8 reconocidos' : 'Pendiente') + '</dd>' +
        '<dt>Instrumentos explorados</dt><dd>' + totalExplored() + ' de 18</dd>' +
        '<dt>Mini-reto 2 · primer intento</dt><dd>' + (md ? md.intentos[0].aciertos + ' de 5' : 'Pendiente') + '</dd>' +
        '<dt>Mini-reto 2 · intentos</dt><dd>' + (md ? md.intentos.length : 0) + '</dd>' +
        '<dt>¿Quién soy? · mejor puntaje</dt><dd>' + (qs ? qs.mejor + ' de 24' : 'Pendiente') + '</dd>' +
        '<dt>Cada cosa en su lugar</dt><dd>' + (cc ? 'Completada' : 'Pendiente') + '</dd>' +
        '<dt>Parecidos pero diferentes</dt><dd>' + (pa ? Object.keys(pa.parejas).length + ' de 2 parejas' : 'Pendiente') + '</dd>' +
        '<dt>Autoevaluación módulo 2</dt><dd>' + (S.semaforo[2] ? semLabel[S.semaforo[2]] : 'Pendiente') + '</dd>' +
        '</dl></section>'
    };
  }

  /* 10 · Recursos */
  function viewRecursos() {
    return {
      title: 'Recursos', back: '/menu', navKey: 'inicio',
      html:
        '<section class="stack"><h2 class="section-label">Fichas en PDF</h2>' +
        '<a class="item" href="recursos/Orbita_Ficha_Modulo_2.pdf" target="_blank" rel="noopener"><span class="thumb c-teal">' + icon('file') + '</span><span><strong>Ficha del módulo 2</strong><small>Los 6 instrumentos en una página · para repasar sin pantalla, compartir por Bluetooth o imprimir</small></span><span class="state viewing">PDF</span></a>' +
        [1, 3, 4].map(function (n) { return '<div class="item locked"><span class="thumb">' + icon('file') + '</span><span><strong>Ficha del módulo ' + n + '</strong><small>En construcción</small></span><span></span></div>'; }).join('') + '</section>' +
        '<section class="stack"><h2 class="section-label">Para aprender más</h2>' +
        '<a class="item" href="#/glosario"><span class="thumb c-primary">' + icon('book') + '</span><span><strong>Glosario con audio</strong><small>' + D.GLOSARIO.length + ' términos explicados con palabras sencillas</small></span><span class="go">' + icon('next') + '</span></a>' +
        '<a class="item" href="#/ayuda"><span class="thumb c-slate">' + icon('settings') + '</span><span><strong>Ayuda y accesibilidad</strong><small>Tamaño del texto, contraste, voz y uso sin conexión</small></span><span class="go">' + icon('next') + '</span></a></section>'
    };
  }
  function viewGlosario() {
    return {
      title: 'Glosario', eyebrow: 'Toca el altavoz para escuchar', back: '/recursos', navKey: 'inicio',
      speak: function () { return D.GLOSARIO.map(function (g) { return g.termino + ': ' + g.def; }).join(' '); },
      html: '<section class="card">' + D.GLOSARIO.map(function (g, i) {
        return '<div class="term"><div><strong>' + esc(g.termino) + '</strong><p>' + esc(g.def) + '</p></div><button class="icon-btn" data-g="' + i + '" aria-label="Escuchar: ' + esc(g.termino) + '">' + icon('volume') + '</button></div>';
      }).join('') + '</section>',
      mount: function (el) {
        $$('[data-g]', el).forEach(function (b) { b.onclick = function () { var g = D.GLOSARIO[Number(b.getAttribute('data-g'))]; Voice.speak(g.termino + '. ' + g.def); }; });
      }
    };
  }

  /* 11 · Ayuda y accesibilidad */
  function viewAyuda() {
    function seg(name, opts, val) {
      return '<span class="seg" role="group">' + opts.map(function (o) { return '<button data-' + name + '="' + o[0] + '" aria-pressed="' + (String(val) === String(o[0])) + '">' + o[1] + '</button>'; }).join('') + '</span>';
    }
    return {
      title: 'Ayuda y accesibilidad', back: '/menu', navKey: 'ayuda',
      html:
        '<button class="btn outline block" id="tutBtn">' + icon('help') + 'Ver el tutorial de 3 pasos</button>' +
        '<section class="card"><h2 class="h3">Accesibilidad</h2>' +
        '<div class="setting"><span><strong>Tamaño del texto</strong><small>También con el botón Aa de arriba</small></span>' + seg('texto', [[0, 'A'], [1, 'A+'], [2, 'A++']], S.ajustes.texto) + '</div>' +
        '<div class="setting"><span><strong>Alto contraste</strong><small>Texto negro sobre fondo blanco</small></span><button class="switch" id="contrast" role="switch" aria-checked="' + !!S.ajustes.contraste + '" aria-label="Alto contraste"></button></div>' +
        '<div class="setting"><span><strong>Velocidad de lectura</strong><small>Para el botón de altavoz</small></span>' + seg('vel', [[0, 'Lenta'], [1, 'Normal']], S.ajustes.velocidad) + '</div>' +
        '<div class="setting"><span><strong>Vista de los modelos</strong><small>' + (webglOK ? 'Usa fotos si tu celular se pone lento' : 'Tu celular no muestra 3D: se usan fotos desde 8 ángulos') + '</small></span>' + (webglOK ? seg('vista', [['3d', '3D'], ['fotos', 'Fotos']], S.ajustes.vista) : '') + '</div>' +
        '</section>' +
        '<section class="card stack"><h2 class="h3">Uso sin conexión</h2><div id="offStatus" class="stack" style="gap:10px"></div></section>' +
        '<section class="card stack"><h2 class="h3">Mi progreso</h2><p class="small muted">Tu avance se guarda solo en este celular. Orbita no pide cuentas ni datos personales.</p>' +
        '<button class="btn outline" id="resetBtn" style="color:var(--bad);border-color:var(--bad)">' + icon('trash') + 'Borrar mi progreso</button></section>' +
        '<section class="card stack"><div class="row">' + logo('sm') + '<h2 class="h3">Acerca de Orbita</h2></div>' +
        '<p class="credits">Ambiente Educativo Tecnológico para el reconocimiento de instrumentos y materiales de laboratorio de química. Primer avance del desarrollo (versión 0.1).</p>' +
        '<p class="credits">Camilo Andrés Soto Germán, Juan Daniel Lozano Vergara e Iván Ramiro Ramos Petro · Licenciatura en Informática, Universidad de Córdoba · 2026.</p>' +
        '<p class="credits">Modelos 3D provisionales generados por el equipo. Visor: model-viewer (Apache 2.0). Íconos: Lucide (ISC). Tipografía: Nunito (OFL).</p></section>',
      mount: function (el) {
        $('#tutBtn', el).onclick = function () { openTutorial(); };
        $$('[data-texto]', el).forEach(function (b) { b.onclick = function () { S.ajustes.texto = Number(b.getAttribute('data-texto')); save(); applySettings(); render(); }; });
        $$('[data-vel]', el).forEach(function (b) { b.onclick = function () { S.ajustes.velocidad = Number(b.getAttribute('data-vel')); save(); $$('[data-vel]', el).forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); }); Voice.speak('Así suena la lectura en voz alta.'); }; });
        $$('[data-vista]', el).forEach(function (b) { b.onclick = function () { S.ajustes.vista = b.getAttribute('data-vista'); save(); $$('[data-vista]', el).forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); }); }; });
        $('#contrast', el).onclick = function () { S.ajustes.contraste = !S.ajustes.contraste; save(); applySettings(); this.setAttribute('aria-checked', String(S.ajustes.contraste)); };
        $('#resetBtn', el).onclick = function () {
          confirmSheet('¿Borrar tu progreso?', 'Se borrarán las fichas exploradas, las insignias, los resultados y la autoevaluación de este celular. Los ajustes de accesibilidad se mantienen.', 'Sí, borrar').then(function (yes) {
            if (!yes) return;
            var aj = S.ajustes; S = fresh(); S.ajustes = aj; S.tutorialVisto = true; save(); toast('Progreso borrado.'); render();
          });
        };
        paintOffline($('#offStatus', el));
      }
    };
  }
  function paintOffline(box) {
    if (!box) return;
    var core = Offline.state === 'ready'
      ? '<div class="status-line ok"><span class="dot"></span>La aplicación está guardada en este celular.</div>'
      : Offline.state === 'wait' ? '<div class="status-line wait"><span class="dot"></span>Guardando la aplicación en este celular…</div>'
        : '<div class="status-line"><span class="dot"></span>Esta versión se usa en línea. Instálala desde el sitio publicado para usarla sin conexión.</div>';
    box.innerHTML = core + '<div id="m2status" class="status-line"><span class="dot"></span>Revisando el módulo 2…</div>';
    if (!('caches' in window) || Offline.state === 'none') { $('#m2status', box).remove(); return; }
    Offline.moduleStatus(2).then(function (s) {
      var line = $('#m2status', box); if (!line) return;
      if (s === 'ok') { line.className = 'status-line ok'; line.innerHTML = '<span class="dot"></span>Módulo 2 descargado: funciona sin conexión.'; return; }
      line.outerHTML = '<div class="setting" style="border:0;padding:0"><span><strong>Módulo 2</strong><small>Modelos, fotos y ficha PDF (≈ 1 MB)</small></span><button class="btn outline" id="dlM2">' + icon('download') + 'Descargar</button></div>';
      $('#dlM2', box).onclick = function () {
        var b = this; b.disabled = true; b.textContent = 'Descargando…';
        Offline.downloadModule(2).then(function () { toast('Módulo 2 listo para usar sin conexión.'); paintOffline(box); })
          .catch(function () { b.disabled = false; b.textContent = 'Reintentar'; toast('No se pudo descargar. Revisa tu conexión e inténtalo de nuevo.'); });
      };
    });
  }

  /* =========================================================
   * Arranque
   * ======================================================= */
  function boot() {
    $('#nav').innerHTML = [
      ['/menu', 'home', 'Inicio', 'inicio'], ['/modulos', 'layers', 'Módulos', 'modulos'], ['/laboratorio', 'flask', 'Laboratorio', 'laboratorio'],
      ['/logros', 'trophy', 'Logros', 'logros'], ['/ayuda', 'help', 'Ayuda', 'ayuda']
    ].map(function (n) { return '<a href="#' + n[0] + '" data-k="' + n[3] + '">' + icon(n[1]) + n[2] + '</a>'; }).join('');
    Offline.init();
    current = path();
    render();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
