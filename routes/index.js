import express from "express";

import routerChat from "./chat.route.js";
import routerCharacter from "./character.route.js";
import routerUser from "./user.router.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("I'm running!");
});

router.use("/chat", routerChat);
router.use("/character", routerCharacter);
router.use("/user", routerUser);

export default router;
