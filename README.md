# Library Management System
###### Last Updated: 06 Feb, 2025

**Library Management System project** is a comprehensive solution to simplify the management of books, readers, genres, and the lending/return process for library administrators. In this article, we'll walk through the step-by-step process of creating a Library Management System using **Node.js** and **Express** for the backend, and **MongoDB** for the database

## Technologies Used
- [MongoDB]([technologies-used](https://www.mongodb.com/docs/)) and  [Mongoose](https://mongoosejs.com/) 
- [Express](https://expressjs.com/)
- [Node JS](https://www.geeksforgeeks.org/node-js-introduction/)

## Features
Book information management: Manage book details
- Reader management: Keep track of readers
- Comment management: Handle book comments
- Genre and author management: Organize books by genre and author
- Book reservation: Allow readers to reserve books
- Lending and returning books: Facilitate book lending and returning operations
- Borrowing history tracking: Monitor book borrowing history
- Admin authentication and authorization: Admin login and role-based access

## Installation:
   - Clone repository:
   ```bash
     git clone https://github.com/haidangsondev/Manager_book
   ```
   - Install necessary packages:
   ```bash
   npm install
   ```

## Setup for Backend
##### Step 1: Create the .env file and configure the environment variables.
- PORT = 7000
- NODE_ENV = development
- NODE_ENV = test
- URL_MONGODB_TEST = your_url_mongodb_test
- URL_MONGODB = your_url_mongodb
- URL_SERVER = http://localhost:7000
- APP_PASSWORD = your_app_password for email
- EMAIL_NAME = your_email
- JWT_SECRETKEY = your_jwt_secretkey
- CLOUDINARY_NAME = your_cloudinary_name
- CLOUDINARY_KEY = your_cloudinary_key
- CLOUDINARY_SECRET = your_cloudinary_secret
##### Step 2: Run the project.
- npm run dev
   ```bash
      "dev": "cross-env NODE_ENV=development nodemon index.js"
   ```
- npm test
  ```bash
    "test": "cross-env NODE_ENV=test jest --detectOpenHandles",
   ```
##### Step 3: Access the system via the following link:
   ```
   http://localhost:7000
   ```
##### Project Structure:
![](./server/src/img/image.png)</br>

## Conclusion
The Library Management System simplifies the management of books and readers, optimizing the lending/return process. In the future, the project can be expanded with features like reporting, statistics, and user interface integration.

