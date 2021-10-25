const { Posts, Views } = require('../models')
const jwt = require('jsonwebtoken')

class PostsController {

	static async savingOrCreatingAccessView (post) {
		const [view, created] = await Views.findOrCreate({
			'where': { 'postId': post.dataValues.id },
			'defaults': { 'postId': post.dataValues.id }
		})
		await view.increment('views_count')
	}

	static async getAllPosts (req, res) {
		const allPosts = await Posts.findAll({ 'include': Views })
		return res.send(allPosts)
	}

	static async getPost (req, res) {
		const post = await Posts.findByPk(req.params.id, { 'include': Views })
		PostsController.savingOrCreatingAccessView(post)
		await post.reload()
		return res.send(post)
	}

	static async createPost (req, res) {
		const clientRequest = req.body
		const token = req.headers.authorization.split('Bearer ')[1]
		const { id } = await jwt.decode(token)
		const authorId = id
		clientRequest.authorId = authorId
		const newPost = await Posts.create(clientRequest)
		PostsController.savingOrCreatingAccessView(newPost)
		await newPost.reload()
		return res.send(newPost)
	}

	static async updatePost (req, res) {
		return res.send('patch ok')
	}
}

module.exports = PostsController
