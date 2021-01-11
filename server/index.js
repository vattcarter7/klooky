const app = require('./src/app.js');
const pool = require('./src/pool');

require('dotenv').config();

pool
  .connect({
    host: 'localhost',
    port: 5432,
    database: 'klooky',
    user: 'vattsopheak',
    password: ''
  })
  .then(() => {
    const PORT = process.env.PORT || 4000;
    app().listen(PORT, () => {
      console.log(`Listening on port ${PORT} `);
    });
  })
  .catch((err) => console.error(err));
