# Node.js API - Patient Management

This repository contains a Node.js API for managing patient records. It provides various routes for authentication, retrieving patient data, adding new patients, updating patient information, and removing patients.

## Getting Started

To get started with the API, follow the steps below:

Choose one of the following options:

#### Option 1: Node.js and npm

- Node.js (version X.X.X)
- npm (version X.X.X)

#### Option 2: Docker

- Docker

### Installation

1. Clone the repository:

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:

Create a `.env` file in the project root and configure the following variables:
```bash
PORT=3001
JWT_SECRET=your-jwt-secret
```

The API server will start running at `http://localhost:3001`.

## API Routes

The following routes are available in the API:

- **POST /api/auth/login**: Authenticates the user and returns a JWT token.

- **GET /api/patients**: Retrieves a list of all patients.

- **GET /api/patients/:patientId**: Retrieves a specific patient by ID.

- **POST /api/patients/add**: Adds a new patient.

- **PUT /api/patients/:patientId**: Updates information for a specific patient.

- **DELETE /api/patients/:patientId**: Removes a specific patient.


## Start API Server

1. Without Docker
```bash
npm run dev
```

2. With Docker
```bash
npm run dev:docker:rebuild
npm run dev:docker
```

Postman Collections are added in root directory.

Manager Credentials for Login:
```json
{
    "email": "rafsan@gmail.com",
    "password": "Pa$$word!"
}
```