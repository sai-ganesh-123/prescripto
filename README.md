

# 🚀 Doctor Appointment Booking System



This project is a **full-stack Doctor Appointment Booking System** built using the **MERN Stack (MongoDB, Express, React, Node.js)**. It facilitates seamless appointment booking and management for patients, doctors, and administrators, incorporating an online payment gateway for appointment fees. The application provides a comprehensive solution for healthcare appointment management, offering distinct functionalities tailored to different user roles.

## ✨ Features

The application offers a robust set of features categorized by user type:

### 🏥 Patient Portal
*   **Account Management**: Patients can create new accounts and log in to the system.
*   **Doctor Search & Browsing**:
    *   View a **homepage** featuring a banner, images to choose doctors by speciality, and a list of **Top Doctors**.
    *   Access a comprehensive list of **all available doctors**.
    *   Filter doctors based on their **speciality** (e.g., Dermatologist).
*   **Appointment Booking**:
    *   View detailed doctor profiles including name, degree, years of experience, "About" text, and fee.
    *   Select **available booking slots** by choosing a date and time.
    *   **Book appointments** with selected doctors.
*   **Appointment Management**:
    *   View **"My Appointments"** list to see all booked appointments.
    *   **Cancel appointments**.
    *   **Pay appointment fees online** using integrated payment gateways (Stripe or Razorpay).
*   **Profile Management**: Update personal details, including profile images, name, and other information.
*   **Informational Pages**: Access "About" and "Contact" pages for general information and support.

### 🩺 Doctor Dashboard
*   **Login**: Secure login for doctors to manage their practice.
*   **Dashboard Overview**: View key metrics such as **earnings**, number of **appointments**, and **number of patients**.
*   **Appointment Management**:
    *   Access a **list of all appointments** booked with them.
    *   **Mark appointments as "Completed"** once the consultation is done.
    *   **Cancel appointments**.
*   **Profile Management**: Update their own profile details, including description, fees, and address.
*   **Online Payment Status**: View payment mode (Cash/Online) for appointments.

### 👤 Admin Panel
*   **Login**: Dedicated secure login for administrators.
*   **Dashboard Overview**: View new and current appointments.
*   **Doctor Management**:
    *   See a comprehensive **doctor's list**.
    *   **Add new doctors** to the system using a dedicated form.
    *   **Manage doctor profiles**, including creation.
    *   **Enable/Disable booking availability** for specific doctors.
*   **Appointment Management**: View and manage the **list of all appointments** across all doctors and patients.
*   **System Overview**: Access overall system data.

## 🛠️ Tech Stack

This project leverages the following technologies:

### Frontend
*   **React JS**: A JavaScript library for building user interfaces.
*   **Vite**: A fast build tool that provides a lightning-fast development experience.
*   **React Router DOM**: For declarative routing in React applications.
*   **Axios**: Promise-based HTTP client for making API requests.
*   **React Toastify**: For displaying beautiful and customisable toast notifications.
*   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.

### Backend
*   **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
*   **Express**: A fast, unopinionated, minimalist web framework for Node.js.
*   **MongoDB**: A NoSQL document database used for data storage.
*   **Mongoose**: An ODM (Object Data Modelling) library for MongoDB and Node.js.
*   **Multer**: A Node.js middleware for handling `multipart/form-data`, primarily used for uploading files.
*   **Bcrypt**: A library for hashing passwords.
*   **Cloudinary**: A cloud-based image and video management service for storing and serving media.
*   **CORS (Cross-Origin Resource Sharing)**: Node.js middleware to enable CORS.
*   **Dotenv (Env)**: For loading environment variables from a `.env` file.
*   **JSON Web Token (JWT)**: For secure authentication between parties.
*   **NodeMon**: A utility that monitors for any changes in your source and automatically restarts your server.
*   **Validator**: A library of string validators and sanitizers.
*   **Stripe**: A payment gateway for online transactions.

### Development Tools
*   **VS Code**: The primary code editor.
*   **Postman**: For testing APIs.

## 📦 Installation Guide

To set up the project locally, follow these steps:

### 1. Backend Setup

1.  **Navigate to the project root and create the `backend` folder**:
    ```bash
    mkdir backend
    cd backend
    ```
2.  **Initialise a new Node.js project**:
    ```bash
    npm init -y
    ```
3.  **Install backend dependencies**:
    ```bash
    npm install express mongoose multer bcrypt cloudinary cors dotenv jsonwebtoken nodemon validator razorpay
    ```
4.  **Create a `.env` file**: In the `backend` folder, create a file named `.env`.
5.  **Configure MongoDB Atlas**:
    *   Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
    *   Create a **free cluster** (M0 Free Tier).
    *   Set up a **database user** with a strong password (avoid `@` and special characters for simplicity if following tutorial verbatim for password).
    *   Configure **Network Access** to allow access from `0.0.0.0/0` (for development, restrict in production).
    *   Copy the **MongoDB connection URI** (from "Connect" -> "Drivers" option).
6.  **Configure Cloudinary**:
    *   Create an account on [Cloudinary](https://cloudinary.com/).
    *   Go to your dashboard to find your **Cloud Name**, **API Key**, and **API Secret**.
7.  **Add environment variables to `backend/.env`**:
    ```env
    MONGODB_URI="<YOUR_MONGODB_ATLAS_CONNECTION_STRING>/prescripto" # Replace <YOUR_MONGODB_ATLAS_CONNECTION_STRING> and password
    CLOUD_NAME="<YOUR_CLOUD_NAME>"
    CLOUD_API_KEY="<YOUR_CLOUD_API_KEY>"
    CLOUD_SECRET_KEY="<YOUR_CLOUD_SECRET_KEY>"
    ADMIN_EMAIL="admin@prescripto.com"
    ADMIN_PASSWORD="your_admin_password" # Use a strong password
    JWT_SECRET="greatstack" # Use a strong, unique secret key
    RAZOR_PAY_KEY_ID="<YOUR_RAZORPAY_KEY_ID>"
    RAZOR_PAY_KEY_SECRET="<YOUR_RAZORPAY_KEY_SECRET>"
    CURRENCY="INR" # Or your desired currency, e.g., USD
    ```
8.  **Update `package.json`**: Add `"type": "module"` to `package.json` for ES module support. Add a `server` script for `nodemon`:
    ```json
    {
      "name": "backend",
      "version": "1.0.0",
      "description": "",
      "main": "server.js",
      "type": "module", 
      "scripts": {
        "start": "node server.js",
        "server": "nodemon server.js" 
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "dependencies": {
        "bcrypt": "^5.0.1",
        "cloudinary": "^1.27.0",
        "cors": "^2.8.5",
        "dotenv": "^10.0.0",
        "express": "^4.17.1",
        "jsonwebtoken": "^8.5.1",
        "mongoose": "^6.0.12",
        "multer": "^1.4.3",
        "nodemon": "^2.0.15",
        "validator": "^13.7.0",
        "razorpay": "^2.8.0"
      }
    }
    ```

### 2. Frontend (Main App) Setup

1.  **Navigate back to the project root and create the `frontend` folder**:
    ```bash
    cd ..
    npm create vite@latest frontend -- --template react-ts # or react for javascript
    cd frontend
    ```
    *   Select `React` as the framework and `JavaScript` as the variant.
2.  **Install frontend dependencies**:
    ```bash
    npm install
    npm install axios react-router-dom react-toastify
    ```
3.  **Setup Tailwind CSS**:
    ```bash
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```
    *   Configure `tailwind.config.js` and add Tailwind directives to `src/index.css` as per Tailwind CSS documentation for Vite.
4.  **Create a `.env` file**: In the `frontend` folder, create a file named `.env`.
5.  **Add backend URL to `frontend/.env`**:
    ```env
    VITE_BACKEND_URL="http://localhost:4000"
    VITE_RAZOR_PAY_KEY_ID="<YOUR_RAZORPAY_KEY_ID>" # Public key ID from Razorpay dashboard
    ```
    *(Note: The `VITE_` prefix is required for environment variables in Vite projects).*

### 3. Frontend (Admin Panel) Setup

1.  **Navigate back to the project root and create the `admin` folder**:
    ```bash
    cd ..
    npm create vite@latest admin -- --template react-ts # or react for javascript
    cd admin
    ```
    *   Select `React` as the framework and `JavaScript` as the variant.
2.  **Install admin panel dependencies**:
    ```bash
    npm install
    npm install axios react-router-dom react-toastify
    ```
3.  **Setup Tailwind CSS**: Follow the same steps as for the main frontend application.
4.  **Create a `.env` file**: In the `admin` folder, create a file named `.env`.
5.  **Add backend URL to `admin/.env`**:
    ```env
    VITE_BACKEND_URL="http://localhost:4000"
    ```

## ▶️ Usage

To run the application locally:

### 1. Start the Backend Server

Open your terminal, navigate to the `backend` folder, and run:
```bash
npm run server
```
The backend server will start on **`http://localhost:4000`**.

### 2. Start the Frontend Application (Patient Portal)

Open a **new** terminal, navigate to the `frontend` folder, and run:
```bash
npm run dev
```
The patient portal will be accessible at **`http://localhost:5173`**.

### 3. Start the Admin Panel

Open another **new** terminal, navigate to the `admin` folder, and run:
```bash
npm run dev
```
The admin panel will be accessible at **`http://localhost:5174`**.

### Example Credentials

*   **Admin Login**: Use the `ADMIN_EMAIL` and `ADMIN_PASSWORD` defined in your `backend/.env` file.
*   **Doctor Login**: When adding a doctor via the admin panel, you will specify an email and password. Use these credentials to log in as a doctor.
*   **Patient Login**: Create a new account through the patient portal's "Create Account" option.

## 🔑 Environment Variables

Ensure the following `.env` files are configured in their respective directories:

### `backend/.env`
```env
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/prescripto"
CLOUD_NAME="your_cloudinary_cloud_name"
CLOUD_API_KEY="your_cloudinary_api_key"
CLOUD_SECRET_KEY="your_cloudinary_api_secret"
ADMIN_EMAIL="admin@prescripto.com"
ADMIN_PASSWORD="your_strong_admin_password"
JWT_SECRET="a_very_secret_jwt_key"
RAZOR_PAY_KEY_ID="rzp_test_<your_razorpay_key_id>"
RAZOR_PAY_KEY_SECRET="<your_razorpay_key_secret>"
CURRENCY="INR"
```

### `frontend/.env`
```env
VITE_BACKEND_URL="http://localhost:4000"
VITE_RAZOR_PAY_KEY_ID="rzp_test_<your_razorpay_key_id>"
```

### `admin/.env`
```env
VITE_BACKEND_URL="http://localhost:4000"
```

## 🔗 API Documentation (Sample Endpoints)

The backend exposes various API endpoints to handle different functionalities. Below are examples of key routes:

### Admin APIs (`/api/admin`)
*   **`POST /api/admin/login`**: Admin login.
*   **`POST /api/admin/adddoctor`**: Add a new doctor. Requires `AuthAdmin` middleware and `Multer` for image upload.
*   **`GET /api/admin/alldoctors`**: Retrieve all doctors for the admin panel. Requires `AuthAdmin` middleware.
*   **`POST /api/admin/changeavailability`**: Change a doctor's booking availability. Requires `AuthAdmin` middleware.
*   **`GET /api/admin/appointments`**: Get all appointments for the admin panel. Requires `AuthAdmin` middleware.
*   **`POST /api/admin/cancelappointment`**: Cancel an appointment from the admin panel. Requires `AuthAdmin` middleware.
*   **`GET /api/admin/dashboard`**: Get dashboard data (total doctors, appointments, patients, latest bookings). Requires `AuthAdmin` middleware.

### User (Patient) APIs (`/api/user`)
*   **`POST /api/user/register`**: Register a new user account.
*   **`POST /api/user/login`**: User login.
*   **`GET /api/user/getprofile`**: Retrieve user profile data. Requires `AuthUser` middleware.
*   **`POST /api/user/updateprofile`**: Update user profile data. Requires `AuthUser` middleware and `Multer` for image upload.
*   **`POST /api/user/bookappointment`**: Book an appointment with a doctor. Requires `AuthUser` middleware.
*   **`GET /api/user/appointments`**: Get all appointments booked by the logged-in user. Requires `AuthUser` middleware.
*   **`POST /api/user/cancelappointment`**: Cancel a user's booked appointment. Requires `AuthUser` middleware.
*   **`POST /api/user/paymentrazorpay`**: Initiate a Razorpay payment for an appointment. Requires `AuthUser` middleware.
*   **`POST /api/user/verifyrazorpay`**: Verify a Razorpay payment.

### Doctor APIs (`/api/doctor`)
*   **`GET /api/doctor/list`**: Get a list of all doctors for the public frontend.
*   **`POST /api/doctor/login`**: Doctor login.
*   **`GET /api/doctor/appointments`**: Get all appointments for the logged-in doctor. Requires `AuthDoctor` middleware.
*   **`POST /api/doctor/completeappointment`**: Mark an appointment as completed. Requires `AuthDoctor` middleware.
*   **`POST /api/doctor/cancelappointment`**: Cancel an appointment from the doctor panel. Requires `AuthDoctor` middleware.
*   **`GET /api/doctor/dashboard`**: Get dashboard data for the doctor panel (earnings, appointments, patients, latest bookings). Requires `AuthDoctor` middleware.
*   **`GET /api/doctor/profile`**: Get the logged-in doctor's profile data. Requires `AuthDoctor` middleware.
*   **`POST /api/doctor/updateprofile`**: Update the doctor's profile data (fee, address, availability). Requires `AuthDoctor` middleware.

## 📂 Folder Structure

The project repository follows a structured layout:

```
prescripto/
├── frontend/             # Main patient-facing React application
│   ├── src/
│   │   ├── assets/       # Images, icons, and static data (e.g., doctor data for initial display)
│   │   ├── components/   # Reusable React components (e.g., Navbar, Footer)
│   │   ├── context/      # React Context API for global state management (e.g., AppContext)
│   │   └── pages/        # Main application pages (e.g., Home, Doctors, Login, MyProfile)
│   └── .env              # Environment variables for the frontend
├── admin/                # Separate React application for the Admin Panel
│   ├── src/
│   │   ├── assets/       # Images, icons specific to admin panel
│   │   ├── components/   # Reusable React components for admin (e.g., Sidebar, Navbar)
│   │   ├── context/      # React Context API for admin specific state (e.g., AdminContext, DoctorContext)
│   │   └── pages/        # Admin panel pages (e.g., Dashboard, AddDoctor, AllAppointments)
│   └── .env              # Environment variables for the admin panel
└── backend/              # Node.js/Express server
    ├── config/           # Configuration files for MongoDB and Cloudinary
    ├── controllers/      # Functions containing the main API logic
    ├── middleware/       # Custom middleware for authentication (Admin, User, Doctor) and file uploads (Multer)
    ├── models/           # Mongoose schemas/models for database collections (e.g., DoctorModel, UserModel, AppointmentModel)
    ├── routes/           # API endpoint definitions for Admin, User, and Doctor
    ├── .env              # Environment variables for the backend
    └── server.js         # Main entry point for the Express server
```

