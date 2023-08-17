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


const trasladoController = (req, res) => {
    const idBodegaOrigen = req.body.id_bodega_origen;
    const idBodegaDestino = req.body.id_bodega_destino;
    const idProducto = req.body.id_producto;
    const cantidad = req.body.cantidad;

    const inventariosCollection = req.db.collection('inventarios');
    const historialesCollection = req.db.collection('historiales');

    inventariosCollection.find({ id_bodega: idBodegaOrigen, id_producto: idProducto }).toArray((err, inventarioOrigen) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                message: "Error al obtener el inventario de la bodega de origen",
                error: err
            });
        } else {
            if (inventarioOrigen.length === 0 || inventarioOrigen[0].cantidad < cantidad) {
                res.status(400).json({
                    message: "No hay suficientes unidades en la bodega de origen para realizar el traslado"
                });
                return;
            }

            inventariosCollection.updateOne(
                { id_bodega: idBodegaOrigen, id_producto: idProducto },
                { $inc: { cantidad: -cantidad } },
                (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({
                            message: "Error al actualizar el inventario de la bodega de origen",
                            error: err
                        });
                    } else {
                        inventariosCollection.updateOne(
                            { id_bodega: idBodegaDestino, id_producto: idProducto },
                            { $inc: { cantidad: cantidad } },
                            (err, result) => {
                                if (err) {
                                    console.log(err);
                                    // Revertir la actualización en la bodega de origen si ocurre un error
                                    inventariosCollection.updateOne(
                                        { id_bodega: idBodegaOrigen, id_producto: idProducto },
                                        { $inc: { cantidad: cantidad } }
                                    );
                                    res.status(500).json({
                                        message: "Error al actualizar el inventario de la bodega de destino",
                                        error: err
                                    });
                                } else {
                                    // Registrar en la tabla de historiales
                                    historialesCollection.insertOne({
                                        id_bodega_origen: idBodegaOrigen,
                                        id_bodega_destino: idBodegaDestino,
                                        id_producto: idProducto,
                                        cantidad: cantidad,
                                        fecha: new Date()
                                    });
                                    res.status(200).json({
                                        message: "Traslado realizado exitosamente"
                                    });
                                }
                            }
                        );
                    }
                }
            );
        }
    });
};



export default router;