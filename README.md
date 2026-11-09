# Orbita 3D

Aplicación del proyecto **Orbita** · versión 1.0.2

Ambiente Educativo Tecnológico para que estudiantes de grado noveno reconozcan los instrumentos y materiales del laboratorio de química con modelos 3D, desde el celular.

**Estado:** versión 1.0.2 (8 de noviembre de 2026), con los ajustes de las pruebas en celulares.

- **Módulo 1 · Bienvenida al laboratorio:** diagnóstica, 3 lecciones (qué es un laboratorio y normas de seguridad, clasificación por material con práctica, misiones para aprender a usar el visor 3D), recorrido libre por el catálogo y mini-reto.
- **Módulo 2 · Contener y medir líquidos:** 6 fichas 3D, ¿Quién soy?, Cada cosa en su lugar (2 bandejas) y mini-reto.
- **Módulo 3 · Calentar, sostener y sujetar:** 6 fichas 3D (mechero Bunsen, trípode, rejilla, soporte universal, pinza con nuez, pinza para tubo), ¿Quién soy?, Parecidos pero diferentes en parejas (4 parejas) y mini-reto.
- **Módulo 4 · Triturar, separar, mezclar y pesar:** 6 fichas 3D (mortero, embudo, vidrio de reloj, agitador, frasco lavador, balanza), ¿Quién soy?, Cada cosa en su lugar con 5 categorías y los 18 instrumentos, y mini-reto.
- **Cierre:** reto final *Arma tu mesa de trabajo* (6 situaciones con retroalimentación y justificación) y *Explícalo con tus palabras* (oral, escrito o dibujo rotulado).
- **Evaluación y seguimiento:** insignias por módulo, autoevaluación tipo semáforo, resumen para el docente en *Mis logros*, guía para el docente con rúbrica y lista de chequeo, y modo docente para demostraciones.
- **Recursos:** fichas PDF ilustradas de los 4 módulos (portada, instrumentos con sus partes numeradas, idea clave y práctica para imprimir con respuestas), glosario con audio (24 términos) y descarga por módulos para usar sin conexión.

## Estructura

```
./
├── index.html              Página principal
├── manifest.webmanifest    Datos para instalar Orbita como app
├── sw.js                   Service worker: uso sin conexión
├── css/orbita.css          Estilos (paleta del prototipo, accesibilidad)
├── js/data.js              TODO el contenido: módulos, fichas, actividades, preguntas, glosario
├── js/app.js               Lógica: navegación, visor 3D, actividades, evaluación, progreso
├── models/*.glb            Modelos 3D provisionales de los 18 instrumentos
├── img/instrumentos/       Imagen de cada instrumento
├── img/vistas/             8 vistas por instrumento (vista alternativa sin 3D)
├── img/icons/              Íconos de la app
├── recursos/               Fichas PDF de los módulos 1 a 4
├── fonts/                  Tipografía Nunito (local, para funcionar sin conexión)
└── vendor/                 Visor model-viewer 4.3.1 (local, para funcionar sin conexión)
```

## Abrirla en el computador

El visor 3D necesita que la carpeta se sirva desde un servidor; abrir `index.html` con doble clic no carga los modelos.

- **VS Code:** instala la extensión *Live Server*, abre la carpeta del repositorio y elige *Open with Live Server*.
- **Python:** dentro de la carpeta del repositorio, ejecuta `python -m http.server 8000` y abre `http://localhost:8000`.

Para verla como en el celular, usa las herramientas de desarrollo del navegador (F12) y activa la vista de dispositivo móvil.

## Publicarla para usarla en el celular sin conexión

El uso sin conexión necesita HTTPS. Opciones gratuitas:

- **Netlify Drop:** entra a https://app.netlify.com/drop y arrastra la carpeta del repositorio. Te da un enlace en segundos.
- **Vercel:** en vercel.com elige *Add New › Project*, importa el repositorio y pulsa *Deploy* (es un sitio estático; `vercel.json` ya evita que el service worker quede en caché).
- **GitHub Pages:** en el repositorio, ve a *Settings › Pages* y publica la rama principal.

Al abrir el enlace por primera vez con señal, la app queda guardada en el celular. Desde **Ayuda › Uso sin conexión** se descarga cada módulo (≈ 1 MB cada uno) o todo a la vez (≈ 3,6 MB). En Chrome para Android, el menú ⋮ › *Agregar a la pantalla principal* la instala como una app.

## Editar el contenido

Todo el texto está en `js/data.js`: lecciones del módulo 1, fichas (características, uso, cuidado, partes), pistas de ¿Quién soy?, clasificaciones de Cada cosa en su lugar, parejas y cuadros de Parecidos pero diferentes, preguntas de la diagnóstica y de los mini-retos con su retroalimentación, situaciones del reto final, rúbrica, lista de chequeo y glosario. No hace falta tocar `app.js` para corregir o agregar contenido.

## Reemplazar los modelos provisionales por los de Blender

1. En Blender, exporta cada instrumento como **glTF Binary (.glb)**, con escala en metros y el eje Y hacia arriba. Reduce polígonos para que cada archivo pese pocos cientos de KB.
2. Guárdalo en `models/` con el mismo nombre (por ejemplo, `probeta.glb`).
3. Si cambian las proporciones, ajusta en `data.js` el campo `pos` de cada parte (coordenadas x y z en metros del punto numerado).
4. Si cambias la cámara inicial de un instrumento, ajusta su campo `camara` (por ejemplo, `'20deg 60deg auto'`).
5. Cambia `VERSION` en `sw.js` (por ejemplo, `v1.0.3`) para que los celulares descarguen la versión nueva.


## Cambios de la versión 1.0.2

- El visor 3D se carga después de mostrar el inicio y reserva su espacio mientras carga.
- Se puede girar o ampliar el modelo aunque el gesto empiece sobre un punto numerado.
- Sin conexión, un instrumento no guardado muestra un aviso en lugar de una imagen rota.
- Las 144 fotos pesan 1,2 MB (antes 2,2 MB) y Ayuda muestra el peso real de cada módulo.
- Áreas táctiles de al menos 44 px, letra mínima de 13 px y nombres accesibles corregidos.

## Créditos

Camilo Andrés Soto Germán, Juan Daniel Lozano Vergara e Iván Ramiro Ramos Petro · Ambientes Educativos Tecnológicos · Licenciatura en Informática, Universidad de Córdoba · 2026.

Visor 3D: [model-viewer](https://modelviewer.dev) (Apache 2.0). Íconos: trazos basados en [Lucide](https://lucide.dev) (ISC). Tipografía: [Nunito](https://fonts.google.com/specimen/Nunito) (SIL Open Font License).
