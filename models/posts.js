const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {

	class Post extends Model {
		static tableName () {
			return 'Post'
		}

		getFirstTwoTitleLetters () {
			return this.title.slice(0, 3)
		}
	}

	const ModelOptions = { 
		sequelize, 
		'modelName': 'Posts', 
		'tableName': 'posts' 
	}

	Post.init({
		'title': {
			'type': DataTypes.STRING,
			'allowNull': false
		},
		'author': {
			'type': DataTypes.STRING,
			'allowNull': false
		},
		'content': {
			'type': DataTypes.TEXT,
			'allowNull': false
		},
	}, ModelOptions)

	return Post
}
