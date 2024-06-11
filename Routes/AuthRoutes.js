import { LoginController, LogoutController, SigninController, refreshAccessTokenController } from "../Controllers/AuthController.js";
import { verifyJWT } from "../Middleware/AuthMiddleware.js";
import { Router } from "express";

const router = Router();

router.post("/signin",SigninController);
router.post("/login",LoginController);
router.post("/logout",verifyJWT,LogoutController);
router.post("/refresh",refreshAccessTokenController);

export default router; 