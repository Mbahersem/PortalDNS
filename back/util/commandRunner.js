/*
Script pour exécuter les commandes shell à partir de NodeJS
*/

const { exec } = require('child_process');
const { stderr } = require('process');

const commandRunner = (cmd) => {
    exec(cmd, (err, stdout, stderr) => {
        if(err) {
            console.error(`Erreur lors de l'exécution de la commande : ${err.message}`);
            return;
        }
        if (stderr) {
            console.error(`Erreur de sortie de la commande : ${stderr}`);
            return;
        }
        console.log(`Résultat de la commande : ${stdout}`);
    });
}

module.exports = commandRunner;