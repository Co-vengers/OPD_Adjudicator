# OPD Adjudicator

## Overview

OPD Adjudicator is a healthcare claims adjudication system designed specifically for Outpatient Department (OPD) services. The system automates the process of reviewing, validating, and processing OPD insurance claims according to policy rules, medical coding standards, and regulatory requirements.

## Table of Contents

- [Features](#features)
- [System Architecture](#system-architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Features

### Core Functionality

- **Automated Claims Processing**: Automatically validate and adjudicate OPD claims based on configurable business rules
- **Policy Management**: Support for multiple insurance policies with customizable coverage rules
- **Medical Coding Validation**: ICD-10, CPT, and other medical coding standards validation
- **Eligibility Verification**: Real-time patient eligibility and benefit verification
- **Pricing Engine**: Dynamic pricing based on fee schedules, contracts, and negotiated rates
- **Claim Status Tracking**: Comprehensive claim lifecycle management from submission to settlement
- **Fraud Detection**: Rule-based and ML-powered fraud detection mechanisms
- **Provider Network Management**: Maintain provider networks with contracted rates
- **Prior Authorization**: Automated prior authorization checking and management

### Additional Features

- **Dashboard & Analytics**: Real-time claims analytics and reporting
- **Audit Trail**: Complete audit logging for compliance and tracking
- **Multi-tenancy Support**: Support for multiple insurance companies/TPAs
- **Integration APIs**: RESTful APIs for seamless integration with HIS/EMR systems
- **Notification System**: Email and SMS notifications for claim status updates
- **Document Management**: Secure storage and retrieval of claim-related documents

## System Architecture

```
┌─────────────────────────────┐
│   React Frontend            │
│   (Tailwind CSS)            │
└──────────┬──────────────────┘
           │
      ┌────▼────┐
      │  Nginx  │
      └────┬────┘
           │
      ┌────▼─────────────────────┐
      │   FastAPI Backend        │
      ├──────────────────────────┤
      │ - Claims API             │
      │ - AI Service (Gemini)    │
      │ - Rules Engine           │
      │ - File Upload Handler    │
      └────┬─────────────────────┘
           │
      ┌────▼─────────────────────┐
      │   PostgreSQL Database    │
      │   - Claims Data          │
      │   - Patient Records      │
      │   - Policy Rules         │
      └──────────────────────────┘
```

### Technology Stack

- **Backend**: FastAPI (Python)
- **AI/ML**: Google Gemini API
- **Database**: PostgreSQL
- **Frontend**: React.js with Tailwind CSS
- **Containerization**: Docker & Docker Compose
- **Web Server**: Nginx (for production)

## Prerequisites

Before installing OPD Adjudicator, ensure you have the following installed:

- Python 3.10+
- PostgreSQL 12+
- Node.js 16+ and npm
- Docker and Docker Compose (optional but recommended)
- Git

## Installation

### Option 1: Using Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/Co-vengers/OPD_Adjudicator.git
cd OPD_Adjudicator

# Copy environment configuration
cp .env.example .env

# Edit .env with your configuration
# Add your Gemini API key and database credentials
nano .env

# Build and start containers
docker-compose up -d

# The application will be available at:
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Documentation: http://localhost:8000/docs
```

### Option 2: Manual Installation

#### Backend Setup

```bash
# Clone the repository
git clone https://github.com/Co-vengers/OPD_Adjudicator.git
cd OPD_Adjudicator/Backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file and configure
cat > .env << EOF
DATABASE_URL=postgresql://user:password@localhost:5432/opd_adjudicator
GEMINI_API_KEY=your-gemini-api-key-here
UPLOAD_DIR=./uploads
EOF

# Initialize database
# Make sure PostgreSQL is running
createdb opd_adjudicator

# Run the FastAPI server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend Setup

```bash
# In a new terminal, navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
REACT_APP_API_URL=http://localhost:8000
EOF

# Start development server
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## Configuration

### Environment Variables

Create a `.env` file in the Backend directory with the following variables:

```env
# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/opd_adjudicator

# Google Gemini API
GEMINI_API_KEY=your-gemini-api-key-here

# File Upload
UPLOAD_DIR=./uploads
MAX_UPLOAD_SIZE=10485760  # 10MB in bytes

# CORS Settings
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:80

# Application Settings
APP_NAME=OPD Adjudicator
DEBUG=True
```

For the frontend, create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_NAME=OPD Adjudicator
```

### Policy Configuration

Configure adjudication rules in the database or through the API. Example policy structure:

```json
{
  "policy_id": "POL001",
  "policy_name": "Standard Health Insurance",
  "coverage": {
    "opd_limit": 50000,
    "consultation_covered": true,
    "diagnostic_tests_covered": true,
    "medication_covered": true
  },
  "copay_percentage": 20,
  "deductible": 2000,
  "rules": [
    {
      "rule_type": "amount_limit",
      "parameter": "max_claim_amount",
      "value": 50000
    },
    {
      "rule_type": "document_required",
      "parameter": "minimum_documents",
      "value": 2
    }
  ]
}
```

## Usage

### Submitting a Claim

#### Via API

```bash
curl -X POST http://localhost:8000/api/claims/submit \
  -H "Content-Type: multipart/form-data" \
  -F "patient_name=John Doe" \
  -F "patient_age=35" \
  -F "diagnosis=Type 2 Diabetes" \
  -F "treatment=Consultation and medication" \
  -F "hospital_name=City Hospital" \
  -F "claim_amount=5500" \
  -F "documents=@/path/to/prescription.pdf" \
  -F "documents=@/path/to/bill.pdf"
```

Response:
```json
{
  "claim_id": "CLM-123456",
  "status": "submitted",
  "message": "Claim submitted successfully and is being processed"
}
```

#### Via Web Interface

1. Navigate to the Claims Analysis page
2. Fill in the claim form:
   - Patient Name
   - Patient Age
   - Diagnosis
   - Treatment Details
   - Hospital Name
   - Claim Amount
3. Upload supporting documents (prescriptions, bills, lab reports)
4. Click "Submit Claim"
5. View real-time AI analysis and adjudication results

### Checking Claim Status

```bash
# Get specific claim details
curl -X GET http://localhost:8000/api/claims/CLM-123456

# Get all claims history
curl -X GET http://localhost:8000/api/claims/history
```

### AI-Powered Analysis

The system uses Google Gemini AI to:
- Analyze claim documents automatically
- Extract key information from uploaded files
- Validate claim consistency
- Provide reasoning for adjudication decisions
- Detect potential fraud indicators

### Rules Engine

The built-in rules engine evaluates claims against:
- Policy coverage limits
- Required documentation
- Claim amount thresholds
- Treatment-diagnosis consistency
- Historical claim patterns

## API Documentation

### Base URL
```
http://localhost:8000
```

### Interactive Documentation
FastAPI provides automatic interactive API documentation:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Core Endpoints

#### Claims Management

**Submit a New Claim**
```http
POST /api/claims/submit
Content-Type: multipart/form-data

Form Data:
- patient_name: string
- patient_age: integer
- diagnosis: string
- treatment: string
- hospital_name: string
- claim_amount: float
- documents: file[] (multiple files supported)
```

**Get Claim Details**
```http
GET /api/claims/{claim_id}

Response:
{
  "id": "CLM-123456",
  "patient_name": "John Doe",
  "patient_age": 35,
  "diagnosis": "Type 2 Diabetes",
  "treatment": "Consultation and medication",
  "hospital_name": "City Hospital",
  "claim_amount": 5500.00,
  "status": "approved",
  "ai_analysis": "...",
  "decision": "approved",
  "reason": "Claim meets all policy requirements",
  "created_at": "2024-12-03T10:30:00Z",
  "documents": [...]
}
```

**Get Claims History**
```http
GET /api/claims/history?limit=50&offset=0

Response:
{
  "total": 150,
  "claims": [
    {
      "id": "CLM-123456",
      "patient_name": "John Doe",
      "claim_amount": 5500.00,
      "status": "approved",
      "created_at": "2024-12-03T10:30:00Z"
    },
    ...
  ]
}
```

**Get Claim Statistics**
```http
GET /api/claims/stats

Response:
{
  "total_claims": 150,
  "approved_claims": 120,
  "denied_claims": 20,
  "pending_claims": 10,
  "total_amount_claimed": 750000.00,
  "total_amount_approved": 600000.00,
  "approval_rate": 80.0
}
```

#### Policy Rules

**Get Policy Rules**
```http
GET /api/policy/rules

Response:
{
  "rules": [
    {
      "id": 1,
      "rule_type": "amount_limit",
      "description": "Maximum claim amount",
      "threshold": 50000.00
    },
    ...
  ]
}
```

### Response Codes

- `200 OK` - Successful request
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request parameters
- `404 Not Found` - Resource not found
- `422 Unprocessable Entity` - Validation error
- `500 Internal Server Error` - Server error

## Project Structure

```
OPD_Adjudicator/
├── Backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application entry point
│   │   ├── models.py            # SQLAlchemy database models
│   │   ├── schemas.py           # Pydantic schemas for validation
│   │   ├── database.py          # Database configuration
│   │   ├── ai_service.py        # Gemini AI integration
│   │   └── rules_engine.py      # Business rules engine
│   ├── uploads/                 # Uploaded documents storage
│   ├── requirements.txt         # Python dependencies
│   ├── Dockerfile              # Backend container config
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js         # Main dashboard
│   │   │   ├── ClaimAnalysis.js     # Claim submission form
│   │   │   ├── ClaimHistory.js      # Claims history view
│   │   │   ├── PolicyRules.js       # Policy rules display
│   │   │   ├── ResultCard.js        # Result display component
│   │   │   └── Sidebar.js           # Navigation sidebar
│   │   ├── App.js              # Main React component
│   │   └── index.js            # React entry point
│   ├── public/
│   ├── package.json            # Node.js dependencies
│   ├── tailwind.config.js      # Tailwind CSS configuration
│   ├── Dockerfile             # Frontend container config
│   └── nginx.conf             # Nginx configuration
└── docker-compose.yml         # Docker orchestration
```

## Database Schema

### Core Tables

#### claims
```sql
CREATE TABLE claims (
    id VARCHAR(50) PRIMARY KEY,
    patient_name VARCHAR(255) NOT NULL,
    patient_age INTEGER NOT NULL,
    diagnosis TEXT NOT NULL,
    treatment TEXT NOT NULL,
    hospital_name VARCHAR(255) NOT NULL,
    claim_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    ai_analysis TEXT,
    decision VARCHAR(20),
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### claim_documents
```sql
CREATE TABLE claim_documents (
    id SERIAL PRIMARY KEY,
    claim_id VARCHAR(50) NOT NULL,
    filename VARCHAR(255) NOT NULL,
    filepath VARCHAR(500) NOT NULL,
    file_type VARCHAR(50),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (claim_id) REFERENCES claims(id) ON DELETE CASCADE
);
```

#### policy_rules
```sql
CREATE TABLE policy_rules (
    id SERIAL PRIMARY KEY,
    rule_type VARCHAR(50) NOT NULL,
    description TEXT,
    parameter VARCHAR(100),
    threshold DECIMAL(10,2),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Sample Data Queries

```sql
-- Get approved claims summary
SELECT 
    COUNT(*) as total_approved,
    SUM(claim_amount) as total_amount,
    AVG(claim_amount) as avg_amount
FROM claims
WHERE decision = 'approved';

-- Get claims by hospital
SELECT 
    hospital_name,
    COUNT(*) as total_claims,
    SUM(CASE WHEN decision = 'approved' THEN 1 ELSE 0 END) as approved,
    AVG(claim_amount) as avg_amount
FROM claims
GROUP BY hospital_name
ORDER BY total_claims DESC;

-- Get recent claims with documents
SELECT 
    c.id,
    c.patient_name,
    c.claim_amount,
    c.status,
    COUNT(d.id) as document_count
FROM claims c
LEFT JOIN claim_documents d ON c.id = d.claim_id
GROUP BY c.id
ORDER BY c.created_at DESC
LIMIT 10;
```

## Testing

### Backend Testing

```bash
# Navigate to backend directory
cd Backend

# Install test dependencies
pip install pytest pytest-cov httpx

# Run all tests
pytest

# Run with coverage
pytest --cov=app --cov-report=html

# Run specific test file
pytest tests/test_claims.py

# Run with verbose output
pytest -v
```

### Frontend Testing

```bash
# Navigate to frontend directory
cd frontend

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

### Sample Test Cases

**Backend Test Example** (`tests/test_claims.py`):
```python
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_submit_claim():
    response = client.post(
        "/api/claims/submit",
        data={
            "patient_name": "Test Patient",
            "patient_age": 30,
            "diagnosis": "Common Cold",
            "treatment": "Medication",
            "hospital_name": "Test Hospital",
            "claim_amount": 1500
        }
    )
    assert response.status_code == 200
    assert "claim_id" in response.json()

def test_get_claim_history():
    response = client.get("/api/claims/history")
    assert response.status_code == 200
    assert "claims" in response.json()
```

**Frontend Test Example** (`src/components/ClaimAnalysis.test.js`):
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import ClaimAnalysis from './ClaimAnalysis';

test('renders claim form', () => {
  render(<ClaimAnalysis />);
  expect(screen.getByLabelText(/Patient Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Claim Amount/i)).toBeInTheDocument();
});

test('submits claim successfully', async () => {
  render(<ClaimAnalysis />);
  
  fireEvent.change(screen.getByLabelText(/Patient Name/i), {
    target: { value: 'John Doe' }
  });
  
  fireEvent.change(screen.getByLabelText(/Claim Amount/i), {
    target: { value: '5000' }
  });
  
  fireEvent.click(screen.getByText(/Submit Claim/i));
  
  // Add assertions for successful submission
});
```

## Deployment

### Production Deployment with Docker

```bash
# Build production images
docker-compose -f docker-compose.yml build

# Run containers in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

### Manual Production Deployment

#### Backend Deployment

```bash
# Install production dependencies
pip install gunicorn uvicorn[standard]

# Set environment variables
export DATABASE_URL="postgresql://user:pass@host:5432/db"
export GEMINI_API_KEY="your-api-key"

# Run with Gunicorn
gunicorn app.main:app \
  --workers 4 \
  --worker-class uvicorn.workers.UvicornWorker \
  --bind 0.0.0.0:8000 \
  --access-logfile - \
  --error-logfile -
```

#### Frontend Deployment

```bash
# Build production bundle
cd frontend
npm run build

# Serve with Nginx
# Copy build files to /var/www/html
sudo cp -r build/* /var/www/html/

# Configure Nginx
sudo nano /etc/nginx/sites-available/opd-adjudicator
```

Sample Nginx configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /var/www/html;
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Deployment Checklist

- [ ] Set up production PostgreSQL database
- [ ] Configure environment variables (remove DEBUG=True)
- [ ] Obtain and configure Gemini API key
- [ ] Set up SSL/TLS certificates (Let's Encrypt recommended)
- [ ] Configure CORS for production domain
- [ ] Set up database backups
- [ ] Configure logging and monitoring
- [ ] Set up reverse proxy (Nginx)
- [ ] Configure firewall rules
- [ ] Set up file upload size limits
- [ ] Test all API endpoints
- [ ] Verify document upload functionality
- [ ] Test AI analysis integration

### Environment-specific Settings

**Development:**
```bash
# Backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Frontend
npm start
```

**Production:**
```bash
# Backend
gunicorn app.main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker

# Frontend
npm run build
# Serve with Nginx
```

## Contributing

We welcome contributions! Please follow these guidelines:

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow PEP 8 for Python code (Backend)
- Use ESLint and Prettier for JavaScript/React code (Frontend)
- Use meaningful variable and function names
- Write docstrings for all functions and classes
- Add unit tests for new features
- Update documentation as needed

### Backend Code Standards

```python
# Good: Clear function with docstring
async def process_claim(claim_data: ClaimCreate) -> ClaimResponse:
    """
    Process a new claim submission.
    
    Args:
        claim_data: Validated claim data from request
        
    Returns:
        ClaimResponse with claim ID and status
    """
    # Implementation
    pass
```

### Frontend Code Standards

```javascript
// Good: Clear component with PropTypes
import PropTypes from 'prop-types';

const ClaimCard = ({ claim, onView }) => {
  return (
    <div className="claim-card">
      {/* Component implementation */}
    </div>
  );
};

ClaimCard.propTypes = {
  claim: PropTypes.object.isRequired,
  onView: PropTypes.func.isRequired
};
```

### Commit Message Format

```
type(scope): subject

body

footer
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
```
feat(claims): add batch claim processing
fix(api): resolve file upload size limit issue
docs(readme): update installation instructions
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

### Documentation

- **Backend API Documentation**: http://localhost:8000/docs (Swagger UI)
- **Alternative API Docs**: http://localhost:8000/redoc (ReDoc)
- **GitHub Repository**: https://github.com/Co-vengers/OPD_Adjudicator

### Getting Help

- **Issues**: Report bugs or request features via [GitHub Issues](https://github.com/Co-vengers/OPD_Adjudicator/issues)
- **Discussions**: Join conversations in [GitHub Discussions](https://github.com/Co-vengers/OPD_Adjudicator/discussions)

### Key Features Explained

**AI-Powered Analysis:**
The system uses Google's Gemini AI model to analyze claim documents, extract information, and provide intelligent recommendations for claim adjudication.

**Rules Engine:**
A flexible rules engine evaluates claims against configurable business rules including amount limits, required documentation, and policy compliance.

**Document Management:**
Secure file upload and storage for claim supporting documents with automatic analysis.

**Real-time Dashboard:**
Interactive dashboard showing claim statistics, approval rates, and historical trends.

### Maintainers

- Co-vengers ([@Co-vengers](https://github.com/Co-vengers))

### Technologies Used

- **Backend**: FastAPI, SQLAlchemy, Pydantic
- **AI**: Google Gemini API
- **Database**: PostgreSQL
- **Frontend**: React.js, Tailwind CSS, Axios
- **Deployment**: Docker, Docker Compose, Nginx

---

## Roadmap

### Version 2.0 (Planned)

- [ ] Advanced ML-based fraud detection
- [ ] Multi-language support for documents (OCR)
- [ ] Email notifications for claim status updates
- [ ] Export reports in PDF/Excel format
- [ ] Integration with payment gateways
- [ ] Mobile-responsive design improvements
- [ ] Role-based access control (RBAC)
- [ ] Audit trail and compliance reporting

### Version 1.5 (In Progress)

- [ ] Enhanced document analysis with OCR
- [ ] Batch claim processing
- [ ] Advanced analytics dashboard
- [ ] Policy rule management UI
- [ ] Claim appeal workflow

### Version 1.0 (Current)

- [x] Basic claim submission and processing
- [x] AI-powered claim analysis using Gemini
- [x] Rules engine for policy validation
- [x] Document upload and storage
- [x] Claims history and statistics
- [x] Responsive web interface

---

**Made with ❤️ for better healthcare claims management**
