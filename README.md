# Clinic Appointment System

## Overview
The Clinic Appointment System is a role-based application built with React TypeScript, designed to streamline patient appointment bookings and doctor management. Patients can schedule and view their own appointments, while doctors have access to a dashboard with appointment management tools and statistics.

## Features
### 1. Login System (Role-Based)

#### Patients:
- Book and view their own appointments.

#### Doctors:
- Access a dashboard with appointment management capabilities.
- Basic form validation to ensure correct input.

---

### 2. Appointment Booking (Patient)
A secure booking form with the following fields:
- **Patient Name**, **Contact**, **Age**, **Gender**.
- **Date/Time Picker** (Limited to clinic hours: **9 AM – 5 PM**).
- **Symptoms description** (Text area).
- **Confirmation message** displayed upon successful booking.

---

### 3. Manage Appointments (Doctor)
Doctors can:
- View all patient appointments, sorted by date.
- Filter by **status** (_Pending / Confirmed / Completed_).
- Search for appointments by **patient name**.

#### Actions:
- Change **appointment status**.
- Add **notes** for patients (e.g., _"Bring lab reports"_).

---

### 4. Doctor Dashboard
Provides an **overview** of clinic activities with:
- **Summary statistics**:
  - Total appointments today.
  - Pending vs. confirmed appointments.
- **Visual Charts** (Bar/Pie) displaying daily appointment trends.

---

## Technologies Used

The **Clinic Appointment System** is built using the following technologies:

- **React TypeScript** – For frontend development.  
- **React Router** – For navigation between pages.  
- **State Management** – Using `useState` and `useContext` for managing application state.  
- **Ant Design** – For styling and UI components.  
- **Chart.js** – For data visualization and displaying appointment trends.  
### Teammeates:
[Moamen Al Yazouri (me)]: (https://github.com/Moamen-Yazouri).
[Mohammed Al Khoudary]:(https://github.com/Mohammad200326).
[Qousay Abu Al Rob]: (https://github.com/Qosay-Abu-Alrob).

