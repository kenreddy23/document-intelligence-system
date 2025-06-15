// Get references to HTML elements
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const processBtn = document.getElementById('process-btn');
const loading = document.getElementById('loading');
const results = document.getElementById('results');
const resultsContent = document.getElementById('results-content');
const downloadBtn = document.getElementById('download-btn');

let currentFile = null;
let extractedData = null;

// Handle file selection
fileInput.addEventListener('change', handleFileSelect);
uploadArea.addEventListener('click', () => fileInput.click());

// Handle drag and drop
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
});

// Process button click
processBtn.addEventListener('click', processDocument);

// Download button click
downloadBtn.addEventListener('click', downloadResults);

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
}

function handleFile(file) {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    
    if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid file (PDF, JPG, PNG)');
        return;
    }
    
    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
        alert('File size should be less than 10MB');
        return;
    }
    
    currentFile = file;
    
    // Update UI
    uploadArea.innerHTML = `
        <div class="upload-content">
            <div class="upload-icon">✅</div>
            <h3>File Selected: ${file.name}</h3>
            <p>Size: ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
    `;
    
    processBtn.disabled = false;
}

async function processDocument() {
    if (!currentFile) {
        alert('Please select a file first');
        return;
    }
    
    // Show loading
    loading.style.display = 'block';
    results.style.display = 'none';
    processBtn.disabled = true;
    
    try {
        // Create form data
        const formData = new FormData();
        formData.append('file', currentFile);
        
        // Send to backend
        const response = await fetch('/upload-document/', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Processing failed');
        }
        
        const result = await response.json();
        
        if (result.success) {
            extractedData = result.data;
            displayResults(result.data);
        } else {
            throw new Error('Processing failed');
        }
        
    } catch (error) {
        alert('Error processing document: ' + error.message);
        console.error('Processing error:', error);
    } finally {
        loading.style.display = 'none';
        processBtn.disabled = false;
    }
}

function displayResults(data) {
    const extracted = data.extracted_data;
    
    let html = `
        <div class="result-section">
            <h3>📄 Document Type: ${extracted.document_type || 'Unknown'}</h3>
            <div class="confidence">Confidence: ${extracted.confidence_score || 'N/A'}%</div>
        </div>
        
        <table class="results-table">
            <thead>
                <tr>
                    <th>Field</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    // Add each field to table
    const fields = [
        { key: 'company_name', label: 'Company Name' },
        { key: 'date', label: 'Date' },
        { key: 'total_amount', label: 'Total Amount' },
        { key: 'addresses', label: 'Addresses' },
        { key: 'phone_numbers', label: 'Phone Numbers' },
        { key: 'emails', label: 'Email Addresses' }
    ];
    
    fields.forEach(field => {
        let value = extracted[field.key];
        
        if (Array.isArray(value)) {
            value = value.join(', ');
        }
        
        if (value && value !== 'null') {
            html += `
                <tr>
                    <td><strong>${field.label}</strong></td>
                    <td>${value}</td>
                </tr>
            `;
        }
    });
    
    // Add items if present
    if (extracted.items && extracted.items.length > 0) {
        html += `
            <tr>
                <td><strong>Items/Services</strong></td>
                <td>${extracted.items.join(', ')}</td>
            </tr>
        `;
    }
    
    html += `
            </tbody>
        </table>
        
        <div class="raw-text-section">
            <h4>📝 Raw Extracted Text:</h4>
            <div class="raw-text">${data.raw_text.substring(0, 500)}${data.raw_text.length > 500 ? '...' : ''}</div>
        </div>
    `;
    
    resultsContent.innerHTML = html;
    results.style.display = 'block';
}

function downloadResults() {
    if (!extractedData) return;
    
    // Create CSV content
    let csvContent = "Field,Value\n";
    
    const extracted = extractedData.extracted_data;
    
    Object.keys(extracted).forEach(key => {
        let value = extracted[key];
        
        if (Array.isArray(value)) {
            value = value.join('; ');
        }
        
        if (value && value !== 'null') {
            csvContent += `"${key}","${value}"\n`;
        }
    });
    
    // Download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `document_analysis_${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}