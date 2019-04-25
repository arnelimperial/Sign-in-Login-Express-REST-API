# URI versioning instance in REST API

REST API with users registration and login features. Other functionalities include encryption of password, error-handling, and authentication using JWT. In partial fulfillment of the requirements for the subject [Mastering the Fundamentals of RESTful API Design of Metropolia Open UAS](http://opendata.metropolia.fi/koulutushaku/search.php#result-87398).

***v1.0.0***

---


## Installation

```bash 
# Install dependencies
npm install

# Serve locally on localhost:3000
npm run dev
```

## Built-With

- Express
- Mongoose
- Dependencies are listed in package.json


## Base URI

```bash
https://data-api-exp.herokuapp.com/

```

## V1.0 Endpoints
- GET /v1.0/users - Fetch all users.
- GET /v1.0/users/:username - Fetch user by username.
- POST /v1.0/users/register - Users sign-up in request body with username, email, password and  confirmationPassword field.
- POST /v1.0/login - Users login route in request body with email and password field. A successful login will generate the token to access the protected routes.
- PUT v1.0/users/:id (protected) - Update the users information by ID. Password reset is not yet initiated. Resetting password will cause an error when retrieving information.
- DELETE /v1.0/users/:id (protected) - Delete user by ID.

## V2.0 Endpoints 
- GET /v2.0/users - Fetch all users.
- GET /v2.0/users/:username - Fetch user by username.
- POST /v2.0/users/register - Users sign-up in request body with username, email and password field.
- POST /v1.0/login - Users login route in request body with email and password field. A successful login will generate the token to access the protected routes.
- PUT v1.0/users/:id (protected) - Update the users information by ID. Password reset is not yet initiated. Resetting password will cause an error when retrieving information.
- DELETE /v1.0/users/:id (protected) - Delete user by ID.

---

#### License
zlib

### Coded by

[Arnel Imperial](https://arnelimperial.bitbucket.io/)



