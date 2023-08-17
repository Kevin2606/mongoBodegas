import { Router } from 'express';
import mongoDBConexion from "../database/mongoDBConexion.js";
import { inventarioSchema } from "../models/models.js";
import errorsSchemasHelper from "../helpers/errorsSchemasHelper.js";

const router = Router();
const db = await mongoDBConexion();
/*
Realizar un EndPoint que permita insertar registros en la tabla de
inventarios, los parámetros de entrada deben ser
(id_producto,id_bodega,cantidad).
• La tabla no puede repetir la combinación de Bodega I Producto Por lo
tanto será necesario validar si el ingreso que se está realizado ya
existe o es una combinación totalmente nueva.
• Si es una combinación totalmente nueva, se debe hacer un lnsert,
considerando los datos ingresados.
• Si es una combinación existente, entonces se debe hacer un Update
a este registro, considerando la suma de la cantidad existente con la
cantidad nueva
*/
router.post("/", async (req, res) => {
    const result = inventarioSchema.safeParse(req.body);
    if(!result.success) return errorsSchemasHelper(result, res)
    const collection = await db.collection("inventarios").findOne({ id_producto: result.data.id_producto, id_bodega: result.data.id_bodega });
    if (collection) {
        await db.collection("inventarios").updateOne({ id_producto: result.data.id_producto, id_bodega: result.data.id_bodega }, { $inc: { cantidad: result.data.cantidad } });
    }else {
        await db.collection("inventarios").insertOne(result.data);
    }
    res.status(201).json({ message: "Inventario creado" });
});



export default router;