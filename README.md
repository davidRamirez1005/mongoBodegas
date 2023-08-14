# Bodegas en Mongo

### Solicitar token:

GET -- `/token`

seguido de la colección a la que desea generar el token:

```
/token/bodegas
/token/producto
/token/traslado
```

#### => Gestión de bodegas:

Usar el endpoint `/bodega`

```
appExpress.use('/bodega',limitget(),appVerify, appBodega)
```



1. GET -- *listar todas las bodegas ordenadas*=> `/listar`: *http://127.0.0.3:5012/bodega/listar*
2. POST -- agregar un nuevo cliente:

```
{
    "ID": 10,
    "Nombre": "Juan",
    "Apellido": "Perez",
    "DNI": "111111111",
    "Direccion": "calle 1 A",
    "Telefono": "123654"
  }
```



#### => Gestión de *producto*:

Usar el endpoint `/producto`

```
appExpress.use('/producto',limitget(),appVerify, appProducto)
```



1. GET -- *Lista todos los productos en orden descendente por el campo "Total".*=> `/orden`: *http://127.0.0.3:5012/producto/orden*

2. GET -- *Crea un nuevo producto y asigna una cantidad inicial en el inventario de una bodega por defecto => ej  http://127.0.0.3:5012/producto

   ```
    {
     "id": 21,
     "nombre": "nombre producto",
      "estado": 1,
     "created_by": 16
   }
   ```

   

#### => Gestión de **traslado**:

Usar el endpoint `/contrato`

```
appExpress.use('/contrato',limitget(),appVerify, appClientes)
```



1. GET -- *Listar todos los alquileres activos junto con los datos de los clientes relacionados.* => `/alquiler`: *http://127.0.0.3:5012/contrato/alquiler*

   