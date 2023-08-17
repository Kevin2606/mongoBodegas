import { Router } from 'express';

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
*/

router.post("/", (req, res) => {
    res.json({ message: "Traslado creado" });
})

export default router;