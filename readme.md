# 🍽️ Restaurant Reservation & Review Platform — Frontend

A modern **React.js frontend** for a Restaurant Reservation and Review Platform.
The application allows users to discover restaurants, check availability, make reservations, manage bookings, and share reviews and dining experiences.

## 🚀 Features

### 👤 User Authentication

* User registration and login
* JWT-based authentication using HTTP-only cookies
* User profile
* Logout functionality
* Role-based access for customers, restaurant owners, and administrators

### 🍴 Restaurant Management

* View available restaurants
* View restaurant details
* Search restaurants
* Filter restaurants by:

  * Cuisine
  * Price range
  * Location
* Display restaurant ratings and reviews

### 📅 Reservation Management

* Select reservation date
* Select time
* Select party size
* Check restaurant availability
* Create reservations
* View reservations
* Modify reservations
* Cancel reservations

### ⭐ Reviews & Ratings

* View customer reviews
* Add ratings and reviews
* Share dining experiences
* View average restaurant ratings

### 🎨 UI

* Responsive design
* Mobile-friendly interface
* Tailwind CSS styling
* Reusable React components
* Clean navigation and user-friendly layouts

## Demo Credentials

Use the following credentials to test the different user roles in the application.

| Role | Email | Password |
| :--- | :--- | :--- |
| User / Customer | durga@gmail.com | durga@123 |
| Admin | devi@gmail.com | devi@123 |
| Admin | admin@gmail.com | admin@123 |
| Restaurant Owner | sent@gmail.com | sent@123 |

> **Note:** These credentials are provided for demo/testing purposes only.

---

## Razorpay Test Payment

The application uses Razorpay Test Mode for payment testing.

### Test Card Details

| Network | Card Number | Card Type | Card Sub Type | CVV | Expiry Date |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Visa | 4100 2800 0000 1007 | Debit | Consumer | Any random CVV | Any future date |

> **Note:** Use Razorpay Test Mode when testing payments. No real payment is processed using the test credentials.

### Payment Testing Steps

1. Login using the demo **User / Customer** credentials.
2. Select a restaurant.
3. Select the reservation date, time, and party size.
4. Proceed to payment.
5. Use the Razorpay test card details above.
6. Complete the test payment.
7. After successful payment verification, the reservation will be created.
---

## 🛠️ Technologies Used

* **React.js**
* **JavaScript**
* **Vite**
* **Tailwind CSS**
* **Axios**
* **React Router DOM**
* **HTML5**
* **CSS3**

---


## 📁 Project Structure


