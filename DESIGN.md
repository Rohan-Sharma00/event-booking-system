# Event Booking System – Design Document

## 1. Introduction

This document describes the system design, architecture, entities, API structure, and security considerations for the **Event Booking System Backend**.

The goal of this design is to build a **production-ready backend service** with:

- Modular architecture
- Role-based access control
- Secure authentication
- Scalable background job processing
- Clean separation of responsibilities

The backend follows a **layered architecture** and uses modern backend best practices.

---

# 2. System Architecture

The backend follows a **modular layered architecture**:

```
Client → Routes → Controllers → Services → Models → Database
```

### Layer Responsibilities

**Routes**
- Define API endpoints
- Apply middleware such as authentication and rate limiting

**Controllers**
- Handle HTTP request and response
- Validate input data
- Call service layer

**Services**
- Contains business logic
- Handles data processing
- Interacts with database models

**Models**
- Define database schemas
- Manage database operations

---

# 3. High Level Flow

### User Registration

```
Client
   │
   ▼
POST /auth/register
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Hash Password (bcrypt)
   │
   ▼
Store User in DB
```

---

### Event Booking Flow

```
Customer
   │
   ▼
POST /customer/book
   │
   ▼
Controller
   │
   ▼
Check ticket availability
   │
   ▼
Create booking
   │
   ▼
Update available tickets
   │
   ▼
Push job to queue
   │
   ▼
Worker sends booking confirmation
```

---

# 4. Entities and Database Design

The system consists of three main entities.

---

# 4.1 User Entity

Represents both **Organizers and Customers**.

### Fields

| Field | Type | Description |
|-----|-----|-------------|
| id | ObjectId | Unique identifier |
| name | String | User full name |
| email | String | Unique email |
| password | String | Hashed password |
| role | Enum | CUSTOMER or ORGANIZER |
| createdAt | Date | Account creation time |
| updatedAt | Date | Last update time |

### Security

Passwords are hashed using **bcrypt** with:

```
saltRounds = 10
```

---

# 4.2 Event Entity

Represents events created by organizers.

### Fields

| Field | Type | Description |
|-----|-----|-------------|
| id | ObjectId | Event identifier |
| title | String | Event name |
| description | String | Event details |
| location | String | Event location |
| date | Date | Event date |
| totalTickets | Number | Total tickets available |
| availableTickets | Number | Remaining tickets |
| organizerId | ObjectId | Event creator |
| createdAt | Date | Creation timestamp |

---

# 4.3 Booking Entity

Represents ticket bookings made by customers.

### Fields

| Field | Type | Description |
|-----|-----|-------------|
| id | ObjectId | Booking identifier |
| eventId | ObjectId | Booked event |
| customerId | ObjectId | Customer reference |
| ticketCount | Number | Number of tickets booked |
| bookingDate | Date | Booking timestamp |

---

# 5. Authentication and Security

The system uses **JWT-based authentication**.

### Token Strategy

JWT tokens are issued after successful login.

### Cookie Configuration

Tokens are stored in secure cookies:

```
httpOnly: true
secure: true (in production)
sameSite: strict
```

### Token Expiry

```
JWT_EXPIRES_IN = 1d
```

---

# 6. Password Security

Passwords are stored using **bcrypt hashing**.

```
bcrypt.hash(password, 10)
```

Benefits:

- Prevents plaintext password storage
- Resistant to brute-force attacks

---

# 7. Role-Based Access Control

The system implements **RBAC** using middleware.

### Roles

```
CUSTOMER
ORGANIZER
```

### Authorization Rules

| API | Customer | Organizer |
|-----|----------|-----------|
| Create Event | ❌ | ✅ |
| Update Event | ❌ | ✅ |
| Delete Event | ❌ | ✅ |
| Browse Events | ✅ | ✅ |
| Book Ticket | ✅ | ❌ |

---

# 8. API Design

## Authentication APIs

### Register

```
POST /api/auth/register
```

Body:

```
{
  "name": "Rohan",
  "email": "rohan@example.com",
  "password": "password",
  "role": "CUSTOMER"
}
```

---

### Login

```
POST /api/auth/login
```

Response:

```
JWT Token stored in HTTPOnly cookie
```

---

## Event APIs

### Create Event

```
POST /api/events
```

Organizer only.

---

### Update Event

```
PUT /api/events/:id
```

Triggers **event update notification job**.

---

### Delete Event

```
DELETE /api/events/:id
```

Organizer only.

---

### Get All Events

```
GET /api/events
```

Public endpoint.

---

## Booking APIs

### Book Tickets

```
POST /api/customer/book
```

Body:

```
{
  "eventId": "123",
  "ticketCount": 2
}
```

Triggers **booking confirmation job**.

---

### Get Customer Bookings

```
GET /api/customer/bookings
```

Returns bookings made by logged-in user.

---

# 9. Background Job Processing

Background jobs are used to avoid blocking API responses.

Queue system:

```
BullMQ + Redis
```

---

## Booking Confirmation Job

Triggered after booking creation.

Example output:

```
Booking confirmation email sent to user@example.com
```

---

## Event Update Notification Job

Triggered when an event is updated.

Example output:

```
Event update notification sent to 20 users
```

---

# 10. Rate Limiting

To protect APIs from abuse, **rate limiting middleware** will be applied.

Example configuration:

```
100 requests per 15 minutes per IP
```

Implemented using:

```
express-rate-limit
```

---

# 11. Environment Configuration

Multiple environments are supported:

```
development
staging
production
```

Example variables:

```
PORT=5000
DB_URI=mongodb://localhost:27017/event-booking
JWT_SECRET=secret
JWT_EXPIRES_IN=1d
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

---

# 12. Logging

Application logs will be stored in:

```
/logs
```

Logging includes:

- API requests
- errors
- background job execution

---

# 13. Error Handling

Centralized error handling middleware will be used.

Responsibilities:

- Handle application errors
- Return consistent API responses
- Prevent stack traces from leaking in production

---

# 14. Scalability Considerations

The system is designed for scalability:

- Stateless APIs
- Queue-based background jobs
- Modular architecture
- Environment-based configuration

---

# 15. Future Enhancements

Possible improvements:

- Payment integration
- Email service integration
- Event search and filtering
- Ticket cancellation
- Admin dashboard
- API documentation with Swagger

---

# 16. Summary

This backend system demonstrates a **production-grade API architecture** with:

- Secure authentication
- Role-based access control
- Background job processing
- Modular project structure
- Environment-based configuration

The design ensures maintainability, scalability, and security.