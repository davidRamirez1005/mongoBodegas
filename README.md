# Bodegas en Mongo

### Solicitar token:

GET -- `/token`

seguido de la colección a la que desea generar el token:

```ini
/token/bodegas
/token/producto
/token/traslado
```

#### => Gestión de bodegas:

Usar el endpoint `/bodega`

```javascript
appExpress.use('/bodega',limitget(),appVerify, appBodega)
```



1. GET -- *listar todas las bodegas ordenadas*=> `/listar`: *http://127.0.0.3:5012/bodega/listar*
2. POST -- agregar un nuevo cliente:

```json
{
    "nombre": "jose david",
    "id_responsable": 5,
    "estado": 1
}
```



#### => Gestión de *producto*:

Usar el endpoint `/producto`

```javascript
appExpress.use('/producto',limitget(),appVerify, appProducto)
```



1. GET -- *Lista todos los productos en orden descendente por el campo "Total".*=> `/orden`: *http://127.0.0.3:5012/producto/orden*

2. POST -- *Crea un nuevo producto y asigna una cantidad inicial en el inventario de una bodega por defecto => ej  http://127.0.0.3:5012/producto

   ```json
    {
     "nombre": "nombre producto",
     "estado": 1,
     "created_by": 16
   }
   ```

   

#### => Gestión de **Inventario**:

Usar el endpoint `/inventario`

```javascript
appExpress.use('/inventario',limitget(),appVerify, appInventario)
```


1. POST -- *Inserta un registro en la tabla de inventarios, validando si la combinación de bodega y producto ya existe.*: *http://127.0.0.3:5012/inventario*

   ```json
   {
       "id_bodega": 9,
       "id_producto": 20,
       "cantidad": 231
   }
   ```
   
   