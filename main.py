from fastapi import FastAPI
from server import models
from server.database import engine
from server.routes import router 
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
    allow_origins=["http://localhost:5173"],  # or ["*"] for all origins (less secure)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/ping")
def ping():
    return {"message": "pong"}

# Register all routes
app.include_router(router)