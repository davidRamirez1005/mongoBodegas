import {Router} from 'express';
import dotenv from 'dotenv';
import {con} from '../../db/atlas.js'
import { middlewareProductoVerify, appDTOData } from '../middleware/productos.js';
import { campo_total } from '../data/productosDataAccess.js'
import siguienteId from '../helpers/siguienteId.js';

dotenv.config();

const appProducto = Router();

/**
 * ! GET
 * ? Lista todos los productos en orden descendente por el campo "Total".
 * * http://127.0.0.3:5012/producto/orden
 */
appProducto.get('/orden', middlewareProductoVerify, async(req, res) =>{
    if(!req.rateLimit) return;

    let db = await con();
    let coleccion = db.collection('inventarios');
    let result = await coleccion.aggregate(campo_total).toArray();
    res.send(result)
})
/**
* ! POST
* ? Crea un nuevo producto y asigna una cantidad inicial en el inventario de una bodega por defecto.
* * http://127.0.0.3:5012/producto
*/
appProducto.post('/', middlewareProductoVerify, appDTOData, async(req, res) => {
    if (!req.rateLimit) return;

    try {
        const newId = await siguienteId( "productos");

        let db = await con();
        let coleccion = db.collection('productos');
        
        const newDocument = {
            _id: newId,
            ...req.body
        };
        let result = await coleccion.insertOne(newDocument);
        // console.log(result);
        res.status(201).send({ status: 201, message: 'documento creado con exito' });
    } catch (error) {
        console.log(error);
        res.status(406).send('no se ha podido crear el documento');
    }
})

export default appProducto;