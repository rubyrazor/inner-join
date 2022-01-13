[<img src="https://img.shields.io/badge/Cypress-passing-green.svg?logo=LOGO">](LINK)

# Inner Join.

This social network is a single page application.

I built the **client side** with React. I use Redux to manage global state and Webpack to compile the code. To view the application users have to register or log in.

![Image registration page](/images/registration.png)

Once logged in, users can update their profile, search for new friends and chat with each other. Users can also make and accept friend requests, as well as unfriend users.

I built the **server side** with Express which runs in a Node environment. I use Express-Router to better structure client request handling. The database is managed with PostgreSQL. I use Bcrypt on the server-side for [salted password hashing](https://crackstation.net/hashing-security.htm#normalhashing) and authentication of user input.
