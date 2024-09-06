import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addmembers, getMyChats, getMyGroups, newGroupChat } from "../controllers/chat.js";

const app = express.Router();

// After here user must be logged in to access the routes
app.use(isAuthenticated);

app.post("/new", newGroupChat); 

app.get("/my", getMyChats);

app.get("/my/groups", getMyGroups);

app.put("/addmembers", addmembers);

export default app;
