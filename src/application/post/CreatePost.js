class CreatePost {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }

    async execute({ title, content }) {
        if (!title || !content) {
            throw new Error("Title and content are required");
        }

        return await this.postRepository.create({ title, content});
    }
}

module.exports = CreatePost;