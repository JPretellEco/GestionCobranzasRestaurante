from sqlalchemy.orm import Session
from app.models.cuenta import Cuenta
from app.schemas.cuenta import CuentaCreate, CuentaUpdate
from typing import Optional, List
import datetime

def get_all(db: Session, fecha: Optional[str] = None) -> List[Cuenta]:
    query = db.query(Cuenta)
    if fecha:
        try:
            date_obj = datetime.date.fromisoformat(fecha)
            query = query.filter(Cuenta.fecha == date_obj)
        except ValueError:
            pass
    return query.order_by(Cuenta.fecha.desc()).all()

def get_by_id(db: Session, cuenta_id: int) -> Optional[Cuenta]:
    return db.query(Cuenta).filter(Cuenta.id == cuenta_id).first()

def create(db: Session, data: CuentaCreate) -> Cuenta:
    cuenta = Cuenta(
        **data.model_dump(),
        fecha=datetime.date.today(),
        efectivo=0.0,
        deuda=data.total,
    )
    db.add(cuenta)
    db.commit()
    db.refresh(cuenta)
    return cuenta

def update(db: Session, cuenta_id: int, data: CuentaUpdate) -> Optional[Cuenta]:
    cuenta = get_by_id(db, cuenta_id)
    if not cuenta:
        return None
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(cuenta, field, value)
    db.commit()
    db.refresh(cuenta)
    return cuenta

def delete(db: Session, cuenta_id: int) -> bool:
    cuenta = get_by_id(db, cuenta_id)
    if not cuenta:
        return False
    db.delete(cuenta)
    db.commit()
    return True
