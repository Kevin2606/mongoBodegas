import express from 'express';
import dotenv from 'dotenv';
import bodegasRouter from './routers/bodegasRouter.js';
import productosRouter from './routers/productosRouter.js';

dotenv.config();

const app = express();

app
.use('/bodegas', bodegasRouter)
.use('/productos', productosRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server listening on http://localhost:${process.env.PORT}`);
    }
);


