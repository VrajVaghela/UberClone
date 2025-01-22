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
