# CuentasPro

Sistema de gestión de cuentas por cobrar — mobile-first.

## Estructura del proyecto

```
cuentaspro/
├── backend/               # Python + FastAPI
│   ├── app/
│   │   ├── main.py        # Entry point FastAPI
│   │   ├── api/           # Routers (endpoints REST)
│   │   ├── models/        # Modelos SQLAlchemy
│   │   ├── schemas/       # Schemas Pydantic
│   │   ├── services/      # Lógica de negocio (CRUD)
│   │   └── db/            # Conexión DB
│   └── requirements.txt
│
└── frontend/              # React 18
    ├── public/
    └── src/
        ├── components/
        │   ├── Sidebar/   # Sidebar + CalendarWidget
        │   ├── Cards/     # StatCards
        │   ├── Table/     # AccountsTable
        │   ├── Modals/    # SendPopup, ConfirmDelete
        │   ├── Forms/     # FormShared (PageLayout, FormField)
        │   └── Icon.jsx   # Iconos SVG inline
        ├── pages/
        │   ├── HomePage.jsx
        │   ├── CrearCuentaPage.jsx
        │   └── EditarCuentaPage.jsx
        ├── hooks/
        │   └── useCuentas.js   # Custom hook (API + localStorage fallback)
        ├── utils/
        │   ├── api.js          # Llamadas axios al backend
        │   └── helpers.js      # Formatters (soles, fecha)
        └── styles/
            └── theme.js        # Colores y estilos globales
```

## Instalación y ejecución

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm start
```

La app estará en http://localhost:3000
El API en http://localhost:8000/api/cuentas

## Endpoints API

| Método | Ruta                   | Descripción          |
|--------|------------------------|----------------------|
| GET    | /api/cuentas/          | Listar (filtro fecha)|
| POST   | /api/cuentas/          | Crear cuenta         |
| PUT    | /api/cuentas/{id}      | Actualizar cuenta    |
| DELETE | /api/cuentas/{id}      | Eliminar cuenta      |

## Funcionalidades
- Dashboard con 3 tarjetas filtrables (Total / Pagaron / Por cobrar)
- Tabla de cuentas con búsqueda por texto
- Crear, editar y eliminar cuentas
- Cálculo automático de deuda al ingresar efectivo
- Envío de cuenta por WhatsApp
- Filtro por fecha (calendario widget en sidebar)
- Funciona offline con localStorage como fallback
- 100% Mobile-first y responsive
# GestionCobranzasRestaurante
