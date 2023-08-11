import express from 'express';
import dotenv from 'dotenv';
import {servidor} from './config/connect.js';
import {limitget} from './helpers/configLimit.js'
import { appToken, appVerify } from "./jwt/configToken.js";



dotenv.config();
const appExpress = express();


appExpress.use(express.json());

appExpress.use('/token',limitget(),appToken)



appExpress.listen(servidor.port, () => {
    console.log(`Servidor escuchando en http://${servidor.addresses}:${servidor.port}`);
});

export default appExpress;