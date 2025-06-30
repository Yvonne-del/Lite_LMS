#!/bin/bash

# Starting FastAPI using uvicorn
uvicorn main:app --host=0.0.0.0 --port=$PORT