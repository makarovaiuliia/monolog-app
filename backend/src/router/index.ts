import { Router } from "express";
import UserController from "../controllers/user-controller";

const router = Router();

// router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/refresh", UserController.refresh);
router.get("/getUsers", UserController.getUsers);

export default router;
