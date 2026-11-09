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
    tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',
    flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.7 9a1 1 0 0 1-.7 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.5 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/>',
    star: '<path d="M11.5 2.3a.5.5 0 0 1 1 0l2.3 4.7a2 2 0 0 0 1.5 1.1l5.2.8a.5.5 0 0 1 .3.9l-3.8 3.7a2 2 0 0 0-.6 1.8l.9 5.2a.5.5 0 0 1-.8.6l-4.6-2.5a2 2 0 0 0-1.9 0l-4.6 2.5a.5.5 0 0 1-.8-.6l.9-5.2a2 2 0 0 0-.6-1.8L1.6 9.8a.5.5 0 0 1 .3-.9l5.2-.8a2 2 0 0 0 1.5-1.1z"/>',
    teacher: '<path d="M2 3h20M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3M7 21l5-5 5 5"/>'
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
      ajustes: { texto: 0, contraste: false, velocidad: 1, vista: '3d', docente: false },
      explorados: {},      // { probeta: { tabs: ['caracteristicas','uso'], hecho: true } }
      ultima: null,        // última ficha abierta
      diag: null,          // { respuestas: [...], fecha }
      mini: {},            // { '2': { intentos: [ { aciertos, respuestas, fecha } ] } }
      semaforo: {},        // { '2': 'claro' | 'dudas' | 'repasar' }
      actividades: {},     // { 'cada-cosa': {...}, 'quien-soy-3': {...}, 'parecidos': {...} }
      lecciones: {},       // módulo 1: { laboratorio: true, materiales: true, visor: true }
      retoFinal: null,     // { respuestas: [...], fecha }
      explicalo: null      // { instrumento, formato, texto, fecha }
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
    var lista = m.lecciones || m.instrumentos;
    var hecho = m.lecciones ? function (id) { return !!S.lecciones[id]; } : isDone;
    var done = lista.filter(hecho).length;
    return { done: done, total: lista.length, all: lista.length > 0 && done === lista.length, unidad: m.lecciones ? 'lecciones' : 'instrumentos' };
  }
  function miniAbierto(mid) { return S.ajustes.docente || modProgress(modulo(mid)).all; }
  function todoExplorado() { return D.MODULOS.every(function (m) { return modProgress(m).all; }); }
  function retoAbierto() { return S.ajustes.docente || todoExplorado(); }
  // Clave de registro de cada actividad por módulo (el módulo 2 conserva la clave del primer avance)
  function actKey(aid, mid) { return Number(mid) === 2 ? aid : aid + '-' + mid; }
  function actData(aid, mid) { return S.actividades[actKey(aid, mid)] || null; }
  function totalExplored() { return Object.keys(D.INSTRUMENTOS).filter(isDone).length; }
  function miniData(id) { return S.mini[id] || null; }
  function hasBadge(mid) {
    var m = miniData(mid);
    return !!(m && m.intentos.some(function (i) { return i.aciertos >= D.MINIRETOS[mid].minimo; }));
  }
  function badgeCount() { return D.MODULOS.filter(function (m) { return D.MINIRETOS[m.id] && hasBadge(m.id); }).length + (S.retoFinal ? 1 : 0); }

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
      if (window.ORBITA_DEMO || !('serviceWorker' in navigator) || !/^https?:$/.test(location.protocol)) { precargarVisor(1500); return; }
      Offline.state = 'wait';
      try {
        navigator.serviceWorker.register('sw.js').then(function () {
          return navigator.serviceWorker.ready;
        }).then(function () { Offline.state = 'ready'; refreshOfflineChip(); precargarVisor(400); })
          .catch(function () { Offline.state = 'none'; refreshOfflineChip(); precargarVisor(1500); });
      } catch (e) { Offline.state = 'none'; precargarVisor(1500); }
    },
    moduleAssets: function (mid) {
      var m = modulo(mid), list = [];
      var ids = m.lecciones ? [D.LECCIONES.visor.instrumento] : m.instrumentos;
      ids.forEach(function (id) {
        var it = inst(id);
        if (!it.modelo) return;
        list.push(it.modelo, it.imagen);
        for (var k = 0; k < 8; k++) list.push(it.vistas + '-' + k + '.webp');
      });
      // El módulo 1 muestra ejemplos de todos los instrumentos en sus lecciones
      if (m.lecciones) Object.keys(D.INSTRUMENTOS).forEach(function (id) { var im = D.INSTRUMENTOS[id].imagen; if (list.indexOf(im) < 0) list.push(im); });
      list.push('recursos/Orbita_Ficha_Modulo_' + mid + '.pdf');
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
      ? '<model-viewer src="' + modelSrc(it) + '" poster="' + it.imagen + '" style="--poster:url(' + new URL(it.imagen, document.baseURI).href + ')" alt="Modelo 3D de ' + esc(o.anon ? 'un instrumento sin nombre' : it.nombre) + '" camera-controls touch-action="pan-y" ' +
        'auto-rotate auto-rotate-delay="2500" rotation-per-second="18deg" interaction-prompt="none" shadow-intensity="0.7" exposure="1.05" environment-image="neutral" ' +
        'camera-orbit="' + (it.camara || '20deg 75deg auto') + '" loading="eager">' + hot + '</model-viewer>'
      : altHTML(it, o.anon);
    var side = o.controls === false ? '' :
      '<div class="side">' +
      (mode3d ? '<button class="icon-btn" data-v="spin" aria-pressed="true" aria-label="Rotación automática">' + icon('play') + '</button>' +
        '<button class="icon-btn" data-v="in" aria-label="Acercar">' + icon('zoomIn') + '</button>' +
        '<button class="icon-btn" data-v="out" aria-label="Alejar">' + icon('zoomOut') + '</button>' +
        '<button class="icon-btn" data-v="reset" aria-label="Restablecer la vista">' + icon('reset') + '</button>' : '') +
      '</div>';
    var chip = o.chip === false ? '' : (webglOK
      ? '<button class="chip mode-chip" data-v="mode" aria-label="' + (mode3d ? 'Vista 3D: cambiar a vista en fotos' : 'Vista en fotos: cambiar a vista 3D') + '">' + icon(mode3d ? 'cube' : 'images') + (mode3d ? 'Vista 3D' : 'Vista en fotos') + '</button>'
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
  /* Carga diferida del visor 3D (v1.0.2): la librería model-viewer (≈ 260 KB comprimida) ya no
   * retrasa la pantalla de inicio; se pide al salir del inicio o al abrir el primer visor. */
  var mvPedido = false;
  function ensureModelViewer() {
    if (mvPedido || (window.customElements && window.customElements.get('model-viewer'))) return;
    mvPedido = true;
    var sc = document.createElement('script'); sc.type = 'module'; sc.src = 'vendor/model-viewer.min.js';
    document.head.appendChild(sc);
  }
  /* Con el inicio ya visible, el visor se prepara en segundo plano (desde la caché del service worker
   * cuando existe), para que la primera ficha abra rápido. No se carga si el estudiante eligió la vista en fotos. */
  function precargarVisor(ms) {
    var go = function () { if (use3D()) setTimeout(ensureModelViewer, ms); };
    if (document.readyState === 'complete') go(); else window.addEventListener('load', go, { once: true });
  }
  function mountViewer(card, it, o) {
    o = o || {};
    var mv = $('model-viewer', card);
    if (mv) ensureModelViewer();
    var hint = $('[data-v="hint"]', card);
    var hideHint = function () { if (hint) hint.remove(); hint = null; };
    if (hint) setTimeout(hideHint, 4500);
    if (mv) {
      mv.addEventListener('camera-change', function (e) { if (e.detail && e.detail.source === 'user-interaction') hideHint(); });
      var zoom = function (f) {
        if (!mv.getCameraOrbit) return;
        var c = mv.getCameraOrbit();
        mv.cameraOrbit = c.theta + 'rad ' + c.phi + 'rad ' + (c.radius * f) + 'm';
        hideHint();
        if (o.onZoom && f < 1) o.onZoom();
      };
      $$('[data-v]', card).forEach(function (b) {
        var v = b.getAttribute('data-v');
        if (v === 'spin') b.onclick = function () { mv.autoRotate = !mv.autoRotate; if (mv.autoRotate) mv.autoRotateDelay = 0; b.setAttribute('aria-pressed', mv.autoRotate ? 'true' : 'false'); };
        if (v === 'in') b.onclick = function () { zoom(0.75); };
        if (v === 'out') b.onclick = function () { zoom(1.3); };
        if (v === 'reset') b.onclick = function () { mv.cameraOrbit = it.camara || '20deg 75deg auto'; mv.cameraTarget = 'auto auto auto'; mv.fieldOfView = 'auto'; };
      });
      mv.addEventListener('camera-change', function (e) {
        if (!o.onCamera || !e.detail || e.detail.source !== 'user-interaction') return;
        o.onCamera(mv.getCameraOrbit());
      });
      var hs = $$('.hotspot', card);
      hs.forEach(function (h) {
        h.addEventListener('click', function () { if (o.onPart) o.onPart(Number(h.getAttribute('data-part'))); });
      });
      /* v1.0.2: los puntos no capturan el dedo (pointer-events: none), así girar y ampliar funcionan
       * aunque el gesto empiece sobre un punto. Un toque corto a menos de 30 px de un punto visible lo activa. */
      if (hs.length) {
        var down = null, multi = false;
        mv.addEventListener('pointerdown', function (e) {
          if (down) { multi = true; return; }
          down = { x: e.clientX, y: e.clientY, t: Date.now(), id: e.pointerId }; multi = false;
        });
        var up = function (e) {
          if (!down || e.pointerId !== down.id) return;
          var d = down; down = null;
          if (e.type !== 'pointerup' || multi || Math.abs(e.clientX - d.x) > 10 || Math.abs(e.clientY - d.y) > 10 || Date.now() - d.t > 600) return;
          var best = null, bd = 30;
          hs.forEach(function (h) {
            if (!h.hasAttribute('data-visible')) return;
            var r = h.getBoundingClientRect(), dist = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
            if (dist < bd) { bd = dist; best = h; }
          });
          if (best) best.click();
        };
        mv.addEventListener('pointerup', up);
        mv.addEventListener('pointercancel', up);
      }
      mv.addEventListener('error', function () {
        if (window.ORBITA_MODEL_FALLBACK && !mv.getAttribute('data-retry')) { mv.setAttribute('data-retry', '1'); mv.src = window.ORBITA_MODEL_FALLBACK(it.id); return; }
        swapToPhotos(card, it, o);
      });
    } else {
      mountAlt(card, o.onAlt);
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
  function mountAlt(card, onAlt) {
    var box = $('.alt-view', card); if (!box) return;
    var img = $('img', box), range = $('input', box), base = img.getAttribute('src').replace(/-0\.webp$/, '');
    for (var k = 1; k < 8; k++) { var p = new Image(); p.src = base + '-' + k + '.webp'; }
    var set = function (k) {
      k = (k + 8) % 8; range.value = k; img.src = base + '-' + k + '.webp';
      img.alt = img.alt.replace(/vista \d de 8/, 'vista ' + (k + 1) + ' de 8');
      range.setAttribute('aria-valuetext', 'Vista ' + (k + 1) + ' de 8');
      if (onAlt) onAlt(k);
    };
    range.addEventListener('input', function () { set(Number(range.value)); });
    /* v1.0.2: si las fotos no están guardadas y no hay señal, se explica qué hacer en lugar de mostrar una imagen rota */
    var avisar = function () {
      if (box.getAttribute('data-aviso')) return;
      box.setAttribute('data-aviso', '1');
      var it = inst(box.getAttribute('data-alt')), sinRed = navigator.onLine === false;
      box.innerHTML = '<div class="offline-note" role="status">' + icon(sinRed ? 'wifiOff' : 'cloud') +
        '<strong>' + (sinRed ? 'Este instrumento aún no está guardado en tu celular' : 'No se pudieron cargar las imágenes') + '</strong>' +
        '<p>' + (sinRed ? 'Cuando tengas señal, ábrelo una vez o descarga el módulo ' + it.modulo + ' en Ayuda. Mientras tanto, lee su ficha aquí abajo.' : 'Revisa tu conexión y vuelve a abrir la ficha.') + '</p>' +
        (sinRed ? '<a class="btn outline" href="#/ayuda">' + icon('download') + 'Ir a descargas</a>' : '') + '</div>';
    };
    img.addEventListener('error', avisar);
    if (img.complete && img.naturalWidth === 0) avisar();
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
    [/^\/leccion\/([\w-]+)$/, viewLeccion],
    [/^\/actividad\/quien-soy$/, function () { return viewElegirModulo('quien-soy'); }],
    [/^\/actividad\/quien-soy\/(\d)$/, viewQuienSoy],
    [/^\/actividad\/cada-cosa$/, function () { return viewElegirModulo('cada-cosa'); }],
    [/^\/actividad\/cada-cosa\/(\d)$/, viewCadaCosa],
    [/^\/actividad\/mesa$/, viewRetoFinal],
    [/^\/reto-final\/resultado$/, viewRetoResultado],
    [/^\/actividad\/explicalo$/, viewExplicalo],
    [/^\/docente$/, viewDocente],
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
    if (p !== '/' && p !== '' && use3D()) setTimeout(ensureModelViewer, 0);
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
    // Dónde seguir: la última ficha abierta o lo primero que falte por explorar
    var cont = null;
    if (S.ultima && inst(S.ultima)) {
      var u = inst(S.ultima);
      cont = { go: '/ficha/' + u.id, img: u.imagen, small: 'Continuar donde quedaste', nombre: u.nombre, mod: u.modulo };
    } else {
      var m1 = modulo(1);
      var lec = m1.lecciones.filter(function (l) { return !S.lecciones[l]; })[0];
      if (lec) cont = { go: '/leccion/' + lec, icon: D.LECCIONES[lec].icono, small: 'Empieza por', nombre: D.LECCIONES[lec].titulo, mod: 1 };
      else {
        var pend = null;
        D.MODULOS.some(function (m) { pend = m.instrumentos.filter(function (id) { return !isDone(id); })[0]; return !!pend; });
        pend = inst(pend || 'vaso');
        cont = { go: '/ficha/' + pend.id, img: pend.imagen, small: 'Sigue con', nombre: pend.nombre, mod: pend.modulo };
      }
    }
    var totalU = D.MODULOS.reduce(function (a, m) { return a + modProgress(m).total; }, 0);
    var doneU = D.MODULOS.reduce(function (a, m) { return a + modProgress(m).done; }, 0);
    var pct = Math.round(doneU / totalU * 100);
    var tiles = [
      ['/modulos', 'layers', 'c-primary', 'Módulos', '4 módulos'],
      ['/laboratorio', 'flask', 'c-teal', 'Laboratorio 3D', '18 instrumentos'],
      ['/actividades', 'puzzle', 'c-orange', 'Actividades', D.ACTIVIDADES.length + ' actividades'],
      ['/evaluacion', 'clipboard', 'c-violet', 'Evaluación', 'Mini-retos y reto final'],
      ['/logros', 'trophy', 'c-amber', 'Mis logros', badgeCount() === 1 ? '1 insignia' : badgeCount() + ' insignias'],
      ['/recursos', 'book', 'c-slate', 'Recursos', 'Fichas y glosario']
    ];
    return {
      kind: 'home', title: 'Menú principal', navKey: 'inicio',
      speak: function () { return '¡Hola! ¿Qué quieres explorar hoy? Puedes continuar con ' + cont.nombre + ', o entrar a módulos, laboratorio 3D, actividades, evaluación, mis logros o recursos.'; },
      html:
        '<h1 class="h1">¡Hola! ¿Qué quieres<br>explorar hoy?</h1>' +
        '<section class="progress-card" aria-label="Tu avance">' +
        '<div class="row between"><span>Tu avance</span><span>Módulo ' + cont.mod + ' de 4</span></div>' +
        '<div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '" aria-label="Avance en los módulos"><i style="width:' + Math.max(pct, 3) + '%"></i></div>' +
        '<button class="continue" data-go="' + cont.go + '"><span class="thumb">' + (cont.img ? '<img src="' + cont.img + '" alt="">' : icon(cont.icon)) + '</span>' +
        '<span><small>' + cont.small + '</small><strong>' + esc(cont.nombre) + '</strong></span>' +
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
    var abierto = retoAbierto();
    return {
      title: 'Módulos', eyebrow: 'Orden sugerido · 5 semanas', back: '/menu', navKey: 'modulos',
      html:
        '<p class="lead">El orden es sugerido: puedes entrar a cualquier módulo. Dentro de cada uno, el mini-reto se activa cuando exploras todo su contenido.</p>' +
        '<div class="list">' + D.MODULOS.map(function (m, i) {
          var pr = modProgress(m);
          var status = '<span class="chip teal">' + pr.done + ' de ' + pr.total + ' ' + (m.lecciones ? 'lecciones' : 'explorados') + '</span>' +
            (hasBadge(m.id) ? '<span class="chip amber">' + icon('award') + esc(m.insignia) + '</span>' : '');
          return '<a class="card module-card" href="#/modulo/' + m.id + '"><span class="num ' + colors[i] + '">' + m.id + '</span>' +
            '<span><span class="small muted">Semana ' + m.semana + '</span><strong class="h3" style="display:block">' + esc(m.titulo) + '</strong>' +
            '<span class="meta">' + status + '</span></span></a>';
        }).join('') +
        (abierto
          ? '<a class="card module-card" href="#/actividad/mesa"><span class="num c-amber">' + icon('flask') + '</span><span><span class="small muted">Semana 5</span><strong class="h3" style="display:block">Cierre: reto final</strong>' +
            '<span class="meta">' + (S.retoFinal ? '<span class="chip amber">' + icon('award') + 'Reto final completado</span>' : '<span class="chip teal">' + icon('checkCircle') + 'Disponible</span>') + '</span></span></a>'
          : '<div class="card dashed module-card"><span class="num c-amber">' + icon('flask') + '</span><span><span class="small muted">Semana 5</span><strong class="h3" style="display:block">Cierre: reto final</strong>' +
            '<span class="meta"><span class="chip slate">' + icon('lock') + 'Se activa al completar los 4 módulos</span></span></span></div>') +
        '</div>'
    };
  }

  /* 4 · Vista de un módulo */
  function actividadItem(aid, mid) {
    var a = D.ACTIVIDADES.filter(function (x) { return x.id === aid; })[0];
    var href = aid === 'parecidos' ? '#/actividad/parecidos' : '#/actividad/' + aid + '/' + mid;
    var done = aid === 'parecidos' ? S.actividades.parecidos : actData(aid, mid);
    return '<a class="item" href="' + href + '"><span class="thumb c-orange">' + icon(a.icono) + '</span><span><strong>' + esc(a.nombre) + '</strong><small>' + esc(a.resumen) + '</small></span>' +
      (done ? '<span class="state done" aria-label="Realizada">' + icon('check') + '</span>' : '<span class="state new">Nueva</span>') + '</a>';
  }
  function miniItem(m, pr) {
    return miniAbierto(m.id)
      ? '<a class="item" href="#/evaluacion/minireto/' + m.id + '"><span class="thumb c-violet">' + icon('clipboard') + '</span><span><strong>Mini-reto del módulo</strong><small>5 preguntas · sin límite de tiempo</small></span>' +
        (hasBadge(m.id) ? '<span class="state done" aria-label="Logrado">' + icon('check') + '</span>' : '<span class="state viewing">Listo</span>') + '</a>'
      : '<div class="item locked" aria-disabled="true"><span class="thumb">' + icon('lock') + '</span><span><strong>Mini-reto del módulo</strong><small>Se activa al ' + (m.lecciones ? 'completar las ' + pr.total + ' lecciones' : 'explorar los ' + pr.total + ' instrumentos') + '</small></span><span></span></div>';
  }
  function moduleHead(m, pr) {
    var circ = 2 * Math.PI * 26, off = circ * (1 - (pr.total ? pr.done / pr.total : 0));
    return '<section class="module-head"><div><h1 class="h1" style="font-size:1.3rem">' + esc(m.titulo) + '</h1><small>' +
      (m.lecciones ? pr.total + ' lecciones · recorrido por el catálogo' : pr.total + ' instrumentos · ' + (m.actividades.length - 1) + ' actividades') + '</small></div>' +
      '<div class="ring" role="img" aria-label="' + pr.done + ' de ' + pr.total + ' ' + pr.unidad + ' completados"><svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="26" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="6"/>' +
      '<circle cx="30" cy="30" r="26" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-dasharray="' + circ.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '"/></svg><span>' + pr.done + '/' + pr.total + '</span></div></section>' +
      '<div class="goal">' + icon('target') + '<p><b>Al terminar podrás</b> ' + esc(m.objetivo) + '</p></div>';
  }
  function viewModulo(id) {
    var m = modulo(id);
    if (!m) return null;
    var pr = modProgress(m);
    if (m.lecciones) {
      return {
        title: 'Módulo 1', back: '/modulos', navKey: 'modulos',
        speak: function () { return 'Módulo 1: ' + m.titulo + '. Al terminar podrás ' + m.objetivo + ' Llevas ' + pr.done + ' de ' + pr.total + ' lecciones.'; },
        html: moduleHead(m, pr) +
          '<section class="stack"><h2 class="section-label">Antes de empezar</h2>' +
          '<a class="item" href="#/evaluacion/diagnostica"><span class="thumb c-primary">' + icon('help') + '</span><span><strong>¿Qué sé del laboratorio?</strong><small>Prueba diagnóstica · 8 preguntas · sin calificación</small></span>' +
          (S.diag ? '<span class="state done" aria-label="Realizada">' + icon('check') + '</span>' : '<span class="state new">Nueva</span>') + '</a></section>' +
          '<section class="stack"><h2 class="section-label">Lecciones</h2><div class="list">' + m.lecciones.map(function (lid, i) {
            var L = D.LECCIONES[lid];
            return '<a class="item" href="#/leccion/' + lid + '"><span class="thumb c-teal">' + icon(L.icono) + '</span><span><strong>' + (i + 1) + '. ' + esc(L.titulo) + '</strong><small>' + esc(L.duracion) + '</small></span>' +
              (S.lecciones[lid] ? '<span class="state done" aria-label="Completada">' + icon('check') + '</span>' : '<span class="state new">Nueva</span>') + '</a>';
          }).join('') + '</div></section>' +
          '<section class="stack"><h2 class="section-label">Actividades y evaluación</h2><div class="list">' +
          '<a class="item" href="#/laboratorio"><span class="thumb c-orange">' + icon('rotate') + '</span><span><strong>Explora y descubre: recorrido libre</strong><small>Recorre el Laboratorio 3D sin estudiar todavía cada instrumento a fondo. Filtra por función o por material.</small></span><span class="state viewing">Ir</span></a>' +
          miniItem(m, pr) + '</div></section>'
      };
    }
    var actHTML = m.actividades.filter(function (a) { return a !== 'explora'; }).map(function (aid) { return actividadItem(aid, m.id); }).join('');
    return {
      title: 'Módulo ' + m.id, back: '/modulos', navKey: 'modulos',
      speak: function () { return 'Módulo ' + m.id + ': ' + m.titulo + '. Al terminar podrás ' + m.objetivo + ' Has explorado ' + pr.done + ' de ' + pr.total + ' instrumentos.'; },
      html: moduleHead(m, pr) +
        '<section class="stack"><h2 class="section-label">Instrumentos</h2><div class="list">' + m.instrumentos.map(function (iid) {
          var it = inst(iid), st;
          if (isDone(iid)) st = '<span class="state done" aria-label="Explorado">' + icon('check') + '</span>';
          else if (S.ultima === iid) st = '<span class="state viewing">Viendo</span>';
          else if (opened(iid)) st = '<span class="state viewing">En curso</span>';
          else st = '<span class="state new">Nuevo</span>';
          return '<a class="item' + (S.ultima === iid && !isDone(iid) ? ' current' : '') + '" href="#/ficha/' + iid + '"><span class="thumb"><img src="' + it.imagen + '" alt=""></span>' +
            '<span><strong>' + esc(it.nombre) + '</strong><small>' + esc(it.resumen) + '</small></span>' + st + '</a>';
        }).join('') + '</div></section>' +
        '<section class="stack"><h2 class="section-label">Actividades y evaluación</h2><div class="list">' + actHTML + miniItem(m, pr) + '</div></section>' +
        (m.id === 3 ? '<div class="banner">' + icon('users') + '<p><b>Parecidos pero diferentes</b> se hace en parejas: uno manipula los modelos y el otro registra; a mitad de la actividad cambian de rol.</p></div>' : '')
    };
  }

  /* Módulo 1 · lecciones */
  function thumbs(ids) {
    return '<div class="ex-row">' + ids.map(function (id) {
      var it = inst(id);
      return '<a class="ex" href="#/ficha/' + id + '"><img src="' + it.imagen + '" alt=""><span>' + esc(it.nombre) + '</span></a>';
    }).join('') + '</div>';
  }
  function completarLeccion(id) {
    var nuevo = !S.lecciones[id];
    S.lecciones[id] = true; save();
    if (nuevo) {
      var pr = modProgress(modulo(1));
      toast(pr.all ? '¡Completaste las 3 lecciones! El mini-reto del módulo 1 ya está activo.' : '¡Lección completada! Llevas ' + pr.done + ' de 3.');
    }
  }
  function viewLeccion(id) {
    var L = D.LECCIONES[id];
    if (!L) return null;
    var orden = modulo(1).lecciones, k = orden.indexOf(id), next = orden[k + 1];
    var nextHref = next ? '#/leccion/' + next : (miniAbierto(1) || orden.every(function (x) { return S.lecciones[x] || x === id; }) ? '#/evaluacion/minireto/1' : '#/modulo/1');
    var nextLabel = next ? 'Siguiente lección' : 'Ir al mini-reto';
    var base = { title: L.titulo, eyebrow: 'Módulo 1 · Lección ' + (k + 1) + ' de 3', back: '/modulo/1', navKey: 'modulos' };
    var foot = '<div class="btn-row"><a class="btn outline" href="#/modulo/1">' + icon('back') + 'Módulo</a>' +
      '<button class="btn primary" id="doneLec"' + (id === 'laboratorio' || S.lecciones[id] ? '' : ' disabled') + '>' + (id === 'laboratorio' && !S.lecciones[id] ? 'Entendido · ' + nextLabel.toLowerCase() : nextLabel) + icon('next') + '</button></div>';
    function bindFoot(el) {
      $('#doneLec', el).onclick = function () { completarLeccion(id); location.hash = nextHref.slice(1); };
    }

    if (id === 'laboratorio') {
      return Object.assign(base, {
        speak: function () { return L.titulo + '. ' + L.intro + ' ' + L.ideas.join(' ') + ' Normas básicas: ' + L.normas.join(' '); },
        html:
          '<p class="lead">' + esc(L.intro) + '</p>' +
          '<section class="card stack"><h2 class="h3">Ideas clave</h2><ul class="parts">' + L.ideas.map(function (t, i) { return '<li><span class="n">' + (i + 1) + '</span><span>' + esc(t) + '</span></li>'; }).join('') + '</ul></section>' +
          '<section class="stack"><h2 class="section-label">Los instrumentos se agrupan por lo que hacen</h2>' + L.grupos.map(function (g) {
            return '<div class="card stack" style="gap:8px"><div class="row between"><strong>' + esc(g.titulo) + '</strong><a class="chip teal" href="#/modulo/' + g.modulo + '">Módulo ' + g.modulo + '</a></div>' + thumbs(g.ejemplos) + '</div>';
          }).join('') + '</section>' +
          '<section class="card stack"><div class="row" style="gap:8px">' + icon('shield') + '<h2 class="h3">Normas básicas de seguridad</h2></div><ul class="parts">' +
          L.normas.map(function (t) { return '<li><span class="n" style="background:var(--ok)">' + icon('check') + '</span><span>' + esc(t) + '</span></li>'; }).join('') + '</ul></section>' +
          '<div class="notebook">' + icon('pencil') + '<span>Anota en tu cuaderno para qué sirve un laboratorio y dos normas de seguridad que te parezcan importantes.</span></div>' + foot,
        mount: bindFoot
      });
    }

    if (id === 'materiales') {
      var resp = {};
      var practica = function () {
        var ok = L.practica.filter(function (p) { return resp[p.instrumento] === p.correcta; }).length;
        return '<p class="small muted">' + ok + ' de ' + L.practica.length + ' correctos</p>' + L.practica.map(function (p) {
          var it = inst(p.instrumento), r = resp[p.instrumento], bien = r === p.correcta;
          return '<div class="pick-card' + (bien ? ' ok' : '') + '"><div class="row" style="gap:10px"><img src="' + it.imagen + '" alt=""><strong>' + esc(it.nombre) + '</strong></div>' +
            '<div class="pick" role="group" aria-label="Material de ' + esc(it.nombre) + '">' + L.materiales.map(function (mt) {
              var cls = r === mt.id ? (bien ? ' is-ok' : ' is-bad') : '';
              return '<button class="chip' + cls + '" data-p="' + p.instrumento + '" data-m="' + mt.id + '" aria-pressed="' + (r === mt.id) + '"' + (bien ? ' disabled' : '') + '>' + esc(mt.nombre) + '</button>';
            }).join('') + '</div>' +
            (r ? '<p class="small ' + (bien ? 'ok-text' : 'bad-text') + '">' + (bien ? esc(p.ok) : 'Todavía no. Mira de nuevo la tarjeta de ese material arriba.') + '</p>' : '') + '</div>';
        }).join('');
      };
      return Object.assign(base, {
        speak: function () { return L.titulo + '. ' + L.intro + ' ' + L.materiales.map(function (m) { return m.nombre + ': ' + m.texto; }).join(' '); },
        html:
          '<p class="lead">' + esc(L.intro) + '</p>' +
          '<section class="stack"><h2 class="section-label">Por su fabricación</h2>' + L.materiales.map(function (mt) {
            return '<div class="card mat-card stack" style="--mc:' + mt.color + ';gap:8px"><h3 class="h3">' + esc(mt.nombre) + '</h3><p>' + esc(mt.texto) + '</p>' + thumbs(mt.ejemplos) + '</div>';
          }).join('') + '</section>' +
          '<section class="card stack"><h2 class="h3">Por su uso</h2><p class="small muted">En el Laboratorio 3D puedes filtrar los 18 instrumentos por lo que hacen:</p><div class="filters">' +
          D.FUNCIONES.map(function (f) { return '<a class="chip" href="#/laboratorio">' + esc(f.label) + '</a>'; }).join('') + '</div></section>' +
          '<section class="stack"><h2 class="section-label">Practica: ¿de qué material es?</h2><div id="practica" class="stack" style="gap:10px">' + practica() + '</div></section>' + foot,
        mount: function (el) {
          function bind() {
            $$('[data-p]', el).forEach(function (b) {
              b.onclick = function () {
                resp[b.getAttribute('data-p')] = b.getAttribute('data-m');
                $('#practica', el).innerHTML = practica(); bind();
                var all = L.practica.every(function (p) { return resp[p.instrumento] === p.correcta; });
                if (all) { $('#doneLec', el).disabled = false; if (!S.lecciones[id]) completarLeccion(id); }
              };
            });
          }
          bind(); bindFoot(el);
        }
      });
    }

    // visor
    var it = inst(L.instrumento), hechas = {};
    var sinZoom = !use3D();
    if (sinZoom) hechas.ampliar = true;
    var misiones = function () {
      return '<ul class="missions">' + L.misiones.map(function (ms) {
        var ok = !!hechas[ms.id];
        var txt = ms.id === 'ampliar' && sinZoom ? 'Ampliar no está disponible en la vista en fotos (ya cuenta como hecha).' : ms.id === 'girar' && sinZoom ? 'Desliza el dedo o la barra para ver otra foto del instrumento.' : ms.texto;
        return '<li class="' + (ok ? 'ok' : '') + '"><span class="n">' + icon(ok ? 'check' : ms.icono) + '</span><span>' + esc(txt) + '</span></li>';
      }).join('') + '</ul>';
    };
    return Object.assign(base, {
      speak: function () { return L.titulo + '. ' + L.intro + ' Misiones: ' + L.misiones.map(function (m) { return m.texto; }).join(' '); },
      html:
        '<p class="lead">' + esc(L.intro) + '</p>' +
        viewerHTML(it) +
        '<section class="card stack"><h2 class="h3">Misiones</h2><div id="mis">' + misiones() + '</div></section>' +
        '<section class="card stack"><h2 class="h3">Partes de la ' + esc(it.nombre.toLowerCase()) + '</h2><ul class="parts">' + it.partes.map(function (p) {
          return '<li><button class="part-btn" data-part="' + p.n + '"><span class="n">' + p.n + '</span><span><b>' + esc(p.nombre) + ':</b> ' + esc(p.texto) + '</span></button></li>';
        }).join('') + '</ul></section>' +
        '<section class="card stack"><h2 class="h3">Consejos</h2><ul class="parts">' + L.consejos.map(function (c) { return '<li><span class="n">' + icon('bulb') + '</span><span>' + esc(c) + '</span></li>'; }).join('') + '</ul></section>' + foot,
      mount: function (el) {
        var r0 = null, t0 = null;
        function marcar(mid) {
          if (hechas[mid]) return;
          hechas[mid] = true; $('#mis', el).innerHTML = misiones();
          var all = L.misiones.every(function (m) { return hechas[m.id]; });
          if (all) { $('#doneLec', el).disabled = false; if (!S.lecciones[id]) completarLeccion(id); }
          else toast('¡Misión cumplida!');
        }
        function parte(n) { var p = it.partes.filter(function (x) { return x.n === n; })[0]; if (p) toast(p.nombre + ': ' + p.texto); marcar('punto'); }
        mountViewer($('.viewer-card', el), it, {
          onPart: parte,
          onZoom: function () { marcar('ampliar'); },
          onCamera: function (c) {
            if (r0 === null) { r0 = c.radius; t0 = c.theta; }
            if (Math.abs(c.theta - t0) > 0.35) marcar('girar');
            if (c.radius < r0 * 0.88) marcar('ampliar');
          },
          onAlt: function (k) { if (k > 0) marcar('girar'); }
        });
        $$('.part-btn', el).forEach(function (b) { b.onclick = function () { parte(Number(b.getAttribute('data-part'))); }; });
        bindFoot(el);
      }
    });
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
    var nextLabel = nextId ? 'Siguiente: ' + inst(nextId).nombre.split(' ')[0] : (miniAbierto(m.id) ? 'Ir al mini-reto' : 'Volver al módulo');
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
          else go(miniAbierto(m.id) ? '/evaluacion/minireto/' + m.id : '/modulo/' + m.id);
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
    var reto = retoAbierto();
    function estado(a) {
      if (a.id === 'mesa') return S.retoFinal ? 'done' : reto ? 'new' : 'locked';
      if (a.id === 'explicalo') return S.explicalo ? 'done' : 'new';
      if (a.id === 'parecidos') return S.actividades.parecidos ? 'done' : 'new';
      if (a.modulos) return a.modulos.some(function (m) { return actData(a.id, m); }) ? 'done' : 'new';
      return D.MODULOS.some(function (m) { return modProgress(m).done > 0; }) ? 'done' : 'new';
    }
    return {
      title: 'Actividades', eyebrow: D.ACTIVIDADES.length + ' actividades en Orbita', back: '/menu', navKey: 'inicio',
      html:
        '<p class="lead">Cada actividad dice qué hacer en una o dos frases, muestra un ejemplo y se puede repetir sin penalización.</p>' +
        '<div class="list">' + D.ACTIVIDADES.map(function (a) {
          var e = estado(a), locked = e === 'locked';
          var st = e === 'done' ? '<span class="state done" aria-label="Realizada">' + icon('check') + '</span>' : (locked ? '<span class="state soon">Bloqueada</span>' : '<span class="state new">Nueva</span>');
          var inner = '<span class="thumb ' + (locked ? '' : (a.cierre ? 'c-amber' : 'c-orange')) + '">' + icon(locked ? 'lock' : a.icono) + '</span>' +
            '<span><strong>' + esc(a.nombre) + '</strong><small>' + esc(a.resumen) + '</small><small>' + a.oe.join(' · ') + ' · ' + esc(a.donde) + '</small></span>' + st;
          return locked ? '<div class="item locked">' + inner + '</div>' : '<a class="item" href="#/actividad/' + a.id + '">' + inner + '</a>';
        }).join('') + '</div>' +
        (reto ? '' : '<div class="banner">' + icon('info') + '<p><b>Arma tu mesa de trabajo</b> se activa cuando completas los cuatro módulos (lecciones del módulo 1 y fichas de los módulos 2, 3 y 4).</p></div>')
    };
  }

  // Actividades que se repiten en varios módulos: primero se elige el módulo
  function viewElegirModulo(aid) {
    var a = D.ACTIVIDADES.filter(function (x) { return x.id === aid; })[0];
    return {
      title: a.nombre, eyebrow: 'Elige el módulo', back: '/actividades', navKey: 'inicio',
      html:
        '<div class="goal">' + icon('bulb') + '<p>' + esc(a.resumen) + '</p></div>' +
        '<div class="list">' + a.modulos.map(function (mid) {
          var m = modulo(mid), d = actData(aid, mid);
          var detalle = aid === 'quien-soy' ? '6 rondas con los instrumentos del módulo' : (mid === 4 ? '5 categorías · los 18 instrumentos' : '2 bandejas · 6 instrumentos');
          return '<a class="item" href="#/actividad/' + aid + '/' + mid + '"><span class="thumb c-orange">' + mid + '</span><span><strong>Módulo ' + mid + ' · ' + esc(m.corto) + '</strong><small>' + detalle + '</small></span>' +
            (d ? '<span class="state done" aria-label="Realizada">' + icon('check') + '</span>' : '<span class="state new">Nueva</span>') + '</a>';
        }).join('') + '</div>'
    };
  }

  function viewExplora() {
    var mods = D.MODULOS.filter(function (m) { return m.instrumentos.length; });
    return {
      title: 'Explora y descubre', eyebrow: 'Actividad base · OE1 · OE2', back: '/actividades', navKey: 'inicio',
      html:
        '<div class="goal">' + icon('bulb') + '<p>Abre la ficha de cada instrumento, gíralo, amplíalo y toca los puntos numerados. Después revisa sus pestañas.</p></div>' +
        '<section class="card stack"><h2 class="h3">En tu cuaderno</h2><p class="lead">Para cada instrumento, anota su nombre y dos características que hayas observado en el modelo. Ese registro te servirá para estudiar sin pantalla.</p>' +
        '<div class="table-wrap" tabindex="0" role="region" aria-label="Tabla: desliza para ver todas las columnas"><table class="cuadro"><thead><tr><th>Instrumento</th><th>Característica 1</th><th>Característica 2</th></tr></thead><tbody>' +
        '<tr><td>Ejemplo: Probeta graduada</td><td>Tiene escala en mL</td><td>Tiene base ancha</td></tr>' +
        '<tr><td class="blank">…</td><td class="blank">…</td><td class="blank">…</td></tr></tbody></table></div></section>' +
        '<a class="item" href="#/laboratorio"><span class="thumb c-teal">' + icon('flask') + '</span><span><strong>Módulo 1 · Recorrido libre</strong><small>Recorre el Laboratorio 3D y filtra por función o por material</small></span><span class="state viewing">Ir</span></a>' +
        mods.map(function (m) {
          var pr = modProgress(m);
          return '<section class="stack"><div class="row between"><h2 class="section-label">Módulo ' + m.id + ' · ' + esc(m.corto) + '</h2><span class="small muted">' + pr.done + ' de ' + pr.total + '</span></div><div class="list">' + m.instrumentos.map(function (iid) {
            var it = inst(iid);
            return '<a class="item" href="#/ficha/' + iid + '"><span class="thumb"><img src="' + it.imagen + '" alt=""></span><span><strong>' + esc(it.nombre) + '</strong><small>' + esc(it.resumen) + '</small></span>' +
              (isDone(iid) ? '<span class="state done" aria-label="Explorado">' + icon('check') + '</span>' : '<span class="state new">Abrir</span>') + '</a>';
          }).join('') + '</div></section>';
        }).join('')
    };
  }

  /* ¿Quién soy? */
  function viewQuienSoy(mid) {
    mid = Number(mid);
    var m = modulo(mid);
    if (!m || !m.instrumentos.length) return null;
    var ids = m.instrumentos, key = actKey('quien-soy', mid), N = ids.length, MAXP = N * 4;
    var st = { started: false, order: shuffle(ids), i: 0, hints: 0, answered: null, points: 0, correct: 0, opts: [] };
    function newRound() { st.hints = 0; st.answered = null; var cur = st.order[st.i]; st.opts = shuffle([cur].concat(shuffle(ids.filter(function (x) { return x !== cur; })).slice(0, 3))); }
    function worth() { return Math.max(1, 4 - st.hints); }
    var ejemplo = { 2: 'si ves un tubo alto con escala y base ancha, piensa en los instrumentos que sirven para medir.', 3: 'si ves un aro sostenido por patas, piensa en los instrumentos que sostienen recipientes sobre el mechero.', 4: 'si ves un cuenco grueso con un mazo, piensa en los instrumentos que sirven para triturar.' }[mid];
    function paint(el) {
      if (!st.started) {
        el.innerHTML =
          '<div class="goal">' + icon('bulb') + '<p>Un instrumento gira en pantalla sin su nombre. Elige cuál es entre cuatro opciones.</p></div>' +
          '<section class="card stack"><h2 class="h3">Cómo se juega</h2>' +
          '<ul class="parts"><li><span class="n">1</span><span>Observa el modelo. Puedes girarlo y ampliarlo.</span></li><li><span class="n">2</span><span>Si dudas, pide hasta 3 pistas: forma, material y uso. Cada pista resta un punto.</span></li><li><span class="n">3</span><span>Elige tu respuesta. Siempre verás en qué detalle debías fijarte.</span></li></ul>' +
          '<p class="small muted">Ejemplo: ' + esc(ejemplo) + '</p></section>' +
          '<button class="btn primary block" id="go">Empezar · ' + N + ' rondas</button>';
        $('#go', el).onclick = function () { st.started = true; newRound(); paint(el); };
        return;
      }
      if (st.i >= st.order.length) {
        var prev = S.actividades[key] || {};
        var best = Math.max(st.points, prev.mejor || 0);
        S.actividades[key] = { mejor: best, ultimo: st.points, aciertos: st.correct, veces: (prev.veces || 0) + 1, fecha: Date.now() };
        save();
        el.innerHTML =
          '<section class="award"><svg viewBox="0 0 64 64" aria-hidden="true">' + medal('#3a4cca') + '</svg><div><small>¡Terminaste!</small><strong>' + st.points + ' de ' + MAXP + ' puntos</strong><span class="muted">' + st.correct + ' de ' + N + ' instrumentos reconocidos</span></div></section>' +
          '<p class="lead">Tu mejor puntaje: ' + best + ' puntos. Puedes repetir la actividad las veces que quieras.</p>' +
          '<div class="btn-row even"><button class="btn outline" id="again">' + icon('rotate') + 'Repetir</button><a class="btn primary" href="#/modulo/' + mid + '">Volver al módulo</a></div>';
        $('#again', el).onclick = function () { st = { started: true, order: shuffle(ids), i: 0, hints: 0, answered: null, points: 0, correct: 0, opts: [] }; newRound(); paint(el); };
        return;
      }
      var cur = inst(st.order[st.i]);
      var hintKeys = ['forma', 'material', 'uso'];
      el.innerHTML =
        '<div class="qhead"><div class="row between small"><b>Ronda ' + (st.i + 1) + ' de ' + N + '</b><span class="points">Vale ' + worth() + (worth() === 1 ? ' punto' : ' puntos') + ' · Total ' + st.points + '</span></div>' +
        '<div class="segments" style="grid-template-columns:repeat(' + N + ',1fr)">' + st.order.map(function (_, k) { return '<i class="' + (k < st.i ? 'ok' : k === st.i ? 'now' : '') + '"></i>'; }).join('') + '</div></div>' +
        viewerHTML(cur, { hotspots: false, anon: true, controls: false, hint: false }) +
        '<div class="hints">' + hintKeys.slice(0, st.hints).map(function (k, n) { return '<div class="hint-line">' + icon('bulb') + '<p><b>Pista ' + (n + 1) + ' · ' + k + ':</b> ' + esc(cur.pistas[k]) + '</p></div>'; }).join('') +
        (st.hints < 3 && !st.answered ? '<button class="btn ghost" id="hintBtn">' + icon('bulb') + 'Pedir pista ' + (st.hints + 1) + ' de 3: ' + hintKeys[st.hints] + '</button>' : '') + '</div>' +
        '<div class="options text" role="radiogroup" aria-label="¿Quién soy?">' + st.opts.map(function (oid, k) {
          var o = inst(oid), cls = '';
          if (st.answered) { if (oid === cur.id) cls = ' is-ok'; else if (oid === st.answered) cls = ' is-bad'; }
          return '<button class="opt' + cls + '" role="radio" aria-checked="' + (st.answered === oid) + '" data-o="' + oid + '"' + (st.answered ? ' disabled' : '') + '><span class="letter">' + LETTERS(k) + '</span>' + esc(o.nombre) + '</button>';
        }).join('') + '</div>' +
        (st.answered ? '<div class="feedback ' + (st.answered === cur.id ? 'ok' : 'bad') + '" role="status">' + icon(st.answered === cur.id ? 'checkCircle' : 'xCircle') +
          '<div><b>' + (st.answered === cur.id ? '¡Sí! Soy ' + esc(cur.nombre) + '.' : 'No. Soy ' + esc(cur.nombre) + '.') + '</b><p>' + esc(cur.fijate) + '</p>' +
          (st.answered !== cur.id ? '<p><a href="#/ficha/' + cur.id + '">' + icon('book') + ' Ver la ficha</a></p>' : '') + '</div></div>' +
          '<button class="btn primary block" id="nextR">' + (st.i < N - 1 ? 'Siguiente ronda' : 'Ver mi puntaje') + icon('next') + '</button>' : '');
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
      title: '¿Quién soy?', eyebrow: 'Actividad · Módulo ' + mid, back: '/modulo/' + mid, navKey: 'modulos',
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
  function viewCadaCosa(mid) {
    mid = Number(mid);
    var C = D.CLASIFICACION[mid];
    if (!C) return null;
    var key = actKey('cada-cosa', mid), ids = Object.keys(C.items), total = ids.length;
    function nuevo() { var pl = {}; C.bandejas.forEach(function (b) { pl[b.id] = []; }); return { started: true, pool: shuffle(ids), placed: pl, sel: null, msg: null, errors: 0, saved: false }; }
    var st = nuevo(); st.started = false;
    var nombres = C.bandejas.map(function (b) { return '<b>' + esc(b.nombre) + '</b>'; });
    function paint(el) {
      if (!st.started) {
        el.innerHTML =
          '<div class="goal">' + icon('bulb') + '<p>Toca un instrumento y luego la bandeja a la que pertenece.</p></div>' +
          '<section class="card stack"><h2 class="h3">Cómo se juega</h2><ul class="parts">' +
          '<li><span class="n">1</span><span>Toca un instrumento de la lista <b>Por ubicar</b>.</span></li>' +
          '<li><span class="n">2</span><span>Toca la bandeja donde crees que va: ' + (nombres.length === 2 ? nombres.join(' o ') : nombres.slice(0, -1).join(', ') + ' o ' + nombres[nombres.length - 1]) + '.</span></li>' +
          '<li><span class="n">3</span><span>Si aciertas, queda en la bandeja. Si no, verás por qué y el instrumento vuelve a la lista para intentarlo otra vez.</span></li></ul>' +
          (mid === 4 ? '<p class="small muted">En este módulo trabajas con los 18 instrumentos de todo Orbita: piensa en la función principal de cada uno.</p>' : '<p class="small muted">Ejemplo: la probeta va en «Sirven para medir volumen» porque tiene una escala en mililitros.</p>') + '</section>' +
          '<button class="btn primary block" id="go">Empezar · ' + total + ' instrumentos</button>';
        $('#go', el).onclick = function () { st.started = true; paint(el); };
        return;
      }
      var placedN = C.bandejas.reduce(function (a, b) { return a + st.placed[b.id].length; }, 0);
      if (placedN === total && !st.saved) {
        var prev = S.actividades[key] || {};
        S.actividades[key] = { veces: (prev.veces || 0) + 1, errores: st.errors, fecha: Date.now() };
        st.saved = true; save();
      }
      el.innerHTML =
        '<div class="goal">' + icon('bulb') + '<p>Toca un instrumento y luego la bandeja a la que pertenece.</p></div>' +
        '<div class="trays' + (C.bandejas.length > 2 ? ' many' : '') + '">' + C.bandejas.map(function (b) {
          return '<button class="tray' + (st.sel ? ' armed' : '') + '" data-tray="' + b.id + '"><h3>' + icon(b.icono) + '<span class="sr-only">Bandeja: </span>' + esc(b.nombre) + '<span class="cnt">' + st.placed[b.id].length + '</span></h3><span class="placed">' +
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
          : '<section class="award"><svg viewBox="0 0 64 64" aria-hidden="true">' + medal('#0b8f81') + '</svg><div><small>¡Actividad completada!</small><strong>' + total + ' de ' + total + ' ubicados</strong><span class="muted">' + (st.errors === 0 ? 'Sin errores' : st.errors + (st.errors === 1 ? ' intento por corregir' : ' intentos por corregir')) + '</span></div></section>') +
        (st.msg ? '<div class="feedback ' + st.msg.kind + '" role="status">' + icon(st.msg.kind === 'ok' ? 'checkCircle' : 'xCircle') + '<p><b>' + (st.msg.kind === 'ok' ? '¡Muy bien!' : 'Todavía no.') + '</b> ' + esc(st.msg.text) + '</p></div>' : '') +
        '<div class="btn-row' + (placedN === total ? ' even' : '') + '"><button class="btn outline" id="restart">' + icon('rotate') + 'Empezar de nuevo</button>' +
        (placedN === total ? '<a class="btn primary" href="#/modulo/' + mid + '">Volver al módulo</a>' : '<span></span>') + '</div>';
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
          var f = $('.feedback', el); if (f && C.bandejas.length > 2) f.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        };
      });
      $('#restart', el).onclick = function () { st = nuevo(); paint(el); };
    }
    return {
      title: 'Cada cosa en su lugar', eyebrow: 'Actividad · Módulo ' + mid, back: '/modulo/' + mid, navKey: 'modulos',
      html: '<div id="game" class="stack" style="gap:14px"></div>',
      mount: function (el) { paint($('#game', el)); }
    };
  }

  /* Parecidos pero diferentes */
  function viewParecidos() {
    var done = (S.actividades.parecidos || {}).parejas || {};
    return {
      title: 'Parecidos pero diferentes', eyebrow: 'Actividad en parejas · Módulo 3', back: '/modulo/3', navKey: 'modulos',
      html:
        '<div class="goal">' + icon('users') + '<p>En parejas, comparen dos instrumentos que suelen confundirse y completen en el cuaderno un cuadro de semejanzas y diferencias.</p></div>' +
        '<p class="small muted">Elijan al menos dos parejas. Las dos primeras retoman instrumentos del módulo 2.</p>' +
        '<div class="list">' + D.PAREJAS.map(function (p) {
          var a = inst(p.a), b = inst(p.b);
          return '<a class="item" href="#/actividad/parecidos/' + p.id + '"><span class="thumb duo"><img src="' + a.imagen + '" alt=""><img src="' + b.imagen + '" alt=""></span><span><strong>' + esc(a.nombre) + ' y ' + esc(b.nombre.toLowerCase()) + '</strong><small>Módulo ' + a.modulo + ' · comparar forma, material y uso</small></span>' +
            (done[p.id] ? '<span class="state done" aria-label="Realizada">' + icon('check') + '</span>' : '<span class="state new">Nueva</span>') + '</a>';
        }).join('') + '</div>' +
        '<div class="banner">' + icon('clipboard') + '<p>Tu docente revisa el trabajo con una lista de chequeo: que ambos manipulen los modelos, que registren diferencias y semejanzas correctas y que participen en la puesta en común.</p></div>'
    };
  }
  function viewPareja(pid) {
    var p = D.PAREJAS.filter(function (x) { return x.id === pid; })[0];
    if (!p) return null;
    var a = inst(p.a), b = inst(p.b), swapped = false, reveal = false;
    function cuadro() {
      return '<div class="table-wrap" tabindex="0" role="region" aria-label="Tabla: desliza para ver todas las columnas"><table class="cuadro"><thead><tr><th></th><th>' + esc(a.nombre) + '</th><th>' + esc(b.nombre) + '</th></tr></thead><tbody>' +
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
      title: 'Parecidos pero diferentes', eyebrow: a.nombre + ' y ' + b.nombre.toLowerCase(), back: '/actividad/parecidos', navKey: 'modulos',
      html:
        '<div class="pair">' + [a, b].map(function (it) {
          return '<div>' + viewerHTML(it, { hotspots: false, controls: false, hint: false, chip: false }) + '<p class="label">' + esc(it.nombre) + '</p></div>';
        }).join('') + '</div>' +
        '<section class="stack"><h2 class="section-label">Roles</h2><div class="roles" id="roles">' + roles() + '</div>' +
        '<button class="btn outline" id="swap">' + icon('rotate') + 'Cambiar roles a mitad de la actividad</button></section>' +
        '<section class="card stack"><h2 class="h3">Conversen y respondan</h2><ul class="parts">' +
        p.preguntas.map(function (q, i) { return '<li><span class="n">' + (i + 1) + '</span><span>' + esc(q) + '</span></li>'; }).join('') + '</ul></section>' +
        '<section class="stack"><h2 class="section-label">Cuadro para el cuaderno</h2><div id="cuadro">' + cuadro() + '</div>' +
        '<button class="btn ghost" id="reveal">' + icon('checkCircle') + 'Comparar con el cuadro sugerido</button></section>' +
        '<button class="btn primary block" id="doneBtn">Terminamos la comparación</button>',
      mount: function (el) {
        $$('.viewer-card', el).forEach(function (c, k) { mountViewer(c, k ? b : a, { hotspots: false, controls: false, hint: false, chip: false }); });
        $('#swap', el).onclick = function () { swapped = !swapped; $('#roles', el).innerHTML = roles(); toast('Cambien de rol: ahora el otro estudiante manipula los modelos.'); };
        $('#reveal', el).onclick = function () { reveal = !reveal; $('#cuadro', el).innerHTML = cuadro(); this.innerHTML = icon(reveal ? 'x' : 'checkCircle') + (reveal ? 'Ocultar el cuadro sugerido' : 'Comparar con el cuadro sugerido'); };
        $('#doneBtn', el).onclick = function () {
          var cur = S.actividades.parecidos || { parejas: {}, veces: 0 };
          cur.parejas = cur.parejas || {};
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
    var d = S.diag;
    return {
      title: 'Evaluación', eyebrow: 'Diagnóstica, mini-retos y reto final', back: '/menu', navKey: 'inicio',
      html:
        '<p class="lead">La evaluación es para aprender: no hay límite de tiempo y siempre verás por qué una respuesta es correcta o no.</p>' +
        '<section class="stack"><h2 class="section-label">Antes de empezar</h2>' +
        '<a class="item" href="#/evaluacion/diagnostica"><span class="thumb c-primary">' + icon('help') + '</span><span><strong>¿Qué sé del laboratorio?</strong><small>Prueba diagnóstica · 8 preguntas · sin calificación</small></span>' +
        (d ? '<span class="state done" aria-label="Realizada">' + icon('check') + '</span>' : '<span class="state new">Nueva</span>') + '</a></section>' +
        '<section class="stack"><h2 class="section-label">Mini-retos por módulo</h2><div class="list">' + D.MODULOS.map(function (m) {
          var pr = modProgress(m);
          if (!miniAbierto(m.id)) return '<div class="item locked"><span class="thumb">' + icon('lock') + '</span><span><strong>Mini-reto · Módulo ' + m.id + '</strong><small>' + (m.lecciones ? 'Completa las 3 lecciones' : 'Explora los ' + pr.total + ' instrumentos') + ' para activarlo (' + pr.done + ' de ' + pr.total + ')</small></span><a class="state viewing" href="#/modulo/' + m.id + '">Ir</a></div>';
          var md = miniData(m.id);
          return '<a class="item" href="#/evaluacion/minireto/' + m.id + '"><span class="thumb c-violet">' + icon('clipboard') + '</span><span><strong>Mini-reto · Módulo ' + m.id + '</strong><small>' + (md ? 'Último intento: ' + md.intentos[md.intentos.length - 1].aciertos + ' de 5' : '5 preguntas · logro con 4 aciertos') + '</small></span>' +
            (hasBadge(m.id) ? '<span class="state done" aria-label="Logrado">' + icon('check') + '</span>' : '<span class="state viewing">Listo</span>') + '</a>';
        }).join('') + '</div></section>' +
        '<section class="stack"><h2 class="section-label">Cierre</h2>' +
        (retoAbierto()
          ? '<a class="item" href="#/actividad/mesa"><span class="thumb c-amber">' + icon('flask') + '</span><span><strong>Reto final: Arma tu mesa de trabajo</strong><small>6 situaciones · se valora con rúbrica</small></span>' + (S.retoFinal ? '<span class="state done" aria-label="Realizado">' + icon('check') + '</span>' : '<span class="state viewing">Listo</span>') + '</a>'
          : '<div class="item locked"><span class="thumb">' + icon('lock') + '</span><span><strong>Reto final: Arma tu mesa de trabajo</strong><small>Se activa al completar los 4 módulos · se valora con rúbrica</small></span><span></span></div>') +
        '<a class="item" href="#/actividad/explicalo"><span class="thumb c-amber">' + icon('pencil') + '</span><span><strong>Explícalo con tus palabras</strong><small>Cierre en clase: oral, escrito o con un dibujo rotulado</small></span>' + (S.explicalo ? '<span class="state done" aria-label="Preparado">' + icon('check') + '</span>' : '<span class="state new">Nueva</span>') + '</a></section>'
    };
  }

  /* Reto final · Arma tu mesa de trabajo */
  function evaluarMesa(sit, sel) {
    var faltan = sit.necesarios.filter(function (g) { return !g.some(function (id) { return sel.indexOf(id) >= 0; }); });
    var validos = sit.necesarios.reduce(function (a, g) { return a.concat(g); }, []).concat(sit.utiles);
    var bien = sel.filter(function (id) { return validos.indexOf(id) >= 0; });
    var sobran = sel.filter(function (id) { return validos.indexOf(id) < 0; });
    return { faltan: faltan, bien: bien, sobran: sobran, completa: !faltan.length && !sobran.length };
  }
  function porque(sit, id) {
    var it = inst(id);
    return (sit.explica && sit.explica[id]) || (it.nombre + ' sirve para ' + it.resumen.toLowerCase() + '; en esta situación no se necesita.');
  }
  function viewRetoFinal() {
    if (!retoAbierto()) {
      return {
        title: 'Arma tu mesa de trabajo', eyebrow: 'Reto final', back: '/evaluacion', navKey: 'inicio',
        html: '<div class="banner">' + icon('lock') + '<p>El reto final se activa cuando completas los cuatro módulos: las 3 lecciones del módulo 1 y las fichas de los módulos 2, 3 y 4.</p></div>' +
          '<div class="list">' + D.MODULOS.map(function (m) { var pr = modProgress(m); return '<a class="item" href="#/modulo/' + m.id + '"><span class="thumb ' + (pr.all ? 'c-teal' : '') + '">' + icon(pr.all ? 'check' : 'layers') + '</span><span><strong>Módulo ' + m.id + ' · ' + esc(m.corto) + '</strong><small>' + pr.done + ' de ' + pr.total + ' ' + pr.unidad + '</small></span><span class="go">' + icon('next') + '</span></a>'; }).join('') + '</div>'
      };
    }
    var R = D.RETO_FINAL.situaciones, todos = Object.keys(D.INSTRUMENTOS);
    var st = { started: false, i: 0, sel: [], checked: false, intentos: 0, answers: [], just: '', oral: false };
    function paint(el) {
      if (!st.started) {
        el.innerHTML =
          '<div class="goal">' + icon('bulb') + '<p>Lee la situación y toca en el estante los instrumentos que usarías. Luego explica por qué los elegiste.</p></div>' +
          '<section class="card stack"><h2 class="h3">Cómo funciona</h2><ul class="parts">' +
          '<li><span class="n">1</span><span>Son ' + R.length + ' situaciones sencillas: no tienes que hacer ningún procedimiento, solo elegir.</span></li>' +
          '<li><span class="n">2</span><span>Toca «Comprobar mi mesa» y verás qué elegiste bien, qué te faltó y qué no hacía falta. Puedes corregir.</span></li>' +
          '<li><span class="n">3</span><span>Escribe una frase corta con tu justificación o marca que la explicarás de forma oral a tu docente.</span></li></ul>' +
          '<p class="small muted">Ejemplo: para «Debes calentar agua en un recipiente de vidrio», una mesa completa tiene el mechero Bunsen, el trípode, la rejilla y el vaso de precipitados.</p></section>' +
          '<button class="btn primary block" id="go">Empezar el reto</button>';
        $('#go', el).onclick = function () { st.started = true; paint(el); };
        return;
      }
      var sit = R[st.i], ev = st.checked ? evaluarMesa(sit, st.sel) : null;
      el.innerHTML =
        '<div class="qhead"><div class="row between small"><b>Situación ' + (st.i + 1) + ' de ' + R.length + '</b><span class="row" style="gap:4px">' + icon('clock') + 'Sin límite de tiempo</span></div>' +
        '<div class="segments" style="grid-template-columns:repeat(' + R.length + ',1fr)">' + R.map(function (_, k) { return '<i class="' + (k < st.i ? (st.answers[k].completa ? 'ok' : 'bad') : k === st.i ? 'now' : '') + '"></i>'; }).join('') + '</div></div>' +
        '<section class="qcard"><p class="q" id="qtext">' + esc(sit.texto) + '</p><button class="listen" id="listenS">' + icon('volume') + 'Escuchar situación</button></section>' +
        '<div class="row between"><h2 class="section-label">Estante · toca para elegir</h2><span class="small muted">' + st.sel.length + ' elegidos</span></div>' +
        '<div class="shelf" role="group" aria-label="Estante con los 18 instrumentos">' + todos.map(function (id) {
          var it = inst(id), on = st.sel.indexOf(id) >= 0, cls = '';
          if (ev) { if (on && ev.sobran.indexOf(id) >= 0) cls = ' is-bad'; else if (on) cls = ' is-ok'; else if (ev.faltan.some(function (g) { return g.indexOf(id) >= 0; })) cls = ' is-missing'; }
          return '<button class="shelf-item' + cls + '" data-i="' + id + '" aria-pressed="' + on + '"' + (st.checked ? ' disabled' : '') + '><img src="' + it.imagen + '" alt=""><span>' + esc(it.nombre) + '</span>' + (on ? '<i class="tick">' + icon('check') + '</i>' : '') + '</button>';
        }).join('') + '</div>' +
        (!st.checked
          ? '<button class="btn primary block" id="check"' + (st.sel.length ? '' : ' disabled') + '>Comprobar mi mesa</button>'
          : '<div class="feedback ' + (ev.completa ? 'ok' : 'bad') + '" role="status">' + icon(ev.completa ? 'checkCircle' : 'info') + '<div><b>' + (ev.completa ? '¡Mesa completa!' : (ev.faltan.length ? 'Te faltan instrumentos.' : 'Tu mesa tiene instrumentos que no hacen falta.')) + '</b>' +
            (ev.bien.length ? '<p class="fb-h">Elegiste bien</p><ul class="fb">' + ev.bien.map(function (id) { return '<li><b>' + esc(inst(id).nombre) + ':</b> ' + esc(porque(sit, id)) + '</li>'; }).join('') + '</ul>' : '') +
            (ev.faltan.length ? '<p class="fb-h">Te faltó</p><ul class="fb">' + ev.faltan.map(function (g) { return '<li><b>' + g.map(function (id) { return esc(inst(id).nombre); }).join(' o ') + ':</b> ' + esc(porque(sit, g[0])) + '</li>'; }).join('') + '</ul>' : '') +
            (ev.sobran.length ? '<p class="fb-h">No hacía falta</p><ul class="fb">' + ev.sobran.map(function (id) { return '<li><b>' + esc(inst(id).nombre) + ':</b> ' + esc(porque(sit, id)) + '</li>'; }).join('') + '</ul>' : '') + '</div></div>' +
            (ev.completa ? '' : '<button class="btn outline block" id="fix">' + icon('rotate') + 'Corregir mi mesa</button>') +
            '<section class="card stack"><label class="h3" for="just">¿Por qué elegiste estos instrumentos?</label>' +
            '<textarea id="just" rows="3" placeholder="Ej.: Elegí la probeta porque tiene escala en mililitros y mide con precisión.">' + esc(st.just) + '</textarea>' +
            '<label class="check-line"><input type="checkbox" id="oral"' + (st.oral ? ' checked' : '') + '> Prefiero explicarlo de forma oral a mi docente</label></section>' +
            '<button class="btn primary block" id="nextS"' + (st.just.trim().length >= 10 || st.oral ? '' : ' disabled') + '>' + (st.i < R.length - 1 ? 'Siguiente situación' : 'Terminar el reto') + icon('next') + '</button>');
      $('#listenS', el).onclick = function () { Voice.speak(sit.texto); };
      $$('[data-i]', el).forEach(function (b) {
        b.onclick = function () {
          var id = b.getAttribute('data-i'), k = st.sel.indexOf(id);
          if (k >= 0) st.sel.splice(k, 1); else st.sel.push(id);
          var y = $('#view').scrollTop; paint(el); $('#view').scrollTop = y;
        };
      });
      var c = $('#check', el); if (c) c.onclick = function () { st.checked = true; st.intentos++; paint(el); var f = $('.feedback', el); if (f) f.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
      var fx = $('#fix', el); if (fx) fx.onclick = function () { st.checked = false; paint(el); };
      var j = $('#just', el), nb = $('#nextS', el);
      if (j) j.oninput = function () { st.just = j.value; nb.disabled = !(st.just.trim().length >= 10 || st.oral); };
      var o = $('#oral', el); if (o) o.onchange = function () { st.oral = o.checked; nb.disabled = !(st.just.trim().length >= 10 || st.oral); };
      if (nb) nb.onclick = function () {
        var r = evaluarMesa(sit, st.sel);
        st.answers.push({ id: sit.id, elegidos: st.sel.slice(), completa: r.completa, faltan: r.faltan.map(function (g) { return g[0]; }), sobran: r.sobran, intentos: st.intentos, justificacion: st.just.trim(), oral: st.oral });
        if (st.i < R.length - 1) { st.i++; st.sel = []; st.checked = false; st.intentos = 0; st.just = ''; st.oral = false; paint(el); window.scrollTo(0, 0); $('#view').scrollTop = 0; }
        else { S.retoFinal = { respuestas: st.answers, fecha: Date.now() }; save(); go('/reto-final/resultado'); }
      };
    }
    return {
      title: 'Arma tu mesa de trabajo', eyebrow: 'Reto final · OE3 · OE5', back: '/evaluacion', close: true, nav: false,
      speak: function () { return st.started ? R[st.i].texto + ' Toca en el estante los instrumentos que usarías.' : $('#view').innerText; },
      html: '<div id="reto" class="stack" style="gap:14px"></div>',
      mount: function (el) { paint($('#reto', el)); }
    };
  }

  function rubricaHTML() {
    return '<div class="table-wrap" tabindex="0" role="region" aria-label="Tabla: desliza para ver todas las columnas"><table class="cuadro rubrica"><thead><tr><th>Criterio</th><th>Superior</th><th>Alto</th><th>Básico</th><th>Bajo</th></tr></thead><tbody>' +
      D.RUBRICA.map(function (r) { return '<tr><th>' + esc(r.criterio) + '</th><td>' + esc(r.superior) + '</td><td>' + esc(r.alto) + '</td><td>' + esc(r.basico) + '</td><td>' + esc(r.bajo) + '</td></tr>'; }).join('') +
      '</tbody></table></div>';
  }
  function viewRetoResultado() {
    var rf = S.retoFinal;
    if (!rf) return null;
    var R = D.RETO_FINAL.situaciones, comp = rf.respuestas.filter(function (a) { return a.completa; }).length;
    return {
      title: 'Resultado del reto final', eyebrow: 'Arma tu mesa de trabajo', back: '/evaluacion', close: true, navKey: 'inicio',
      speak: function () { return 'Completaste el reto final. Armaste ' + comp + ' de ' + R.length + ' mesas completas en tu último intento. Muestra esta pantalla a tu docente.'; },
      html:
        '<section class="award"><svg viewBox="0 0 64 64" aria-hidden="true">' + medal('#e08a00') + '</svg><div><small>¡Reto final completado!</small><strong>Laboratorista Orbita</strong><span class="muted small">' + comp + ' de ' + R.length + ' mesas completas</span></div></section>' +
        '<div class="banner">' + icon('clipboard') + '<p>Muestra esta pantalla a tu docente o toma una captura. Tu docente valora el reto con la rúbrica de abajo, junto con tu explicación.</p></div>' +
        rf.respuestas.map(function (a, k) {
          var sit = R.filter(function (x) { return x.id === a.id; })[0];
          return '<section class="card stack" style="gap:8px"><div class="row between"><strong>Situación ' + (k + 1) + '</strong>' + (a.completa ? '<span class="chip ok">' + icon('checkCircle') + 'Completa</span>' : '<span class="chip amber">' + icon('rotate') + 'Parcial</span>') + '</div>' +
            '<p class="small">' + esc(sit.texto) + '</p>' +
            '<div class="minis">' + a.elegidos.map(function (id) { return '<span class="mini' + (a.sobran.indexOf(id) >= 0 ? ' bad' : '') + '"><img src="' + inst(id).imagen + '" alt="">' + esc(inst(id).nombre) + '</span>'; }).join('') + '</div>' +
            (a.faltan.length ? '<p class="small bad-text">Faltó: ' + a.faltan.map(function (id) { return esc(inst(id).nombre); }).join(', ') + '</p>' : '') +
            '<p class="small"><b>Justificación:</b> ' + (a.justificacion ? esc(a.justificacion) : '<i>La explicará de forma oral.</i>') + (a.justificacion && a.oral ? ' <i>(también la explicará de forma oral)</i>' : '') + '</p>' +
            '<p class="small muted">Comprobaciones: ' + a.intentos + '</p></section>';
        }).join('') +
        '<details class="card"><summary class="h3">Rúbrica del reto final</summary>' + rubricaHTML() + '</details>' +
        '<div class="btn-row"><a class="btn outline" href="#/actividad/mesa">' + icon('rotate') + 'Repetir</a><a class="btn primary" href="#/actividad/explicalo">Explícalo con tus palabras' + icon('next') + '</a></div>'
    };
  }

  /* Explícalo con tus palabras (cierre en clase) */
  function viewExplicalo() {
    var prev = S.explicalo || {};
    var st = { id: prev.instrumento || null, formato: prev.formato || 'oral', texto: prev.texto || '', checks: prev.checks || {} };
    var PASOS = [
      { id: 'nombre', t: 'Di o escribe su nombre completo.' },
      { id: 'caract', t: 'Describe al menos dos características: forma, material, partes o si tiene escala.' },
      { id: 'uso', t: 'Explica para qué sirve en el laboratorio.' },
      { id: 'cuidado', t: 'Menciona un cuidado al usarlo.' }
    ];
    function paint(el) {
      var it = st.id ? inst(st.id) : null;
      el.innerHTML =
        '<div class="goal">' + icon('bulb') + '<p>Escoge uno de los instrumentos trabajados y explícalo a tu grupo: su nombre, sus características y su uso. Tú eliges cómo hacerlo.</p></div>' +
        '<section class="stack"><h2 class="section-label">1 · Escoge un instrumento</h2><div class="shelf small-shelf">' + Object.keys(D.INSTRUMENTOS).map(function (id) {
          var x = inst(id), on = st.id === id;
          return '<button class="shelf-item" data-i="' + id + '" aria-pressed="' + on + '"><img src="' + x.imagen + '" alt=""><span>' + esc(x.nombre) + '</span>' + (on ? '<i class="tick">' + icon('check') + '</i>' : '') + '</button>';
        }).join('') + '</div></section>' +
        (it ? '<section class="stack"><h2 class="section-label">2 · ¿Cómo lo vas a presentar?</h2><span class="seg wide" role="group">' +
          [['oral', 'Oral'], ['escrito', 'Escrito'], ['dibujo', 'Dibujo rotulado']].map(function (f) { return '<button data-f="' + f[0] + '" aria-pressed="' + (st.formato === f[0]) + '">' + f[1] + '</button>'; }).join('') + '</span></section>' +
          '<section class="card stack"><h2 class="h3">3 · Prepara tu explicación de ' + esc(it.nombre.toLowerCase()) + '</h2><ul class="missions">' + PASOS.map(function (p) {
            return '<li class="' + (st.checks[p.id] ? 'ok' : '') + '"><button class="check-btn" data-c="' + p.id + '" aria-pressed="' + !!st.checks[p.id] + '"><span class="n">' + icon(st.checks[p.id] ? 'check' : 'pencil') + '</span><span>' + esc(p.t) + '</span></button></li>';
          }).join('') + '</ul>' +
          (st.formato === 'escrito' ? '<label class="small muted" for="txt">Escribe aquí tu explicación (se guarda solo en este celular):</label><textarea id="txt" rows="5" placeholder="El ' + esc(it.nombre.toLowerCase()) + ' es…">' + esc(st.texto) + '</textarea>' : '') +
          (st.formato === 'dibujo' ? '<p>Dibuja el instrumento en tu cuaderno y rotula sus partes con flechas. Partes para rotular:</p><ul class="parts">' + it.partes.map(function (p) { return '<li><span class="n">' + p.n + '</span><span>' + esc(p.nombre) + '</span></li>'; }).join('') + '</ul>' : '') +
          (st.formato === 'oral' ? '<p>Practica en voz alta antes de presentar. Si quieres, escucha primero la ficha para recordar.</p><button class="btn outline" id="oir">' + icon('volume') + 'Escuchar la ficha</button>' : '') +
          '<a class="small" href="#/ficha/' + it.id + '">' + icon('book') + ' Repasar la ficha de ' + esc(it.nombre.toLowerCase()) + '</a></section>' +
          '<button class="btn primary block" id="listo">Listo para presentar</button>' : '') +
        '<details class="card"><summary class="h3">Qué valorará tu docente</summary><p class="small muted">Se valora el contenido de tu explicación, no el formato que elijas.</p>' + rubricaHTML() + '</details>';
      $$('[data-i]', el).forEach(function (b) { b.onclick = function () { st.id = b.getAttribute('data-i'); paint(el); var s2 = $('[data-f]', el); if (s2) s2.scrollIntoView({ behavior: 'smooth', block: 'center' }); }; });
      $$('[data-f]', el).forEach(function (b) { b.onclick = function () { st.formato = b.getAttribute('data-f'); paint(el); }; });
      $$('[data-c]', el).forEach(function (b) { b.onclick = function () { var c = b.getAttribute('data-c'); st.checks[c] = !st.checks[c]; paint(el); }; });
      var t = $('#txt', el); if (t) t.oninput = function () { st.texto = t.value; };
      var oi = $('#oir', el); if (oi) oi.onclick = function () { Voice.speak(it.nombre + '. ' + it.caracteristicas + ' Uso: ' + it.uso + ' Cuidado: ' + it.cuidado); };
      var l = $('#listo', el); if (l) l.onclick = function () {
        S.explicalo = { instrumento: st.id, formato: st.formato, texto: st.texto, checks: st.checks, fecha: Date.now() }; save();
        toast('¡Listo! Tu explicación quedó registrada en Mis logros.'); go('/logros');
      };
    }
    return {
      title: 'Explícalo con tus palabras', eyebrow: 'Cierre en clase · OE2 · OE3 · OE5', back: '/actividades', navKey: 'inicio',
      html: '<div id="exp" class="stack" style="gap:14px"></div>',
      mount: function (el) { paint($('#exp', el)); }
    };
  }
  /* Motor de cuestionarios (diagnóstica y mini-retos) */
  function viewQuiz(kind, mid) {
    var def = kind === 'diagnostica' ? D.DIAGNOSTICA : D.MINIRETOS[mid];
    if (!def) return null;
    if (kind === 'mini' && !miniAbierto(mid)) {
      return {
        title: 'Mini-reto', back: '/modulo/' + mid, navKey: 'modulos',
        html: '<div class="banner">' + icon('lock') + '<p>El mini-reto se activa cuando ' + (modulo(mid).lecciones ? 'completas las 3 lecciones del módulo' : 'exploras todas las fichas del módulo') + '. Así la evaluación llega después de la exploración.</p></div><a class="btn primary block" href="#/modulo/' + mid + '">Ir al módulo ' + mid + '</a>'
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
            (illustrated && inst(o.id) ? '<img src="' + inst(o.id).imagen + '" alt="">' : '') + '<span>' + esc(lab) + '</span></button>';
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
          var op = q.opciones.filter(function (o) { return o.id === r.elegida; })[0];
          var elegida = chosen ? chosen.nombre : (op && op.label) || r.elegida;
          var link = q.repaso ? '<a href="#' + q.repaso + '">' + icon('book') + 'Repasar: ' + esc(q.repasoNombre || 'lección') + '</a>'
            : '<a href="#/ficha/' + q.correcta + '">' + icon('book') + 'Repasa la ficha: ' + esc(inst(q.correcta).nombre) + '</a>' +
              (chosen && chosen.id !== q.correcta ? '<a href="#/ficha/' + chosen.id + '">' + icon('book') + 'Compárala con: ' + esc(chosen.nombre) + '</a>' : '');
          return '<section class="review"><h3>' + icon('xCircle') + 'Pregunta ' + (r.q + 1) + ': para repasar</h3>' +
            '<p>Elegiste «' + esc(elegida) + '». ' + esc((q.no && q.no[r.elegida]) || q.ok) + '</p>' + link + '</section>';
        }).join('') +
        '<section class="stack"><h2 class="h3">¿Cómo te fue en este módulo?</h2><div class="semaforo" role="group" aria-label="Autoevaluación">' +
        [['claro', '#2fa866', 'Lo tengo claro'], ['dudas', '#f0a92c', 'Tengo algunas dudas'], ['repasar', '#e05a5a', 'Necesito repasar']].map(function (s) {
          return '<button aria-pressed="' + (sem === s[0]) + '" data-s="' + s[0] + '"><i style="background:' + s[1] + '"></i>' + s[2] + '</button>';
        }).join('') + '</div></section>' +
        (md.intentos.length > 1 ? '<p class="small muted">Intento ' + md.intentos.length + '. Tu docente ve el primer intento (' + md.intentos[0].aciertos + ' de 5); los siguientes son de práctica.</p>' : '<p class="small muted">Este primer intento queda visible para tu docente en Mis logros. Los siguientes intentos son de práctica.</p>') +
        '<div class="btn-row"><a class="btn outline" href="#/evaluacion/minireto/' + mid + '">' + icon('rotate') + 'Repetir</a>' +
        '<a class="btn primary" href="#/' + (nextMod ? 'modulo/' + nextMod.id : (retoAbierto() ? 'actividad/mesa' : 'logros')) + '">' + (nextMod ? 'Siguiente módulo' : (retoAbierto() ? 'Ir al reto final' : 'Mis logros')) + icon('next') + '</a></div>',
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
      var q = Q[a.q], label = q.instrumento ? inst(q.instrumento).nombre : (inst(q.correcta) ? inst(q.correcta).nombre : 'Material del laboratorio');
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
    var semLabel = { claro: 'Lo tengo claro', dudas: 'Tengo algunas dudas', repasar: 'Necesito repasar' };
    var diagOk = S.diag ? S.diag.respuestas.filter(function (a) { return a.ok; }).length : null;
    var pa = S.actividades.parecidos, rf = S.retoFinal, ex = S.explicalo;
    var filas = [['Diagnóstica', S.diag ? diagOk + ' de 8 reconocidos' : 'Pendiente'],
      ['Lecciones del módulo 1', modProgress(modulo(1)).done + ' de 3'],
      ['Instrumentos explorados', totalExplored() + ' de 18']];
    D.MODULOS.forEach(function (m) {
      var md = miniData(m.id);
      filas.push(['Mini-reto ' + m.id + ' · primer intento', md ? md.intentos[0].aciertos + ' de 5' + (md.intentos.length > 1 ? ' (' + md.intentos.length + ' intentos)' : '') : 'Pendiente']);
    });
    [2, 3, 4].forEach(function (mid) { var q = actData('quien-soy', mid); filas.push(['¿Quién soy? módulo ' + mid + ' · mejor', q ? q.mejor + ' de 24' : 'Pendiente']); });
    [2, 4].forEach(function (mid) { var c = actData('cada-cosa', mid); filas.push(['Cada cosa en su lugar · módulo ' + mid, c ? 'Completada' + (c.errores ? ' (' + c.errores + ' por corregir)' : ' sin errores') : 'Pendiente']); });
    filas.push(['Parecidos pero diferentes', pa ? Object.keys(pa.parejas).length + ' de ' + D.PAREJAS.length + ' parejas' : 'Pendiente']);
    filas.push(['Reto final', rf ? rf.respuestas.filter(function (a) { return a.completa; }).length + ' de ' + rf.respuestas.length + ' mesas completas' : 'Pendiente']);
    filas.push(['Explícalo con tus palabras', ex ? inst(ex.instrumento).nombre + ' · ' + { oral: 'oral', escrito: 'escrito', dibujo: 'dibujo rotulado' }[ex.formato] : 'Pendiente']);
    D.MODULOS.forEach(function (m) { filas.push(['Autoevaluación módulo ' + m.id, S.semaforo[m.id] ? semLabel[S.semaforo[m.id]] : 'Pendiente']); });
    return {
      title: 'Mis logros', back: '/menu', navKey: 'logros',
      html:
        '<section class="stack"><h2 class="section-label">Insignias</h2><div class="badges">' + D.MODULOS.map(function (m) {
          var on = hasBadge(m.id);
          return '<div class="badge-card' + (on ? '' : ' off') + '"><svg viewBox="0 0 64 64" aria-hidden="true">' + medal('#3a4cca') + '</svg><strong>' + esc(m.insignia) + '</strong><small>' + (on ? 'Lograda' : 'Módulo ' + m.id) + '</small></div>';
        }).join('') +
        '<div class="badge-card' + (rf ? '' : ' off') + '"><svg viewBox="0 0 64 64" aria-hidden="true">' + medal('#e08a00') + '</svg><strong>Laboratorista Orbita</strong><small>' + (rf ? 'Lograda' : 'Reto final') + '</small></div>' +
        '</div><p class="small muted">Las insignias se guardan solo en este celular y no se comparan con las de otros estudiantes.</p></section>' +
        '<section class="card stack"><h2 class="h3">Progreso por módulo</h2>' + D.MODULOS.map(function (m) {
          var pr = modProgress(m);
          return '<div class="mod-progress"><span>Módulo ' + m.id + ' · ' + esc(m.corto) + '</span><span class="small muted">' + pr.done + ' de ' + pr.total + ' ' + pr.unidad + '</span><div class="bar"><i style="width:' + (pr.total ? pr.done / pr.total * 100 : 0) + '%"></i></div></div>';
        }).join('') + '</section>' +
        '<section class="card stack"><div class="row between"><h2 class="h3">Resumen para el docente</h2>' + icon('clipboard') + '</div>' +
        '<p class="small muted">Muestra esta pantalla en clase o toma una captura para compartirla. Cuenta el primer intento de cada mini-reto; los siguientes son de práctica.</p>' +
        '<dl class="kv">' + filas.map(function (f) { return '<dt>' + esc(f[0]) + '</dt><dd>' + esc(f[1]) + '</dd>'; }).join('') + '</dl></section>'
    };
  }

  /* 10 · Recursos */
  var FICHAS = {
    1: ['El laboratorio, los materiales, las normas de seguridad, el visor 3D y los 18 instrumentos', 7],
    2: ['Los 6 instrumentos con sus partes, cómo leer el volumen y práctica para imprimir', 7],
    3: ['Los 6 instrumentos con sus partes, el montaje para calentar y práctica para imprimir', 6],
    4: ['Los 6 instrumentos con sus partes, cómo pesar un sólido y práctica para imprimir', 6]
  };
  function viewRecursos() {
    return {
      title: 'Recursos', back: '/menu', navKey: 'inicio',
      html:
        '<section class="stack"><h2 class="section-label">Fichas en PDF</h2><p class="small muted">Para repasar sin pantalla, compartir por Bluetooth o imprimir. Cada ficha termina con una página de práctica y sus respuestas.</p>' + D.MODULOS.map(function (m) {
          var f = FICHAS[m.id];
          return '<a class="item" href="recursos/Orbita_Ficha_Modulo_' + m.id + '.pdf" target="_blank" rel="noopener"><span class="thumb cover"><img src="img/fichas/ficha-m' + m.id + '.webp" alt=""></span><span><strong>Ficha del módulo ' + m.id + '</strong><small>' +
            f[0] + ' · ' + f[1] + ' páginas</small></span><span class="state viewing">PDF</span></a>';
        }).join('') + '</section>' +
        '<section class="stack"><h2 class="section-label">Para aprender más</h2>' +
        '<a class="item" href="#/glosario"><span class="thumb c-primary">' + icon('book') + '</span><span><strong>Glosario con audio</strong><small>' + D.GLOSARIO.length + ' términos explicados con palabras sencillas</small></span><span class="go">' + icon('next') + '</span></a>' +
        '<a class="item" href="#/ayuda"><span class="thumb c-slate">' + icon('settings') + '</span><span><strong>Ayuda y accesibilidad</strong><small>Tamaño del texto, contraste, voz y uso sin conexión</small></span><span class="go">' + icon('next') + '</span></a></section>' +
        '<section class="stack"><h2 class="section-label">Para el docente</h2>' +
        '<a class="item" href="#/docente"><span class="thumb c-violet">' + icon('teacher') + '</span><span><strong>Guía para el docente</strong><small>Secuencia de 5 semanas, momentos de evaluación, rúbrica y lista de chequeo</small></span><span class="go">' + icon('next') + '</span></a></section>'
    };
  }

  function viewDocente() {
    var semanas = [
      ['1', 'Bienvenida al laboratorio', 'Tutorial, lecciones y recorrido libre por el catálogo', 'Diagnóstica ¿Qué sé del laboratorio? y mini-reto 1'],
      ['2', 'Contener y medir líquidos', 'Explora y descubre, ¿Quién soy? y Cada cosa en su lugar (2 bandejas)', 'Mini-reto 2 y autoevaluación'],
      ['3', 'Calentar, sostener y sujetar', 'Explora y descubre, ¿Quién soy? y Parecidos pero diferentes en parejas', 'Mini-reto 3, autoevaluación y lista de chequeo'],
      ['4', 'Triturar, separar, mezclar y pesar', 'Explora y descubre, ¿Quién soy? y Cada cosa en su lugar (18 instrumentos)', 'Mini-reto 4 y autoevaluación'],
      ['5', 'Cierre', 'Arma tu mesa de trabajo y Explícalo con tus palabras', 'Rúbrica del reto final y autoevaluación final']
    ];
    return {
      title: 'Guía para el docente', eyebrow: 'Orbita · Ciencias Naturales, grado noveno', back: '/recursos', navKey: 'inicio',
      html:
        '<p class="lead">Orbita acompaña la explicación del docente: los estudiantes exploran, practican y se evalúan en el celular, y la discusión se hace en la puesta en común al final de cada sesión.</p>' +
        '<section class="card stack"><h2 class="h3">Secuencia sugerida (una sesión de 2 horas por semana)</h2><div class="table-wrap" tabindex="0" role="region" aria-label="Tabla: desliza para ver todas las columnas"><table class="cuadro"><thead><tr><th>Semana</th><th>Módulo</th><th>Actividades clave</th><th>Evaluación</th></tr></thead><tbody>' +
        semanas.map(function (s) { return '<tr><th>' + s[0] + '</th><td>' + esc(s[1]) + '</td><td>' + esc(s[2]) + '</td><td>' + esc(s[3]) + '</td></tr>'; }).join('') + '</tbody></table></div></section>' +
        '<section class="card stack"><h2 class="h3">Cómo recoger los resultados</h2><ul class="parts">' +
        '<li><span class="n">1</span><span>Orbita no usa cuentas: cada estudiante muestra la pantalla <b>Mis logros</b> o envía una captura por el medio que use el curso.</span></li>' +
        '<li><span class="n">2</span><span>En cada mini-reto cuenta el primer intento; el aprendizaje se considera alcanzado con <b>4 de 5</b> aciertos. Los demás intentos son de práctica.</span></li>' +
        '<li><span class="n">3</span><span>El reto final muestra las mesas armadas y las justificaciones del estudiante para valorarlas con la rúbrica.</span></li>' +
        '<li><span class="n">4</span><span>Para demostraciones, el <b>modo docente</b> (en Ayuda) abre todos los mini-retos y el reto final sin explorar antes.</span></li></ul></section>' +
        '<section class="card stack"><h2 class="h3">Lista de chequeo · Parecidos pero diferentes</h2><p class="small muted">Marca durante la actividad en parejas del módulo 3 (las marcas no se guardan).</p><ul class="checklist">' +
        D.CHEQUEO_PARECIDOS.map(function (c, i) { return '<li><label><input type="checkbox" id="ch' + i + '"> ' + esc(c) + '</label></li>'; }).join('') + '</ul></section>' +
        '<section class="card stack"><h2 class="h3">Rúbrica del reto final y la explicación de cierre</h2><p class="small muted">Niveles de desempeño de la escala nacional (Decreto 1290 de 2009). Un desempeño básico, alto o superior en todos los criterios indica que se alcanzó el aprendizaje esperado.</p>' + rubricaHTML() + '</section>'
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
        '<section class="card"><h2 class="h3">Para el docente</h2>' +
        '<div class="setting"><span><strong>Modo docente</strong><small>Abre los mini-retos y el reto final sin explorar antes. Útil para demostraciones en clase.</small></span><button class="switch" id="docSw" role="switch" aria-checked="' + !!S.ajustes.docente + '" aria-label="Modo docente"></button></div>' +
        '<a class="item" href="#/docente" style="margin-top:8px"><span class="thumb c-violet">' + icon('teacher') + '</span><span><strong>Guía para el docente</strong><small>Secuencia, evaluación, rúbrica y lista de chequeo</small></span><span class="go">' + icon('next') + '</span></a></section>' +
        '<section class="card stack"><h2 class="h3">Mi progreso</h2><p class="small muted">Tu avance se guarda solo en este celular. Orbita no pide cuentas ni datos personales.</p>' +
        '<button class="btn outline" id="resetBtn" style="color:var(--bad);border-color:var(--bad)">' + icon('trash') + 'Borrar mi progreso</button></section>' +
        '<section class="card stack"><div class="row">' + logo('sm') + '<h2 class="h3">Acerca de Orbita</h2></div>' +
        '<p class="credits">Ambiente Educativo Tecnológico para el reconocimiento de instrumentos y materiales de laboratorio de química. Versión 1.0: cuatro módulos, 18 instrumentos en 3D, actividades, evaluaciones y reto final.</p>' +
        '<p class="credits">Camilo Andrés Soto Germán, Juan Daniel Lozano Vergara e Iván Ramiro Ramos Petro · Licenciatura en Informática, Universidad de Córdoba · 2026.</p>' +
        '<p class="credits">Modelos 3D provisionales generados por el equipo. Visor: model-viewer (Apache 2.0). Íconos: Lucide (ISC). Tipografía: Nunito (OFL).</p></section>',
      mount: function (el) {
        $('#tutBtn', el).onclick = function () { openTutorial(); };
        $$('[data-texto]', el).forEach(function (b) { b.onclick = function () { S.ajustes.texto = Number(b.getAttribute('data-texto')); save(); applySettings(); render(); }; });
        $$('[data-vel]', el).forEach(function (b) { b.onclick = function () { S.ajustes.velocidad = Number(b.getAttribute('data-vel')); save(); $$('[data-vel]', el).forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); }); Voice.speak('Así suena la lectura en voz alta.'); }; });
        $$('[data-vista]', el).forEach(function (b) { b.onclick = function () { S.ajustes.vista = b.getAttribute('data-vista'); save(); $$('[data-vista]', el).forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); }); }; });
        $('#contrast', el).onclick = function () { S.ajustes.contraste = !S.ajustes.contraste; save(); applySettings(); this.setAttribute('aria-checked', String(S.ajustes.contraste)); };
        $('#docSw', el).onclick = function () { S.ajustes.docente = !S.ajustes.docente; save(); this.setAttribute('aria-checked', String(S.ajustes.docente)); toast(S.ajustes.docente ? 'Modo docente activado: mini-retos y reto final abiertos.' : 'Modo docente desactivado.'); };
        $('#resetBtn', el).onclick = function () {
          confirmSheet('¿Borrar tu progreso?', 'Se borrarán las lecciones y fichas exploradas, las insignias, los resultados, el reto final y la autoevaluación de este celular. Los ajustes de accesibilidad se mantienen.', 'Sí, borrar').then(function (yes) {
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
    box.innerHTML = core + '<div id="modStatus" class="stack" style="gap:8px"><div class="status-line"><span class="dot"></span>Revisando los módulos…</div></div>';
    if (!('caches' in window) || Offline.state === 'none') { $('#modStatus', box).remove(); return; }
    var pesos = { 1: '≈ 0,9 MB', 2: '≈ 1,3 MB', 3: '≈ 1,3 MB', 4: '≈ 1,2 MB' }; // peso real de los archivos en la v1.0.2
    Promise.all(D.MODULOS.map(function (m) { return Offline.moduleStatus(m.id); })).then(function (sts) {
      var cont = $('#modStatus', box); if (!cont) return;
      var faltan = D.MODULOS.filter(function (m, k) { return sts[k] !== 'ok'; });
      cont.innerHTML = D.MODULOS.map(function (m, k) {
        if (sts[k] === 'ok') return '<div class="status-line ok"><span class="dot"></span>Módulo ' + m.id + ' descargado: funciona sin conexión.</div>';
        return '<div class="setting" style="border:0;padding:0"><span><strong>Módulo ' + m.id + ' · ' + esc(m.corto) + '</strong><small>' + (m.lecciones ? 'Lecciones, imágenes y ficha PDF' : 'Modelos, fotos y ficha PDF') + ' (' + pesos[m.id] + ')</small></span><button class="btn outline" data-dl="' + m.id + '">' + icon('download') + 'Descargar</button></div>';
      }).join('') + (faltan.length > 1 ? '<button class="btn primary" id="dlAll">' + icon('download') + 'Descargar todo (≈ 4,5 MB)</button>' : '');
      function bajar(ids, btn) {
        btn.disabled = true; btn.textContent = 'Descargando…';
        ids.reduce(function (pr, mid) { return pr.then(function () { return Offline.downloadModule(mid); }); }, Promise.resolve())
          .then(function () { toast(ids.length > 1 ? 'Todos los módulos quedaron listos para usar sin conexión.' : 'Módulo ' + ids[0] + ' listo para usar sin conexión.'); paintOffline(box); })
          .catch(function () { btn.disabled = false; btn.textContent = 'Reintentar'; toast('No se pudo descargar. Revisa tu conexión e inténtalo de nuevo.'); });
      }
      $$('[data-dl]', cont).forEach(function (b) { b.onclick = function () { bajar([Number(b.getAttribute('data-dl'))], b); }; });
      var all = $('#dlAll', cont); if (all) all.onclick = function () { bajar(faltan.map(function (m) { return m.id; }), all); };
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
