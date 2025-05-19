# Frontend Documentation

## Overview

The frontend of this project is built using React and Vite. It provides a user-friendly interface for both users and captains.

## Setup Instructions

1. Navigate to the `Frontend` directory:
   ```sh
   cd Frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Environment Variables

Create a `.env` file in the `Frontend` directory with the following variables:

```env
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

## Component Structure

The frontend is organized into the following components:

- **components/**: Reusable UI components such as `LiveTracking`, `RidePopUp`, and `VehiclePanel`.
- **context/**: Context providers for managing global state, including `UserContext` and `SocketContext`.
- **pages/**: Page-level components such as `Home`, `Riding`, and `CaptainHome`.

## ESLint Configuration

The frontend uses ESLint for code linting. The configuration can be found in `eslint.config.js`.
