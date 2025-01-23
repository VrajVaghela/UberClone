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
