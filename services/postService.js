const ApiResponse = require('../util/response');
const Post = require('../models/Post');
const User = require('../models/User');

async function createPost(text, userId) {
    const user = await User.findById(userId).select('-password');
    console.log(user)
    const newPost = new Post({
        text: text.text,
        postedBy: user._id,
        name: user.username
    });
    const post = await newPost.save();
    return new ApiResponse(200, 'success', post);
}

async function getPosts() {
    const posts = await Post.find().sort({date: -1});
    return new ApiResponse(200, 'success', posts);

}

async function getPostById(id) {
    const post = await Post.findById(id);
    if (!post) {
        return new ApiResponse(404, 'error', {message: 'Пост не найден'});
    }
    return new ApiResponse(200, 'success', post);
}

async function deletePost(id) {
    const post = await Post.findById(id, userId);
    if (!post) {
        return new ApiResponse(404, 'error', {message: 'Пост не найден'});
    }
    if (post.postedBy.toString() !== userId) {
        return new ApiResponse(401, 'error', {message: 'Пользователь не авторизован'});
    }
    await post.remove();

    return new ApiResponse(200, 'success', {message: 'Пост удален'});
}



module.exports = {createPost, getPosts, getPostById, deletePost};