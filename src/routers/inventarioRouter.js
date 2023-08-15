// import {ObjectId} from 'mongodb'
import {Router} from 'express';
import dotenv from 'dotenv';
import {limitget} from '../helpers/configLimit.js'
import {con} from '../../db/atlas.js'
import { middlewareInventariosVerify, appDTOData } from '../middleware/inventario.js';

dotenv.config();

const appInventario = Router();


/**
* ! POST
* ? Inserta un registro en la tabla de inventarios, validando si la combinación de bodega y producto ya existe.
{
    "id": 42,
    "id_bodega": 9,
    "id_producto": 19,
    "cantidad": 231
}
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
    try {
        const db = await con();
        const coleccion = db.collection('inventarios');
        
        const result = await coleccion.insertOne(req.body);
        console.log(result);

        res.status(201).json({ status: 201, message: 'Documento creado con éxito.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
});


export default appInventario;