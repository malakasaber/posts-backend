//I should handle the 404 still

class GetPost {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }

    async execute(id) {
        return await this.postRepository.findById(id);
    }
}

module.exports = GetPost;