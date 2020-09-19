module.exports = (sequelize, Sequelize) =>
	sequelize.define(
		"user",
		{
			id: {
				type: Sequelize.STRING(15),
				allowNull: false,
				unique: true,
				primaryKey: true,
			},
			password: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			name: {
				type: Sequelize.STRING(10),
				allowNull: false,
			},
			job: {
				type: Sequelize.STRING(15),
				allowNull: false,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal("NOW()"),
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal("NOW()"),
			},
		},
		{
			timestamps: false,
			charset: "utf8",
			collate: "utf8_general_ci",
		}
	);
