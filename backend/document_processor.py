#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import requests
import openai
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class DocumentProcessor:
    def __init__(self):
        # Set up API keys
        self.openai_key = os.getenv("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")
        self.ocr_key = os.getenv("K82562443888957")
        
        # Configure OpenAI
        openai.api_key = self.openai_key
    
    def extract_text_from_image(self, image_path):
        """
        Step 1: Extract text from image using OCR
        (OCR = Optical Character Recognition = reading text from images)
        """
        
        # Prepare the image for OCR API
        with open(image_path, 'rb') as f:
            files = {'file': f}
            
            # Send to OCR.space API
            response = requests.post(
                'https://api.ocr.space/parse/image',
                files=files,
                data={
                    'apikey': self.ocr_key,
                    'language': 'eng',
                    'isOverlayRequired': False
                }
            )
        
        # Get the text from response
        result = response.json()
        
        if result['IsErroredOnProcessing']:
            raise Exception("OCR processing failed")
        
        # Return extracted text
        return result['ParsedResults'][0]['ParsedText']
    
    def analyze_document_with_ai(self, text):
        """
        Step 2: Use AI to understand and extract structured information
        """
        
        # Create a prompt (instructions for AI)
        prompt = f"""
        You are a document analysis expert. Extract key information from this document text.
        
        Document text:
        {text}
        
        Please extract and return ONLY a JSON object with these fields:
        {{
            "document_type": "invoice/receipt/contract/other",
            "company_name": "company name if found",
            "date": "any date found",
            "total_amount": "any monetary amount",
            "items": ["list of products/services mentioned"],
            "addresses": ["any addresses found"],
            "phone_numbers": ["any phone numbers found"],
            "emails": ["any email addresses found"],
            "confidence_score": "how confident you are (0-100)"
        }}
        
        If a field is not found, use null. Return only valid JSON.
        """
        
        # Send to OpenAI
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0.1  # Low temperature for consistent results
        )
        
        # Parse AI response
        ai_response = response.choices[0].message.content
        
        try:
            # Convert AI response to structured data
            extracted_data = json.loads(ai_response)
            return extracted_data
        except json.JSONDecodeError:
            # If AI didn't return valid JSON, create basic structure
            return {
                "document_type": "unknown",
                "raw_text": text,
                "error": "Could not parse AI response"
            }
    
    def process_document(self, file_path):
        """
        Main function that orchestrates the entire process
        """
        
        # Step 1: Extract text from image
        print("Extracting text from document...")
        extracted_text = self.extract_text_from_image(file_path)
        
        # Step 2: Analyze with AI
        print("Analyzing document with AI...")
        structured_data = self.analyze_document_with_ai(extracted_text)
        
        # Step 3: Add metadata
        result = {
            "file_name": os.path.basename(file_path),
            "raw_text": extracted_text,
            "extracted_data": structured_data,
            "processing_status": "success"
        }
        
        return result

