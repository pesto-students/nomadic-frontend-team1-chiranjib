<!-- PROJECT LOGO -->
<p align="center">
    <img src="./public/images/nomadic-logo.png" alt="Logo"  >
</p>
Nomadic is rental booking service, especially made for all remote working professional who want to have extended stay in all famous worcation places along with thier family and friends.
<br />
<br />
This repo contains front-end source code.<br/>
For back-end repository <a href="https://github.com/nomadic-pesto/Nomadic-Backend">click here</a>.

<!-- TABLE OF CONTENTS -->
<br/>

Table of Contents

1. [Demo](#demo)
2. [Installation](#installation)
3. [Technology Stack](#technology-stack)
4. [Authors](#authors)
5. [License](#license)

<br/>

# Demo

[Live Demo](https://nomadic-life.netlify.app/)

<br/>

Please Note:

-  We recommend using this app in latest browser with javascript support.
-  Try demo credentials if you not comfortable with Google SignIn OAuth.
-  Payment Gateway is in test mode, so use <code>4111 1111 1111</code> as card no to continue.

<br/>
Test Credentials:

-  For User and Admin

Currently A normal user can also be admin by just onboarding thier own rentals to platform from my rental page, demo account is both normal user who can rent also an admin by renting his own rentals

Demo login credential are auto populated in the login page, click login to do one-click login
   -  [User/Admin Login Page Link](https://nomadic-life.netlify.app/login)
   -  Username: nomadic.pesto+1@gmail.com
   -  Password: nomadicpestodemo

      <br/>

# Installation

1. Clone the repo
   ```sh
   git clone https://github.com/nomadic-pesto/Nomadic-Frontend
   ```
2. Set environment variables

        REACT_APP_API_BASE_URL=https://nomadic.onrender.com<br />


3. Install NPM packages
   ```sh
   cd Nomadic-Frontend && npm install
   ```
4. Run
   ```sh
   npm start
   ```
5. Open http://localhost:3000 to view it in the browser

6. Run Test cases
   ```sh
   npm test
   ```
   <br/>

# Technology Stack

We tried to use a completely modern tech stack while testing out some new technologies that we had never used before. This resulted in a fast, performant, and easily-extensible web app that should be fairly future-proof for the coming next several years. We used:

-  [React JS](https://reactjs.org/)
-  [Material UI](https://mui.com/)
-  [Axios](https://axios-http.com/docs/intro)
-  [React redux](https://redux.js.org/) 
-  [Razarpay](https://razorpay.com/)
-  [Enzyme](https://enzymejs.github.io/enzyme/)
-  [Sentry](https://sentry.io/)


<br/>

# Mobile Responsive
 - Fits to Mobile Screen
 - Fits to Tab Screen - Ipad
 - Fits to various Desktop screen resolution
# Authors

-  [Jatin Gupta](https://github.com/Jatingupta-2)
-  [Daniel Raj](https://github.com/raj-daniel)
-  [Shubham Mourya](https://github.com/kawnkush)

<br/>


# License

[MIT](https://opensource.org/licenses/MIT)
