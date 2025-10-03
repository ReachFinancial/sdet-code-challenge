const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
let applications = [];
let nextId = 1;

// Seed data - some pre-existing applications for testing
const seedApplications = () => {
  applications = [
    {
      id: "APP-001",
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      income: 75000,
      amount: 20000,
      status: "approved",
      decision: {
        approved: true,
        reason: "Income meets minimum requirements"
      },
      createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
    },
    {
      id: "APP-002",
      firstName: "Bob",
      lastName: "Smith",
      email: "bob.smith@example.com",
      income: 28000,
      amount: 15000,
      status: "rejected",
      decision: {
        approved: false,
        reason: "Income below minimum threshold"
      },
      createdAt: new Date(Date.now() - 43200000).toISOString() // 12 hours ago
    },
    {
      id: "APP-003",
      firstName: "Carol",
      lastName: "Williams",
      email: "carol.w@example.com",
      income: 45000,
      amount: 8000,
      status: "funded",
      decision: {
        approved: true,
        reason: "Income meets minimum requirements"
      },
      createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      updatedAt: new Date(Date.now() - 3600000).toISOString() // funded 1 hour ago
    },
    {
      id: "APP-004",
      firstName: "David",
      lastName: "Brown",
      email: "david.brown@example.com",
      income: 60000,
      amount: 25000,
      status: "approved",
      decision: {
        approved: true,
        reason: "Income meets minimum requirements"
      },
      createdAt: new Date(Date.now() - 7200000).toISOString() // 2 hours ago
    },
    {
      id: "APP-005",
      firstName: "Eve",
      lastName: "Davis",
      email: "eve.davis@example.com",
      income: 30000,
      amount: 5000,
      status: "pending",
      decision: {
        approved: false,
        reason: "Income below minimum threshold"
      },
      createdAt: new Date(Date.now() - 1800000).toISOString() // 30 minutes ago
    }
  ];
  nextId = 6; // Start new IDs from APP-006
};

// Initialize with seed data
seedApplications();

// Helper functions
const generateId = () => {
  const id = `APP-${String(nextId).padStart(3, '0')}`;
  nextId++;
  return id;
};

const validateApplication = (data) => {
  const errors = [];

  if (!data.firstName || data.firstName.length < 2) {
    errors.push('firstName is required (min 2 characters)');
  }

  if (!data.lastName || data.lastName.length < 2) {
    errors.push('lastName is required (min 2 characters)');
  }

  if (!data.email || !data.email.includes('@')) {
    errors.push('valid email is required');
  }

  if (!data.income || typeof data.income !== 'number' || data.income <= 0) {
    errors.push('income must be a positive number');
  }

  if (!data.amount || typeof data.amount !== 'number' || data.amount <= 0) {
    errors.push('amount must be a positive number');
  }

  return errors;
};

const processApplication = (data) => {
  const decision = {
    approved: false,
    reason: ''
  };

  if (data.income > 30000) {
    decision.approved = true;
    decision.reason = 'Income meets minimum requirements';
  } else {
    decision.approved = false;
    decision.reason = 'Income below minimum threshold';
  }

  if (data.amount > 40000) {
    decision.approved = true;
    decision.reason = 'Large loan auto-approved';
  }

  return decision;
};

// Routes

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Submit loan application
app.post('/applications', (req, res) => {
  const errors = validateApplication(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors
    });
  }

  const application = {
    id: generateId(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    income: req.body.income,
    amount: req.body.amount,
    status: 'pending',
    decision: null,
    createdAt: new Date().toISOString()
  };

  // Process the application
  application.decision = processApplication(req.body);
  application.status = application.decision.approved ? 'approved' : 'rejected';

  applications.push(application);

  res.status(201).json(application);
});

// Get application by ID
app.get('/applications/:id', (req, res) => {
  const app = applications.find(a => a.id === req.params.id);

  if (!app) {
    return res.status(404).json({ error: 'Application not found' });
  }

  res.json(app);
});

// List all applications
app.get('/applications', (req, res) => {
  res.json(applications);
});

// Update application status
app.put('/applications/:id/status', (req, res) => {
  const app = applications.find(a => a.id === req.params.id);

  if (!app) {
    return res.status(404).json({ error: 'Application not found' });
  }

  const { status } = req.body;
  const validStatuses = ['pending', 'approved', 'rejected', 'funded'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      error: 'Invalid status',
      validStatuses
    });
  }

  app.status = status;
  app.updatedAt = new Date().toISOString();

  res.json(app);
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Simple Loan API running on http://localhost:${PORT}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   GET  /health`);
  console.log(`   POST /applications`);
  console.log(`   GET  /applications`);
  console.log(`   GET  /applications/:id`);
  console.log(`   PUT  /applications/:id/status`);
});

module.exports = app;