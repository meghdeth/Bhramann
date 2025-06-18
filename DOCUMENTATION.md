# Bhramann Application Documentation

## Table of Contents
1. [Overview](#overview)
2. [Backend Documentation](#backend-documentation)
3. [Frontend Documentation](#frontend-documentation)
4. [Getting Started](#getting-started)

## Overview
Bhramann is a full-stack web application built with React (frontend) and Node.js/Express (backend). The application helps users plan and manage their trips, including package bookings and user authentication.

## Backend Documentation

### Technology Stack
- Node.js
- Express.js
- MongoDB (Database)
- JWT Authentication
- CORS enabled
- Body Parser for request handling

### Project Structure
```
backend/
├── config/         # Database and other configurations
├── controllers/    # Business logic handlers
├── middleware/     # Custom middleware functions
├── models/         # Database models
├── routes/         # API route definitions
└── server.js       # Main application entry point
```

### API Endpoints

#### Authentication Routes (`/api/auth`)
- User registration and login endpoints
- JWT-based authentication
- Protected routes for authenticated users

#### Package Routes (`/api/packages`)
- CRUD operations for travel packages
- Package search and filtering
- Booking management

### Server Configuration
- Port: 5000 (default) or as specified in environment variables
- CORS enabled for cross-origin requests
- Body parser configured with 50MB limit
- Error handling middleware for consistent error responses

## Frontend Documentation

### Technology Stack
- React.js
- Vite (Build tool)
- Tailwind CSS (Styling)
- ESLint (Code linting)

### Project Structure
```
frontend/
├── src/
│   ├── assets/     # Static assets
│   ├── components/ # Reusable UI components
│   ├── pages/      # Page components
│   ├── styles/     # CSS and styling files
│   ├── ui/         # UI components
│   ├── utils/      # Utility functions
│   ├── api.js      # API integration
│   ├── auth.js     # Authentication utilities
│   └── App.jsx     # Main application component
├── public/         # Public assets
└── index.html      # Entry HTML file
```

### Key Features
1. User Authentication
   - Login/Registration forms
   - Protected routes
   - Session management

2. Package Management
   - Package listing
   - Package details
   - Booking functionality

3. User Interface
   - Responsive design
   - Modern UI components
   - Tailwind CSS styling

### API Integration
- Centralized API calls in `api.js`
- Authentication handling in `auth.js`
- Axios for HTTP requests

## Getting Started

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with required environment variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_url
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with required environment variables:
   ```
   VITE_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Environment Variables
Both frontend and backend require specific environment variables to be set up. Make sure to create appropriate `.env` files in both directories with the necessary configuration.

## Development Guidelines
1. Follow the established project structure
2. Use ESLint for code consistency
3. Implement proper error handling
4. Write meaningful commit messages
5. Test thoroughly before deployment

## Deployment
The application can be deployed using various platforms:
- Frontend: Vercel (configured with vercel.json)
- Backend: Any Node.js hosting platform (e.g., Heroku, DigitalOcean)

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
