# SDET Challenge - Simple Loan API Testing

## 🎯 Your Mission

You've been given a simple loan approval API to test. Your job is to **write API tests and find uncover any issues**.

## Quick Start
```bash
cd api
npm install
npm start
```
Server runs on http://localhost:3000

## API Endpoints

### POST /applications
Submit a loan application
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "income": 50000,
  "amount": 10000
}
```

**Response:** Application object with approval decision

### GET /applications/:id
Get application by ID

### GET /applications
List all applications

### PUT /applications/:id/status
Update application status (admin)
```json
{
  "status": "approved|rejected|funded|pending"
}
```

## Business Rules
- **Approval Logic**: Income ≥ $30,000 = approved
- **Amount Limits**: $1,000 - $50,000
- **Required Fields**: firstName, lastName, email, income, amount

## 🎯 Your Tasks
1. **Write API tests** using any framework you prefer
2. **Uncover any issues** in the API
3. **Document findings** in a brief README

### Focus on:
- ✅ Valid application submission
- ❌ Invalid input validation
- 🎯 Business logic accuracy (income thresholds)
- 📊 Boundary conditions
- 🔍 Error handling
- 📋 CRUD operations

## Evaluation
- Test and code quality and organization
- Bug finding ability
- Clear documentation
- Code readability

### 2. Bug Bounty
**Find the broken code**
- What's broken?
- Expected vs actual behavior
- Steps to reproduce

### 3. Document Findings
Create a brief summary:
- How to run your tests
- Bugs you found
- Your testing approach

## 💡 Tips

### Show your work
- We're interested in seeing and understanding your design choices and approach as well as code quality, so commit often and don't be afraid to leave comments where necessary.

### Tools Available
- Sample data in `examples/test-data.json`
- HTTP requests in `examples/sample-requests.http`
- Use any testing framework you prefer

## 🚦 Success Looks Like
- **Comprehensive test coverage** including edge cases
- **All bugs found** with reproduction steps
- **Clean, professional code** with good organization
- **Insightful analysis** of the API's behavior

## Remember: 

This is about demonstrating your **real-world API testing skills**.

**No perfect solutions required** - we want to see how you approach testing, find issues, and communicate findings.

**Focus on being practical and thorough** rather than showing off with complex frameworks.

**Good luck! 🚀**