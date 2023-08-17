import { Router } from 'express';
import mongoDBConexion from "../database/mongoDBConexion.js";
import errorsSchemasHelper from "../helpers/errorsSchemasHelper.js";
import { trasladoSchema } from "../models/models.js";

const db = await mongoDBConexion();
const router = Router();

/*
TODO: Realizar un EndPolnt que permita Trasladar unproducto de una bodega a otra
• Se debe validar que la cantidad de unidades que se pretende sacar
de una Bodega, sea posible, ya que si tengo 1O unidades en la
Bodega A, no podré sacar de ella 20 unidades. Esta acción debe
generar una alerta e impedir el registro.
• Para la afectación de las tablas se debe considerar que del Origen debo
restar la cantidad,y
al destino le debo sumar lacantidad.
Por ejemplo: Bodega A = 1O unidades. Bodega B = 1O unidades. Haré
el traslado de 5
unidades desde la Bodega A para la Bodega B,Por lo cual el resultado
será hacer Updated
a los dos registros en inventarios:
Bodega A = 5 unidades. Bodega B = 15 unidades. Además hacer un
lnsert con toda la
información en la tabla de historiales.

id_bodega_origen,
id_bodega_destino,
id_producto,

*/

router.post("/", async (req, res) => {
    try {
        const result = trasladoSchema.safeParse(req.body);
        if(!result.success) return errorsSchemasHelper(result, res);
        let resultDB = await db.collection("inventarios").find({ id_bodega: result.data.id_bodega_origen, id_producto: result.data.id_producto });
        if (resultDB.cantidad < result.data.cantidad) return res.status(400).json({ message: "No hay suficientes unidades en la bodega origen" });
        await db.collection("inventarios").updateOne({ id_bodega: result.data.id_bodega_origen, id_producto: result.data.id_producto }, { $inc: { cantidad: -result.data.cantidad } });
        await db.collection("inventarios").updateOne({ id_bodega: result.data.id_bodega_destino, id_producto: result.data.id_producto }, { $inc: { cantidad: result.data.cantidad } });
        await db.collection("historiales").insertOne({
            id_bodega_origen: result.data.id_bodega_origen,
            id_bodega_destino: result.data.id_bodega_destino,
            id_producto: result.data.id_producto,
            cantidad: result.data.cantidad,
            created_at: new Date()
        });
        res.status(201).json({ message: "Traslado creado" });
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Error del servidor" });
    }
})


export default router;