# Event Booking System – Backend

## Overview
This project implements the backend APIs for an **Event Booking System** that allows **Event Organizers** to manage events and **Customers** to browse and book tickets.

The system enforces **role-based access control**, uses **JWT authentication**, securely stores passwords using **bcrypt hashing**, and processes certain tasks asynchronously using a **background job queue**.

The goal of this project is to demonstrate a **production-style backend architecture** including modular design, environment-based configuration, and scalable background processing.

---

# Scope of the Project

The system supports two primary roles.

## Event Organizer
Event organizers are responsible for managing events on the platform.

Capabilities:
- Create events
- Update event details
- Delete events
- View bookings for their events

## Customer
Customers interact with events and book tickets.

Capabilities:
- Browse available events
- View event details
- Book tickets
- View their bookings

The system also performs background tasks to simulate email notifications and event updates.

---

# Functional Requirements

## Authentication
The system must support:

- User registration
- User login
- Secure password hashing
- JWT-based authentication

Each user is assigned a role:

- ORGANIZER
- CUSTOMER

Access to APIs is controlled using **role-based authorization middleware**.

---

## Event Management
Event organizers can perform the following actions:

- Create events
- Update event details
- Delete events
- View their events

Event fields include:

- Event title
- Description
- Location
- Date and time
- Total ticket count
- Available tickets
- Organizer ID

---

## Event Browsing
Customers can:

- Retrieve all available events
- View event details

Filtering can be applied by:

- Date
- Location

---

## Ticket Booking

Customers can book tickets for available events.

### Booking Flow

1. Customer selects an event
2. Specifies the number of tickets
3. System checks ticket availability
4. Booking is created
5. Available tickets are reduced
6. Booking confirmation background job is triggered

---

# Background Tasks

The system processes certain operations asynchronously.

## Booking Confirmation Task

Triggered when a booking is successfully created.

Purpose:
Simulate sending a booking confirmation email to the customer.

For this assignment, the task logs a message to the console.

Example output:

```
Booking confirmation email sent to customer@example.com
Event: Tech Conference
Tickets: 2
```

---

## Event Update Notification Task

Triggered when an organizer updates an event.

Purpose:
Notify all customers who have booked tickets for the updated event.

For this assignment, the system logs a notification message.

Example output:

```
Event update notification sent to 12 customers
Event: Tech Conference has been updated
```

---

# Non-Functional Requirements

## Security
- Passwords must be securely hashed
- Authentication handled using JWT
- Role-based authorization enforced

## Scalability
- Background jobs processed asynchronously
- API designed using modular architecture

## Performance
- Database queries optimized using indexes
- Ticket availability validation before booking

## Reliability
- Booking operations must ensure ticket count consistency

---

# System Architecture

The backend follows a layered architecture:

Routes → Controllers → Services → Models

### Routes
Defines API endpoints and request routing.

### Controllers
Handles HTTP request and response logic.

### Services
Contains the core business logic.

### Models
Defines database schemas and data structure.

---

# Project Structure

```
event-booking-system
│
├── src
│   ├── config
│   ├── constants
│   ├── controllers
│   ├── services
│   ├── routes
│   ├── middleware
│   ├── models
│   ├── jobs
│   ├── queues
│   ├── utils
│   └── app.js
│
├── logs
├── tests
│
├── .env.development
├── .env.staging
├── .env.production
├── .env.example
│
├── package.json
└── server.js
```

---

# Tech Stack

Backend Framework
- Node.js
- Express.js

Database
- MongoDB
- Mongoose ODM

Authentication
- JSON Web Tokens (JWT)

Security
- bcrypt password hashing

Background Processing
- BullMQ / Redis queue

Environment Management
- dotenv with multiple environments

---

# Environment Configuration

The system supports multiple environments:

- development
- staging
- production

Example `.env.example`:

```
NODE_ENV=development
PORT=5000

DB_URI=mongodb://localhost:27017/event-booking

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

---

# Running the Project

## Install dependencies

```
npm install
```

## Run development server

```
npm run dev
```

## Run production server

```
npm run prod
```

---

# Design Decisions

Several design decisions were made to ensure scalability and maintainability:

1. Modular architecture to separate concerns
2. Role-based middleware for secure access control
3. Background job queue to avoid blocking API responses
4. Environment-based configuration for deployment flexibility
5. Layered architecture to maintain code readability and testability

---

# Future Improvements

Possible improvements include:

- Payment integration
- Email service integration
- Rate limiting and API security
- Event search and filtering
- Ticket cancellation and refunds
- API documentation using Swagger

---

# Demo Video

A short demo video (3–4 minutes) demonstrates:

- Event creation
- Event browsing
- Ticket booking
- Background job execution

---

# Author

Rohan Sharma