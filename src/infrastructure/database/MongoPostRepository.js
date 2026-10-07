const PostRepository = require("../../domain/post/PostRepository");
const PostModel = require("./PostModel");
const Post = require("../../domain/post/Post");

class MongoPostRepository extends PostRepository {
    async create(post) {
        const createdPost = await PostModel.create({
            title: post.title,
            content: post.content
        });

        return new Post({
            id: createdPost._id.toString(),
            title: createdPost.title,
            content: createdPost.content,
            createdAt: createdPost.createdAt
        });
    }

    async findById(id) {
        const post = await PostModel.findById(id);

        if (!post) {
            return null;
        }

        return new Post({
            id: post._id.toString(),
            title: post.title,
            content: post.content,
            createdAt: post.createdAt
        });
    }

    async findAll() {
        const posts = await PostModel.find();

        return posts.map(
            (post) =>
                new Post({
                    id: post._id.toString(),
                    title: post.title,
                    content: post.content,
                    createdAt: post.createdAt
                })
        );
    }
}

module.exports = MongoPostRepository;