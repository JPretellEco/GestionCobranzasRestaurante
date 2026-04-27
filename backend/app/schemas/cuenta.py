from pydantic import BaseModel, Field
from typing import Optional
import datetime

class CuentaBase(BaseModel):
    cliente: str = Field(..., min_length=1, max_length=150)
    pedidos: int = Field(..., ge=1)
    total: float = Field(..., ge=0)
    observacion: Optional[str] = None

class CuentaCreate(CuentaBase):
    pass

class CuentaUpdate(BaseModel):
    efectivo: Optional[float] = 0.0
    deuda: Optional[float] = 0.0
    observacion: Optional[str] = None
    cliente: Optional[str] = None
    pedidos: Optional[int] = None
    total: Optional[float] = None

class CuentaOut(CuentaBase):
    id: int
    fecha: datetime.date
    efectivo: float
    deuda: float

    class Config:
        from_attributes = True
