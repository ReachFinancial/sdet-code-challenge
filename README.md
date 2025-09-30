# Senior SDET Challenge - Loan Application API Testing

## 🎯 Overview

Your assignment is to test a loan application API. Build a robust test suite, identify defects, and provide additional technical documentation where needed.

## 🚀 Getting Started

```bash
cd api
npm install
npm start
```
Server runs on `http://localhost:3000`

**Note**: The API starts with 5 pre-existing loan applications (APP-001 through APP-005) in various states for testing purposes.

## 📡 API Documentation

The Loan Application API provides endpoints for managing loan applications through their lifecycle. All endpoints return JSON responses.

**Base URL:** `http://localhost:3000`

---

### POST /applications
Create a new loan application and get an immediate approval decision.

**Request Body:**
| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `firstName` | string | ✅ | Min 2 characters | Applicant's first name |
| `lastName` | string | ✅ | Min 2 characters | Applicant's last name |
| `email` | string | ✅ | Valid email format | Contact email address |
| `income` | number | ✅ | Positive number | Annual income in USD |
| `amount` | number | ✅ | Positive number | Requested loan amount in USD |

**Example Request:**
```json
POST /applications
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "income": 50000,
  "amount": 15000
}
```

**Success Response (201 Created):**
```json
{
  "id": "APP-001",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "income": 50000,
  "amount": 15000,
  "status": "approved",
  "decision": {
    "approved": true,
    "reason": "Income meets minimum requirements"
  },
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Validation failed",
  "details": [
    "firstName is required (min 2 characters)",
    "valid email is required"
  ]
}
```

---

### GET /applications/:id
Retrieve a specific loan application by its ID.

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Application ID (e.g., "APP-001") |

**Example Request:**
```
GET /applications/APP-001
```

**Success Response (200 OK):**
```json
{
  "id": "APP-001",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "income": 50000,
  "amount": 15000,
  "status": "approved",
  "decision": {
    "approved": true,
    "reason": "Income meets minimum requirements"
  },
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "Application not found"
}
```

---

### GET /applications
Retrieve all loan applications in the system.

**Example Request:**
```
GET /applications
```

**Success Response (200 OK):**
```json
[
  {
    "id": "APP-001",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "income": 50000,
    "amount": 15000,
    "status": "approved",
    "decision": {
      "approved": true,
      "reason": "Income meets minimum requirements"
    },
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  {
    "id": "APP-002",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@example.com",
    "income": 25000,
    "amount": 8000,
    "status": "rejected",
    "decision": {
      "approved": false,
      "reason": "Income below minimum threshold"
    },
    "createdAt": "2024-01-15T11:00:00.000Z"
  }
]
```

---

### PUT /applications/:id/status
Update the status of an existing loan application.

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Application ID (e.g., "APP-001") |

**Request Body:**
| Field | Type | Required | Valid Values | Description |
|-------|------|----------|--------------|-------------|
| `status` | string | ✅ | pending, approved, rejected, funded | New status for the application |

**Example Request:**
```json
PUT /applications/APP-001/status
Content-Type: application/json

{
  "status": "funded"
}
```

**Success Response (200 OK):**
```json
{
  "id": "APP-001",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "income": 50000,
  "amount": 15000,
  "status": "funded",
  "decision": {
    "approved": true,
    "reason": "Income meets minimum requirements"
  },
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T14:45:00.000Z"
}
```

**Error Responses:**
```json
// 404 Not Found
{
  "error": "Application not found"
}

// 400 Bad Request
{
  "error": "Invalid status",
  "validStatuses": ["pending", "approved", "rejected", "funded"]
}
```

---

### GET /health
Health check endpoint to verify the API is running.

**Example Request:**
```
GET /health
```

**Success Response (200 OK):**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### HTTP Status Codes

| Code | Meaning | When Used |
|------|---------|-----------|
| 200 | OK | Successful GET, PUT requests |
| 201 | Created | Successful POST /applications |
| 400 | Bad Request | Validation errors, invalid data |
| 404 | Not Found | Application not found, invalid endpoint |
| 500 | Internal Server Error | Unexpected server errors |

## 📊 Business Rules

### Core Approval Logic
1. **Income Requirements**: Minimum income of $30,000/year (inclusive)
2. **Loan Amount Limits**: Between $1,000 and $50,000 (inclusive)
3. **Required Fields**: firstName, lastName, email, income, amount
4. **Status Transitions**:
   - `pending` → `approved`/`rejected`
   - `approved` → `funded`
   - No transitions from `rejected` or `funded`

## 🎯 Your Tasks

### 1. Write Comprehensive Tests
#### Create a test suite that covers:

- **Functional Tests**: Happy path scenarios, CRUD operations
- **Input Validation**: Required fields, data types, formats
- **Business Logic**: Income thresholds, amount limits
- **Error Handling**: Invalid requests, non-existent resources

#### Feel free to use whatever language, frameworks, and tools you're most comfortable with.

### 2. Find and Document Issues
Identify any issues or defects in the API behavior. Document your findings in `TEST_RESULTS.md`:

**Include for each bug:**
- Bug description and severity (Critical/High/Medium/Low)
- Steps to reproduce
- Expected vs actual behavior
- Request/response examples
- Business impact

### 3. Provide Test Documentation
In your `TEST_RESULTS.md`, include:
- Test execution instructions
- Bug report (see above)
- Test approach and strategy
- Framework choice justification
- Coverage summary


## 📚 Resources

- Sample test data: `examples/test-data.json`
- API request examples: `examples/sample-requests.http`


## 📮 Submission

1. Fork this repository
2. Create a new branch: `solution/[your-name]`
3. Commit your solution with clear history
4. Push to your fork
5. Create a Pull Request with:
   - Summary of your approach
   - Number of issues found
   - Any assumptions made

## 📋 Deliverables

Please use the provided `TEST_RESULTS.md` template file to document your findings. The template includes sections for:
- Test execution instructions
- Issues found with detailed reproduction steps
- Test strategy and approach
- Framework choice justification
- Coverage summary and metrics

---

**Remember**: This challenge simulates real-world API testing scenarios. We value practical solutions, clear communication, and attention to detail. Show us how you would approach this in your day-to-day work as a Senior SDET.

**Good luck! 🚀**