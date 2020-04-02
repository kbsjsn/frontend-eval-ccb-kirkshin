# Front-End Developer Test -- Kirk Shin

## Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm start

```

## App Design Pattern
- I approached building the app with Atomic Design (reusing components and building additional components with the existing ones). There are a lot of files given the current size of the app (and the tradeoff is that the performance slightly less optimized), but if it were to scale up, the existing structure should help in organizing and maintaining the codebase. 

## Testing
- I would test for the app's response to an API call. It should display that content is loading and if there is an error, it should respond gracefully.

- I'd also include assertion tests for functionality like sort and search and if the movie detail displays correctly.

## Managing State
- I used Redux to manage state with one reducer (although I could have split it up by functionality that fetches data and functionality that manages that data).

## Other considerations
- Keeping accessibility in mind, I tried to use semantic markup wherever possible. 

- I also tried to practice a naming convention (for file names, components, variables, CSS) that's easily understandable and one which doesn't require too many comments. 