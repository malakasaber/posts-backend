class Post {
    constructor({ id, title, content, createdAt }) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
    }
}

module.exports = Post;