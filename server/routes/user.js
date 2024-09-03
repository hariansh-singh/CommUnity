import express from "express";
import { login, newUser } from "../controllers/user.js";

const app = express.Router();

app.post("/new", newUser);
app.post("/login", login);

export default app;