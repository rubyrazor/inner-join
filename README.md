[<img src="https://img.shields.io/badge/Cypress-passing-green.svg?logo=LOGO">](LINK)

# Inner Join.

This social network is the result of an intense three-week project of the SPICED academy bootcamp I took part in from Sept 2021 to Dec 2021.

I built the **client-side** with _React_ as a sigle page application. I use the _Redux_ library to manage the application's state information and _Webpack_ to compile the code. To view the application users have to register or log in.

![Image registration page](/images/registration.png)

Once logged in, users can update their profile, search for new friends and chat with each other. I use _socket.io_ to facilitate a smooth chat experience. This small JavaScript library enables real-time, two-way communication between clients and servers. Users can  make and accept friend requests, as well as unfriend users. 

I built the **server-side** with _Express_ which runs in a _Node_ environment. I use _Express-Router_ to structure the code that handles the client requests. I use _AWS S3_ as a reliable, centralised and permanent storage solution for users' profile pics. _Uid-safe_ allows me to generate unique pic names before uploading. Other user information is stored in a local database managed with _PostgreSQL_. This database is populated with 200+ fake users.

I put key **security** measures in place. For password security I use _bcrypt_. It allows for [salted password hashing](https://crackstation.net/hashing-security.htm#normalhashing) and validation of user input on the server-side. I use _AWS SES_ to automate an email loop that allows users to authenticate in case they forget their passwords. Users are send a random single-use verification code that expires after 15 min generated with _crypto-random-string_. To prevent SQL-injection attacks I employ the _node-postgres-module_. This module escapes any user input and thus renders it harmless. Denial-of-Service (DOS) attacks are inhibited by setting an upload limit of 2MB for profile pics.

I provide end-to-end (E2E) and unit **tests**. I use _Cypress_ to build an E2E test mocking all aspects of a real user interaction with the application. To ensure that changes to the code do not break any existing functionality of the application, I use the _husky_ library to implement git hooks, ensuring that the E2E test runs every time new code is pushed to GitHub. In addition I provide unit tests written with _Jest_ for critical parts of the application.
