# Junior Phase Final Project

## Getting started

1. Fork and clone this repo
2. `npm install`
3. Read the rest of this `README.md` carefully - it contains the requirements for the project and the grading rubric that will be used to assess it
4. Check out the mock-view in the `wireframes` folder to get an idea of what the project _could_ look like
5. Start the build process and your application with: `npm run start-dev`. If you using Windows, you may need to execute `npm run start-server` and `npm run build-watch` separately (in their own terminal tabs).
6. If you navigate to the URL you should see some UI already :) [We already have some connection code to get you started]
7. Check out the starting seed file in `seed.js` - you can run it by executing `npm run seed`
8. Create `final-project` and `final-project-test` databases

## Details

### The Premise

You are the CTO of the Margaret Hamilton Interplanetary Academy of JavaScript. Create a RESTful web platform that allows you to manage your students and campuses. Before getting started, please carefully review the expectations as outlined below.

### The Tools

For this project, you must use Express to handle HTTP requests and Sequelize to interface with your database. Likewise, you must use React, Redux and React-Redux on the front-end. This means that all important state (i.e. students and campuses) must be managed by the Redux store (unimportant state, like form data, may be managed by stateful React components). Components that display student/campus data should therefore be connected to the Redux store. If you perform side-effects (like AJAX requests), you should encapsulate them in thunks.

### Allowed Resources

This is a solo project. Here are some resources that you are allowed and encouraged to use:

* Lecture Slides/Recordings
* Workshops
* Checkpoints
* Workshop Solution Code
* Any code they themselves have written at Fullstack
* Documentation
* Discussion forums (e.g. StackOverflow)

And here are some resources you are NOT allowed to use:

* Other students’ code
* Copy-pasting from discussion forums
* Soliciting help online (e.g. posting a bid to “do my homework”)

You are absolutely encouraged to ask for help from fellows and instructors. We're especially eager to explain concepts that are relevant to the project in case you need a refresher. However, unlike the workshops, we will not be debugging your code.

That being said, we do want to make sure you are not experiencing any systems issues that hinder your development. So if you are experiencing an error and are wondering "is this a problem with my node version?", that's something we want to help you resolve.

As always, if you are ever unsure, please feel free to ask!

### Requirements + Rubric

For the requirements and rubric, refer to the following two files:

* `REQUIREMENTS.md` - contains the functional requirements of the project
* `RUBRIC.md` - contains the grading rubric for additional factors, as well as the formula for calculating the total score

Make sure to read them carefully!

### Views and Functionality

Take a look in the wireframes folder as a reference for how your front-end _could_ look. Of course, you are encouraged to be creative and flex your own design muscles, but the wireframes should function as a good baseline/inspirational resource. Either way, the most important part of the project is that it works - **design/appearance is extra-credit**. If there ever appears to be a conflict between the wireframes and the rubric/requirements below, **go with the letter of the rubric/requirements.**

## Other Important Info

### How to test functionality without a frontend
- GET: use your browser
- POST / PUT / DELETE :
 - CLI (command line interface) with `curl`
   - e.g. `curl -H "Content-Type: application/json" -X POST -d '{"username":"kate","password":"1234"}' http://localhost:3000/api/login`
   - `-H`: headers. `-X`: verb. `-d`: data (must be of the type specified in headers). http://[address]:[port]/[route_path]
 - [Postman](https://www.getpostman.com/)
   ![](https://www.dropbox.com/s/4fk3b90cd0i1a5y/postman_post.png?raw=true)
- Databases: use Sequelize in your routes and see if you are receiving what you expect

### The Tests

Tier One has tests provided. These tests are meant to guide your development by directing your attention to the appropriate places. We strongly encourage you to start by getting these to pass. However, **your score does not depend on how many of these tests pass, only on the number of completed requirements (plus the rubric score).**

**You might implement features in the later tiers that cause those provided tests to fail.** In a real production environment, this would be an opportunity to refactor the tests to better match the needs of the project. But for the purposes of this project, you are not expected to do so.

The only tests that affect your score are the ones you are expected to write yourself. They look like this:

```javascript
xit('*** renders "No Campuses" if passed an empty array of campuses', () => {
  throw new Error('replace this error with your own test')
})
```

So, when you see a test with `***` at the beginning, you should delete the `throw new Error` portion and replace it with your own test. Do not change the test description.

### Video Walkthrough
Please submit a short, 5 minute screencast of a walk-through of the functionality for each user story in your app. E.g. for "As a user, I can create a campus", you can fill out the form for creating a campus and then see the new campus appear in the campuses list. *There is no need to show us the code you wrote.* We recommend using Quicktime to record the screencast (instructions on how to do that [here](https://support.apple.com/kb/PH5882?locale=en_US&viewlocale=en_US)).

Once you've recorded your screencast, please *upload it to YouTube as an unlisted video*. Email the instructors (priti.patel@fullstackacademy.com and collin.miller@fullstackacademy.com) with the title `Junior Phase Final Project: [Your Name]` and include your repo link and YouTube recording link. This will aid us in evaluating your submission.

Well before the deadline, we recommend practicing this by recording a very short screencast and uploading it as an unlisted video. If you encounter any technical issues, reach out to us so that we can help you resolve them.

## Evaluation

- Requirements score (70%)
- Rubric score (30%)
- Extra credit (10% max)
