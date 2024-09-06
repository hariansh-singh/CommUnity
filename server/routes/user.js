import express from "express";
import { login, newUser } from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";

const app = express.Router();

app.post("/new", singleAvatar, newUser);
app.post("/login", login);

export default app;
