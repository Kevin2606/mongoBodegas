import { Router } from "express";
import mongoDBConexion from "../database/mongoDBConexion.js";

const router = Router();

router.get("/", async (req, res) => {
    const db = await mongoDBConexion()
    const collection = await db.collection("bodegas").find().sort({ nombre: 1 }).toArray()
    res.json(collection)
})
router.post("/", async(req, res) => {
    
})
export default router;