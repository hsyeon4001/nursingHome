const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	{
		host: '127.0.0.1',
		dialect: 'mysql',
		dialectOptions: {
			charset: 'utf8mb4',
			dateStrings: true,
			typeCast: true
		},
		pool: {
			max: 20,   // 최대 유지 connection 수
			min: 5,    // 최소 유지 connection 수
			idle: 60000 // connection을 몇ms까지 대기시킬 것인가 (이후엔 버려짐)
		}
	}
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require("./user")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.Post.belongsTo(db.User, {
	foreignKey: { name: "authorId", allowNull: false },
});

module.exports = db;
