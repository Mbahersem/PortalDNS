const db = require('../util/database');
const commandRunner = require('../util/commandRunner');

exports.getDNS = (req, res) => {
    db.all('SELECT * FROM dns', (err, rows) => {
        if(err) {
            console.error(err.message);
            res.status(500).send('Erreur interne');
        } else {
            res.send(rows);
        }
    })
}

exports.addDNS = (req, res) => {
    const { ip, domain, description } = req.body;
    if(!ip || !domain) {
        res.status(400).send('IP et nom de domaine obligatoires');
    } else {
        const sql = 'INSERT INTO dns (ip, domain, description, actif) VALUES (?, ?, ?, ?)';
        db.run(sql, [ip, domain, description, 1], function(err) {
            if(err) {
                console.error(err.message);
                res.status(500).send('Erreur interne');
            } else {
                res.status(201).send({ ip, domain, description });
            }
        });
    }
    commandRunner(`sudo ../scripts/add_dns.sh ${domain} ${ip}`);
}

exports.stopDNS = (req, res) => {
    process.exit(0);
}