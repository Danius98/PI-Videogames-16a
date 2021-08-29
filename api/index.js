const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { DataBase } = require('./src/DB/DB')
const PORT = 3003

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    DataBase();
    console.log('%s listening at 3003'); // eslint-disable-line no-console
  });
});
