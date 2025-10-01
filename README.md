# Store Rating Application

A full-stack web application that allows users to submit ratings for stores registered on the platform. It features a robust role-based access control system with three distinct user roles: System Administrator, Normal User, and Store Owner.

---

## Key Features

👤 System Administrator
* Access to a dashboard displaying key platform statistics: total number of users, stores, and ratings.
* Can add new stores and users (including other admins).
* Can view and filter lists of all users and stores on the platform.
* Can view detailed information for any user or store.

🧑 Normal User
* Secure sign-up and login functionality.
* Ability to view a list of all registered stores.
* Can search for stores by Name and Address.
* Can submit and modify a rating (from 1 to 5) for any store.
* The store list displays the average rating alongside the user's own submitted rating.

🏪 Store Owner
* Secure login and password management.
* Access to a dedicated dashboard to track their store's performance.
* Can view the average rating of their specific store.
* Can see a list of all users who have submitted a rating for their store.

---

## Tech Stack

* **Frontend:** React.js
* **Backend:** NestJS 
* **Database:** PostgreSQL

---

## Form Validations

* **Name:** 20 to 60 characters.
* **Address:** Maximum of 400 characters.
* **Email:** Must follow standard email format rules.
* **Password:** 8-16 characters, requiring at least one uppercase letter, one lowercase letter, one number, and one special character.
