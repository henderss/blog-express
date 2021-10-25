const { Authors } = require('../models')
const jwt = require('jsonwebtoken')

const secretKey = 'ksJi33JJDN'

module.exports = async (req, res, next) => {
	
	const token = req.headers.authorization?.split(' ')[1]
	
	try {
		const { payload: { email } } = jwt.verify(
			token, 
			secretKey, 
			{ 'complete': true }
		)

		return next()
	} 

	catch (error) {

			return res.status(401).send({ 'message': error.message })
	}
}