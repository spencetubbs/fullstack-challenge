# Readme
- The database will automatically be seeded when starting the server. So nothing extra needs to be done other than the standard `npm run start`

# Dev Thoughts

## 1. Setting up database tables
- If I had more time, I would research something like Flyway for migrations and an easy way to create a seed file for test data. Whatever ends up working best for Sqlite.
- Starting off just dropping the database tables and recreating them with seeded test data every time the server starts. Might add an endpoint to seed the data on command later.

## 2. Add endpoint to get deals data by org
- Ideally, I would set up a Swagger doc to aid in testing and documenting the endpoints. I'm using Postman instead.
- Taking some time to set up validation for parameters would be nice as well.

## 3. Start creating UI
- Working with Material UI to use pre-built components
- Using hard coded test data first to build out the scaffolding of the UI

## 4. Connect UI to API
- I went back and changed the format of the data returned by the deals endpoint so they are grouped by status.
- Then I hooked up a simple axios request and TanStack query for state management in the UI.

## 5. Make it pretty (but not that pretty)
- Created function to convert values to currency based format.
- Added the Net Value of all deals at the top of the page.
- Added a little css for spacing and formatting.

## 6. Final Thoughts
- I didn't quite leave myself time to add the filter, but it shouldn't be too much more work.
- I definitely would have liked to put more thought into the infrastructure on the api and UI before building much out.
  - Specifically for Typescript, I like using NestJS when setting up an API.
