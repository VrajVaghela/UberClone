# Uber Clone

This project is a clone of the Uber application, built with a React frontend and a Node.js backend.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Frontend](#frontend)
- [Backend](#backend)
- [API Documentation](#api-documentation)
- [License](#license)

## Features

- User and Captain registration and login
- JWT-based authentication
- Profile management
- Vehicle management for captains

## Technologies Used

- **Frontend**: React, Vite, TailwindCSS, React Router
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- **Other**: ESLint, dotenv, cookie-parser, express-validator

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/uber-clone.git
    cd uber-clone
    ```

2. Install dependencies for both frontend and backend:
    ```sh
    cd Frontend
    npm install
    cd ../Backend
    npm install
    ```

3. Create a `.env` file in the `Backend` directory and add your MongoDB connection string and JWT secret:
    ```env
    DB_CONNECT=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

### Running the Application

1. Start the backend server:
    ```sh
    cd Backend
    node server.js
    ```

2. Start the frontend development server:
    ```sh
    cd ../Frontend
    npm run dev
    ```

3. Open your browser and navigate to `http://localhost:3000`.

## Frontend

The frontend is built with React and Vite. It includes the following pages:

- Home
- User Login
- User Signup
- Captain Login
- Captain Signup

### ESLint Configuration

The frontend uses ESLint for code linting. The configuration can be found in `Frontend/eslint.config.js`.

## Backend

The backend is built with Node.js and Express. It includes the following features:

- User and Captain registration and login
- JWT-based authentication
- Profile management
- Vehicle management for captains

### API Documentation

The API documentation can be found in `Backend/README.md`.

## License

This project is licensed under the MIT License.