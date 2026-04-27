from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import cuentas
from app.db.database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(title="CuentasPro API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cuentas.router, prefix="/api/cuentas", tags=["cuentas"])

@app.get("/")
def root():
    return {"message": "CuentasPro API running"}
