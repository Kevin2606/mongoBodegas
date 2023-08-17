import { Router } from 'express';
import mongoDBConexion from "../database/mongoDBConexion.js";
import { productoSchema } from "../models/models.js";
import errorsSchemasHelper from '../helpers/errorsSchemasHelper.js';

const router = Router();
const db = await mongoDBConexion()

router
/*
Realizar un EndPoint que permita listar todos los productos en orden
descendente por el campo "Total".
• El campo "Total" es la cantidad de unidades que la empresa tiene
de este producto, considerando la unión de todas las bodegas, es
decir que el dato como tal no existe en la base de datos,sino se debe
calcular. Si la Bodega A tiene 1O unidades, la Bodega B tiene 5
unidades y la Bodega C tiene 3 unidades. Total= 18.
*/
.get("/productos-order-total", async (req, res) => {
    const collection = await db.collection("productos").aggregate([
        {
            $lookup: {
                from: 'inventarios',
                localField: 'id',
                foreignField: 'id',
                as: 'inventarios'
            }
        },
        {
            $unwind: "$inventarios"
        },
        {
            $project: {
                _id: 0,
                id: 1,
                nombre: 1,
                descripcion: 1,
                total: { $sum: "$inventarios.cantidad" }
            }
        },
        {
            $sort: { total: -1 }
        }
    ]).toArray();
    res.json(collection)
})
/*
Realizar un EndPoint que permita insertar un productos y a su vez asigne
una cantidad inicial del mismo en la tabla inventarios en una de las bodegas
por default.
*/
.post("/", async (req, res) => {
    const result = productoSchema.safeParse(req.body);
    if(!result.success) return errorsSchemasHelper(result, res)
    const collection = await db.collection("productos").insertOne(result.data);
    await db.collection("inventarios").insertOne({ id_producto: result.data.id, id_bodega: 1, cantidad: 0 });
    res.status(201).json({ Mensaje: "Producto creado", id: collection.insertedId });
})

export default router;