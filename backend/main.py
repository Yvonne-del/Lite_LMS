from fastapi import FastAPI
from backend import models
from .database import engine
from .routes import router 
from fastapi.middleware.cors import CORSMiddleware


# Create all tables in the database
models.Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="LMS API",
    description="A simple Learning Management System API using FastAPI",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register all routes
app.include_router(router)