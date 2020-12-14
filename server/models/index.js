const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	{
		host: "127.0.0.1",
		dialect: "mysql",
		dialectOptions: {
			charset: "utf8mb4",
			dateStrings: true,
			typeCast: true,
		},
		pool: {
			max: 20,
			min: 5,
			idle: 60000,
		},
	}
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require("./user")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.Post.belongsTo(db.User, {
	foreignKey: { name: "authorId", allowNull: false },
});
db.Op = Sequelize.Op;

module.exports = db;
