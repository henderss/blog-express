const express = require('express')
const db 			= require('./models')
const { Authors, Posts, Views } = db
const appRoutes = require('./routes')
const cors = require('cors')

const genarateAssociationsOptions = (name, isAllowNull) => ({ 
	'foreignKey': {
		'name': name,
		'allowNull': isAllowNull
	}
})

Authors.hasMany(Posts, genarateAssociationsOptions('authorId', false))
Posts.belongsTo(Authors, genarateAssociationsOptions('authorId', false))

Posts.hasOne(Views, genarateAssociationsOptions('postId', false))
Views.belongsTo(Posts, genarateAssociationsOptions('postId', false))

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

appRoutes(app)

db.sequelize.sync().then( () => 
	app.listen(port, () => console.log('server open on port: ', port))
)

