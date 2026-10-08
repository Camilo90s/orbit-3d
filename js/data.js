/*
 * Orbita · Contenidos del ambiente
 * ---------------------------------------------------------------
 * Todo el contenido pedagógico vive en este archivo para que el equipo
 * pueda revisarlo y ampliarlo sin tocar la lógica de la aplicación.
 * Primer avance: estructura completa y módulo 2 funcional.
 */
window.ORBITA = (function () {
  'use strict';

  /* ---------- Clasificaciones del Laboratorio 3D ---------- */
  var FUNCIONES = [
    { id: 'contener', label: 'Contener' },
    { id: 'medir', label: 'Medir' },
    { id: 'calentar', label: 'Calentar' },
    { id: 'sostener', label: 'Sostener y sujetar' },
    { id: 'triturar', label: 'Triturar' },
    { id: 'separar', label: 'Separar' },
    { id: 'mezclar', label: 'Mezclar' },
    { id: 'pesar', label: 'Pesar' }
  ];
  var MATERIALES = [
    { id: 'vidrio', label: 'Vidrio' },
    { id: 'plastico', label: 'Plástico' },
    { id: 'metal', label: 'Metal' },
    { id: 'porcelana', label: 'Porcelana' }
  ];

  /* ---------- Módulos ---------- */
  var MODULOS = [
    {
      id: 1, estado: 'construccion', semana: 1,
      titulo: 'Bienvenida al laboratorio', corto: 'Bienvenida',
      objetivo: 'explicar qué es un laboratorio de química, clasificar su material según el material del que está hecho y explorar un modelo 3D en Orbita.',
      temas: ['Qué es un laboratorio de química y para qué se usa', 'Material de vidrio, porcelana, metal y plástico', 'Cómo explorar un modelo 3D en Orbita'],
      instrumentos: [],
      actividades: ['explora'],
      insignia: 'Explorador del laboratorio', oe: 'OE1'
    },
    {
      id: 2, estado: 'disponible', semana: 2,
      titulo: 'Instrumentos para contener y medir líquidos', corto: 'Contener y medir',
      objetivo: 'reconocer los instrumentos que sirven para contener y medir líquidos, y explicar en qué se diferencian.',
      temas: ['Diferencia entre contener y medir', 'Qué significa que un instrumento esté graduado', 'Por qué unos instrumentos son más precisos que otros'],
      instrumentos: ['vaso', 'erlenmeyer', 'probeta', 'pipeta', 'bureta', 'tubo'],
      actividades: ['explora', 'quien-soy', 'cada-cosa'],
      insignia: 'Medidor experto', oe: 'OE1 a OE4'
    },
    {
      id: 3, estado: 'construccion', semana: 3,
      titulo: 'Instrumentos para calentar, sostener y sujetar', corto: 'Calentar y sostener',
      objetivo: 'reconocer los instrumentos que sirven para calentar, sostener y sujetar, y relacionar su material con la resistencia al calor.',
      temas: ['Fuentes de calor en el laboratorio', 'Material de soporte y sujeción', 'Relación entre el material y la resistencia al calor'],
      instrumentos: ['mechero', 'tripode', 'rejilla', 'soporte', 'pinza-nuez', 'pinza-tubo'],
      actividades: ['explora', 'quien-soy', 'parecidos'],
      insignia: 'Guardián del calor', oe: 'OE1 a OE4'
    },
    {
      id: 4, estado: 'construccion', semana: 4,
      titulo: 'Materiales para triturar, separar, mezclar y pesar', corto: 'Triturar y pesar',
      objetivo: 'reconocer los materiales para triturar, separar, mezclar y pesar, y elegir cuál usar según la tarea.',
      temas: ['Material de porcelana y vidrio de uso auxiliar', 'Instrumentos para separar sólidos de líquidos', 'Medición de la masa'],
      instrumentos: ['mortero', 'embudo', 'vidrio-reloj', 'agitador', 'frasco-lavador', 'balanza'],
      actividades: ['explora', 'quien-soy', 'cada-cosa'],
      insignia: 'Maestro de mezclas', oe: 'OE1 a OE4'
    }
  ];

  /* ---------- Instrumentos (18) ----------
   * Los del módulo 2 tienen ficha completa, modelo 3D y vistas.
   * Los demás tienen la clasificación lista y su ficha llega con su módulo.
   */
  var INSTRUMENTOS = {
    vaso: {
      nombre: 'Vaso de precipitados', modulo: 2, funciones: ['contener'], materiales: ['vidrio'],
      resumen: 'Contener y calentar',
      modelo: 'models/vaso.glb', imagen: 'img/instrumentos/vaso.webp', vistas: 'img/vistas/vaso',
      partes: [
        { n: 1, nombre: 'Marcas de volumen aproximado', texto: 'indican cuánto líquido hay, pero no con exactitud.', pos: '0 0.064 0.035', normal: '0 0 1' },
        { n: 2, nombre: 'Pico para verter', texto: 'permite pasar el líquido a otro recipiente sin derramarlo.', pos: '-0.041 0.095 0', normal: '-1 0.3 0' }
      ],
      caracteristicas: 'Recipiente cilíndrico de vidrio, de boca ancha y fondo plano. Tiene un pico en el borde y marcas de volumen que son aproximadas.',
      uso: 'Sirve para contener, mezclar y calentar líquidos, y para pasarlos de un recipiente a otro. No se usa para medir volúmenes exactos.',
      cuidado: 'Para calentarlo, colócalo sobre una rejilla, nunca directo sobre la llama. El vidrio caliente se ve igual que el frío: sujétalo con pinza o espera a que se enfríe.',
      pistas: { forma: 'Soy un cilindro ancho, de boca abierta y con un pico en el borde.', material: 'Soy de vidrio resistente al calor.', uso: 'Sirvo para contener y calentar líquidos, pero mis marcas no son exactas.' },
      fijate: 'Fíjate en su boca ancha y en el pico del borde: es un recipiente para contener, no para medir con exactitud.'
    },
    erlenmeyer: {
      nombre: 'Matraz Erlenmeyer', modulo: 2, funciones: ['contener', 'mezclar'], materiales: ['vidrio'],
      resumen: 'Contener y mezclar',
      modelo: 'models/erlenmeyer.glb', imagen: 'img/instrumentos/erlenmeyer.webp', vistas: 'img/vistas/erlenmeyer',
      partes: [
        { n: 1, nombre: 'Cuello estrecho', texto: 'reduce las salpicaduras y permite taparlo.', pos: '0 0.122 0.0128', normal: '0 0 1' },
        { n: 2, nombre: 'Cuerpo cónico y base ancha', texto: 'le dan estabilidad y facilitan agitar el líquido en círculos.', pos: '0 0.012 0.0405', normal: '0 0.25 1' }
      ],
      caracteristicas: 'Recipiente de vidrio con cuerpo en forma de cono, base plana y ancha y cuello estrecho. Puede tener marcas de volumen aproximado.',
      uso: 'Sirve para contener, mezclar y agitar líquidos sin que se derramen, y también para calentarlos.',
      cuidado: 'Para agitarlo, sujétalo por el cuello y haz movimientos circulares suaves. Si lo calientas, usa una rejilla y no lo llenes más de la mitad.',
      pistas: { forma: 'Mi cuerpo tiene forma de cono y mi cuello es estrecho.', material: 'Soy de vidrio.', uso: 'Me usan para mezclar y agitar líquidos sin salpicar.' },
      fijate: 'Fíjate en su cuerpo cónico y su cuello estrecho: por eso el líquido no salpica al agitarlo.'
    },
    probeta: {
      nombre: 'Probeta graduada', modulo: 2, funciones: ['medir'], materiales: ['vidrio', 'plastico'],
      resumen: 'Medir volúmenes',
      modelo: 'models/probeta.glb', imagen: 'img/instrumentos/probeta.webp', vistas: 'img/vistas/probeta',
      partes: [
        { n: 1, nombre: 'Escala graduada', texto: 'indica el volumen del líquido en mililitros (mL).', pos: '0 0.17 0.0155', normal: '0 0 1' },
        { n: 2, nombre: 'Base ancha', texto: 'la mantiene estable sobre la mesa.', pos: '0 0.008 0.031', normal: '0 1 0.4' }
      ],
      caracteristicas: 'Cilindro alto y angosto, de vidrio o plástico, con una escala marcada en mililitros (mL) y una base ancha que la mantiene de pie.',
      uso: 'Sirve para medir volúmenes de líquidos con más precisión que un vaso de precipitados. El volumen se lee con los ojos a la altura del menisco.',
      cuidado: 'No se calienta, porque el calor puede deformarla y dañar su escala. Colócala sobre una superficie plana antes de leer el volumen.',
      pistas: { forma: 'Soy alta, delgada y tengo una base ancha.', material: 'Puedo ser de vidrio o de plástico.', uso: 'Sirvo para medir volúmenes de líquidos.' },
      fijate: 'Fíjate en la escala en mililitros a lo largo del cilindro: eso la hace un instrumento para medir.'
    },
    pipeta: {
      nombre: 'Pipeta graduada', modulo: 2, funciones: ['medir'], materiales: ['vidrio'],
      resumen: 'Medir volúmenes pequeños',
      modelo: 'models/pipeta.glb', imagen: 'img/instrumentos/pipeta.webp', vistas: 'img/vistas/pipeta',
      partes: [
        { n: 1, nombre: 'Escala graduada', texto: 'permite medir volúmenes pequeños, en mililitros y décimas de mililitro.', pos: '0 0.21 0.005', normal: '0 0 1' },
        { n: 2, nombre: 'Punta delgada', texto: 'deja salir el líquido de forma controlada.', pos: '0 0.008 0.0016', normal: '0 -0.3 1' }
      ],
      caracteristicas: 'Tubo largo y delgado de vidrio, con una escala graduada y una punta fina por donde sale el líquido.',
      uso: 'Sirve para medir y pasar volúmenes pequeños de líquido con precisión, de un recipiente a otro.',
      cuidado: 'El líquido se toma con un pipeteador o pera, nunca con la boca. Guárdala acostada o en un soporte para que la punta no se rompa.',
      pistas: { forma: 'Soy un tubo largo y muy delgado, con una punta fina.', material: 'Soy de vidrio.', uso: 'Sirvo para medir y pasar pequeñas cantidades de líquido con precisión.' },
      fijate: 'Fíjate en lo delgada que es y en su punta fina: sirve para medir cantidades pequeñas con precisión.'
    },
    bureta: {
      nombre: 'Bureta', modulo: 2, funciones: ['medir'], materiales: ['vidrio'],
      resumen: 'Dejar salir y medir',
      modelo: 'models/bureta.glb', imagen: 'img/instrumentos/bureta.webp', vistas: 'img/vistas/bureta',
      partes: [
        { n: 1, nombre: 'Escala graduada', texto: 'se lee de arriba hacia abajo, empezando en cero.', pos: '0 0.40 0.0078', normal: '0 0 1' },
        { n: 2, nombre: 'Llave de paso', texto: 'abre o cierra la salida para dejar caer el líquido gota a gota.', pos: '0.016 0.062 0.0025', normal: '0 0 1' }
      ],
      caracteristicas: 'Tubo largo de vidrio con una escala graduada y una llave de paso en la parte inferior que controla la salida del líquido.',
      uso: 'Sirve para dejar salir un líquido de forma controlada y saber cuánto salió. Se usa montada en un soporte universal.',
      cuidado: 'Se sujeta al soporte universal con una pinza. Antes de llenarla, revisa que la llave de paso esté cerrada.',
      pistas: { forma: 'Soy un tubo muy largo con una llave en la parte de abajo.', material: 'Soy de vidrio y mi llave puede ser de plástico.', uso: 'Dejo caer el líquido gota a gota y mido cuánto salió.' },
      fijate: 'Fíjate en la llave de paso de la parte inferior: ningún otro instrumento del módulo la tiene.'
    },
    tubo: {
      nombre: 'Tubo de ensayo', modulo: 2, funciones: ['contener'], materiales: ['vidrio'],
      resumen: 'Contener pequeñas cantidades',
      modelo: 'models/tubo.glb', imagen: 'img/instrumentos/tubo.webp', vistas: 'img/vistas/tubo',
      partes: [
        { n: 1, nombre: 'Boca con borde', texto: 'por aquí se agregan las sustancias.', pos: '0 0.148 0.009', normal: '0 0.3 1' },
        { n: 2, nombre: 'Fondo redondeado', texto: 'facilita calentar y mezclar pequeñas cantidades.', pos: '0 0.004 0.0068', normal: '0 -0.4 1' }
      ],
      caracteristicas: 'Tubo pequeño de vidrio, abierto por arriba y con el fondo redondeado. No tiene escala de medida.',
      uso: 'Sirve para contener, mezclar y calentar pequeñas cantidades de sustancias y observar lo que ocurre.',
      cuidado: 'Para calentarlo, sujétalo con una pinza para tubo de ensayo e inclínalo, con la boca apuntando lejos de las personas. Se guarda en una gradilla.',
      pistas: { forma: 'Soy un tubo pequeño con el fondo redondeado.', material: 'Soy de vidrio.', uso: 'Contengo pequeñas cantidades de sustancias para observarlas o calentarlas.' },
      fijate: 'Fíjate en que no tiene escala: sirve para contener y observar, no para medir.'
    },

    /* Módulo 3 · clasificación lista, ficha en construcción */
    mechero: { nombre: 'Mechero Bunsen', modulo: 3, funciones: ['calentar'], materiales: ['metal'], resumen: 'Fuente de calor' },
    tripode: { nombre: 'Trípode', modulo: 3, funciones: ['sostener'], materiales: ['metal'], resumen: 'Sostener sobre el mechero' },
    rejilla: { nombre: 'Rejilla metálica con centro cerámico', modulo: 3, funciones: ['sostener', 'calentar'], materiales: ['metal'], resumen: 'Repartir el calor' },
    soporte: { nombre: 'Soporte universal', modulo: 3, funciones: ['sostener'], materiales: ['metal'], resumen: 'Sostener montajes' },
    'pinza-nuez': { nombre: 'Pinza con nuez', modulo: 3, funciones: ['sostener'], materiales: ['metal'], resumen: 'Sujetar al soporte' },
    'pinza-tubo': { nombre: 'Pinza para tubo de ensayo', modulo: 3, funciones: ['sostener'], materiales: ['metal'], resumen: 'Sujetar tubos calientes' },

    /* Módulo 4 · clasificación lista, ficha en construcción */
    mortero: { nombre: 'Mortero con pistilo', modulo: 4, funciones: ['triturar'], materiales: ['porcelana'], resumen: 'Triturar sólidos' },
    embudo: { nombre: 'Embudo', modulo: 4, funciones: ['separar'], materiales: ['vidrio', 'plastico'], resumen: 'Filtrar y trasvasar' },
    'vidrio-reloj': { nombre: 'Vidrio de reloj', modulo: 4, funciones: ['contener', 'pesar'], materiales: ['vidrio'], resumen: 'Pesar y evaporar' },
    agitador: { nombre: 'Agitador de vidrio', modulo: 4, funciones: ['mezclar'], materiales: ['vidrio'], resumen: 'Mezclar soluciones' },
    'frasco-lavador': { nombre: 'Frasco lavador', modulo: 4, funciones: ['contener'], materiales: ['plastico'], resumen: 'Enjuagar con agua' },
    balanza: { nombre: 'Balanza', modulo: 4, funciones: ['pesar'], materiales: ['metal', 'plastico'], resumen: 'Medir la masa' }
  };

  /* ---------- Actividades ---------- */
  var ACTIVIDADES = [
    { id: 'explora', nombre: 'Explora y descubre', oe: ['OE1', 'OE2'], donde: 'Base de todos los módulos', icono: 'rotate', estado: 'disponible',
      resumen: 'Gira y amplía cada modelo, toca los puntos numerados y anota en tu cuaderno el nombre y dos características.' },
    { id: 'quien-soy', nombre: '¿Quién soy?', oe: ['OE1', 'OE2'], donde: 'Módulos 2, 3 y 4', icono: 'help', estado: 'disponible',
      resumen: 'Un modelo gira sin su nombre. Elige entre cuatro opciones; si lo necesitas, pide hasta tres pistas.' },
    { id: 'cada-cosa', nombre: 'Cada cosa en su lugar', oe: ['OE3', 'OE4'], donde: 'Módulo 2: 2 bandejas · Módulo 4: 5 categorías', icono: 'grid', estado: 'disponible',
      resumen: 'Toca un instrumento y luego la bandeja a la que pertenece.' },
    { id: 'parecidos', nombre: 'Parecidos pero diferentes', oe: ['OE2', 'OE4'], donde: 'Módulo 3, en parejas', icono: 'split', estado: 'disponible',
      resumen: 'En parejas, comparen dos instrumentos que suelen confundirse y completen un cuadro en el cuaderno.' },
    { id: 'mesa', nombre: 'Arma tu mesa de trabajo', oe: ['OE3', 'OE5'], donde: 'Reto final, semana 5', icono: 'flask', estado: 'bloqueada',
      resumen: 'Lee una situación y elige del estante los instrumentos que usarías. Se habilita al completar los cuatro módulos.' }
  ];

  /* Cada cosa en su lugar · módulo 2 */
  var CLASIFICACION_M2 = {
    bandejas: [
      { id: 'contener', nombre: 'Sirven para contener', icono: 'flask' },
      { id: 'medir', nombre: 'Sirven para medir volumen', icono: 'target' }
    ],
    items: {
      vaso: { bandeja: 'contener', ok: 'El vaso de precipitados sirve para contener: sus marcas son solo aproximadas.', no: 'El vaso tiene marcas, pero son aproximadas. Sirve para contener, no para medir con precisión.' },
      erlenmeyer: { bandeja: 'contener', ok: 'El matraz Erlenmeyer sirve para contener y agitar líquidos sin que salpiquen.', no: 'Las marcas del Erlenmeyer son aproximadas. Se usa para contener y agitar, no para medir.' },
      tubo: { bandeja: 'contener', ok: 'El tubo de ensayo contiene pequeñas cantidades de sustancias.', no: 'El tubo de ensayo no tiene escala de medida. Sirve para contener pequeñas cantidades.' },
      probeta: { bandeja: 'medir', ok: 'La probeta sirve para medir porque tiene una escala en mililitros.', no: 'La probeta tiene una escala en mililitros: es un instrumento para medir volumen.' },
      pipeta: { bandeja: 'medir', ok: 'La pipeta mide volúmenes pequeños con precisión gracias a su escala.', no: 'La pipeta está graduada y mide volúmenes pequeños con precisión.' },
      bureta: { bandeja: 'medir', ok: 'La bureta mide cuánto líquido sale a través de su llave de paso.', no: 'La bureta tiene escala y llave de paso: mide el líquido que deja salir.' }
    }
  };

  /* Parecidos pero diferentes · parejas disponibles con el módulo 2 */
  var PAREJAS = [
    { id: 'probeta-vaso', a: 'probeta', b: 'vaso',
      cuadro: [
        ['Forma', 'Cilindro alto y angosto, con base ancha', 'Cilindro ancho, de boca abierta y con pico'],
        ['Material', 'Vidrio o plástico', 'Vidrio'],
        ['¿Tiene escala?', 'Sí, en mililitros y precisa', 'Sí, pero aproximada'],
        ['¿Para qué sirve?', 'Medir volúmenes de líquidos', 'Contener, mezclar y calentar'],
        ['Se parecen en…', 'Ambos son cilíndricos, de vidrio y tienen marcas de volumen', '']
      ] },
    { id: 'pipeta-bureta', a: 'pipeta', b: 'bureta',
      cuadro: [
        ['Forma', 'Tubo delgado con punta fina', 'Tubo largo con llave de paso abajo'],
        ['Material', 'Vidrio', 'Vidrio, con llave que puede ser de plástico'],
        ['¿Tiene escala?', 'Sí', 'Sí, se lee de arriba hacia abajo'],
        ['¿Para qué sirve?', 'Tomar y pasar volúmenes pequeños', 'Dejar salir líquido gota a gota y medir cuánto salió'],
        ['Se parecen en…', 'Ambos son tubos de vidrio graduados que miden con precisión', '']
      ] }
  ];

  /* ---------- Evaluaciones ---------- */
  function nameOpts(ids) { return ids.map(function (id) { return { id: id }; }); }

  var DIAGNOSTICA = {
    id: 'diagnostica', titulo: '¿Qué sé del laboratorio?', califica: false,
    preguntas: [
      { tipo: 'imagen', instrumento: 'vaso', texto: '¿Cómo se llama este instrumento?', opciones: nameOpts(['tubo', 'vaso', 'erlenmeyer', 'mortero']), correcta: 'vaso' },
      { tipo: 'imagen', instrumento: 'probeta', texto: '¿Cómo se llama este instrumento?', opciones: nameOpts(['probeta', 'bureta', 'pipeta', 'embudo']), correcta: 'probeta' },
      { tipo: 'imagen', instrumento: 'erlenmeyer', texto: '¿Cómo se llama este instrumento?', opciones: nameOpts(['embudo', 'vaso', 'erlenmeyer', 'vidrio-reloj']), correcta: 'erlenmeyer' },
      { tipo: 'imagen', instrumento: 'tubo', texto: '¿Cómo se llama este instrumento?', opciones: nameOpts(['pipeta', 'tubo', 'agitador', 'probeta']), correcta: 'tubo' },
      { tipo: 'imagen', instrumento: 'pipeta', texto: '¿Cómo se llama este instrumento?', opciones: nameOpts(['agitador', 'bureta', 'pipeta', 'tubo']), correcta: 'pipeta' },
      { tipo: 'imagen', instrumento: 'bureta', texto: '¿Cómo se llama este instrumento?', opciones: nameOpts(['bureta', 'probeta', 'soporte', 'pipeta']), correcta: 'bureta' },
      { tipo: 'texto', texto: '¿De qué material está hecha la mayoría de los recipientes de un laboratorio de química?',
        opciones: [{ id: 'vidrio', label: 'Vidrio' }, { id: 'madera', label: 'Madera' }, { id: 'carton', label: 'Cartón' }, { id: 'tela', label: 'Tela' }], correcta: 'vidrio' },
      { tipo: 'texto', texto: '¿Cuál de estos instrumentos se usa para calentar una sustancia?',
        opciones: nameOpts(['balanza', 'mechero', 'embudo', 'mortero']), correcta: 'mechero' }
    ]
  };

  var MINIRETOS = {
    2: {
      id: 'minireto-2', modulo: 2, titulo: 'Mini-reto', califica: true, minimo: 4,
      preguntas: [
        { tipo: 'opciones-imagen', oe: 'OE3', texto: 'Necesitas medir exactamente 25 mL de agua. ¿Qué instrumento es el más adecuado?',
          opciones: nameOpts(['vaso', 'probeta', 'erlenmeyer', 'tubo']), correcta: 'probeta',
          ok: 'La probeta tiene una escala en mililitros que permite medir con precisión.',
          no: { vaso: 'El vaso tiene marcas aproximadas; para medir con precisión se usa la probeta.', erlenmeyer: 'Las marcas del Erlenmeyer son aproximadas; para medir con precisión se usa la probeta.', tubo: 'El tubo de ensayo no tiene escala; para medir se usa la probeta.' } },
        { tipo: 'imagen', oe: 'OE1', instrumento: 'bureta', texto: '¿Cómo se llama este instrumento?',
          opciones: nameOpts(['pipeta', 'bureta', 'probeta', 'tubo']), correcta: 'bureta',
          ok: 'Es la bureta: un tubo largo, graduado y con llave de paso en la parte inferior.',
          no: { pipeta: 'La pipeta no tiene llave de paso. Este instrumento es la bureta.', probeta: 'La probeta tiene base ancha y no tiene llave. Este instrumento es la bureta.', tubo: 'El tubo de ensayo es corto y sin escala. Este instrumento es la bureta.' } },
        { tipo: 'opciones-imagen', oe: 'OE2', texto: '¿Cuál de estos instrumentos tiene cuerpo cónico y cuello estrecho para agitar sin salpicar?',
          opciones: nameOpts(['tubo', 'vaso', 'erlenmeyer', 'probeta']), correcta: 'erlenmeyer',
          ok: 'El matraz Erlenmeyer tiene cuerpo cónico y cuello estrecho, por eso no salpica al agitarlo.',
          no: { tubo: 'El tubo de ensayo tiene forma de tubo con fondo redondeado. El de cuerpo cónico es el Erlenmeyer.', vaso: 'El vaso es cilíndrico y de boca ancha. El de cuerpo cónico es el Erlenmeyer.', probeta: 'La probeta es un cilindro alto. El de cuerpo cónico es el Erlenmeyer.' } },
        { tipo: 'opciones-imagen', oe: 'OE4', texto: 'Necesitas medir 10 mL de un líquido con precisión. ¿Qué instrumento eliges?',
          opciones: nameOpts(['erlenmeyer', 'pipeta', 'vaso', 'tubo']), correcta: 'pipeta',
          ok: 'La pipeta mide volúmenes pequeños con precisión gracias a su escala.',
          no: { erlenmeyer: 'Las marcas del Erlenmeyer son aproximadas; para medir con precisión se usa la probeta o la pipeta.', vaso: 'Las marcas del vaso son aproximadas; para medir con precisión se usa la probeta o la pipeta.', tubo: 'El tubo de ensayo no tiene escala; para medir con precisión se usa la pipeta.' } },
        { tipo: 'opciones-imagen', oe: 'OE2', texto: '¿Qué instrumento no tiene escala de medida y sirve para observar pequeñas cantidades de sustancias?',
          opciones: nameOpts(['probeta', 'bureta', 'tubo', 'pipeta']), correcta: 'tubo',
          ok: 'El tubo de ensayo no tiene escala: sirve para contener y observar pequeñas cantidades.',
          no: { probeta: 'La probeta sí tiene escala en mililitros. El que no tiene escala es el tubo de ensayo.', bureta: 'La bureta sí tiene escala. El que no tiene escala es el tubo de ensayo.', pipeta: 'La pipeta sí tiene escala. El que no tiene escala es el tubo de ensayo.' } }
      ]
    }
  };

  /* ---------- Glosario ---------- */
  var GLOSARIO = [
    { termino: 'Escala graduada', def: 'Serie de marcas con números que permite medir una cantidad, como el volumen de un líquido.' },
    { termino: 'Graduado', def: 'Que tiene una escala de medida marcada. Una probeta graduada tiene marcas en mililitros.' },
    { termino: 'Gradilla', def: 'Soporte con orificios donde se colocan los tubos de ensayo para que no se caigan.' },
    { termino: 'Llave de paso', def: 'Pieza de la bureta que se gira para abrir o cerrar la salida del líquido.' },
    { termino: 'Menisco', def: 'Curva que forma la superficie de un líquido dentro de un tubo. El volumen se lee en la parte más baja de la curva, con los ojos a su altura.' },
    { termino: 'Mililitro (mL)', def: 'Unidad para medir volúmenes pequeños. Mil mililitros forman un litro.' },
    { termino: 'Pipeteador', def: 'Pera o dispositivo que se usa para llenar la pipeta sin usar la boca.' },
    { termino: 'Precisión', def: 'Qué tan exacta es una medida. La pipeta y la bureta miden con más precisión que el vaso de precipitados.' },
    { termino: 'Refractario', def: 'Material que resiste altas temperaturas sin romperse ni deformarse.' },
    { termino: 'Trasvasar', def: 'Pasar un líquido de un recipiente a otro.' },
    { termino: 'Volumen', def: 'Espacio que ocupa un líquido o un objeto. En el laboratorio se mide en mililitros.' }
  ];

  var TUTORIAL = [
    { titulo: 'Gira', texto: 'Desliza un dedo sobre el modelo para verlo desde cualquier lado.', icono: 'rotate' },
    { titulo: 'Amplía', texto: 'Pellizca con dos dedos o usa los botones + y − para acercarte.', icono: 'zoom' },
    { titulo: 'Consulta', texto: 'Toca los puntos numerados y revisa las pestañas Características, Uso y Cuidado.', icono: 'book' }
  ];

  return {
    FUNCIONES: FUNCIONES, MATERIALES: MATERIALES, MODULOS: MODULOS, INSTRUMENTOS: INSTRUMENTOS,
    ACTIVIDADES: ACTIVIDADES, CLASIFICACION_M2: CLASIFICACION_M2, PAREJAS: PAREJAS,
    DIAGNOSTICA: DIAGNOSTICA, MINIRETOS: MINIRETOS, GLOSARIO: GLOSARIO, TUTORIAL: TUTORIAL
  };
})();
