import { Router } from "express";
import mongoDBConexion from "../database/mongoDBConexion.js";

const router = Router();
const db = await mongoDBConexion()

router
//Realizar un EndPolnt que permita listar todas las bodegas ordenadas alfabéticamente
.get("/", async (req, res) => {
    const collection = await db.collection("bodegas").find().sort({ nombre: 1 }).toArray()
    res.json(collection)
})
//TODO: Realizar un EndPolnt que permita crear una bodegas.(agregar en los comentarios de la función los datos de entrada)
.post("/", async (req, res) => {
    res.send("Crear una bodega-- PENDIENTE")
})




export default router;