# Backend API Documentation

## Overview

This API supports the Uber clone application with user management, captain management, ride management, and location services.

## Base URL
```
http://localhost:3000
```

## Authentication

Most endpoints require JWT authentication. Include the token in request headers:
```
Authorization: Bearer <token>
```

## Error Responses

All endpoints may return these error responses:

### 400 Bad Request
```json
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "message": "Unauthorized"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal Server Error"
}
```

# User API Documentation

## Register User
Creates a new user account.

### Endpoint
```
POST /users/register
```

### Request Body
```json
{
  "fullname": {
    "firstname": "string",   // minimum 3 characters
    "lastname": "string"     // minimum 3 characters
  },
  "email": "string",        // valid email format
  "password": "string"      // minimum 6 characters
}
```

### Response

#### Success (201 Created)
```json
{
  "token": "jwt_token_string",
  "user": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "_id": "string"
  }
}
```

#### Error (400 Bad Request)
```json
{
  "errors": [
    {
      "msg": "error message",
      "param": "field_name"
    }
  ]
}
```

### Validation Rules
- First name must be at least 3 characters long
- Email must be a valid email format
- Password must be at least 6 characters long

## Login User
Authenticates a user and returns a JWT token.

### Endpoint
```
POST /users/login
```

### Request Body
```json
{
  "email": "string",    // valid email format
  "password": "string"  // minimum 6 characters
}
```

### Response

#### Success (200 OK)
```json
{
  "token": "jwt_token_string",
  "user": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "_id": "string"
  }
}
```

#### Error (401 Unauthorized)
```json
{
  "message": "Invalid email or password"
}
```

#### Error (400 Bad Request)
```json
{
  "errors": [
    {
      "msg": "error message",
      "param": "field_name"
    }
  ]
}
```

### Validation Rules
- Email must be a valid email format
- Password must be at least 6 characters long

## Get User Profile
Returns the current user's profile information.

### Endpoint
```
GET /users/profile
```

### Headers
```
Authorization: Bearer jwt_token_string
```

### Response

#### Success (200 OK)
```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "_id": "string"
}
```

#### Error (401 Unauthorized)
```json
{
  "message": "Unauthorized"
}
```

## Logout User
Logs out the current user and invalidates their token.

### Endpoint
```
GET /users/logout
```

### Headers
```
Authorization: Bearer jwt_token_string
```

### Response

#### Success (200 OK)
```json
{
  "message": "Logged out successfully"
}
```

#### Error (401 Unauthorized)
```json
{
  "message": "Unauthorized"
}
```

# Captain API Documentation

## Register Captain
Creates a new captain account.

### Endpoint
```
POST /captains/register
```

### Request Body
```json
{
  "fullname": {
    "firstname": "string",   // minimum 3 characters
    "lastname": "string"     // minimum 3 characters
  },
  "email": "string",        // valid email format
  "password": "string",     // minimum 6 characters
  "vehicle": {
    "color": "string",      // minimum 3 characters
    "plate": "string",      // minimum 3 characters
    "capacity": "number",   // minimum 1
    "vehicleType": "string" // must be 'car', 'motorcycle', or 'auto'
  }
}
```

### Response

#### Success (201 Created)
```json
{
  "token": "jwt_token_string",
  "captain": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    },
    "_id": "string"
  }
}
```

#### Error (400 Bad Request)
```json
{
  "errors": [
    {
      "msg": "error message",
      "param": "field_name"
    }
  ]
}
```

### Validation Rules
- First name must be at least 3 characters long
- Last name must be at least 3 characters long
- Email must be a valid email format
- Password must be at least 6 characters long
- Vehicle color must be at least 3 characters long
- Vehicle plate must be at least 3 characters long
- Vehicle capacity must be at least 1
- Vehicle type must be one of: car, motorcycle, auto

## Login Captain
Authenticates a captain and returns a JWT token.

### Endpoint
```
POST /captains/login
```

### Request Body
```json
{
  "email": "string",    // valid email format
  "password": "string"  // minimum 6 characters
}
```

### Response

#### Success (200 OK)
```json
{
  "token": "jwt_token_string",
  "captain": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "_id": "string"
  }
}
```

#### Error (401 Unauthorized)
```json
{
  "message": "Invalid email or password"
}
```

#### Error (400 Bad Request)
```json
{
  "errors": [
    {
      "msg": "error message",
      "param": "field_name"
    }
  ]
}
```

### Validation Rules
- Email must be a valid email format
- Password must be at least 6 characters long

## Get Captain Profile
Returns the current captain's profile information.

### Endpoint
```
GET /captains/profile
```

### Headers
```
Authorization: Bearer jwt_token_string
```

### Response

#### Success (200 OK)
```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "_id": "string"
}
```

#### Error (401 Unauthorized)
```json
{
  "message": "Unauthorized"
}
```

## Logout Captain
Logs out the current captain and invalidates their token.

### Endpoint
```
GET /captains/logout
```

### Headers
```
Authorization: Bearer jwt_token_string
```

### Response

#### Success (200 OK)
```json
{
  "message": "Logged out successfully"
}
```

#### Error (401 Unauthorized)
```json
{
  "message": "Unauthorized"
}
```

# Map API Documentation

## Get Coordinates
Converts an address to coordinates.

### Endpoint
```
GET /maps/get-coordinates
```

### Query Parameters
```
address: string (min 3 characters)
```

### Headers
```
Authorization: Bearer jwt_token_string
```

### Response

#### Success (200 OK)
```json
{
  "lat": "number",
  "lng": "number"
}
```

#### Error (408 Request Timeout)
```json
{
  "message": "Request timed out"
}
```

## Get Distance and Time
Calculate distance and time between two points.

### Endpoint
```
GET /maps/get-distance-time
```

### Query Parameters
```
origin: string      (min 3 characters)
destination: string (min 3 characters)
```

### Headers
```
Authorization: Bearer jwt_token_string
```

### Response

#### Success (200 OK)
```json
{
  "distance": {
    "text": "5 km",
    "value": 5000
  },
  "duration": {
    "text": "15 mins",
    "value": 900
  }
}
```

## Get Auto-Complete Suggestions
Get location suggestions for user input.

### Endpoint
```
GET /maps/get-suggestions
```

### Query Parameters
```
input: string (min 3 characters)
```

### Headers
```
Authorization: Bearer jwt_token_string
```

### Response

#### Success (200 OK)
```json
[
  {
    "description": "Location description",
    "place_id": "Google Place ID",
    "structured_formatting": {
      "main_text": "Primary text",
      "secondary_text": "Secondary text"
    }
  }
]
```

# Ride API Documentation

## Create Ride
Create a new ride request.

### Endpoint
```
POST /rides/create
```

### Headers
```
Authorization: Bearer jwt_token_string
```

### Request Body
```json
{
  "pickup": "string",      // Pickup location (min 3 characters)
  "destination": "string", // Destination location (min 3 characters)
  "vehicleType": "string"  // One of: "auto", "car", "moto"
}
```

### Response

#### Success (201 Created)
```json
{
  "_id": "string",
  "user": "string",
  "pickup": "string",
  "destination": "string",
  "fare": "number",
  "status": "pending",
  "otp": "string",
  "duration": "number",
  "distance": "number"
}
```

# Environment Variables

The backend requires the following environment variables:

```env
DB_CONNECT=mongodb://localhost:27017/uber-clone
JWT_SECRET=your-secret-key
GOOGLE_MAPS_API=your-google-maps-api-key
PORT=3000
```

# Data Models

## User Model
```javascript
{
  fullname: {
    firstname: String,  // required, min 3 chars
    lastname: String    // min 3 chars
  },
  email: String,       // required, unique
  password: String,    // required, hashed
  socketId: String     // optional
}
```

## Captain Model
```javascript
{
  fullname: {
    firstname: String,  // required, min 3 chars
    lastname: String    // min 3 chars
  },
  email: String,       // required, unique
  password: String,    // required, hashed
  status: String,      // enum: ['active', 'inactive']
  vehicle: {
    color: String,     // required, min 3 chars
    plate: String,     // required, min 3 chars
    capacity: Number,  // required, min 1
    vehicleType: String // required, enum: ['car', 'motorcycle', 'auto']
  },
  location: {
    lat: Number,
    lng: Number
  }
}
```

## Ride Model
```javascript
{
  user: ObjectId,      // required, ref: 'User'
  captain: ObjectId,   // ref: 'Captain'
  pickup: String,      // required
  destination: String, // required
  fare: Number,       // required
  status: String,     // enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled']
  duration: Number,
  distance: Number,
  otp: String,        // required, hidden
  paymentID: String,
  orderID: String
}
```
