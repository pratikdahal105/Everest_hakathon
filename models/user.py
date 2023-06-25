
from sqlalchemy.dialects.postgresql import UUID
from app import db
import uuid

class User(db.Model):
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    phoneNumber = db.Column(db.String(120), nullable=False)
    sub = db.Column(db.String(120), nullable=True)

