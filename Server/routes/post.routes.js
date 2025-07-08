import Router from "express";
import { isAuthenticated } from "../middlewares/authentication.middleware.js";
import {
  addPostController,
  getAllPostController,
  getAllPostOfUserController,
  getPostByIdController,
  getTop5PostsController,
  likeDislikeController,
} from "../controllers/post.controller.js";
import upload from "../configs/multer.config.js";

const postRouter = Router();

postRouter.post(
  "/new",
  isAuthenticated,
  upload.single("postImage"),
  addPostController
);
postRouter.post("/like-dislike", isAuthenticated, likeDislikeController);
postRouter.get("/allpost", isAuthenticated, getAllPostController);
postRouter.get("/:postId", isAuthenticated, getPostByIdController);
postRouter.get("/top5/:userId", isAuthenticated, getTop5PostsController);
postRouter.get("/allpost/:userId", isAuthenticated, getAllPostOfUserController);
export default postRouter;
