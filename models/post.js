module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		"post",
		{
			postId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			category: {
				type: DataTypes.INTEGER(4),
				allowNull: false,
			},
			title: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			img: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
		},
		{
			timestamps: true,
			paranoid: true,
			charset: "utf8",
			collate: "utf8_general_ci",
		}
	);
};
