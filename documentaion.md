# Readme
When running for the first time:

# Dev Thoughts

## 1. Setting up database tables first
- If I had more time, I would research something like Flyway for migrations and an easy way to create a seed file for test data. Whatever ends up working best for Sqlite.
- Starting off just dropping the database tables and recreating them with seeded test data every time the server starts. Might add an endpoint to seed the data on command later.

## 2. Add endpoint to get deals data by org
- Ideally, I would set up a Swagger doc to aid in testing and documenting the endpoints. I'm using Postman instead.
- Taking some time to set up validation for parameters would be nice as well.

## 3. Start creating UI
- Working with Material UI to use pre-built components
- Using hard coded test data first to build out the scaffolding of the UI

## 4. Connect UI to API
