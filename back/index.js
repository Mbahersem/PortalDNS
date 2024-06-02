const app = require('./app');
const commandRunner = require('./util/commandRunner');
const dotenv = require('dotenv');

dotenv.config({path: './.env'});

const port = process.env.PORT;

commandRunner(`sudo ../scripts/install_dns.sh`);

app.listen(port, () => {
    console.log(`Serveur sur le port ${port}`);
});

process.on('SIGINT', async() => {
    process.exit(0);
    commandRunner('sudo systemctl stop named');
})