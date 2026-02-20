<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" />
</p>

<p align="center">
  <h1 align="center">🅿️ ParkEasy Client</h1>
  <p align="center">
    <strong>Smart Parking Management System – Frontend</strong>
    <br />
    A modern, responsive solution for effortless parking management.
  </p>
</p>

<p align="center">
  <a href="https://park-easy-client.onrender.com"><strong>Explore the Live Demo »</strong></a>
</p>

---

## 📋 Table of Contents
- [📌 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🛠 Tech Stack](#-tech-stack)
- [📸 Application Screenshots](#-application-screenshots)
- [⚙️ Setup Instructions](#-setup-instructions)
- [📂 Project Structure](#-project-structure)
- [👨‍💻 Author](#-author)
- [📜 License](#-license)

---

## 📌 Overview

**ParkEasy** is a comprehensive smart parking platform designed to bridge the gap between parking space owners and seekers. Built with the MERN stack, it offers a seamless experience for finding, booking, and managing parking slots in real-time.

---

## ✨ Key Features

### 🔍 For Parking Seekers
- **Smart Search**: Find parking slots by country, city, or specific address.
- **Real-time Availability**: View available spaces for specific dates and times.
- **Easy Booking**: Secure your spot with a simple booking process.
- **Booking History**: Keep track of all your past and upcoming reservations.
- **Reviews & Ratings**: Share your experience and browse others' feedback.

### 🏢 For Parking Owners
- **Property Management**: List your parking locations with ease.
- **Space Control**: Add, update, or remove specific parking slots/spaces.
- **Booking Approval**: Manage incoming booking requests (Approve/Reject).
- **Owner Dashboard**: Overlook all your listed properties and their performance.

---

## 🛠 Tech Stack

- **Frontend**: ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
- **State Management**: ![Redux](https://img.shields.io/badge/Redux-593D88?style=flat&logo=redux&logoColor=white)
- **Styling**: ![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=flat&logo=bootstrap&logoColor=white) + SCSS
- **Networking**: ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Render

---

## 📸 Application Screenshots

### 🏠 Home & About
<p align="center">
  <img src="assets/screenshots/Home.png" width="90%" alt="Home Page"/><br/><br/>
  <img src="assets/screenshots/First%20view.png" width="90%" alt="First View"/><br/><br/>
  <img src="assets/screenshots/Home%20scroll%20down.png" width="90%" alt="Home Page Continued"/><br/><br/>
  <img src="assets/screenshots/About.png" width="90%" alt="About Page"/><br/><br/>
  <img src="assets/screenshots/About%20scroll%20down.png" width="90%" alt="About Page Continued"/>
</p>

---

### 🔐 Authentication
<p align="center">
  <img src="assets/screenshots/Login.png" width="45%" alt="Login Page"/>
  <img src="assets/screenshots/Register.png" width="45%" alt="Registration Page"/>
</p>

---

### 🅿️ Parking Management (Owner)
<p align="center">
  <img src="assets/screenshots/Create%20Parking.png" width="45%" alt="Create Parking"/>
  <img src="assets/screenshots/Parking%20owner.png" width="45%" alt="Owner Parking List"/>
</p>

---

### 📍 Space Management (Owner)
<p align="center">
  <img src="assets/screenshots/Create%20Space.png" width="45%" alt="Create Space"/>
  <img src="assets/screenshots/Spaces%20Owner.png" width="45%" alt="Owner Space List"/>
</p>

---

### 🏙 City & Address Search
<p align="center">
  <img src="assets/screenshots/City%20Seeker.png" width="45%" alt="City Search (Seeker)"/>
  <img src="assets/screenshots/Address%20Seeker.png" width="45%" alt="Address Search (Seeker)"/><br/><br/>
  <img src="assets/screenshots/City%20Owner.png" width="45%" alt="City Management (Owner)"/>
  <img src="assets/screenshots/Address%20Owner.png" width="45%" alt="Address Management (Owner)"/>
</p>

---

### 🔎 Search & Booking (Seeker)
<p align="center">
  <img src="assets/screenshots/Parking%20seeker.png" width="90%" alt="Parking Search"/><br/><br/>
  <img src="assets/screenshots/Spaces%20seeker.png" width="90%" alt="Space Search"/><br/><br/>
  <img src="assets/screenshots/make%20booking.png" width="90%" alt="Make Booking"/>
</p>

---

### 📖 Booking Management
<p align="center">
  <img src="assets/screenshots/Booking%20seeker.png" width="45%" alt="My Bookings (Seeker)"/>
  <img src="assets/screenshots/Booking%20owner.png" width="45%" alt="Manage Bookings (Owner)"/>
</p>

---

### ⭐ Reviews
<p align="center">
  <img src="assets/screenshots/Reviews%20combined.png" width="45%" alt="Review Section"/>
  <img src="assets/screenshots/Own%20Review.png" width="45%" alt="Owner Profile Review"/>
</p>

---

### 👤 Manage Profile
<p align="center">
  <img src="assets/screenshots/Profile%20Seeker.png" width="45%" alt="Profile (Seeker)"/>
  <img src="assets/screenshots/Profile%20Owner.png" width="45%" alt="Profile (Owner)"/>
</p>

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Kaushik515/park-easy-client
   ```
2. Navigate to the project directory:
   ```bash
   cd park-easy-client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### 🔐 Environment Variables
Create a `.env` file in the root directory and add:
```env
REACT_APP_API_URL=your_backend_url
```

### Running Locally
```bash
npm start
```

---

## 📂 Project Structure

```text
src/
 ├── api/           # API interaction layer
 ├── components/    # Reusable UI components
 ├── css/           # SCSS and global styles
 ├── pages/         # Page-level components
 ├── store/         # Redux store and slices
 ├── App.js         # Main application entry
 └── index.js       # React root entry
```

---

## 👨‍💻 Author

**Kaushik Kotha**

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
