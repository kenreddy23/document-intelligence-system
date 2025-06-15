#!/usr/bin/env python
# coding: utf-8

# In[1]:


# Import libraries (like importing tools)
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
import json
import sys

sys.path.append(os.path.dirname(__file__))
from document_processor import DocumentProcessor


# Create our app
app = FastAPI(title="Document Intelligence System")

# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static files (HTML, CSS, JS)
app.mount("/static", StaticFiles(directory="/Users/nitish/internship_task/document-intelligence-system/frontend/"), name="static")

# Initialize document processor
processor = DocumentProcessor()

@app.post("/upload-document/")
async def upload_document(file: UploadFile = File(...)):
    """
    This function handles when someone uploads a document
    """
    try:
        # Save uploaded file
        file_path = f"uploads/{file.filename}"
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # Process the document
        result = processor.process_document(file_path)
        
        return {"success": True, "data": result}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    """Home page"""
    return {"message": "Document Intelligence System is running!"}


# In[ ]:




