## Context

Your client has a database full of users and their photo albums. They're hiring you to build a website where they can search users and view the photos within the albums associated with users. 

This app needs to be able to fetch user data from their [API](https://jsonplaceholder.typicode.com/) and allow the client to view their users' photos.

## Product Requirements

As a user:

- [ ] I want to see a list of users, their company, and their company catchphrase.
- [ ] I want to search by the user's name.
- [ ] For each search I want to be able to:
  - [ ] search without worrying about case sensitivity
  - [ ] search with partial name matches e.g. searching "Anne" will return "Leanne" and "Anne"
- [ ] I want to see a "No Result" state when my search does not find any users.
- [ ] I want to view all the photo's of a user's album.
- [ ] I want to see the first 18 photos, with the ability to paginate (18 photos per page)
- [ ] I want to see the title of the photos and the album title the photo is associated with.

## Your Goal

Create a React application that satisfies all product requirements for your client above. Please list any assumptions you took while building your application. Feel free to add any nice-to-have requirements or styling. Feel free to list what you added!

To achieve this you will need to utilize the fake online REST API service https://jsonplaceholder.typicode.com/ to fetch the appropriate JSON content. Please use the /users, /albums, and /photos endpoints to build the requirements above. Take note of the available nested routes and relationships between these entities at the bottom of their [guide](https://jsonplaceholder.typicode.com/guide.html).  

For the layout of each page, please refer to the provided wireframes:

- [Homepage](./wireframes/homepage.png)
- [Empty state](./wireframes/no-result-state.png)
- [User's Photos Page](./wireframes/users-photos.png)

You are provided a boilerplate application built with create-react-app. We encourage you to use your favorite packages and tools to build a solid React application, but try to keep it as simple as possible!

You can assume that you do not have to support legacy browsers. Feel free to use modern features such as **fetch** or **flexbox**. 

## How to Run

Best developed with Node v12.13.0 and NPM v6.14.5.

Once you have Node and NPM installed on your machine run the following commands to get started

1. Fork and clone the GitHub repository onto your local environment

    ```
    git clone git@github.com:${YOUR_USER_NAME}/javascript-coding-challenge.git
    ```

2. Navigate to `javascript-coding-challenge` root folder in your terminal and install npm modules.

    ```
    npm install
    ```

3. Run local development environment in the root folder.

    ```
    npm start
    ```
   
4. Access the application on `http://localhost:3000`


## Instructions

- Fork this repository.
- Build a performant, clean and well-structured solution.
- Make the app public. No need to deploy the application. Simply running it locally will suffice.
- Remember to have fun with it and try to commit as early and as often as possible!
- When you're finished please download a ZIP of the project using the Github GUI and send us an email with the attachment to notify us.

We recommend taking no more than 3 to 4 hours to complete this exercise. Best of luck and happy coding!

## Assumptions
Please list any assumptions or extra requirements you added to the application while developing below.

- e.g. the JSONPlaceHolder Fake Online API service only allows me to query user's by user ID.
- Successful API calls to JSONPlaceholder will always yield data with the same structure
