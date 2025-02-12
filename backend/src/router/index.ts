import { Router } from "express";
import UserController from "../controllers/user-controller";
import { body } from "express-validator";
import authMiddleware from "../middlewares/auth-middleware"; // вставить в нужное место
import EntryController from "../controllers/entry-controller";
const router = Router();

// authentication
router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ max: 32, min: 8 }),
  body("username").isLength({ max: 32, min: 1 }),
  UserController.register
);
router.post("/login", UserController.login);
router.post("/logout", authMiddleware, UserController.logout);
router.get("/refresh", UserController.refresh);

// user
// router.get("/users", UserController.getUser); // get user by token or id

// diary operations

router.get("/:userId/entries", authMiddleware, EntryController.getAllEntries);
router.get("/entries/:entryId", authMiddleware, EntryController.getEntryById);
router.post("/:userId/entries", authMiddleware, EntryController.addEntry);
router.post("/delete/:entryId", EntryController.deleteEntry);
router.post("/entries/:entryId", authMiddleware, EntryController.editEntry);

export default router;
