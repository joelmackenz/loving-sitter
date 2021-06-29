# Loving Sitter

Loving Sitter is a web app made to connect animal owners with animal caretakers. If someone is hoping to have their dog walked while they're at work, or to have their hamster fed while they're on vacation, they can use Loving Sitter to find available sitters in their area who are willing to do the work. A user can sign up as a sitter or sittee, make a profile and see others' rate, location, and available times, chat with them, and schedule sitting services, all through the app.

## Table of Contents

-   [General Info](#general-info)
-   [Contributors](#contributors)
-   [Technologies](#technologies)
-   [Features](#features)
-   [Usage](#usage)
-   [Acknowledgements](#acknowledgements)
-   [Screenshoots](#screenshoots)

---

## General Information

This application was made as part of the co-hort program with Hatchways.

## Contributors

-   [Gurkiran Singh](https://github.com/g4rry420)
-   [Joel MacKenzie](https://github.com/joelmackenz)
-   [Khalil Yibin Liu](https://github.com/yliu298)

## Technologies

-   TypeScript
-   React.js
-   Mongodb
-   Node.js / Express.js
-   Socket.io
-   Material-UI

## Features

-   User login/sign up secure authentication using JWT.
-   Create and save a profile, with photos
-   View other users' profiles, availability days, rates for dog sitting services, etc.
-   Chat using a real-time messenger component
-   Send / receive requests for animal-sitting services to other users

## Usage

-   For basic sign-in access, the project requires a .env file in the server folder, containing at least this:
    JWT_SECRET=<any string>
    Ideally, the project is also connected to MongoDB and Amazon S3.
    For MongoDB access, include a string labelled as such:
    MONGO_URI=""
    For Amazon S3, include the following:
    BUCKET_NAME, ACCESS_KEY, SECRET_ACCESS_KEY, REGION
-   With the .env file in place, run npm start on the client folder, and npm run dev in the server
-   When the project opens in the browser, sign up on the front page, or use the demo account by pressing the "demo" button
-   Search for users' profiles by availability or location
-   Send a booking request on a user's profile page to request their pet sitting services
-   Sign up as another user in a separate window and open a chat to use real-time chatting

## Acknowledgements

Thank you to Hatchway's team for their support in making this project.
