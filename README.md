# API REST - Products & Carts

Proyecto backend en Node.js y Express para gestión de productos y carritos de compra con persistencia en archivos JSON.

---

## Tecnologías

- Node.js
- Express
- Nodemon (dev)
- Sistema de archivos para persistencia (JSON)

---

## Instalación

1. Clonar el repositorio:

```bash
git clone <(https://github.com/emizeet/preentrega-gorosito)>
cd <preentrega-gorosito>
Instalar dependencias:

bash
Copiar
Editar
npm install
Uso
Levantar el servidor (modo desarrollo con nodemon):

bash
Copiar
Editar
npm run dev
O en modo producción:

bash
Copiar
Editar
npm start
La API corre en: http://localhost:8080

Endpoints
Productos (/api/products)
Método	Ruta	Descripción
GET	/	Listar todos los productos
GET	/:pid	Obtener producto por ID
POST	/	Crear un nuevo producto
PUT	/:pid	Actualizar producto por ID (sin cambiar id)
DELETE	/:pid	Eliminar producto por ID

Carritos (/api/carts)
Método	Ruta	Descripción
POST	/	Crear un nuevo carrito
GET	/:cid	Obtener productos del carrito por ID
POST	/:cid/product/:pid	Agregar un producto al carrito (incrementa qty)

Formato para crear producto (POST /api/products)
Enviar JSON con estos campos obligatorios:

json
Copiar
Editar
{
  "title": "Nombre del producto",
  "description": "Descripción",
  "price": 100,
  "code": "ABC123",
  "stock": 10,
  "category": "Categoría",
  "thumbnails": ["ruta1.jpg", "ruta2.jpg"]
}
Notas
Los IDs de productos y carritos se generan automáticamente.

La persistencia se hace en archivos JSON dentro de src/data/.

No hay interfaz gráfica; la interacción es mediante Postman o cliente HTTP.

Autor
Emiliano Gorosito
