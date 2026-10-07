const express = require("express");

const router = express.Router();

const MongoPostRepository = require("../../infrastructure/database/MongoPostRepository");

const CreatePost = require("../../application/post/CreatePost");
const GetPost = require("../../application/post/GetPost");
const ListPosts = require("../../application/post/ListPosts");

const PostController = require("../controllers/PostController");

const postRepository = new MongoPostRepository();

const createPost = new CreatePost(postRepository);
const getPost = new GetPost(postRepository);
const listPosts = new ListPosts(postRepository);

const postController = new PostController(
    createPost,
    getPost,
    listPosts
);

router.post("/", postController.create);
router.get("/", postController.getAll);
router.get("/:id", postController.getById);

module.exports = router;