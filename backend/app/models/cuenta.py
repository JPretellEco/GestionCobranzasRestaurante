from sqlalchemy import Column, Integer, String, Float, Date
from sqlalchemy.sql import func
from app.db.database import Base
import datetime

class Cuenta(Base):
    __tablename__ = "cuentas"

    id = Column(Integer, primary_key=True, index=True)
    fecha = Column(Date, default=datetime.date.today)
    cliente = Column(String(150), nullable=False)
    pedidos = Column(Integer, nullable=False, default=1)
    total = Column(Float, nullable=False, default=0.0)
    efectivo = Column(Float, default=0.0)
    deuda = Column(Float, default=0.0)
    observacion = Column(String(500), nullable=True)
