import {Router} from 'express';
import dotenv from 'dotenv';
import {con} from '../../db/atlas.js'
import { middlewareInventariosVerify, appDTOData } from '../middleware/inventario.js';
import siguienteId from '../helpers/siguienteId.js';

dotenv.config();

const appInventario = Router();


/**
* ! POST
* ? Inserta un registro en la tabla de inventarios, validando si la combinación de bodega y producto ya existe.
* * http://127.0.0.3:5012/inventario
*/
// Middleware de verificación de combinación de bodega y producto
async function verificar(req, res, next) {
    const db = await con();
    const coleccion = db.collection('inventarios');

    try {
        const combinacionExistente = await coleccion.findOne({
            id_bodega: req.body.id_bodega,
            id_producto: req.body.id_producto
        });

        if (combinacionExistente) {
            return res.status(400).json({ message: 'La combinación de bodega y producto ya existe.' });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
}
// Ruta para insertar un registro en la tabla de inventarios
appInventario.post('/',verificar, middlewareInventariosVerify, appDTOData, async (req, res) => {
    if (!req.rateLimit) return;

    try {
        const newId = await siguienteId( "inventarios");

        let db = await con();
        let coleccion = db.collection('inventarios');
        
        const newDocument = {
            _id: newId,
            ...req.body
        };
        let result = await coleccion.insertOne(newDocument);
        console.log(result);
        res.status(201).send({ status: 201, message: 'documento creado con exito' });
    } catch (error) {
        console.log(error);
        res.status(406).send('no se ha podido crear el documento');
    }
});


export default appInventario;