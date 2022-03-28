## Setup Instructions

For running MongoDB, you'll need to create a `MONGO_URL` environment variable,
something like:

```sh
# in ~/.zshrc, for example
export MONGO_URL="mongodb://127.0.0.1:27017" 
```
Be sure to setup and seed a copy of the database by running
`npm run sql:setup`.
