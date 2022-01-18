[<img src="https://img.shields.io/badge/build-passing-green.svg?logo=LOGO">](LINK)

# Inner Join.

_Inner join._ is a social network where users can register, make friends and chat with each other. I built the network in an intense three-week project while attenfing a full-time coding bootcamp with SPICED Academy, Berlin, from Sept 2021 to Dec 2021.

<p align="center">
<img src="/readme-material/registration.png" width="700" alt="Registration page">
</p>

## Features

The social network allows users to

-   register and log in,
-   create and alter a persoal profile,
-   view the profiles of other users,
-   befriend other users,
-   chat with user users,
-   find other users via a username search.

## Stack

[![React.js Badge](https://img.shields.io/badge/-React.js-61DAFB?style=for-the-badge&labelColor=302d2d&logo=react&logoColor=61DAFB)](#)
[![Redux.js Badge](https://img.shields.io/badge/-Redux.js-764ABC?style=for-the-badge&labelColor=black&logo=redux&logoColor=764ABC)](#)
[![Webpack Badge](https://img.shields.io/badge/-Webpack-8DD6F9?style=for-the-badge&labelColor=black&logo=webpack&logoColor=8DD6F9)](#)
[![Socket.io Badge](https://img.shields.io/badge/-Socket.io-010101?style=for-the-badge&labelColor=white&logo=socket.io&logoColor=010101)](#)
[![Express Badge](https://img.shields.io/badge/-Express-000000?style=for-the-badge&labelColor=f7efef&logo=express&logoColor=000000)](#)
[![Node.js Badge](https://img.shields.io/badge/-Node.js-3C873A?style=for-the-badge&labelColor=302d2d&logo=node.js&logoColor=3C873A)](#)
[![Amazon AWS Badge](https://img.shields.io/badge/-Amazon%20AWS-232F3E?style=for-the-badge&labelColor=white&logo=amazon%20aws&logoColor=232F3E)](#)
[![PostgreSQL Badge](https://img.shields.io/badge/-PostgreSQL-4169E1?style=for-the-badge&labelColor=f7efef&logo=postgreSQL&logoColor=4169E1)](#)
[![Cypress Badge](https://img.shields.io/badge/-cypress-17202C?style=for-the-badge&labelColor=f7efef&logo=cypress&logoColor=17202C)](#)
[![React Testing Library Badge](https://img.shields.io/badge/-React%20Testing%20Library-E33332?style=for-the-badge&labelColor=000000&logo=testing-library&logoColor=E33332)](#)
[![Jest Badge](https://img.shields.io/badge/-Jest-C21325?style=for-the-badge&labelColor=000000&logo=jest&logoColor=C21325)](#)

</br>

### Development

The **client-side** is built as a sigle-page application (SAP) with _React_. I use _Redux_ to manage the application's state information, as well as _Webpack_ and _Babel_ to bundle and compile the code. The _Socket.io_ library which enables real-time, two-way communication between clients and servers is the basis for a smooth and instantaneous chat experience.
</br></br>
The **server-side** is built with _Express_ which is hosted in a _Node.js_ runtime environment. I use _AWS S3_ as a reliable, centralised and permanent storage solution for users' profile pics. _Uid-safe_ allows me to generate unique names for uploading profile pics. Other user information is stored in a local database managed with _PostgreSQL_. This database is populated with 200+ fake users.

### Security

Key security measures are put in place. The _Bcrypt_ library allows for [salted password hashing](https://crackstation.net/hashing-security.htm#normalhashing) and validation of user input. I use _AWS SES_ to authenticate users in case they forgot their passwords. Users are send a random single-use verification code generated with _Crypto-Random-String_ via email that expires after 15 min. To prevent SQL-injection attacks I employ the _Node-Postgres-Module_ to escape user input. Denial-of-Service (DOS) attacks are averted by setting an upload-limit of 2MB for profile pics. I use the _X-Frame-Options_ HTTP response header to prevent attempts at clickjacking, while setting the same-site attribute to true inhibits _cross-site request forgeries_ (CSRF)

### Testing

The application provides end-to-end (E2E) and unit testing. I use _Cypress_ to build an E2E test mocking all aspects of a real user interaction with the application. To ensure that changes to the code don't break any of the existing functionality, I use the _husky_ library to implement git hooks, thus ensuring that the E2E test runs every time new code is pushed to GitHub. In addition I provide unit tests written with _React Testing Library_ and _Jest_ for key components of the application.

## How to use

To fork and work with this project:

1. Clone the repository: `git clone git@github.com:rubyrazor/inner-join.git`

2. Go inside the directory: `cd inner-join`

3. Install dependencies: `npm install`

4. Start development server: `npm run dev`
