# instaclone-be

- ### Please add environment in file `.env` format like:

  ```
  DEV_DATABASE_URL={url database postgre}
  PORT={number of port}
  JWT_SECRET={any string}
  JWT_EXPIRATION_MINUTES={jwt expiration minutes}
  ```

- ### How to run
  - #### `npm install`: install package
  - #### `sequelize db:migrate`: mirgrate database
  - #### `sequelize db:seed:all`: fake database
  - #### And `npm start` to run
