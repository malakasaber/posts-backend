class PostController {
    constructor(createPost, getPost, listPosts) {
        this.createPost = createPost;
        this.getPost = getPost;
        this.listPosts = listPosts;
    }

    create = async (req, res) => {
        try {
            const post = await this.createPost.execute(req.body);

            res.status(201).json(post);
        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    };

    getById = async (req, res) => {
        try {
            const post = await this.getPost.execute(req.params.id);

            if (!post) {
                return res.status(404).json({
                    message: "Post not found"
                });
            }

            res.status(200).json(post);
        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    };

    getAll = async (req, res) => {
        try {
            const posts = await this.listPosts.execute();

            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    };
}

module.exports = PostController;