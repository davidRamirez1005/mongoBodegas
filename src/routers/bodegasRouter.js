// import {ObjectId} from 'mongodb'
import {Router} from 'express';
import dotenv from 'dotenv';
import {limitget} from '../helpers/configLimit.js'
import {con} from '../../db/atlas.js'
import { bodegas_ordenadas } from '../data/bodegaDataAccess.js';
import { middlewareBodegaVerify, appDTOData } from '../middleware/bodega.js';

dotenv.config();

const appBodega = Router();

/**
 * ! GET
 * ? listar todas las bodegas ordenadas
 * * http://127.0.0.3:5012/bodega/listar
 */
appBodega.get('/datos', limitget(),middlewareBodegaVerify, async(req, res) =>{
    if(!req.rateLimit) return;

    let db = await con();
    let coleccion = db.collection('bodegas');
    let result = await coleccion.aggregate(bodegas_ordenadas).toArray();
    res.send(result)
})
/**
* ! POST
* ? agregar una nueva bodega
* * http://127.0.0.3:5012/bodega/
*/
appBodega.post('/', limitget(), middlewareBodegaVerify, appDTOData, async(req, res) => {
    if(!req.rateLimit) return;

    let db = await con();
    let coleccion = db.collection('bodegas');
    try {
        let result = await coleccion.insertOne(req.body);
        console.log(result);
        res.status(201).send({status : 201, message : 'documento creado con exito'})
    } catch (error) {
        console.log(error.errInfo.details.schemaRulesNotSatisfied[0]);
        res.status(406).send('no se ha podido crear el documento')
    };
    
})


export default appBodega;