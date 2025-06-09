# Documentación

### 1. Iniciar el proyecto con Node.js

```bash
npm init -y
```
Este comando crea el archivo principal llamado `package.json`. Sirve para empezar un proyecto con Node.js.

---

### 2. Instalar Express

```bash
npm install express
```
Con esto se instala **Express**

---

### 3. Instalar http-server de forma global

```bash
npm install -g http-server
```
Este comando instala un servidor que sirve para mostrar el sitio web en el navegador.

---

### 4. Levantar el servidor

```bash
http-server
```
Este último comando sirve para iniciar el servidor.  
Al correrlo, muestra una dirección como `http://localhost:8080` 

---

## Justificación del Uso de Módulos en el CRM

En un sistema CRM (Customer Relationship Management), usar diferentes módulos no es solo para verse completo, sino para **mejorar el control, organización y eficiencia del negocio**. Aquí te explicamos en palabras simples por qué son importantes estos cuatro módulos:

### 🛒 Módulo de Compras

- Permite **registrar qué productos se compran, a quién y en qué cantidad**.
- Ayuda a **llevar el control de los costos y proveedores**, lo cual es clave para no perder dinero.
- Conocer el historial de compras **mejora la toma de decisiones** a futuro.

### 👥 Módulo de Contactos

- Guarda los datos de todos los clientes o personas importantes.
- Es útil para **comunicarse rápido, hacer seguimiento o enviar promociones**.
- Tener todo ordenado evita confusiones y **mejora la relación con los clientes**.

### 💼 Módulo de Negocios

- Sirve para **seguir el proceso de una venta**, desde el primer contacto hasta el cierre.
- Ayuda a saber en qué etapa va cada cliente: si apenas lo conoces o ya casi compra.
- Con esto puedes **predecir ingresos y enfocar esfuerzos en cerrar más ventas**.

### 🎫 Módulo de Tickets

- Permite atender dudas, quejas o problemas de los clientes.
- Se puede **organizar por prioridad (urgente, medio, leve)**.
- Brinda **un mejor servicio al cliente**, porque todo queda registrado y nada se olvida.

---

### 💡 Conclusión

Estos módulos no son relleno: **ayudan a que el negocio funcione mejor**.  
Todo está conectado: los contactos hacen negocios, los negocios generan compras, y los tickets mantienen a los clientes felices.  
Un CRM con estos módulos es una herramienta poderosa para **organizar, vender y atender mejor**.



# Características Principales

## 🔐 Sistema de Autenticación
- Login seguro con credenciales: `admin@crm.com / admin123`
- Gestión de sesiones con `localStorage`
- Protección de rutas

## 📊 Dashboard
- Estadísticas en tiempo real de todos los módulos
- Tarjetas informativas con contadores
- Accesos rápidos a funciones principales

## 👥 Gestión de Contactos
- CRUD completo (Crear, Leer, Actualizar, Eliminar)
- Información completa: nombre, email, teléfono, empresa, cargo
- Interfaz con modales para edición

## 🛒 Gestión de Compras
- Registro de compras con proveedores
- Control de productos, cantidades y precios
- Estados: pendiente, completada, cancelada
- Cálculo automático de totales

## 💼 Gestión de Negocios
- Pipeline de ventas completo
- Etapas: prospecto → calificado → propuesta → negociación → ganado/perdido
- Valores monetarios y fechas de cierre
- Descripciones detalladas

## 🎫 Sistema de Tickets
- Soporte técnico y atención al cliente
- Prioridades: baja, media, alta, crítica
- Estados: abierto, en progreso, resuelto, cerrado
- Categorización por tipo de consulta

---

# Tecnologías Utilizadas
- **Frontend**: React 18, Bootstrap 5, TailwindCSS  
- **Base de Datos**: Trickle Database API  
- **Iconos**: Font Awesome  
- **Estilos**: CSS personalizado con gradientes y animaciones  

---

# Funcionalidades Técnicas
- Arquitectura modular y escalable
- Manejo de errores robusto
- Interfaz responsive
- Navegación SPA con sistema de rutas
- Persistencia de datos en la nube
- Validación de formularios


## Tecnologías

- React 18 (vía CDN)
- Bootstrap 5
- TailwindCSS
- Font Awesome 6
- localStorage para persistencia
