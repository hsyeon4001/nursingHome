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
			grade: {
				type: Sequelize.STRING(15),
				allowNull: false,
				defaultValue: "guest"
			}
		},
		{
			timestamps: true,
			updatedAt: 'updated_at',
			createdAt: 'created_at',
			charset: "utf8",
			collate: "utf8_general_ci",
		}
	);
