# MERN Ecommerce

## Description

An ecommerce store built with MERN stack, and utilizes third party API's. This ecommerce store enable two main different flows or implementations:

1. Buyers browse the store categories, products and brands
2. Admins manage and control the entire store components 


* features:
  * Node provides the backend environment for this application
  * Express middleware is used to handle requests, routes
  * Mongoose schemas to model the application data
  * React for displaying UI components
  * Redux to manage application's state
  * cloudinary used for storing images in the cloud
  * firebase used for authentication
  * Stripe used as payment gitway
 
  




## Demo

This application is deployed on Heroku. Please check it out :smile: [here](https://mern-ecommerce-84.herokuapp.com/).


## Setup

```
 Create .env file in client that includes:

  * REACT_APP_REGISTRATION_REDIRECT_URL="http://localhost:3000/register/complete"
  * REACT_APP_RESET_PASSWORD_REDIRECT_URL="http://localhost:3000/login"
  * REACT_APP_STRIPE_SECRET
  * REACT_APP_API_URL=REACT_APP_API_URL="http://localhost:8000"

 Create .env file in server that includes:

  * DATABASE_URL
  * CLOUDINARY_CLOUD_NAME
  * CLOUDINARY_API_KEY
  * CLOUDINARY_API_SECRET
  * STRIPE_SECRET
 
 create a folder named config in server directory and add a file named fbServiceAccountKey.json inside it, copy your private_key from your firebase     account and paste it in fbServiceAccountKey.json and must have the following structure
  * "type":
  * "project_id":
  * "private_key_id":
  * "private_key":
  * "client_email":
  * "client_id":
  * "auth_uri":
  * "token_uri":
  * "auth_provide_x509_cert_url":
  * "client_x509J_cert_url":
  
```


## Start development in both server and client

```
$ npm run start
```

## Simple build for production in client

```
$ npm run build
```



## Languages & tools

- [Node](https://nodejs.org/en/)

- [Express](https://expressjs.com/)

- [Mongoose](https://mongoosejs.com/)

- [React](https://reactjs.org/)

- [Webpack](https://webpack.js.org/)



