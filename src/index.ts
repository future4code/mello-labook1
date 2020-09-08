import Server from './server';
import dotenv from 'dotenv';

const localhostPort = '8535';

dotenv.config();

const port = process.env.PORT || localhostPort;

Server.app.listen(port, () => {
    console.log(`Executando em: ${port}`);
});


