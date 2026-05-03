# Lumina Relief

A comprehensive disaster relief inventory management system designed for efficient coordination and tracking of relief supplies across multiple distribution hubs.

## Overview

Lumina Relief is a full-stack web application that enables disaster relief organizations to manage inventory, personnel, and resources across multiple relief hubs. The system provides real-time inventory tracking, staff assignment, audit logging, and geographic integration for optimal relief operations.

## Features

### Core Functionality
- **Multi-Hub Management**: Create and manage multiple relief distribution centers with geographic coordinates
- **Real-Time Inventory Tracking**: Monitor stock levels with automatic status classification (In Stock, Low Stock, Out of Stock, Overstocked)
- **User Authentication**: Secure JWT-based authentication with role-based access
- **Staff Assignment**: Assign personnel to specific relief hubs
- **Contact Management**: Maintain multiple contact methods for each hub (phone, email, website)
- **Audit Trail**: Complete history of inventory changes for accountability
- **Resource Cataloging**: Define and organize relief supplies by category and unit

### Technical Features
- **Geographic Integration**: Automatic geocoding using OpenStreetMap
- **Smart Stock Management**: Prevents negative stock and enforces quantity constraints
- **Data Validation**: Comprehensive input validation using Zod schemas
- **Security**: Rate limiting, CORS, Helmet protection, bcrypt password hashing
- **Responsive UI**: Modern React interface with charts and real-time updates

## Tech Stack

### Frontend
- **React 19** - UI framework
- **React Router 7** - Client-side routing
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Zod** - Schema validation
- **node-geocoder** - Geographic services

### Security & Middleware
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **express-rate-limit** - API rate limiting

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React SPA     │    │   Express API   │    │   PostgreSQL    │
│                 │    │                 │    │   Database      │
│ - Components    │◄──►│ - Controllers   │◄──►│                 │
│ - Routes        │    │ - Services      │    │ - users         │
│ - State Mgmt    │    │ - Validators    │    │ - locations     │
│                 │    │ - Middleware    │    │ - inventories   │
└─────────────────┘    └─────────────────┘    │ - resources     │
                                              │ - audit_logs    │
                                              │ - contacts      │
                                              └─────────────────┘
```

## Installation

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lumina-relief
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Database Setup**
   - Create a PostgreSQL database
   - Run the database schema (see Database Schema section below)

5. **Environment Configuration**
   Create a `.env` file in the `server/` directory:
   ```env
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=lumina_relief
   JWT_SECRET=your_jwt_secret_key
   ```

6. **Start the development servers**

   **Terminal 1 - Backend:**
   ```bash
   cd server
   npm start
   ```

   **Terminal 2 - Frontend:**
   ```bash
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## Usage

### User Registration & Login
1. Navigate to the landing page
2. Click "Sign Up" to create a new account
3. Fill in user details (name, email, contact)
4. Click "Sign In" to log into the system

### Hub Management
1. After login, access the dashboard
2. Create relief hubs with location details
3. Assign staff members to specific hubs
4. Add contact information for each hub

### Inventory Management
1. Navigate to the Inventory section
2. Add new resources (water, food, medical supplies, etc.)
3. Add inventory items to specific hubs
4. Update stock levels as supplies are distributed
5. Monitor stock status and receive alerts for low stock

### Dashboard Overview
- View real-time statistics across all hubs
- Monitor inventory levels with visual charts
- Track fulfillment metrics
- Access audit logs for accountability

## API Documentation

### Authentication Endpoints

#### POST /api/user/register
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "contact": "09123456789",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "status": 201,
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### POST /api/user/login
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "status": 200,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Location Management

#### POST /api/location/create
Create a new relief hub.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Central Hub",
  "barangay": "Barangay 1",
  "city": "Manila",
  "province": "Metro Manila",
  "zipCode": "1000",
  "region": "NCR"
}
```

### Inventory Management

#### POST /api/inventory/add
Add inventory to a hub.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "resourceId": 1,
  "locationId": 1,
  "quantity": 100
}
```

#### PATCH /api/inventory/update/:id
Update inventory quantity.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "action": "SUBTRACT",
  "quantity": 25
}
```

### Resource Management

#### POST /api/resource/add
Add a new resource type.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "category": "Food",
  "name": "Rice",
  "unit": "kg"
}
```

### Location Contacts

#### POST /api/location-contacts
Add contact information to a hub.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "locationId": 1,
  "contactInfo": "09123456789",
  "contactType": "PHONE"
}
```

### Location Assignments

#### POST /api/assign/link
Assign a user to a location.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "userId": 1,
  "locationId": 1
}
```

## Database Schema

### Tables

#### users
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  contact VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### locations
```sql
CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  barangay VARCHAR(255),
  city VARCHAR(255),
  province VARCHAR(255),
  zip_code VARCHAR(10),
  region VARCHAR(100),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  status VARCHAR(50) DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### resources
```sql
CREATE TABLE resources (
  id SERIAL PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  name VARCHAR(255) NOT NULL,
  unit VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### inventories
```sql
CREATE TABLE inventories (
  inventory_id SERIAL PRIMARY KEY,
  location_id INTEGER REFERENCES locations(id),
  resource_id INTEGER REFERENCES resources(id),
  quantity INTEGER NOT NULL DEFAULT 0,
  status VARCHAR(50) DEFAULT 'OUT_OF_STOCK',
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### audit_logs
```sql
CREATE TABLE audit_logs (
  id SERIAL PRIMARY KEY,
  inventory_id INTEGER REFERENCES inventories(inventory_id),
  user_id INTEGER REFERENCES users(id),
  prev_quantity INTEGER,
  new_quantity INTEGER,
  action VARCHAR(50),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### contacts
```sql
CREATE TABLE contacts (
  contact_id SERIAL PRIMARY KEY,
  contact_info VARCHAR(255) NOT NULL,
  contact_type VARCHAR(50) NOT NULL
);
```

#### location_contacts
```sql
CREATE TABLE location_contacts (
  id SERIAL PRIMARY KEY,
  location_id INTEGER REFERENCES locations(id),
  contact_id INTEGER REFERENCES contacts(contact_id)
);
```

#### location_assignments
```sql
CREATE TABLE location_assignments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  location_id INTEGER REFERENCES locations(id),
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Security

- **JWT Authentication**: Bearer token required for protected endpoints
- **Password Hashing**: bcrypt with 10 salt rounds
- **Rate Limiting**: 10 requests/hour for auth, 100 requests/15min for general endpoints
- **Input Validation**: Zod schema validation for all inputs
- **CORS Protection**: Configured for cross-origin requests
- **Security Headers**: Helmet middleware for HTTP security

## Development

### Available Scripts

**Frontend:**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

**Backend:**
```bash
npm start        # Start production server
```

### Project Structure

```
lumina-relief/
├── public/                 # Static assets
├── src/                    # Frontend source
│   ├── components/         # React components
│   ├── routes/            # Page components
│   ├── styles/            # CSS modules
│   └── assets/            # Images and icons
├── server/                # Backend source
│   ├── config/            # Database configuration
│   ├── controllers/       # Route handlers
│   ├── middleware/        # Express middleware
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── utils/             # Utility functions
│   └── validators/        # Input validation
├── package.json           # Frontend dependencies
└── server/package.json    # Backend dependencies
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support or questions, please contact the development team or create an issue in the repository.