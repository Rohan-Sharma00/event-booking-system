# Event Booking System – Backend

## Overview

This project implements backend APIs for an **Event Booking System** where:

- **Event Organizers** can create and manage events
- **Customers** can browse events and book tickets

The system enforces **role-based access control**, uses **JWT authentication**, securely stores passwords using **bcrypt hashing**, and processes certain tasks asynchronously using **background jobs**.

The goal of this project is to demonstrate a **production-style backend architecture** including modular design, environment-based configuration, secure authentication, and asynchronous task processing.

---

# Scope of the Project

The system supports two primary roles.

## Event Organizer

Event organizers manage events on the platform.

Capabilities:

- Create events
- Update event details
- Delete events
- View events created by them

---

## Customer

Customers interact with events and book tickets.

Capabilities:

- Browse available events
- View event details
- Book tickets
- View their bookings

The system also performs background tasks to simulate notifications.

---

# Functional Requirements

## Authentication

The system supports:

- User registration
- User login
- Password hashing using **bcrypt**
- JWT based authentication

Each user has a role:

```
ORGANIZER
CUSTOMER
```

Access to APIs is controlled using **role-based authorization middleware**.

---

# Event Management

Event organizers can:

- Create events
- Update event details
- Delete events
- View events created by them

Event fields include:

- Event name
- Description
- Location
- Date and time
- Total ticket count
- Available tickets
- Organizer ID

---

# Event Browsing

Customers can:

- Retrieve all available events
- View event details

Only events with **available tickets** are returned.

---

# Ticket Booking

Customers can book tickets for events.

### Booking Flow

1. Customer selects an event  
2. Specifies the number of tickets  
3. System validates ticket availability  
4. Booking is created  
5. Available tickets are reduced  
6. Background booking confirmation task is triggered  

To prevent **overselling**, ticket booking uses **atomic database updates**.

---

# Background Tasks

The system performs asynchronous background tasks to simulate notification systems.

These tasks run **without blocking API responses**.

---

## Background Task 1 – Booking Confirmation

Triggered when a customer successfully books tickets.

Purpose:

Simulate sending a booking confirmation email.

Example console output:

```
Booking confirmation email sent to customer@example.com
Event: Tech Conference
Tickets: 2
```

---

## Background Task 2 – Event Update Notification

Triggered when an organizer updates an event.

Purpose:

Notify customers who booked tickets for that event.

Example console output:

```
Notification sent to customer@example.com for event update
Event: Tech Conference
```

---

# API Endpoints

## Authentication APIs

```
POST /api/auth/register
POST /api/auth/login
```

---

## Organizer APIs

```
POST   /api/events
GET    /api/events
PUT    /api/events/:eventId
DELETE /api/events/:eventId
```

---

## Customer APIs

```
GET  /api/customer/events
POST /api/customer/book
GET  /api/customer/bookings
```

---

# Non-Functional Requirements

## Security

- Password hashing using **bcrypt**
- Authentication using **JWT**
- Role-based authorization
- HTTP-only cookies for token storage

---

## Scalability

- Background tasks executed asynchronously
- Modular project architecture

---

## Performance

- Optimized database queries
- Ticket availability validation before booking

---

## Reliability

- Atomic ticket booking prevents overselling

---

# System Architecture

The backend follows a **layered architecture**:

```
Routes → Controllers → Services → Models
```

### Routes
Defines API endpoints and request routing.

### Controllers
Handles request validation and responses.

### Services
Contains business logic.

### Models
Defines MongoDB schemas and database structure.

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

### Backend Framework
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JSON Web Tokens (JWT)

### Security
- bcrypt password hashing

### Async Processing
- Background job simulation using Node.js async execution

### Environment Management
- dotenv with multiple environment configurations

---

# Environment Configuration

The system supports multiple environments:

```
development
staging
production
```

Example `.env.example`

```
ENV_NAME=development
PORT=3333

DATABASE_URL=mongodb://localhost:27017/event-booking

JWT_SECRET_KEY=your_secret_key
JWT_TOKEN_EXPIRY=1d

SALT_ROUNDS=10
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

Key design decisions taken in this project:

1. Modular architecture to separate concerns  
2. Role-based middleware for secure access control  
3. Asynchronous background jobs to avoid blocking API responses  
4. Environment-based configuration for deployment flexibility  
5. Atomic ticket booking to prevent race conditions  

---

# Future Improvements

Possible enhancements include:

- Payment gateway integration
- Email notification service
- Event search and filtering
- Ticket cancellation and refunds
- Rate limiting and API security
- API documentation using Swagger

---

# Demo Video

A short demo video (3–4 minutes) demonstrates:

- User registration and login
- Event creation
- Event browsing
- Ticket booking
- Background job execution

---

# Author

**Rohan Sharma**