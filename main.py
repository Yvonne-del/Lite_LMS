from fastapi import FastAPI
from server import models
from server.database import engine
from server.routes import router 

# Create all tables in the database
models.Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="LMS API",
    description="A simple Learning Management System API using FastAPI",
    version="1.0.0"
)

# Register all routes
app.include_router(router)
