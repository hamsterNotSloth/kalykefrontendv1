# Kalyke - Model Designs Hub

Welcome to Kalyke, your ultimate destination for exceptional model designs crafted by designers, for designers. Our platform offers unbeatable deals on stunning models, empowering web developers, UI/UX designers, and anyone seeking to elevate their design projects.

## Frontend Dependencies
- **@craco/craco:** ^7.1.0
- **@fortawesome/fontawesome-free:** ^6.4.2
  - **@fortawesome/free-brands-svg-icons:** ^6.4.2
  - **@fortawesome/free-regular-svg-icons:** ^6.4.2
  - **@fortawesome/free-solid-svg-icons:** ^6.4.2
  - **@fortawesome/react-fontawesome:** ^0.2.0
- **@react-oauth/google:** ^0.11.1
- **@reduxjs/toolkit:** ^1.9.7
- **@stripe/react-stripe-js:** ^2.4.0
- **@stripe/stripe-js:** ^2.2.0
- **@testing-library/jest-dom:** ^5.17.0
- **@testing-library/react:** ^13.4.0
- **@testing-library/user-event:** ^13.5.0
- **axios:** ^1.6.2
- **dotenv:** ^16.3.1
- **firebase:** ^10.4.0
- **formik:** ^2.4.5
- **install:** ^0.13.0
- **isexe:** ^3.1.1
- **jszip:** ^3.10.1
- **npm:** ^10.2.5
- **path-browserify:** ^1.0.1
- **react:** ^18.2.0
- **react-dom:** ^18.2.0
- **react-multi-select-component:** ^4.3.4
- **react-quill:** ^2.0.0
- **react-redux:** ^8.1.3
- **react-router-dom:** ^6.16.0
- **react-scripts:** 5.0.1
- **react-slick:** ^0.29.0
- **react-spinners:** ^0.13.8
- **react-toastify:** ^9.1.3
- **slick-carousel:** ^1.8.1
- **web-vitals:** ^2.1.4
- **yup:** ^1.3.2

## How to Start and Build the App Locally
- For starting, use `npm start`.
- For building, use `npm run dev`.

## How to Update Constants
![image](https://github.com/hamsterNotSloth/kalykefrontendv1/assets/113926529/c21756df-056e-421e-bd7a-806300674ac8)

You can update the constants as needed and then rebuild the app using `npm run build`. After pushing the code to GitHub, restart the EC2 instance, reconnect it, and restart the server.

### Commands for Restarting the Server(windows)
```bash
Open window power shell,
connect ec2
cd app
cd kalykefrontendv1
git pull
cd ../
cd kalykebackendv1
pm2 start ./src/index.js --name kalyke
