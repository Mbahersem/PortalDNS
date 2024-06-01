const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({path: './.env'});

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Serveur sur le port ${port}`);
});

process.on('SIGINT', async() => {
    process.exit(0);
})