const { Model, DataTypes } = require('sequelize')

module.exports = sequelize => {

	class Authors extends Model {}

	const ModelOptions = { 
		sequelize, 
		'modelName': 'Authors', 
		'tableName': 'authors', 
	}

	Authors.init({
		'name': {
			'type': DataTypes.STRING,
			'allowNull': false
		},
		'email': {
			'type': DataTypes.STRING,
			'allowNull': false,
			'unique': true
		},
		'bio': {
			'type': DataTypes.TEXT,
			'allowNull': false
		},
		'password': {
			'type': DataTypes.STRING,
			'allowNull': false			
		}
	}, ModelOptions)

	return Authors
}