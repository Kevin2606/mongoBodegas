import { Router } from "express";
import mongoDBConexion from "../database/mongoDBConexion.js";
import { bodegasSchema } from "../models/models.js";
import errorsSchemasHelper from "../helpers/errorsSchemasHelper.js";

const router = Router();
const db = await mongoDBConexion();

router
    //Realizar un EndPolnt que permita listar todas las bodegas ordenadas alfabéticamente
    .get("/", async (req, res) => {
        const collection = await db
            .collection("bodegas")
            .find()
            .sort({ nombre: 1 })
            .toArray();
        res.status(200).json(collection);
    })
    //Realizar un EndPolnt que permita crear una bodegas.(agregar en los comentarios de la función los datos de entrada)
    .post("/", async (req, res) => {
        const result = bodegasSchema.safeParse(req.body);
        if (!result.success) return errorsSchemasHelper(result, res)
        const collection = await db.collection("bodegas").insertOne(result.data);
        res.status(201).json({ Mensaje: "Bodega creada", id: collection.insertedId });
    });

export default router;
