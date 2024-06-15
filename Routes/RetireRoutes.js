import { Router } from "express";
import { verifyJWT } from "../Middleware/AuthMiddleware.js";
import { createFile, getFile } from "../Controllers/RetireController.js";

const router = Router();

router.post("/create",verifyJWT,createFile);
router.post("/get",verifyJWT,getFile);

export default router;