module.exports = (sequelize, DataTypes) =>
	sequelize.define(
		"user",
		{
			id: {
				type: DataTypes.STRING(15),
				allowNull: false,
				unique: true,
				primaryKey: true,
			},
			password: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			job: {
				type: DataTypes.STRING(10),
				allowNull: false,
			},
		},
		{
			timestamps: true,
			paranoid: true,
			charset: "utf8",
			collate: "utf8_general_ci",
		}
	);
