# Twitter Clone - A Full-Stack Social Media Experience 🌐🐦

[![Latest Release](https://img.shields.io/github/v/release/Joelgit5/Twitter-clone)](https://github.com/Joelgit5/Twitter-clone/releases)  
[![GitHub Stars](https://img.shields.io/github/stars/Joelgit5/Twitter-clone)](https://github.com/Joelgit5/Twitter-clone/stargazers)  
[![Forks](https://img.shields.io/github/forks/Joelgit5/Twitter-clone)](https://github.com/Joelgit5/Twitter-clone/network/members)  

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

This repository contains a full-stack Twitter clone built using the MERN stack, which includes MongoDB, Express.js, React.js, and Node.js. The application allows users to create posts, like them, comment, and manage user profiles. It utilizes React Query for data fetching and Tailwind CSS for responsive design.

You can find the latest releases of the project [here](https://github.com/Joelgit5/Twitter-clone/releases). 

## Features

- **User Authentication**: Users can sign up and log in securely.
- **Post Creation**: Users can create new posts and share their thoughts.
- **Likes and Comments**: Users can like posts and leave comments to engage with others.
- **User Profiles**: Each user has a profile page displaying their posts and activity.
- **Responsive Design**: The application is fully responsive, ensuring a good experience on all devices.

## Technologies Used

- **MongoDB**: A NoSQL database for storing user data and posts.
- **Express.js**: A web application framework for Node.js.
- **React.js**: A JavaScript library for building user interfaces.
- **Node.js**: A JavaScript runtime for building server-side applications.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **React Query**: A data-fetching library for React.
- **Cloudinary**: For managing media assets.
- **DaisyUI**: A component library that works with Tailwind CSS.

## Installation

To set up the project locally, follow these steps:

1. **Clone the Repository**  
   Open your terminal and run:
   ```bash
   git clone https://github.com/Joelgit5/Twitter-clone.git
   cd Twitter-clone
   ```

2. **Install Dependencies**  
   Navigate to both the server and client directories to install the necessary packages.
   ```bash
   # For the server
   cd server
   npm install

   # For the client
   cd ../client
   npm install
   ```

3. **Environment Variables**  
   Create a `.env` file in the server directory and add the necessary environment variables. Here’s an example:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_URL=your_cloudinary_url
   ```

4. **Run the Application**  
   Start the server and client:
   ```bash
   # In the server directory
   npm start

   # In the client directory
   npm start
   ```

## Usage

Once the application is running, you can access it through your web browser at `http://localhost:3000`. 

### User Authentication

- **Sign Up**: New users can create an account by providing their email and password.
- **Log In**: Existing users can log in to access their profiles and features.

### Creating Posts

- Navigate to the post creation section.
- Enter your message and submit it to share with others.

### Engaging with Posts

- Users can like posts to show appreciation.
- Comments can be added to foster discussions.

### Managing Profiles

- Users can view their profile to see their posts and interactions.

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, feel free to reach out:

- **GitHub**: [Joelgit5](https://github.com/Joelgit5)
- **Email**: your_email@example.com

For the latest releases, check [here](https://github.com/Joelgit5/Twitter-clone/releases).