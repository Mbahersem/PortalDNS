const sqlite3 = require('sqlite3').verbose();
const path = require('../data/index');

const db = new sqlite3.Database(path, (err) => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log('Connecté à la base de données.');
});

module.exports = db;