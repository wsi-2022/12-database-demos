const sqlite = require('sqlite3').verbose();

function connect(database = 'development.sqlite3') {
  return new sqlite.Database(database, function(err) {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Connected to database', database);
    }
  });
}

module.exports = {
  connect
}
