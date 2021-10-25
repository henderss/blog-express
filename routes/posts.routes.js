const express = require('express')
const router = express.Router()
const PostsController = require('../controller/posts.controller')
const authMiddleware = require('../middleware/auth.middleware')

// Public Routes
router.get('/', PostsController.getAllPosts)
router.get('/:id', PostsController.getPost)

// Private Routes
router.post('/', authMiddleware, PostsController.createPost)
router.patch('/', authMiddleware, PostsController.updatePost)

module.exports = router