import { Router } from "express";
import UserController from "../controllers/user-controller";
import { body } from "express-validator";
const router = Router();

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ max: 32, min: 8 }),
  body("username").isLength({ max: 32, min: 1 }),
  UserController.register
);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/refresh", UserController.refresh);
router.get("/getUsers", UserController.getUsers);

export default router;
