const { Authors, Posts } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AuthorsController {

	static async createAuthor (req, res) {
		const clientRequest = req.body

		const query = { 'where': { 'email': clientRequest.email } }
		const alreadyExistsThisEmail = await Authors.findOne(query)

		if (alreadyExistsThisEmail){
			return res.status(403).send({'message': 'this email already exists'})
		}

		const generatePasswordHash = async () => {
			const saltRounds = 10
			const hashPassword = await bcrypt.hash(
				clientRequest.password, 
				saltRounds
			)
			return hashPassword
		} 
		const hash = await generatePasswordHash()
		
		const newAuthor = await Authors.create({ ...clientRequest, 'password': hash })

		delete newAuthor.dataValues.password

		return res.status(201).send(newAuthor)
	}

	static async login (req, res) {
		const clientRequest = req.body

		const query = { 'where': { 'email': clientRequest.email } }
		const author = await Authors.findOne(query)

		if (!author) {
			return res.status(400).send({ 'message': 'email or password wrong' })
		}

		const passwordMatch = await bcrypt.compare(
			clientRequest.password, 
			author.password
		)

		if (!passwordMatch) {
			return res.status(400).send({ 'message': 'email or password wrong' })
		}

		const creatingToken = () => {
			const payload = { 'id': author.id, 'email': author.email }
			const secretKey = 'ksJi33JJDN'
			const _token = jwt.sign(
				payload, 
				secretKey, 
				{ 'expiresIn': '1h' }
			)
			return _token
		}

		const token = await creatingToken()

		delete author.dataValues.password

		author.dataValues.token = token

		res.send(author)
	}

	static async getAuthor (req, res) {
		const author = await Authors.findByPk(
			req.params.id, 
			{ 'include': Posts }
		)
		return res.send(author)
	}

	static async getAllAuthors (req, res) {
		const allAuthors = await Authors.findAll({ 'include': Posts })
		return res.send(allAuthors)
	}


	static async updateAuthor (req, res) {
		return res.send('patch ok')
	}
}

module.exports = AuthorsController