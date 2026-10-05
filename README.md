# Requisiciones POSTECSA

Aplicación web instalable (PWA) para las requisiciones de material de **POSTEC DE OCCIDENTE S.A.S.**, sobre el formato **FP-08-03 (R8)**.

- **Frontend:** un solo archivo `index.html`, publicado con GitHub Pages.
- **Backend:** Google Apps Script sobre un Google Sheet propio de esta app. La URL del despliegue está en la constante `GAS_URL` de `index.html`.
- **Versión actual:** 1.8.0

## Flujo

Solicitud → Clasificación (solo Mantenimiento) → Aprobación → Cotización (Compras) → Autorización de compra → Compra → Recibido.

## Archivos

| Archivo | Función |
|---|---|
| `index.html` | Aplicación completa |
| `sw.js` | Service worker (caché de la app) |
| `manifest.json`, `icon-*.png`, `logo.png` | Instalación como app e identidad |
| `backend/` | Código del backend (Apps Script), versionado por fecha |

Los datos de la empresa (catálogo, proveedores y precios) **no se guardan en este repositorio**: el administrador los carga desde su computador (Menú → *Cargar maestros*).

## Publicar o actualizar

1. Subir los archivos a la rama `main`, en la raíz.
2. *Settings → Pages → Deploy from a branch → main → /(root)*.
3. Abrir la dirección de Pages e instalar desde el navegador (*Instalar aplicación* en Chrome; *Agregar a pantalla de inicio* en Safari).
4. En cada versión: cambiar `APP_VERSION` en `index.html` y `CACHE_NAME` en `sw.js`.

## Funciones destacadas

- Impresión idéntica al formato FP-08-03 R8.
- Lectura sin conexión con los datos del último ingreso (guardar requiere internet).
- Modo prueba para el administrador (no guarda nada).
