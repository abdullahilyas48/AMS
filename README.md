# AMS - An Effecient Airport Management System


## Table of Contents
1. [Overview](#overview)
2. [Key Features](#key-features)
3. [Tech Stack](#tech-stack)
4. [Architecture](#architecture)
5. [Design](#design)
6. [Manual Setup](#manual-setup)
8. [Project Structure](#project-structure)  

---

## Overview
AMS (Airport Management System) is a comprehensive mobile-based platform designed to streamline airport operations and enhance passenger experience. The system provides end-to-end services including flight booking and rescheduling, cab and hotel reservations, smart parking, VIP lounge access, luggage tracking, and rewards management, along with a powerful admin dashboard for airport staff and operations control.

---

## Key Features
- User authentication (signup, login, forgot password, logout)
- Flight booking, rescheduling, and real-time flight status tracking
- Live international flight tracking via external APIs
- Cab booking from airport to destination
- Hotel booking services
- Smart airport parking management
- VIP lounge booking
- Luggage tracking system
- Currency converter for international travelers
- Rewards and loyalty management
- Hangar management with private aircraft parking
- Admin dashboard:
  - View total and active flights
  - Manage staff and assign duties
  - Monitor system activity and operations
 
---

## Tech Stack
- Frontend: React Native
- Mobile Framework: Expo Go
- Backend: MERN Stack
  - Node.js
  - Express.js
  - MongoDB
- APIs: External APIs for live flight tracking and status updates
- Authentication: JWT-based authentication
- Database: MongoDB
- Design & Prototyping: Figma

---

## Architecture
The system follows a client–server architecture:

**Mobile Application (React Native)**  
  - Handles user interaction, bookings, tracking, and account management  
  - Communicates with backend services via REST APIs  

**Backend (Node.js + Express)**  
  - Processes business logic for bookings, parking, rewards, and hangar management  
  - Manages user authentication and authorization  
  - Integrates third-party APIs for real-time flight tracking and international flight data  

**Database (MongoDB)**  
  - Stores user data, bookings, flight information, staff assignments, and rewards  


---
## Design

The AMS user interface and user experience were designed using Figma to ensure intuitive navigation, consistent layouts, and a smooth mobile-first experience.

📄 **View the Figma design (PDF):**
[AMS Figma Design.pdf](AMS%20Figma.pdf)

---
## Manual Setup

### Prerequisites
- MongoDB preinstalled.
- Node.js and npm  
- ExpoGo installed on Android or Apple device. 
- Git  

Clone the repository and proceed with the following steps:
### Backend Setup

1. Navigate to the backend directory
```bash
   cd AMS-Backend
```
2. Create database in pgAdmin
```bash
  psql -U postgres -c 'CREATE DATABASE "AMS";
```
2. Install dependencies  
```bash
   npm install
```
3. Run MongoDB server
```bash
brew services start mongodb-community \\using homebrew
```
4. Execute the file
```bash
   node index.js
```
---

### Frontend Setup

1. Navigate to the frontend directory
```bash 
   cd AMS-Frontend/AMS
```
2. Install frontend dependencies
```bash
   npm install
```
3. Run the development server
```bash
   npx expo start
```
---


## Project Structure
```bash
AMS/
├── AMS-Backend/             # Django backend
│   └── ...
├── AMS-Frontend/            # React frontend
│   └── ...
├── AMS Figma.pdf/                # ConvoHub Preview
├── README.md
```
