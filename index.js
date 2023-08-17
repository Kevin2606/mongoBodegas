import express from 'express';
import dotenv from 'dotenv';
import bodegasRouter from './routers/bodegasRouter.js';
import productosRouter from './routers/productosRouter.js';
import inventariosRouter from './routers/inventariosRouter.js';
import trasladosRouter from './routers/trasladosRouter.js';

dotenv.config();

const app = express();

app
.use(express.json())
.use('/bodegas', bodegasRouter)
.use('/productos', productosRouter)
.use('/inventarios', inventariosRouter)
.use('/traslados', trasladosRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server listening on http://localhost:${process.env.PORT}`);
    }
);


