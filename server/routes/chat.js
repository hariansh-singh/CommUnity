import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addmembers,
  getChatDetails,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMember,
  sendAttachments,
} from "../controllers/chat.js";
import { attachmmentsMulter } from "../middlewares/multer.js";

const app = express.Router();

// After here user must be logged in to access the routes
app.use(isAuthenticated);

app.post("/new", newGroupChat);

app.get("/my", getMyChats);

app.get("/my/groups", getMyGroups);

app.put("/addmembers", addmembers);

app.put("/removemember", removeMember);

app.delete("/leave/:id", leaveGroup);

app.post("/message", attachmmentsMulter, sendAttachments);

app.route("/:id").get(getChatDetails).put().delete();

export default app;
