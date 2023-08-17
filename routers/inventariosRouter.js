import { Router } from 'express';

const router = Router();

/*
TODO: Realizar un EndPoint que permita insertar registros en la tabla de
inventarios, los parámetros de entradadebenser
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

export default router;