import express from 'express';
import dotenv from 'dotenv';
import bodegasRouter from './routers/bodegasRouter.js';

dotenv.config();

const app = express();

app.use('/', bodegasRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on http://localhost:${process.env.PORT}`);
    }
);


