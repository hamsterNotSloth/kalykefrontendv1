# Kalyke - Model Designs Hub

Welcome to Kalyke, your one-stop destination for exceptional modal designs crafted by designers, for designers. Our platform brings you the best deals on stunning models to enhance your projects and applications. Whether you're a web developer, UI/UX designer, or anyone looking to elevate their design game, Kalyke has you covered.

## Frontend dependencies
"@craco/craco": "^7.1.0",
    "@fortawesome/fontawesome-free": "^6.4.2",
    "@fortawesome/free-brands-svg-icons": "^6.4.2",
    "@fortawesome/free-regular-svg-icons": "^6.4.2",
    "@fortawesome/free-solid-svg-icons": "^6.4.2",
    "@fortawesome/react-fontawesome": "^0.2.0",
    "@react-oauth/google": "^0.11.1",
    "@reduxjs/toolkit": "^1.9.7",
    "@stripe/react-stripe-js": "^2.4.0",
    "@stripe/stripe-js": "^2.2.0",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.6.2",
    "dotenv": "^16.3.1",
    "firebase": "^10.4.0",
    "formik": "^2.4.5",
    "install": "^0.13.0",
    "isexe": "^3.1.1",
    "jszip": "^3.10.1",
    "npm": "^10.2.5",
    "path-browserify": "^1.0.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-multi-select-component": "^4.3.4",
    "react-quill": "^2.0.0",
    "react-redux": "^8.1.3",
    "react-router-dom": "^6.16.0",
    "react-scripts": "5.0.1",
    "react-slick": "^0.29.0",
    "react-spinners": "^0.13.8",
    "react-toastify": "^9.1.3",
    "slick-carousel": "^1.8.1",
    "web-vitals": "^2.1.4",
    "yup": "^1.3.2"

##How to start app in local and also how to build it in local,
For starting use npm start
For building use npm run dev

##How to update constants
![image](https://github.com/hamsterNotSloth/kalykefrontendv1/assets/113926529/c21756df-056e-421e-bd7a-806300674ac8)
You can update the constants as needed and than need to rebuild the app by using npm run build and than push the code to github. 
After the code is pushed to github than we need to restart the ec2 instance and reconnect it, after it is reconnected than we need to restart the server. 
###Commands for restarting the server
cd app
cd kalykebackendv1
pm2 start ./src/index.js --name kalyke
