# Library Management System

A full-stack application for managing books and users in a library.

## Description

This project is a CRUD application that allows administrators and users to manage library books and borrowing/returning activities. Built with React, Node.js, Express, and MongoDB.

## Features

* User authentication (Admin and Normal Users).
* Add, update, delete, and list books.
* Borrow and return books.
* Dashboard for library statistics.
* Responsive UI.

## Technologies Used

* Frontend: React.js
* Backend: Node.js, Express
* Database: MongoDB
* Deployment: [Vercel](https://library-management-system-frontend-theta.vercel.app/) (Backend) and [Vercel](https://library-management-system-backend-mu.vercel.app/) (Frontend)

## Setup Instructions

### Prerequisites

* Node.js and npm installed
* MongoDB instance running (local or cloud-based, e.g., MongoDB Atlas)

### Installation

1. Clone the repository:

```bash
git clone [https://github.com/ThatsRajeev/library-management-system.git](https://github.com/thatsrajeev/library-management-system.git)
````

2.  Navigate to the project directory:

<!-- end list -->

```bash
cd library-management-system
```

3.  Setup the backend:

<!-- end list -->

```bash
cd backend
npm install
```

4.  Create a `.env` file with the following variables:

<!-- end list -->

```
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
```

5.  Start the backend server:

<!-- end list -->

```bash
npm start
```

6.  Setup the frontend:

<!-- end list -->

```bash
cd ../frontend
npm install
```

7.  Start the frontend:

<!-- end list -->

```bash
npm start
```

## Usage

Open the frontend in your browser at http://localhost:3000.
Use the backend API at http://localhost:5000/api.

## Deployment

  * Frontend: Deployed on Vercel.
  * Backend: Deployed on Vercel.

## Screenshots

**Home Page**

![Home Page](https://github.com/user-attachments/assets/a2adf1bf-5c3e-4c42-8406-da2e32b05252)
)  

**Add User Page**

![Add User Page](https://github.com/user-attachments/assets/6168054a-8377-47a5-863a-3e47e140a328)
 


**Add Book Page**

![Add Book Page](https://github.com/user-attachments/assets/04c2c56d-2861-425b-be63-59ef4a27e703)


**Transactions Page**

![Transactions](https://github.com/user-attachments/assets/85cbfd4f-8520-4f14-9b9f-d5f36f3fdf32)


## Contributing

Feel free to fork this repository and submit pull requests.

## License

This project is licensed under the MIT License.
