const express = require('express')
const AuthorsController = require('../controller/authors.controller')
const authMiddleware = require('../middleware/auth.middleware')
const router = express.Router()

// Public Routes
router.get('/list', AuthorsController.getAllAuthors)
router.get('/:id', AuthorsController.getAuthor)
router.post('/register', AuthorsController.createAuthor)
router.post('/login', AuthorsController.login)

// Private Routes
router.patch('/update', authMiddleware, AuthorsController.updateAuthor)

module.exports = router
