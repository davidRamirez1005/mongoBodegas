// import {ObjectId} from 'mongodb'
import {Router} from 'express';
import dotenv from 'dotenv';
import {limitget} from '../helpers/configLimit.js'
import {con} from '../../db/atlas.js'
import { middlewareProductoVerify, appDTOData } from '../middleware/productos.js';
import { campo_total } from '../data/productosDataAccess.js'

dotenv.config();

const appProducto = Router();

/**
 * ! GET
 * ? Lista todos los productos en orden descendente por el campo "Total".
 * * http://127.0.0.3:5012/producto/orden
 */
appProducto.get('/orden', limitget(),middlewareProductoVerify, async(req, res) =>{
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
// appProducto.post('/', limitget(), middlewareProductoVerify, appDTOData, async(req, res) => {
//     if(!req.rateLimit) return;

//     const producto = req.body;
//     let db = await con();
//     const productosCollection = db.collection('productos');
//     const result = await productosCollection.insertOne(producto);
//     const productoId = result.insertedId;

//     // Insertar una cantidad inicial en la colección "inventarios"
//     const inventario = {
//       id_producto: productoId,
//       cantidad: 1
//     };
    
//     const inventariosCollection = db.collection('inventarios');
//     await inventariosCollection.insertOne(inventario);

//     res.status(201).json({
//       message: 'Producto creado con éxito',
//       data: { ...producto, _id: productoId },
//     });
// })
appProducto.post('/', limitget(), middlewareProductoVerify, appDTOData, async(req, res) => {
    if(!req.rateLimit) return;

    let db = await con();
    let coleccion = db.collection('productos');
    try {
        let result = await coleccion.insertOne(req.body);
        console.log(result);
        res.status(201).send({status : 201, message : 'documento creado con exito'})
    } catch (error) {
        console.log(error.errInfo.details.schemaRulesNotSatisfied[0]);
        res.status(406).send('no se ha podido crear el documento')
    };
    
})

export default appProducto;