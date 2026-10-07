class CreatePost {
    constructor(postRepository, eventPublisher) {
        this.postRepository = postRepository;
        this.eventPublisher = eventPublisher;
    }

    async execute({ title, content }) {
        if (!title || !content) {
            throw new Error("Title and content are required");
        }

        const post = await this.postRepository.create({ title, content });

        await this.eventPublisher.send("post-created", {
            event: "post.created",
            post,
            timestamp: new Date().toISOString()
        });

        return post;
    }
}

module.exports = CreatePost;