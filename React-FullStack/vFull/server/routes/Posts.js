const dayjs = require("dayjs");
const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");

dayjs.extend(utc);
dayjs.extend(timezone);

function timeSetting(list) {
  list = list.map((post) => {
    post.dataValues.updatedAt = dayjs(post.dataValues.updatedAt)
      .tz("Asia/Seoul")
      .format("YYYY-MM-DD HH:mm:ss");

    return post;
  });
  return list;
}

router.get("/", async (req, res) => {
  let listOfPosts = await Posts.findAll({
    attributes: ["id", "title", "username", "updatedAt"],
    order: [
      ["updatedAt", "DESC"],
      ["id", "DESC"],
    ],
  });
  listOfPosts = timeSetting(listOfPosts);
  res.json(listOfPosts);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

router.get("/userpage", validateToken, async (req, res) => {
  let listOfPosts = await Posts.findAll({
    where: { username: req.user.username },
    attributes: ["id", "title", "username", "updatedAt"],
    order: [
      ["updatedAt", "DESC"],
      ["id", "DESC"],
    ],
  });
  listOfPosts = timeSetting(listOfPosts);
  res.json(listOfPosts);
});

router.post("/", validateToken, async (req, res) => {
  const post = {
    title: req.body.title,
    postText: req.body.postText,
    username: req.user.username,
  };
  await Posts.create(post);
  res.json(post);
});

router.delete("/byId/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findOne({
    where: { id: id, username: req.user.username },
  });
  console.log(post);
  if (!post) {
    return res.json({ success: false });
  }
  await post.destroy();
  res.json({ success: true });
});

module.exports = router;
