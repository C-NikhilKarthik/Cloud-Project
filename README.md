# Cloud-Based Course Management System

## Overview

This project is a **Cloud-Based Course Management System** designed for managing courses and registrations. It uses **OAuth-based authentication** to differentiate between **Teachers** and **Students** based on email domains.

---

## Deployment

### Frontend

The frontend is deployed on **Vercel**:  
[https://cloud-project24.vercel.app/](https://cloud-project24.vercel.app/)

### Backend

The backend is deployed on **Render**:  
[https://cloud-project-6vgv.onrender.com/](https://cloud-project-6vgv.onrender.com/)

**Note**: Since the backend is deployed on Render, it requires a **cold start** if not accessed for a while. This means the first request might take longer to process as the server spins up. Subsequent requests will be faster.

---

## Key Features

### Authentication

- **OAuth Integration** for secure login.
- Accounts with the domain `iiitdwd.ac.in` are categorized as **Teachers**.
- Other domains are categorized as **Students**.

### Functionality

#### For Students

- View available courses.
- Register for open courses.

#### For Teachers

- Perform **CRUD operations** (Create, Read, Update, Delete) on courses.
- View all registered courses and enrolled students.

---

## Installation and Setup

### 1. Environment Variables

Create an `.env` file in both the `client` and `server` directories with the following variables:

#### Backend `.env`

```env
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
JWT_SECRET="your-jwt-secret"
SESSION_SECRET="your-session-secret"
MONGODB_URL="your-mongodb-connection-string"
CLIENT_URL="http://localhost:3000"
ALLOWED_ORIGINS="http://localhost:3000,https://your-production-url"
GOOGLE_CALLBACK_URL="http://127.0.0.1:8080/auth/google/callback"
```

#### Frontend `.env`

```env
NEXT_PUBLIC_APP_URL="http://127.0.0.1:8080"
NEXT_PUBLIC_JWT_SECRET="your-jwt-secret"
```

---

### 2. Client Setup

1. Navigate to the `client` folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### 3. Server Setup

1. Navigate to the `server` folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node app.js
   ```

---

## Usage

### Logging In

1. Open the client application in your browser (`http://localhost:3000` by default).
2. Log in using OAuth.
   - **Teacher Access**: Emails under `iiitdwd.ac.in`.
   - **Student Access**: All other email domains.

### Features

#### For Students

- **Browse Courses**: View all available courses.
- **Register**: Enroll in courses with open registration.

#### For Teachers

- **Manage Courses**: Add, edit, or delete courses.
- **Track Enrollments**: View students registered for each course.

---

### Client

- **Next.js**
- **Tailwind CSS**

### Server

- **Node.js**
- **Express.js**
- **MongoDB**

---
