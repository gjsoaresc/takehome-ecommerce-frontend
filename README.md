# Takehome React

This is a **Vite + React 19** application for a **shoe e-commerce** platform.  
It includes authentication, product filtering, sorting, and a database seeding function.

---

## Installation & Setup

### 1. Install Dependencies
```sh
npm install
```

### 2. Start the Development Server

You have two options to run the application:

#### Option A: With Mock Server (Standalone)
If you don't have the backend server running, use this option:
```sh
npm run dev:mock
```
This will start both the **Vite development server** at `http://localhost:5173/` and a **mock server** that simulates the backend API.

#### Option B: With Real Backend
If you have the [backend server](https://github.com/gjsoaresc/takehome-ecommerce-backend) running:
```sh
npm run dev
```
This will run the **Vite development server** at `http://localhost:5173/` and connect to the backend at `http://localhost:8080/api`.

---

## Building for Production
To generate a production build, run:
```sh
npm run build
```

To preview the built app:
```sh
npm run preview
```

---

## Seeding the Database

If logged in as an **ADMIN**, you can seed the database.

### **Admin Credentials**
```
Email: admin@example.com
Password: admin123
```

### **Steps to Seed**
1. **Log in as an admin.**
2. Navigate to the **home page**.
3. Click the **"Seed Database"** button.
4. The database will be populated with sample data.

**Note:** The seed button will **only appear once** and will not be shown again after seeding.

---

## Tech Stack
- **Vite + React 19**
- **Material UI**
- **React Query**
- **React Hook Form**
- **Zod Validation**
- **Axios for API requests**
- **React Router for navigation**
- **MSW (Mock Service Worker)** for API mocking

## API Configuration
This app can either use a mock server or connect to a real backend API at:
```
http://localhost:8080/api
```
All requests include **Bearer Token Authentication** if the user is logged in.

---

## Running Linting & Formatting
```sh
npm run lint
```
