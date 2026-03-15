# Backend Coding Challenge – Event Booking System

This project was developed as part of a backend engineering coding challenge.

## Objective

Design and implement a backend system for an event booking platform where:

- Event organizers can create and manage events
- Customers can browse events and book tickets

The system should support secure authentication, role-based access control, and safe ticket booking without overselling.

## Key Requirements

- User registration and login
- JWT-based authentication
- Role-based authorization (Organizer / Customer)
- Event management APIs for organizers
- Event browsing APIs for customers
- Ticket booking functionality
- Prevent ticket overselling
- Background tasks to simulate notifications

## Implementation Highlights

- Secure password hashing using bcrypt
- JWT authentication with HTTP-only cookies
- Atomic ticket booking using MongoDB update operators
- Modular architecture with controllers, services, and models
- Background jobs for booking confirmation and event updates

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt