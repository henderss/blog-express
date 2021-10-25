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
		const author = await Authors.findOne(
			{ 
				'where': { 
					'email': email 
				}
			}
		)
		if (!author){
			throw 'Invalid token'
		}

		return next()
	} 

	catch (error) {

		if (!token) {
			return res.status(401).send({ 'message': error.message })
		}
	}
}