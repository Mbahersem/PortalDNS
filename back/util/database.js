const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../dns.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connecté à la base de données.');
});

module.exports = db;