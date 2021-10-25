const { Model, DataTypes } = require('sequelize')

module.exports = sequelize => {

	class Views extends Model {}

	const ModelOptions = {
		sequelize, 
		'modelName': 'Views', 
		'tableName': 'views',
		'timestamps': false,
		'indexes': [
			{
				'unique': true,
				'allowNull': false,
				'fields': ['postId']
			},
		]
	}

	Views.init({
		'views_count': {
			'type': DataTypes.INTEGER,
			'allowNull': false,
			'defaultValue': 0,
		}
	}, ModelOptions)

	return Views
}