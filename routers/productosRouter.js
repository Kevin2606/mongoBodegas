import { Router } from 'express';
import mongoDBConexion from "../database/mongoDBConexion.js";

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
.get("/", async (req, res) => {
    const collection = await db.collection("productos").find().sort({ total: -1 }).toArray()
    res.json(collection)
})

export default router;