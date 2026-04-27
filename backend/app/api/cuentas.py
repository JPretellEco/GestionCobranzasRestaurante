from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.database import get_db
from app.schemas.cuenta import CuentaCreate, CuentaUpdate, CuentaOut
from app.services import cuenta_service

router = APIRouter()

@router.get("/", response_model=List[CuentaOut])
def list_cuentas(fecha: Optional[str] = Query(None), db: Session = Depends(get_db)):
    return cuenta_service.get_all(db, fecha)

@router.get("/{cuenta_id}", response_model=CuentaOut)
def get_cuenta(cuenta_id: int, db: Session = Depends(get_db)):
    cuenta = cuenta_service.get_by_id(db, cuenta_id)
    if not cuenta:
        raise HTTPException(status_code=404, detail="Cuenta no encontrada")
    return cuenta

@router.post("/", response_model=CuentaOut, status_code=201)
def create_cuenta(data: CuentaCreate, db: Session = Depends(get_db)):
    return cuenta_service.create(db, data)

@router.put("/{cuenta_id}", response_model=CuentaOut)
def update_cuenta(cuenta_id: int, data: CuentaUpdate, db: Session = Depends(get_db)):
    cuenta = cuenta_service.update(db, cuenta_id, data)
    if not cuenta:
        raise HTTPException(status_code=404, detail="Cuenta no encontrada")
    return cuenta

@router.delete("/{cuenta_id}", status_code=204)
def delete_cuenta(cuenta_id: int, db: Session = Depends(get_db)):
    if not cuenta_service.delete(db, cuenta_id):
        raise HTTPException(status_code=404, detail="Cuenta no encontrada")
