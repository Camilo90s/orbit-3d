/*
 * Orbita · Contenidos del ambiente
 * ---------------------------------------------------------------
 * Todo el contenido pedagógico vive en este archivo para que el equipo
 * pueda revisarlo y ampliarlo sin tocar la lógica de la aplicación.
 * Versión 1.0: los cuatro módulos, las actividades, las evaluaciones y el reto final.
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
      id: 1, estado: 'disponible', semana: 1,
      titulo: 'Bienvenida al laboratorio', corto: 'Bienvenida',
      objetivo: 'explicar qué es un laboratorio de química, clasificar su material según el material del que está hecho y explorar un modelo 3D en Orbita.',
      temas: ['Qué es un laboratorio de química y para qué se usa', 'Material de vidrio, porcelana, metal y plástico', 'Cómo explorar un modelo 3D en Orbita'],
      instrumentos: [], lecciones: ['laboratorio', 'materiales', 'visor'],
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
      id: 3, estado: 'disponible', semana: 3,
      titulo: 'Instrumentos para calentar, sostener y sujetar', corto: 'Calentar y sostener',
      objetivo: 'reconocer los instrumentos que sirven para calentar, sostener y sujetar, y relacionar su material con la resistencia al calor.',
      temas: ['Fuentes de calor en el laboratorio', 'Material de soporte y sujeción', 'Relación entre el material y la resistencia al calor'],
      instrumentos: ['mechero', 'tripode', 'rejilla', 'soporte', 'pinza-nuez', 'pinza-tubo'],
      actividades: ['explora', 'quien-soy', 'parecidos'],
      insignia: 'Guardián del calor', oe: 'OE1 a OE4'
    },
    {
      id: 4, estado: 'disponible', semana: 4,
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

    /* ---------- Módulo 3 · calentar, sostener y sujetar ---------- */
    mechero: {
      nombre: 'Mechero Bunsen', modulo: 3, funciones: ['calentar'], materiales: ['metal'],
      resumen: 'Fuente de calor',
      modelo: 'models/mechero.glb', imagen: 'img/instrumentos/mechero.webp', vistas: 'img/vistas/mechero',
      partes: [
        { n: 1, nombre: 'Tubo o cañón', texto: 'por aquí sube la mezcla de gas y aire que arde en la boca del tubo.', pos: '0 0.1 0.0067', normal: '0 0 1' },
        { n: 2, nombre: 'Regulador de aire', texto: 'anillo con orificios; al girarlo entra más o menos aire y cambia la llama.', pos: '0 0.033 0.0094', normal: '0 0 1' },
        { n: 3, nombre: 'Entrada de gas', texto: 'se conecta con una manguera a la llave de gas.', pos: '0.045 0.0075 0.0037', normal: '0.3 0 1' }
      ],
      caracteristicas: 'Instrumento de metal con una base pesada, un tubo vertical y un anillo que regula la entrada de aire. Funciona con gas y produce una llama.',
      uso: 'Es la fuente de calor del laboratorio: sirve para calentar sustancias y recipientes. Con suficiente aire la llama es azul y más caliente; con poco aire es amarilla y deja hollín.',
      cuidado: 'Solo se enciende con autorización del docente, con el cabello recogido y lejos de materiales que puedan quemarse. Al terminar, cierra la llave de gas y deja enfriar el tubo antes de tocarlo.',
      pistas: { forma: 'Tengo una base redonda y un tubo vertical con un anillo.', material: 'Soy de metal.', uso: 'Produzco una llama para calentar.' },
      fijate: 'Fíjate en el tubo vertical, el anillo regulador y la entrada de gas: es la fuente de calor del laboratorio.'
    },
    tripode: {
      nombre: 'Trípode', modulo: 3, funciones: ['sostener'], materiales: ['metal'],
      resumen: 'Sostener sobre el mechero',
      modelo: 'models/tripode.glb', imagen: 'img/instrumentos/tripode.webp', vistas: 'img/vistas/tripode',
      partes: [
        { n: 1, nombre: 'Aro superior', texto: 'sobre él se coloca la rejilla con el recipiente que se va a calentar.', pos: '0 0.169 0.058', normal: '0 1 0.4' },
        { n: 2, nombre: 'Tres patas', texto: 'lo mantienen estable y dejan espacio para el mechero debajo.', pos: '0.0638 0.08 0.035', normal: '0.8 0 0.5' }
      ],
      caracteristicas: 'Aro de hierro sostenido por tres patas largas. Es firme y resiste el calor.',
      uso: 'Sirve para sostener recipientes a cierta altura mientras se calientan con el mechero colocado debajo. Siempre se usa con una rejilla encima.',
      cuidado: 'Después de calentar, el aro queda muy caliente aunque no lo parezca: no lo toques hasta que se enfríe. Colócalo sobre una superficie firme y plana.',
      pistas: { forma: 'Soy un aro con tres patas.', material: 'Soy de hierro.', uso: 'Sostengo la rejilla y el recipiente sobre el mechero.' },
      fijate: 'Fíjate en sus tres patas y su aro: sostiene el recipiente por encima del mechero.'
    },
    rejilla: {
      nombre: 'Rejilla metálica con centro cerámico', modulo: 3, funciones: ['calentar', 'sostener'], materiales: ['metal'],
      resumen: 'Repartir el calor', camara: '20deg 42deg auto',
      modelo: 'models/rejilla.glb', imagen: 'img/instrumentos/rejilla.webp', vistas: 'img/vistas/rejilla',
      partes: [
        { n: 1, nombre: 'Centro cerámico', texto: 'reparte el calor de la llama para que el recipiente se caliente de forma pareja.', pos: '0 0.0042 0', normal: '0 1 0' },
        { n: 2, nombre: 'Malla metálica', texto: 'sostiene el recipiente sobre el aro del trípode.', pos: '0.052 0.0024 0.052', normal: '0 1 0' }
      ],
      caracteristicas: 'Lámina cuadrada de malla metálica con un círculo de material cerámico en el centro.',
      uso: 'Se coloca sobre el trípode para apoyar vasos y matraces mientras se calientan. Reparte el calor y evita que la llama toque directamente el vidrio.',
      cuidado: 'Tómala por los bordes y solo cuando esté fría. Si el centro cerámico está roto o se desprende, avisa al docente.',
      pistas: { forma: 'Soy una malla cuadrada con un círculo en el centro.', material: 'Soy de metal con un centro cerámico.', uso: 'Reparto el calor para que el vidrio no se rompa.' },
      fijate: 'Fíjate en el círculo cerámico del centro: reparte el calor de la llama sobre el recipiente.'
    },
    soporte: {
      nombre: 'Soporte universal', modulo: 3, funciones: ['sostener'], materiales: ['metal'],
      resumen: 'Sostener montajes',
      modelo: 'models/soporte.glb', imagen: 'img/instrumentos/soporte.webp', vistas: 'img/vistas/soporte',
      partes: [
        { n: 1, nombre: 'Base pesada', texto: 'le da estabilidad para que el montaje no se caiga.', pos: '0.04 0.0142 0.03', normal: '0 1 0.3' },
        { n: 2, nombre: 'Varilla vertical', texto: 'allí se ajustan las pinzas y nueces a la altura que se necesite.', pos: '-0.065 0.32 0.0057', normal: '0 0 1' }
      ],
      caracteristicas: 'Base rectangular pesada de metal con una varilla vertical larga.',
      uso: 'Sirve para armar montajes: con pinzas y nueces sostiene buretas, embudos, tubos y otros instrumentos a la altura necesaria.',
      cuidado: 'Coloca la base debajo de lo que vas a sostener para que el montaje no se voltee. Ajusta bien las pinzas antes de soltar el instrumento.',
      pistas: { forma: 'Soy una base plana con una varilla larga.', material: 'Soy de metal.', uso: 'Sostengo montajes con ayuda de pinzas.' },
      fijate: 'Fíjate en la varilla larga sobre una base pesada: sirve para sostener otros instrumentos con pinzas.'
    },
    'pinza-nuez': {
      nombre: 'Pinza con nuez', modulo: 3, funciones: ['sostener'], materiales: ['metal'],
      resumen: 'Sujetar al soporte',
      modelo: 'models/pinza-nuez.glb', imagen: 'img/instrumentos/pinza-nuez.webp', vistas: 'img/vistas/pinza-nuez',
      partes: [
        { n: 1, nombre: 'Nuez', texto: 'pieza que se ajusta a la varilla del soporte universal.', pos: '0 0.062 0.0122', normal: '0 0 1' },
        { n: 2, nombre: 'Mordazas forradas', texto: 'sujetan el instrumento sin rayarlo ni romperlo.', pos: '0.137 0.053 0.0185', normal: '0 0.3 1' },
        { n: 3, nombre: 'Tornillo de ajuste', texto: 'se gira para apretar o aflojar la nuez.', pos: '0 0.05 -0.028', normal: '0 0 -1' }
      ],
      caracteristicas: 'Pinza de metal con mordazas forradas y una nuez con tornillos de ajuste. Se monta sobre la varilla del soporte universal.',
      uso: 'Sirve para sujetar instrumentos como buretas, tubos o matraces al soporte universal y mantenerlos fijos durante la práctica.',
      cuidado: 'Aprieta los tornillos sin forzarlos, solo hasta que el instrumento quede firme. Si sujetas vidrio, verifica que las mordazas estén forradas.',
      pistas: { forma: 'Tengo un brazo con mordazas y una pieza con tornillos.', material: 'Soy de metal y mis mordazas tienen forro.', uso: 'Sujeto instrumentos al soporte universal.' },
      fijate: 'Fíjate en la nuez con tornillos: se ajusta a la varilla del soporte, mientras que la pinza para tubo se sostiene con la mano.'
    },
    'pinza-tubo': {
      nombre: 'Pinza para tubo de ensayo', modulo: 3, funciones: ['sostener'], materiales: ['metal'],
      resumen: 'Sujetar tubos calientes', camara: '30deg 60deg auto',
      modelo: 'models/pinza-tubo.glb', imagen: 'img/instrumentos/pinza-tubo.webp', vistas: 'img/vistas/pinza-tubo',
      partes: [
        { n: 1, nombre: 'Mango', texto: 'se sostiene con la mano, lejos del calor.', pos: '0.035 0.0045 0', normal: '0 1 0' },
        { n: 2, nombre: 'Mordaza curva', texto: 'rodea el tubo de ensayo y lo sujeta con la presión del resorte.', pos: '0.112 0 0.0145', normal: '0 0.2 1' }
      ],
      caracteristicas: 'Pinza de alambre metálico con resorte, un mango para la mano y una mordaza curva que rodea el tubo.',
      uso: 'Sirve para sostener un tubo de ensayo con la mano mientras se calienta o se manipula, sin quemarse.',
      cuidado: 'Sujeta el tubo cerca de la boca, inclínalo y apunta la boca lejos de las personas. No la uses para sostener recipientes grandes.',
      pistas: { forma: 'Tengo un mango largo, un resorte y una mordaza curva.', material: 'Soy de alambre metálico.', uso: 'Sostengo tubos de ensayo calientes con la mano.' },
      fijate: 'Fíjate en la mordaza curva y el mango: se sostiene con la mano, no se monta en el soporte.'
    },

    /* ---------- Módulo 4 · triturar, separar, mezclar y pesar ---------- */
    mortero: {
      nombre: 'Mortero con pistilo', modulo: 4, funciones: ['triturar'], materiales: ['porcelana'],
      resumen: 'Triturar sólidos', camara: '20deg 62deg auto',
      modelo: 'models/mortero.glb', imagen: 'img/instrumentos/mortero.webp', vistas: 'img/vistas/mortero',
      partes: [
        { n: 1, nombre: 'Mortero', texto: 'recipiente grueso y pesado donde se colocan los sólidos.', pos: '0 0.03 0.054', normal: '0 0.2 1' },
        { n: 2, nombre: 'Pistilo', texto: 'mazo con punta redondeada que tritura y muele.', pos: '0.03808 0.09524 0.02006', normal: '0 0 1' }
      ],
      caracteristicas: 'Recipiente grueso de porcelana en forma de cuenco, acompañado de un pistilo del mismo material con punta redondeada.',
      uso: 'Sirve para triturar y moler sólidos, como cristales o semillas, hasta convertirlos en polvo fino.',
      cuidado: 'Tritura con movimientos circulares y presión, sin golpear con fuerza. Lávalo y sécalo bien antes de usarlo con otra sustancia.',
      pistas: { forma: 'Soy un cuenco grueso con un mazo.', material: 'Soy de porcelana.', uso: 'Trituro sólidos hasta volverlos polvo.' },
      fijate: 'Fíjate en el cuenco grueso y su pistilo: es para triturar, no para contener líquidos.'
    },
    embudo: {
      nombre: 'Embudo', modulo: 4, funciones: ['separar'], materiales: ['vidrio', 'plastico'],
      resumen: 'Filtrar y trasvasar',
      modelo: 'models/embudo.glb', imagen: 'img/instrumentos/embudo.webp', vistas: 'img/vistas/embudo',
      partes: [
        { n: 1, nombre: 'Cono', texto: 'boca ancha donde se vierte el líquido o se coloca el papel filtro.', pos: '0 0.112 0.0315', normal: '0 0.4 1' },
        { n: 2, nombre: 'Vástago', texto: 'tubo delgado que conduce el líquido al recipiente de abajo.', pos: '0 0.035 0.0047', normal: '0 0 1' }
      ],
      caracteristicas: 'Instrumento de vidrio o plástico con forma de cono y un tubo delgado en la parte inferior, llamado vástago.',
      uso: 'Sirve para trasvasar líquidos a recipientes de boca estrecha y, con papel filtro, para separar sólidos de líquidos (filtración).',
      cuidado: 'Sostenlo firme sobre el recipiente o en un aro, y no lo llenes hasta el borde. El extremo del vástago debe tocar la pared interna del recipiente de abajo.',
      pistas: { forma: 'Tengo forma de cono con un tubo abajo.', material: 'Soy de vidrio o de plástico.', uso: 'Con papel filtro separo sólidos de líquidos.' },
      fijate: 'Fíjate en su forma de cono y su vástago: conduce el líquido y, con papel filtro, separa sólidos.'
    },
    'vidrio-reloj': {
      nombre: 'Vidrio de reloj', modulo: 4, funciones: ['contener', 'pesar'], materiales: ['vidrio'],
      resumen: 'Pesar y evaporar', camara: '20deg 50deg auto',
      modelo: 'models/vidrio-reloj.glb', imagen: 'img/instrumentos/vidrio-reloj.webp', vistas: 'img/vistas/vidrio-reloj',
      partes: [
        { n: 1, nombre: 'Superficie cóncava', texto: 'forma de plato curvo donde se colocan pequeñas cantidades de sólido.', pos: '0 0.0024 0', normal: '0 1 0' },
        { n: 2, nombre: 'Borde redondo', texto: 'permite usarlo también como tapa de un vaso de precipitados.', pos: '0 0.01289 0.045', normal: '0 0.4 1' }
      ],
      caracteristicas: 'Disco de vidrio delgado y ligeramente curvo, parecido al cristal de un reloj.',
      uso: 'Sirve para pesar pequeñas cantidades de sólidos en la balanza, para evaporar unas gotas de líquido y para tapar un vaso de precipitados.',
      cuidado: 'Es delgado y se rompe con facilidad: tómalo por el borde. Antes de pesar, colócalo vacío en la balanza y presiona el botón de tara.',
      pistas: { forma: 'Soy un disco curvo y delgado.', material: 'Soy de vidrio.', uso: 'Sostengo pequeñas cantidades de sólido para pesarlas.' },
      fijate: 'Fíjate en su forma de plato curvo: sirve para pesar pequeñas cantidades de sólido o evaporar gotas.'
    },
    agitador: {
      nombre: 'Agitador de vidrio', modulo: 4, funciones: ['mezclar'], materiales: ['vidrio'],
      resumen: 'Mezclar soluciones',
      modelo: 'models/agitador.glb', imagen: 'img/instrumentos/agitador.webp', vistas: 'img/vistas/agitador',
      partes: [
        { n: 1, nombre: 'Varilla maciza', texto: 'no tiene hueco ni escala, porque no sirve para medir.', pos: '0.05736 0.08192 0.0043', normal: '0 0 1' },
        { n: 2, nombre: 'Extremos redondeados', texto: 'no rayan ni rompen el vidrio de los recipientes.', pos: '0.1147 0.1682 0', normal: '0.4 1 0' }
      ],
      caracteristicas: 'Varilla de vidrio macizo, delgada y larga, con los extremos redondeados al fuego.',
      uso: 'Sirve para mezclar y disolver sustancias y para guiar un líquido cuando se vierte de un recipiente a otro.',
      cuidado: 'Revuelve con movimientos suaves, sin golpear las paredes del recipiente. Lávalo antes de usarlo en otra mezcla para no contaminarla.',
      pistas: { forma: 'Soy una varilla delgada y larga.', material: 'Soy de vidrio macizo.', uso: 'Sirvo para mezclar y disolver.' },
      fijate: 'Fíjate en que es macizo y no tiene escala: a diferencia de la pipeta, no mide, solo mezcla.'
    },
    'frasco-lavador': {
      nombre: 'Frasco lavador', modulo: 4, funciones: ['contener'], materiales: ['plastico'],
      resumen: 'Enjuagar con agua',
      modelo: 'models/frasco-lavador.glb', imagen: 'img/instrumentos/frasco-lavador.webp', vistas: 'img/vistas/frasco-lavador',
      partes: [
        { n: 1, nombre: 'Cuerpo flexible', texto: 'al apretarlo sale un chorro fino de agua.', pos: '0 0.07 0.0332', normal: '0 0 1' },
        { n: 2, nombre: 'Tubo de salida', texto: 'dirige el chorro hacia donde se necesita.', pos: '0.03 0.227 0.0026', normal: '0 0.3 1' }
      ],
      caracteristicas: 'Frasco de plástico flexible con tapa y un tubo delgado y curvo por donde sale el líquido.',
      uso: 'Contiene agua destilada para enjuagar instrumentos, arrastrar restos de sólidos y completar volúmenes con precisión.',
      cuidado: 'Llénalo solo con agua destilada, a menos que el docente indique otra cosa, y rotúlalo. No lo acerques a la llama: el plástico se deforma.',
      pistas: { forma: 'Soy un frasco con un tubo curvo en la tapa.', material: 'Soy de plástico flexible.', uso: 'Lanzo un chorro de agua para enjuagar.' },
      fijate: 'Fíjate en el tubo curvo y el plástico flexible: al apretarlo sale un chorro de agua para enjuagar.'
    },
    balanza: {
      nombre: 'Balanza', modulo: 4, funciones: ['pesar', 'medir'], materiales: ['metal', 'plastico'],
      resumen: 'Medir la masa', camara: '25deg 58deg auto',
      modelo: 'models/balanza.glb', imagen: 'img/instrumentos/balanza.webp', vistas: 'img/vistas/balanza',
      partes: [
        { n: 1, nombre: 'Platillo', texto: 'superficie de metal donde se coloca lo que se va a pesar.', pos: '0 0.0482 0.02', normal: '0 1 0' },
        { n: 2, nombre: 'Pantalla', texto: 'muestra la masa en gramos (g).', pos: '-0.025 0.02 0.137', normal: '0 0.3 1' },
        { n: 3, nombre: 'Botón de tara', texto: 'pone la pantalla en cero para descontar el peso del recipiente.', pos: '0.04 0.0195 0.1352', normal: '0 0.6 1' }
      ],
      caracteristicas: 'Instrumento electrónico con un platillo de metal, una pantalla digital y botones. Mide la masa en gramos.',
      uso: 'Sirve para medir la masa de sólidos y líquidos. Lo que se pesa se coloca en un vidrio de reloj o en un recipiente, nunca directo sobre el platillo.',
      cuidado: 'Úsala sobre una mesa firme y sin corrientes de aire. Presiona tara con el recipiente vacío y no pongas objetos más pesados de lo que indica.',
      pistas: { forma: 'Tengo un platillo redondo y una pantalla con números.', material: 'Soy de metal y plástico.', uso: 'Mido la masa en gramos.' },
      fijate: 'Fíjate en el platillo y la pantalla: mide la masa en gramos, no el volumen.'
    }
  };

  /* ---------- Actividades ---------- */
  var ACTIVIDADES = [
    { id: 'explora', nombre: 'Explora y descubre', oe: ['OE1', 'OE2'], donde: 'Base de todos los módulos', icono: 'rotate',
      resumen: 'Gira y amplía cada modelo, toca los puntos numerados y anota en tu cuaderno el nombre y dos características.' },
    { id: 'quien-soy', nombre: '¿Quién soy?', oe: ['OE1', 'OE2'], donde: 'Módulos 2, 3 y 4', icono: 'help', modulos: [2, 3, 4],
      resumen: 'Un modelo gira sin su nombre. Elige entre cuatro opciones; si lo necesitas, pide hasta tres pistas.' },
    { id: 'cada-cosa', nombre: 'Cada cosa en su lugar', oe: ['OE3', 'OE4'], donde: 'Módulo 2: 2 bandejas · Módulo 4: 5 categorías', icono: 'grid', modulos: [2, 4],
      resumen: 'Toca un instrumento y luego la bandeja a la que pertenece.' },
    { id: 'parecidos', nombre: 'Parecidos pero diferentes', oe: ['OE2', 'OE4'], donde: 'Módulo 3, en parejas', icono: 'split', modulos: [3],
      resumen: 'En parejas, comparen dos instrumentos que suelen confundirse y completen un cuadro en el cuaderno.' },
    { id: 'mesa', nombre: 'Arma tu mesa de trabajo', oe: ['OE3', 'OE5'], donde: 'Reto final, semana 5', icono: 'flask', cierre: true,
      resumen: 'Lee una situación y elige del estante los instrumentos que usarías. Se habilita al completar los cuatro módulos.' },
    { id: 'explicalo', nombre: 'Explícalo con tus palabras', oe: ['OE2', 'OE3', 'OE5'], donde: 'Cierre en clase, semana 5', icono: 'pencil', cierre: true,
      resumen: 'Escoge un instrumento y explica su nombre, sus características y su uso: de forma oral, escrita o con un dibujo rotulado.' }
  ];

  /* ---------- Módulo 1 · lecciones ---------- */
  var LECCIONES = {
    laboratorio: {
      titulo: '¿Qué es un laboratorio de química?', icono: 'flask', duracion: '5 min',
      intro: 'Un laboratorio de química es un lugar preparado para observar, medir y comprobar cómo son y cómo cambian las sustancias. Allí se trabaja con instrumentos y materiales pensados para tareas concretas.',
      ideas: [
        'Cada instrumento tiene una forma que responde a su función: un tubo alto y graduado sirve para medir; un aro con patas sirve para sostener.',
        'En Orbita los instrumentos se agrupan por lo que hacen: contener y medir líquidos (módulo 2), calentar, sostener y sujetar (módulo 3), y triturar, separar, mezclar y pesar (módulo 4).',
        'Reconocer el material antes de una práctica evita accidentes y ahorra tiempo: sabes qué tomar y cómo cuidarlo.'
      ],
      grupos: [
        { titulo: 'Contener y medir', modulo: 2, ejemplos: ['vaso', 'probeta', 'bureta'] },
        { titulo: 'Calentar, sostener y sujetar', modulo: 3, ejemplos: ['mechero', 'tripode', 'pinza-tubo'] },
        { titulo: 'Triturar, separar, mezclar y pesar', modulo: 4, ejemplos: ['mortero', 'embudo', 'balanza'] }
      ],
      normas: [
        'Sigue siempre las indicaciones del docente y lee la ficha antes de usar un instrumento.',
        'Usa bata y gafas de protección; recoge el cabello largo.',
        'No comas, no bebas ni pruebes ninguna sustancia.',
        'El vidrio caliente se ve igual que el frío: tómalo con pinza o espera a que se enfríe.',
        'Si algo se rompe o se derrama, avisa de inmediato al docente.'
      ]
    },
    materiales: {
      titulo: '¿De qué está hecho el material?', icono: 'layers', duracion: '8 min',
      intro: 'El material del que está hecho un instrumento dice mucho de cómo se usa. Por eso, además de clasificarlo por su uso, se clasifica por su fabricación.',
      materiales: [
        { id: 'vidrio', nombre: 'Vidrio', color: '#2f7fd8', texto: 'Es transparente, así que deja ver lo que pasa adentro, y no reacciona con la mayoría de las sustancias. El vidrio de laboratorio resiste cambios de temperatura, pero se rompe con golpes.', ejemplos: ['vaso', 'erlenmeyer', 'probeta', 'agitador'] },
        { id: 'porcelana', nombre: 'Porcelana', color: '#8a6d3b', texto: 'Es dura, gruesa y resiste el calor y los golpes. Por eso se usa para triturar y para calentar sólidos con fuerza.', ejemplos: ['mortero'] },
        { id: 'metal', nombre: 'Metal', color: '#56607a', texto: 'Es firme y resiste temperaturas altas. Se usa para sostener, sujetar y producir calor. Ojo: el metal conduce el calor y se calienta rápido.', ejemplos: ['mechero', 'tripode', 'soporte', 'pinza-nuez'] },
        { id: 'plastico', nombre: 'Plástico', color: '#0b8f81', texto: 'Es liviano, flexible y no se rompe fácilmente, pero no resiste el calor: nunca va cerca de la llama.', ejemplos: ['frasco-lavador', 'embudo', 'probeta'] }
      ],
      practica: [
        { instrumento: 'mortero', correcta: 'porcelana', ok: 'Sí: el mortero es de porcelana gruesa, por eso resiste la presión al triturar.' },
        { instrumento: 'tripode', correcta: 'metal', ok: 'Sí: el trípode es de hierro, firme y resistente al calor del mechero.' },
        { instrumento: 'frasco-lavador', correcta: 'plastico', ok: 'Sí: el frasco lavador es de plástico flexible; al apretarlo sale un chorro de agua.' },
        { instrumento: 'erlenmeyer', correcta: 'vidrio', ok: 'Sí: el matraz Erlenmeyer es de vidrio transparente para ver lo que contiene.' }
      ]
    },
    visor: {
      titulo: 'Cómo explorar un modelo 3D', icono: 'cube', duracion: '5 min', instrumento: 'probeta',
      intro: 'En cada ficha verás un modelo 3D que puedes manipular como si lo tuvieras en la mano. Practica aquí con la probeta graduada y completa las tres misiones.',
      misiones: [
        { id: 'girar', texto: 'Gira el modelo deslizando un dedo sobre él.', icono: 'rotate' },
        { id: 'ampliar', texto: 'Amplíalo pellizcando con dos dedos o con el botón +.', icono: 'zoomIn' },
        { id: 'punto', texto: 'Toca un punto numerado para conocer esa parte.', icono: 'target' }
      ],
      consejos: [
        'Si tu celular se pone lento, toca «Vista 3D» para cambiar a la vista en fotos desde 8 ángulos.',
        'El botón Escuchar lee la ficha en voz alta.',
        'El botón Aa de arriba agranda el texto.'
      ]
    }
  };

  /* ---------- Cada cosa en su lugar ---------- */
  var CLASIFICACION = {
    2: {
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
    },
    4: {
      bandejas: [
        { id: 'contener', nombre: 'Contener', icono: 'flask' },
        { id: 'medir', nombre: 'Medir volumen o masa', icono: 'target' },
        { id: 'calentar', nombre: 'Calentar', icono: 'flame' },
        { id: 'sostener', nombre: 'Sostener y sujetar', icono: 'hand' },
        { id: 'triturar', nombre: 'Triturar, separar o mezclar', icono: 'split' }
      ],
      items: {
        vaso: { bandeja: 'contener', ok: 'El vaso de precipitados contiene, mezcla y calienta líquidos.', no: 'El vaso tiene marcas aproximadas: su función es contener, no medir ni calentar por sí mismo.' },
        erlenmeyer: { bandeja: 'contener', ok: 'El Erlenmeyer contiene y permite agitar sin salpicar.', no: 'El Erlenmeyer es un recipiente: va con los instrumentos para contener.' },
        tubo: { bandeja: 'contener', ok: 'El tubo de ensayo contiene pequeñas cantidades de sustancia.', no: 'El tubo de ensayo es un recipiente pequeño sin escala: sirve para contener.' },
        'frasco-lavador': { bandeja: 'contener', ok: 'El frasco lavador contiene agua destilada para enjuagar.', no: 'El frasco lavador es un recipiente: contiene el agua destilada que se usa para enjuagar.' },
        'vidrio-reloj': { bandeja: 'contener', ok: 'El vidrio de reloj contiene pequeñas cantidades de sólido mientras se pesan o evaporan.', no: 'El vidrio de reloj no pesa: la que pesa es la balanza. Él contiene la muestra.' },
        probeta: { bandeja: 'medir', ok: 'La probeta mide volúmenes con su escala en mililitros.', no: 'La probeta tiene escala en mililitros: es un instrumento para medir.' },
        pipeta: { bandeja: 'medir', ok: 'La pipeta mide volúmenes pequeños con precisión.', no: 'La pipeta está graduada: mide volúmenes pequeños.' },
        bureta: { bandeja: 'medir', ok: 'La bureta mide el volumen que deja salir por su llave.', no: 'La bureta tiene escala y llave de paso: mide el líquido que sale.' },
        balanza: { bandeja: 'medir', ok: 'La balanza mide la masa en gramos.', no: 'La balanza mide: no el volumen, sino la masa en gramos.' },
        mechero: { bandeja: 'calentar', ok: 'El mechero Bunsen es la fuente de calor.', no: 'El mechero produce una llama: es el instrumento para calentar.' },
        rejilla: { bandeja: 'calentar', ok: 'La rejilla forma parte del calentamiento: reparte el calor de la llama.', no: 'La rejilla se apoya en el trípode, pero su función es repartir el calor de la llama: va con los instrumentos para calentar.' },
        tripode: { bandeja: 'sostener', ok: 'El trípode sostiene la rejilla y el recipiente sobre el mechero.', no: 'El trípode no calienta: sostiene el recipiente sobre el mechero.' },
        soporte: { bandeja: 'sostener', ok: 'El soporte universal sostiene montajes con pinzas y nueces.', no: 'El soporte universal sirve para sostener otros instrumentos.' },
        'pinza-nuez': { bandeja: 'sostener', ok: 'La pinza con nuez sujeta instrumentos al soporte.', no: 'La pinza con nuez sujeta instrumentos a la varilla del soporte.' },
        'pinza-tubo': { bandeja: 'sostener', ok: 'La pinza para tubo sujeta el tubo de ensayo caliente.', no: 'La pinza para tubo no calienta: sujeta el tubo mientras se calienta.' },
        mortero: { bandeja: 'triturar', ok: 'El mortero con pistilo tritura sólidos hasta volverlos polvo.', no: 'El mortero no contiene líquidos: sirve para triturar sólidos.' },
        embudo: { bandeja: 'triturar', ok: 'El embudo con papel filtro separa sólidos de líquidos.', no: 'El embudo, con papel filtro, separa sólidos de líquidos.' },
        agitador: { bandeja: 'triturar', ok: 'El agitador de vidrio mezcla y disuelve.', no: 'El agitador es macizo y no tiene escala: no mide, sirve para mezclar.' }
      }
    }
  };
  var CLASIFICACION_M2 = CLASIFICACION[2];

  /* ---------- Parecidos pero diferentes (módulo 3, en parejas) ---------- */
  var PREG_MEDIDA = ['¿En qué se parecen por su forma y su material?', '¿Cuál tiene escala de medida? ¿Es precisa o aproximada?', '¿Para qué sirve cada uno? ¿Qué detalle permite diferenciarlos?'];
  var PAREJAS = [
    { id: 'probeta-vaso', a: 'probeta', b: 'vaso', preguntas: PREG_MEDIDA,
      cuadro: [
        ['Forma', 'Cilindro alto y angosto, con base ancha', 'Cilindro ancho, de boca abierta y con pico'],
        ['Material', 'Vidrio o plástico', 'Vidrio'],
        ['¿Tiene escala?', 'Sí, en mililitros y precisa', 'Sí, pero aproximada'],
        ['¿Para qué sirve?', 'Medir volúmenes de líquidos', 'Contener, mezclar y calentar'],
        ['Se parecen en…', 'Ambos son cilíndricos, de vidrio y tienen marcas de volumen', '']
      ] },
    { id: 'pipeta-bureta', a: 'pipeta', b: 'bureta', preguntas: PREG_MEDIDA,
      cuadro: [
        ['Forma', 'Tubo delgado con punta fina', 'Tubo largo con llave de paso abajo'],
        ['Material', 'Vidrio', 'Vidrio, con llave que puede ser de plástico'],
        ['¿Tiene escala?', 'Sí', 'Sí, se lee de arriba hacia abajo'],
        ['¿Para qué sirve?', 'Tomar y pasar volúmenes pequeños', 'Dejar salir líquido gota a gota y medir cuánto salió'],
        ['Se parecen en…', 'Ambos son tubos de vidrio graduados que miden con precisión', '']
      ] },
    { id: 'pinzas', a: 'pinza-tubo', b: 'pinza-nuez',
      preguntas: ['¿En qué se parecen por su forma y su material?', '¿Cuál se sostiene con la mano y cuál se monta en el soporte universal?', '¿Qué sujeta cada una? ¿Qué pieza permite diferenciarlas?'],
      cuadro: [
        ['Forma', 'Mango largo con resorte y mordaza curva', 'Brazo con mordazas forradas y una nuez con tornillos'],
        ['Material', 'Alambre metálico', 'Metal, con mordazas forradas'],
        ['¿Cómo se usa?', 'Se sostiene con la mano', 'Se ajusta a la varilla del soporte universal'],
        ['¿Para qué sirve?', 'Sostener un tubo de ensayo mientras se calienta', 'Sujetar buretas, tubos o matraces al soporte'],
        ['Se parecen en…', 'Ambas son pinzas de metal que sujetan instrumentos para no tocarlos con la mano', '']
      ] },
    { id: 'tripode-soporte', a: 'tripode', b: 'soporte',
      preguntas: ['¿En qué se parecen por su forma y su material?', '¿Cuál se usa siempre con el mechero debajo?', '¿Qué sostiene cada uno? ¿Qué parte permite diferenciarlos?'],
      cuadro: [
        ['Forma', 'Aro sobre tres patas', 'Base rectangular con una varilla vertical'],
        ['Material', 'Hierro', 'Metal'],
        ['¿Cómo se usa?', 'Con una rejilla encima y el mechero debajo', 'Con pinzas y nueces ajustadas a la varilla'],
        ['¿Para qué sirve?', 'Sostener un recipiente mientras se calienta', 'Sostener montajes a la altura que se necesite'],
        ['Se parecen en…', 'Ambos son soportes de metal, firmes y estables', '']
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
    1: {
      id: 'minireto-1', modulo: 1, titulo: 'Mini-reto', califica: true, minimo: 4,
      preguntas: [
        { tipo: 'texto', oe: 'OE1', texto: '¿Para qué sirve un laboratorio de química escolar?',
          opciones: [{ id: 'observar', label: 'Para observar, medir y comprobar cómo son y cómo cambian las sustancias' }, { id: 'guardar', label: 'Para guardar los libros de ciencias' }, { id: 'vender', label: 'Para fabricar productos y venderlos' }, { id: 'docente', label: 'Solo para que trabaje el docente' }],
          correcta: 'observar', repaso: '/leccion/laboratorio', repasoNombre: '¿Qué es un laboratorio de química?',
          ok: 'En el laboratorio se observa, se mide y se comprueba cómo son y cómo cambian las sustancias.',
          no: { guardar: 'El laboratorio no es una biblioteca: es un lugar para observar, medir y comprobar.', vender: 'El laboratorio escolar es para aprender: allí se observa, se mide y se comprueba.', docente: 'Los estudiantes también trabajan en el laboratorio, siempre con las indicaciones del docente.' } },
        { tipo: 'texto', oe: 'OE1', texto: '¿De qué material está hecho el mortero con pistilo?',
          opciones: [{ id: 'vidrio', label: 'Vidrio' }, { id: 'porcelana', label: 'Porcelana' }, { id: 'plastico', label: 'Plástico' }, { id: 'metal', label: 'Metal' }],
          correcta: 'porcelana', repaso: '/leccion/materiales', repasoNombre: '¿De qué está hecho el material?',
          ok: 'El mortero es de porcelana: un material duro y grueso que resiste la presión al triturar.',
          no: { vidrio: 'El vidrio se rompería al triturar. El mortero es de porcelana, dura y gruesa.', plastico: 'El plástico es blando para triturar. El mortero es de porcelana.', metal: 'El mortero escolar es de porcelana, no de metal.' } },
        { tipo: 'opciones-imagen', oe: 'OE1', texto: '¿Cuál de estos instrumentos es de metal?',
          opciones: nameOpts(['vaso', 'tripode', 'embudo', 'frasco-lavador']), correcta: 'tripode', repaso: '/leccion/materiales', repasoNombre: '¿De qué está hecho el material?',
          ok: 'El trípode es de hierro: firme y resistente al calor del mechero.',
          no: { vaso: 'El vaso de precipitados es de vidrio. El de metal es el trípode.', embudo: 'El embudo es de vidrio o plástico. El de metal es el trípode.', 'frasco-lavador': 'El frasco lavador es de plástico. El de metal es el trípode.' } },
        { tipo: 'texto', oe: 'OE2', texto: '¿Por qué el frasco lavador nunca se acerca a la llama?',
          opciones: [{ id: 'plastico', label: 'Porque es de plástico y se deforma con el calor' }, { id: 'vidrio', label: 'Porque el vidrio se rompe con el calor' }, { id: 'agua', label: 'Porque el agua apaga la llama' }, { id: 'pesado', label: 'Porque es muy pesado' }],
          correcta: 'plastico', repaso: '/leccion/materiales', repasoNombre: '¿De qué está hecho el material?',
          ok: 'El plástico es liviano y flexible, pero no resiste el calor: se deforma.',
          no: { vidrio: 'El frasco lavador no es de vidrio: es de plástico, y el plástico se deforma con el calor.', agua: 'La razón es su material: el plástico se deforma con el calor.', pesado: 'Es liviano. La razón es que el plástico se deforma con el calor.' } },
        { tipo: 'texto', oe: 'OE1', texto: 'En Orbita, ¿cómo ves un instrumento desde otro ángulo?',
          opciones: [{ id: 'deslizar', label: 'Deslizo un dedo sobre el modelo' }, { id: 'pellizcar', label: 'Pellizco con dos dedos' }, { id: 'escuchar', label: 'Toco el botón Escuchar' }, { id: 'uso', label: 'Toco la pestaña Uso' }],
          correcta: 'deslizar', repaso: '/leccion/visor', repasoNombre: 'Cómo explorar un modelo 3D',
          ok: 'Al deslizar un dedo, el modelo gira y lo ves desde cualquier lado.',
          no: { pellizcar: 'Pellizcar sirve para ampliar. Para girar, desliza un dedo sobre el modelo.', escuchar: 'Escuchar lee la ficha en voz alta. Para girar, desliza un dedo sobre el modelo.', uso: 'La pestaña Uso explica para qué sirve. Para girar, desliza un dedo sobre el modelo.' } }
      ]
    },
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
    },
    3: {
      id: 'minireto-3', modulo: 3, titulo: 'Mini-reto', califica: true, minimo: 4,
      preguntas: [
        { tipo: 'imagen', oe: 'OE1', instrumento: 'mechero', texto: '¿Cómo se llama este instrumento?',
          opciones: nameOpts(['soporte', 'mechero', 'tripode', 'frasco-lavador']), correcta: 'mechero',
          ok: 'Es el mechero Bunsen: base pesada, tubo vertical y regulador de aire. Es la fuente de calor.',
          no: { soporte: 'El soporte tiene una base rectangular y una varilla larga, sin llama. Este es el mechero Bunsen.', tripode: 'El trípode es un aro con tres patas. Este es el mechero Bunsen.', 'frasco-lavador': 'El frasco lavador es de plástico y contiene agua. Este es el mechero Bunsen.' } },
        { tipo: 'opciones-imagen', oe: 'OE3', texto: 'Vas a calentar un vaso de precipitados sobre el trípode. ¿Qué colocas entre el trípode y el vaso para repartir el calor?',
          opciones: nameOpts(['vidrio-reloj', 'rejilla', 'pinza-nuez', 'mortero']), correcta: 'rejilla',
          ok: 'La rejilla con centro cerámico reparte el calor y evita que la llama toque directamente el vidrio.',
          no: { 'vidrio-reloj': 'El vidrio de reloj es delgado y se usa para pesar. Entre el trípode y el vaso va la rejilla.', 'pinza-nuez': 'La pinza con nuez sujeta instrumentos al soporte. Entre el trípode y el vaso va la rejilla.', mortero: 'El mortero sirve para triturar. Entre el trípode y el vaso va la rejilla.' } },
        { tipo: 'opciones-imagen', oe: 'OE4', texto: '¿Qué instrumento usas para sostener con la mano un tubo de ensayo mientras se calienta?',
          opciones: nameOpts(['pinza-nuez', 'tripode', 'pinza-tubo', 'soporte']), correcta: 'pinza-tubo',
          ok: 'La pinza para tubo de ensayo se sostiene con la mano y su mordaza curva rodea el tubo.',
          no: { 'pinza-nuez': 'La pinza con nuez se monta en el soporte, no se sostiene con la mano. Para el tubo se usa la pinza para tubo de ensayo.', tripode: 'El trípode sostiene recipientes sobre el mechero. Para el tubo se usa la pinza para tubo de ensayo.', soporte: 'El soporte sostiene montajes con pinzas. Para sostener el tubo con la mano se usa la pinza para tubo de ensayo.' } },
        { tipo: 'opciones-imagen', oe: 'OE4', texto: '¿Qué pieza se ajusta a la varilla del soporte universal para sujetar una bureta?',
          opciones: nameOpts(['pinza-tubo', 'rejilla', 'tripode', 'pinza-nuez']), correcta: 'pinza-nuez',
          ok: 'La pinza con nuez se ajusta a la varilla con su tornillo y sujeta la bureta con sus mordazas.',
          no: { 'pinza-tubo': 'La pinza para tubo se sostiene con la mano. La que se ajusta a la varilla es la pinza con nuez.', rejilla: 'La rejilla reparte el calor sobre el trípode. La que se ajusta a la varilla es la pinza con nuez.', tripode: 'El trípode es un soporte independiente. La que se ajusta a la varilla es la pinza con nuez.' } },
        { tipo: 'texto', oe: 'OE3', texto: '¿Por qué el trípode, la rejilla y el soporte universal son de metal?',
          opciones: [{ id: 'calor', label: 'Porque el metal es firme y resiste el calor' }, { id: 'transparente', label: 'Porque el metal es transparente' }, { id: 'liviano', label: 'Porque así pesan menos' }, { id: 'conduce', label: 'Porque el metal no se calienta' }],
          correcta: 'calor', repaso: '/ficha/tripode', repasoNombre: 'Trípode',
          ok: 'El metal es firme y resiste temperaturas altas, por eso sostiene recipientes calientes sin deformarse.',
          no: { transparente: 'El metal no es transparente; el transparente es el vidrio. El metal se usa porque es firme y resiste el calor.', liviano: 'El metal suele pesar más, y eso da estabilidad. Se usa porque es firme y resiste el calor.', conduce: 'Al contrario: el metal se calienta rápido, por eso se toca con cuidado. Se usa porque resiste el calor sin deformarse.' } }
      ]
    },
    4: {
      id: 'minireto-4', modulo: 4, titulo: 'Mini-reto', califica: true, minimo: 4,
      preguntas: [
        { tipo: 'imagen', oe: 'OE1', instrumento: 'balanza', texto: '¿Cómo se llama este instrumento?',
          opciones: nameOpts(['rejilla', 'balanza', 'vidrio-reloj', 'soporte']), correcta: 'balanza',
          ok: 'Es la balanza: tiene un platillo y una pantalla que muestra la masa en gramos.',
          no: { rejilla: 'La rejilla es una malla con centro cerámico. Este instrumento, con platillo y pantalla, es la balanza.', 'vidrio-reloj': 'El vidrio de reloj se pone sobre la balanza para pesar. Este instrumento es la balanza.', soporte: 'El soporte tiene una varilla vertical. Este instrumento, con pantalla, es la balanza.' } },
        { tipo: 'opciones-imagen', oe: 'OE3', texto: 'Necesitas convertir unos cristales de sal en polvo fino. ¿Qué instrumento usas?',
          opciones: nameOpts(['embudo', 'agitador', 'mortero', 'frasco-lavador']), correcta: 'mortero',
          ok: 'El mortero con pistilo tritura los sólidos hasta volverlos polvo.',
          no: { embudo: 'El embudo separa o trasvasa, no tritura. Para volver polvo un sólido se usa el mortero.', agitador: 'El agitador mezcla líquidos. Para triturar se usa el mortero con pistilo.', 'frasco-lavador': 'El frasco lavador sirve para enjuagar. Para triturar se usa el mortero.' } },
        { tipo: 'opciones-imagen', oe: 'OE3', texto: 'Quieres separar la arena del agua con papel filtro. ¿Qué instrumento necesitas?',
          opciones: nameOpts(['embudo', 'vidrio-reloj', 'mortero', 'balanza']), correcta: 'embudo',
          ok: 'El embudo con papel filtro deja pasar el agua y retiene la arena.',
          no: { 'vidrio-reloj': 'El vidrio de reloj sirve para pesar o evaporar. Para filtrar se usa el embudo.', mortero: 'El mortero tritura. Para filtrar se usa el embudo con papel filtro.', balanza: 'La balanza mide la masa. Para filtrar se usa el embudo.' } },
        { tipo: 'opciones-imagen', oe: 'OE3', texto: '¿Dónde colocas una pequeña cantidad de sólido para pesarla en la balanza?',
          opciones: nameOpts(['agitador', 'vidrio-reloj', 'embudo', 'frasco-lavador']), correcta: 'vidrio-reloj',
          ok: 'El vidrio de reloj sostiene la muestra; se pone vacío en la balanza y se presiona tara.',
          no: { agitador: 'El agitador es una varilla para mezclar. La muestra se pone en un vidrio de reloj.', embudo: 'El embudo no tiene fondo. La muestra se pone en un vidrio de reloj.', 'frasco-lavador': 'El frasco lavador contiene agua. La muestra sólida se pone en un vidrio de reloj.' } },
        { tipo: 'opciones-imagen', oe: 'OE4', texto: 'Un instrumento de vidrio es delgado y largo, pero macizo y sin escala. ¿Cuál es?',
          opciones: nameOpts(['pipeta', 'agitador', 'tubo', 'embudo']), correcta: 'agitador',
          ok: 'El agitador es macizo y no tiene escala: sirve para mezclar, no para medir.',
          no: { pipeta: 'La pipeta también es delgada, pero es hueca y está graduada: mide. El macizo y sin escala es el agitador.', tubo: 'El tubo de ensayo es hueco y corto. El macizo y sin escala es el agitador.', embudo: 'El embudo tiene forma de cono. El macizo y sin escala es el agitador.' } }
      ]
    }
  };

  /* ---------- Reto final · Arma tu mesa de trabajo ---------- */
  // necesarios: grupos de instrumentos; basta con uno de cada grupo. utiles: no sobran.
  var RETO_FINAL = {
    titulo: 'Arma tu mesa de trabajo',
    situaciones: [
      { id: 'medir25', texto: 'Necesitas medir exactamente 25 mL de agua.',
        necesarios: [['probeta']], utiles: ['vaso', 'frasco-lavador'],
        explica: { probeta: 'La probeta tiene escala en mililitros para medir con precisión.', vaso: 'Sirve para traer el agua, pero sus marcas no son exactas.', 'frasco-lavador': 'Ayuda a completar el volumen gota a gota.', erlenmeyer: 'Sus marcas son aproximadas: no sirve para medir exactamente.', pipeta: 'Mide volúmenes pequeños; para 25 mL es más práctica la probeta.' } },
      { id: 'calentar', texto: 'Debes calentar agua en un recipiente de vidrio.',
        necesarios: [['mechero'], ['tripode'], ['rejilla'], ['vaso', 'erlenmeyer']], utiles: ['pinza-tubo'],
        explica: { mechero: 'Es la fuente de calor.', tripode: 'Sostiene el recipiente sobre el mechero.', rejilla: 'Reparte el calor para que el vidrio no se rompa.', vaso: 'Es el recipiente de vidrio que se puede calentar.', erlenmeyer: 'También se puede calentar sobre la rejilla.', probeta: 'La probeta no se calienta: el calor deforma su escala.', 'frasco-lavador': 'Es de plástico y se deforma cerca de la llama.' } },
      { id: 'tubo', texto: 'Tienes que sostener un tubo de ensayo mientras se calienta.',
        necesarios: [['tubo'], ['pinza-tubo'], ['mechero']], utiles: [],
        explica: { tubo: 'Es el recipiente que se calienta.', 'pinza-tubo': 'Lo sostiene con la mano sin quemarse.', mechero: 'Produce la llama.', 'pinza-nuez': 'Se monta en el soporte; para sostener el tubo con la mano se usa la pinza para tubo.', tripode: 'No hace falta: el tubo se sostiene con la pinza, no sobre el trípode.' } },
      { id: 'triturar', texto: 'Debes triturar unos cristales de sal hasta volverlos polvo y luego pesar 5 g.',
        necesarios: [['mortero'], ['vidrio-reloj'], ['balanza']], utiles: [],
        explica: { mortero: 'Tritura los cristales hasta volverlos polvo.', 'vidrio-reloj': 'Sostiene el polvo mientras se pesa.', balanza: 'Mide la masa en gramos.', probeta: 'La probeta mide volumen de líquidos, no masa de sólidos.', agitador: 'El agitador mezcla; para triturar se usa el pistilo.' } },
      { id: 'filtrar', texto: 'Necesitas separar la arena del agua de una mezcla.',
        necesarios: [['embudo'], ['vaso', 'erlenmeyer']], utiles: ['agitador', 'soporte', 'pinza-nuez', 'frasco-lavador'],
        explica: { embudo: 'Con papel filtro retiene la arena y deja pasar el agua.', vaso: 'Recibe el agua filtrada.', erlenmeyer: 'Recibe el agua filtrada sin salpicar.', agitador: 'Guía la mezcla al verterla en el embudo.', soporte: 'Puede sostener el embudo con una pinza.', 'pinza-nuez': 'Puede sujetar el embudo al soporte.', 'frasco-lavador': 'Ayuda a arrastrar la arena que queda pegada.', mortero: 'El mortero tritura; no separa sólidos de líquidos.' } },
      { id: 'gota', texto: 'Debes dejar caer un líquido gota a gota y saber cuánto salió.',
        necesarios: [['bureta'], ['soporte'], ['pinza-nuez'], ['erlenmeyer', 'vaso']], utiles: [],
        explica: { bureta: 'Su llave de paso deja salir el líquido gota a gota y su escala dice cuánto salió.', soporte: 'Sostiene la bureta en posición vertical.', 'pinza-nuez': 'Sujeta la bureta a la varilla del soporte.', erlenmeyer: 'Recibe el líquido y se puede agitar sin salpicar.', vaso: 'Recibe el líquido que sale de la bureta.', pipeta: 'La pipeta mide volúmenes pequeños, pero no tiene llave para dejar salir gota a gota.' } }
    ]
  };

  /* ---------- Evaluación del cierre (para el docente) ---------- */
  var RUBRICA = [
    { criterio: 'Identificación (OE1)', superior: 'Nombra correctamente todos los instrumentos de las situaciones.', alto: 'Nombra correctamente casi todos los instrumentos, con un error menor.', basico: 'Nombra la mayoría, aunque confunde algunos instrumentos parecidos.', bajo: 'Confunde o no recuerda el nombre de la mayoría de los instrumentos.' },
    { criterio: 'Características (OE2)', superior: 'Describe con precisión varias características observables del instrumento que explica.', alto: 'Describe al menos dos características correctas.', basico: 'Describe una característica correcta.', bajo: 'No describe características o las que menciona son incorrectas.' },
    { criterio: 'Relación con la función (OE3)', superior: 'Relaciona cada instrumento con su función y explica qué característica lo hace útil para ella.', alto: 'Relaciona correctamente los instrumentos con su función.', basico: 'Relaciona la función de algunos de los instrumentos.', bajo: 'No logra relacionar los instrumentos con su función.' },
    { criterio: 'Selección y justificación (OE4 y OE5)', superior: 'Elige todos los instrumentos adecuados y justifica su elección diferenciándolos de otros similares.', alto: 'Elige los instrumentos adecuados y da una justificación correcta, aunque breve.', basico: 'Elige parte de los instrumentos adecuados y su justificación es incompleta.', bajo: 'Elige instrumentos que no corresponden a la situación y no justifica.' }
  ];
  var CHEQUEO_PARECIDOS = [
    'Ambos estudiantes manipulan los modelos (intercambian los roles de explorador y relator).',
    'Registran en el cuadro la forma y el material de cada instrumento.',
    'Identifican al menos dos diferencias correctas.',
    'Identifican al menos una semejanza correcta.',
    'Explican qué característica permite diferenciar los dos instrumentos.',
    'Participan en la puesta en común con su cuadro.'
  ];

  /* ---------- Glosario ---------- */
  var GLOSARIO = [
    { termino: 'Agua destilada', def: 'Agua purificada, sin sales ni impurezas. Se usa para enjuagar y preparar mezclas en el laboratorio.' },
    { termino: 'Disolver', def: 'Mezclar un sólido en un líquido hasta que deja de verse, como el azúcar en el agua.' },
    { termino: 'Escala graduada', def: 'Serie de marcas con números que permite medir una cantidad, como el volumen de un líquido.' },
    { termino: 'Evaporar', def: 'Hacer que un líquido pase a gas con calor, para que quede solo el sólido que estaba disuelto.' },
    { termino: 'Filtración', def: 'Método para separar un sólido de un líquido haciendo pasar la mezcla por papel filtro en un embudo.' },
    { termino: 'Gradilla', def: 'Soporte con orificios donde se colocan los tubos de ensayo para que no se caigan.' },
    { termino: 'Graduado', def: 'Que tiene una escala de medida marcada. Una probeta graduada tiene marcas en mililitros.' },
    { termino: 'Gramo (g)', def: 'Unidad para medir la masa de objetos pequeños. Mil gramos forman un kilogramo.' },
    { termino: 'Llama', def: 'Zona donde arde el gas. En el mechero, la llama azul es más caliente que la amarilla.' },
    { termino: 'Llave de paso', def: 'Pieza de la bureta que se gira para abrir o cerrar la salida del líquido.' },
    { termino: 'Masa', def: 'Cantidad de materia que tiene un objeto. Se mide con la balanza, en gramos.' },
    { termino: 'Menisco', def: 'Curva que forma la superficie de un líquido dentro de un tubo. El volumen se lee en la parte más baja de la curva, con los ojos a su altura.' },
    { termino: 'Mililitro (mL)', def: 'Unidad para medir volúmenes pequeños. Mil mililitros forman un litro.' },
    { termino: 'Montaje', def: 'Conjunto de instrumentos armados y sujetos entre sí para una práctica, por ejemplo una bureta sujeta al soporte universal.' },
    { termino: 'Nuez', def: 'Pieza con tornillos que une una pinza a la varilla del soporte universal.' },
    { termino: 'Pipeteador', def: 'Pera o dispositivo que se usa para llenar la pipeta sin usar la boca.' },
    { termino: 'Pistilo', def: 'Mazo de porcelana con punta redondeada que se usa con el mortero para triturar.' },
    { termino: 'Porcelana', def: 'Material cerámico duro y grueso que resiste el calor y los golpes.' },
    { termino: 'Precisión', def: 'Qué tan exacta es una medida. La pipeta y la bureta miden con más precisión que el vaso de precipitados.' },
    { termino: 'Refractario', def: 'Material que resiste altas temperaturas sin romperse ni deformarse.' },
    { termino: 'Tara', def: 'Botón de la balanza que la pone en cero para descontar el peso del recipiente.' },
    { termino: 'Trasvasar', def: 'Pasar un líquido de un recipiente a otro.' },
    { termino: 'Triturar', def: 'Romper un sólido en partes muy pequeñas hasta volverlo polvo.' },
    { termino: 'Volumen', def: 'Espacio que ocupa un líquido o un objeto. En el laboratorio se mide en mililitros.' }
  ];

  var TUTORIAL = [
    { titulo: 'Gira', texto: 'Desliza un dedo sobre el modelo para verlo desde cualquier lado.', icono: 'rotate' },
    { titulo: 'Amplía', texto: 'Pellizca con dos dedos o usa los botones + y − para acercarte.', icono: 'zoom' },
    { titulo: 'Consulta', texto: 'Toca los puntos numerados y revisa las pestañas Características, Uso y Cuidado.', icono: 'book' }
  ];

  return {
    FUNCIONES: FUNCIONES, MATERIALES: MATERIALES, MODULOS: MODULOS, INSTRUMENTOS: INSTRUMENTOS,
    ACTIVIDADES: ACTIVIDADES, LECCIONES: LECCIONES, CLASIFICACION: CLASIFICACION, CLASIFICACION_M2: CLASIFICACION_M2, PAREJAS: PAREJAS,
    DIAGNOSTICA: DIAGNOSTICA, MINIRETOS: MINIRETOS, RETO_FINAL: RETO_FINAL, RUBRICA: RUBRICA, CHEQUEO_PARECIDOS: CHEQUEO_PARECIDOS,
    GLOSARIO: GLOSARIO, TUTORIAL: TUTORIAL
  };
})();
