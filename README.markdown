# AI-Powered Document Intelligence System 📄🤖

Welcome to the **AI-Powered Document Intelligence System**! This project is a beginner-friendly, full-stack application that uses AI to automatically extract key information from documents like invoices, receipts, contracts, and more. It combines modern web technologies with AI APIs to create a powerful document processing tool. 🚀

## 📖 Project Overview

Imagine uploading a document (PDF, JPG, or PNG) and having an AI magically extract details like company names, dates, amounts, addresses, and more, presenting them in a neat table or downloadable CSV. That's what this system does! It's perfect for automating data entry tasks and learning about AI integration, full-stack development, and API usage.

### Key Features
- 📤 **Document Upload**: Upload images or PDFs through a drag-and-drop interface.
- 🔍 **Text Extraction**: Uses OCR (Optical Character Recognition) to read text from documents.
- 🧠 **AI Analysis**: Leverages OpenAI to extract structured data (e.g., company names, dates, amounts).
- 📊 **Results Display**: Presents extracted information in a user-friendly table.
- ⬇️ **Downloadable Results**: Export results as a CSV file.
- 🌐 **Responsive UI**: Clean and modern frontend built with HTML, CSS, and JavaScript.

### Demo Screenshots
| Upload Interface | Processing Display |
|------------------|--------------------|                                                                                                                      

<img width="1920" alt="Screenshot 2025-06-15 at 5 11 22 PM" src="https://github.com/user-attachments/assets/19648c15-388f-46e6-b0eb-013cf2a3be25" />                          

<img width="1920" alt="Screenshot 2025-06-15 at 5 11 16 PM" src="https://github.com/user-attachments/assets/80a3b632-336e-40d7-a18e-0f293671aa28" />

> **Note**: Replace `screenshots/upload-screen.png` and `screenshots/results-screen.png` with actual screenshot paths in your GitHub repository.

## 🛠️ Technologies Used

- **Frontend**: HTML, CSS, JavaScript (Vanilla JS)
- **Backend**: Python, FastAPI, Uvicorn
- **AI & OCR APIs**:
  - [OpenAI](https://platform.openai.com/) for intelligent data extraction
  - [OCR.Space](https://ocr.space/ocrapi) for text extraction from images
- **Libraries**:
  - Flask, FastAPI, Uvicorn, Requests, Pandas, Python-Dotenv, Pillow
- **Environment**: Python 3.9+, VS Code/PyCharm

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites
- **Python 3.9+**: Download from [python.org](https://www.python.org/downloads/).
- **VS Code**: Recommended code editor, download from [code.visualstudio.com](https://code.visualstudio.com/).
- **API Keys**:
  - [OpenAI API Key](https://platform.openai.com/) (free $5 credit for new users).
  - [OCR.Space API Key](https://ocr.space/ocrapi) (free 25,000 requests/month).

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/kenreddy23/document-intelligence-system.git
   cd document-intelligence-system
   ```

2. **Set Up a Virtual Environment** (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Required Libraries**:
   ```bash
   pip install requirements.txt
   ```

4. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your API keys:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   OCR_SPACE_API_KEY=your_ocr_space_api_key_here
   ```
   > **Important**: Add `.env` to your `.gitignore` to keep API keys secure.

5. **Project Structure**:
   ```
   document-intelligence/
   ├── backend/
   │   ├── main.py
   │   ├── document_processor.py
   │   └── requirements.txt
   ├── frontend/
   │   ├── index.html
   │   ├── style.css
   │   └── script.js
   ├── uploads/
   ├── results/
   ├── .env
   └── README.md
   ```

### Running the Application

1. **Start the Backend**:
   ```bash
   cd document-intelligence
   python -m uvicorn backend.main:app --reload --port 8000
   ```

2. **Access the Frontend**:
   Open your browser and go to `http://localhost:8000/static/index.html`.

3. **Test the System**:
   - Upload a document (e.g., invoice, receipt, or business card).
   - Watch the AI extract key information and display it in a table.
   - Download the results as a CSV file.

## 🧪 Testing

Test the system with various document types:
- **Invoice**: Should extract company name, date, total amount.
- **Receipt**: Should extract store name, items, total.
- **Business Card**: Should extract name, phone, email.
- **Contract**: Should extract parties, dates, key terms.

## 🌍 Deployment

To make your application live, you can deploy it to platforms like:

### Option 1: Railway (Recommended)
1. Push your code to a GitHub repository.
2. Connect Railway to your GitHub repo.
3. Add environment variables (`OPENAI_API_KEY`, `OCR_SPACE_API_KEY`) in the Railway dashboard.
4. Deploy automatically.

### Option 2: Heroku
1. Create a `Procfile` in the root directory:
   ```
   web: uvicorn backend.main:app --host=0.0.0.0 --port=${PORT:-5000}
   ```
2. Push to Heroku.
3. Add environment variables in the Heroku dashboard.

## 🔮 Next Steps & Enhancements

Here are some ideas to take the project further:
- 🌐 **Multi-Language Support**: Add support for different OCR languages.
- 📂 **Batch Processing**: Allow uploading multiple documents at once.
- 🛠️ **Custom Templates**: Create extraction rules for specific document types.
- 💾 **Database Integration**: Store processed documents and results.
- 🔒 **User Authentication**: Add a login system.
- ⚡ **Performance Improvements**:
  - Caching to avoid reprocessing.
  - Queue system for handling multiple uploads.
  - Image preprocessing for better OCR accuracy.

## 📚 Learning Outcomes

By building this project, you'll gain skills in:
- **API Integration**: Working with OpenAI and OCR.Space APIs.
- **Full-Stack Development**: Building frontend and backend components.
- **AI Prompt Engineering**: Crafting effective prompts for AI.
- **User Experience Design**: Creating intuitive interfaces.
- **Error Handling**: Managing API errors and edge cases.
- **Data Processing**: Structuring and exporting data.

## 🤝 Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

Please ensure your code follows the project's style guidelines and includes tests where applicable.

## 📜 License

This project is licensed under the Apache 2.0. See the [LICENSE](LICENSE) file for details.

## 🙌 Acknowledgments

- [OpenAI](https://platform.openai.com/) for their powerful AI models.
- [OCR.Space](https://ocr.space/) for free OCR services.
- The open-source community for providing amazing tools and libraries.

---

⭐ **Star this repository** if you found it helpful!  
Feel free to reach out with questions or suggestions. Happy coding! 😄
