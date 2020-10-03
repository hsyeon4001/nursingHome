module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "counseling",
        {
            counselingId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            email: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            phone: {
                type: Sequelize.INTEGER(12),
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            img: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            // created_at: {
            // 	type: Sequelize.DATE(),
            // 	allowNull: false,
            // 	defaultValue: Sequelize.literal("NOW()"),
            // },
            // updated_at: {
            // 	type: Sequelize.DATE(),
            // 	allowNull: false,
            // 	defaultValue: Sequelize.literal("NOW()"),
            // },
        },
        {
            timestamps: true,
            updatedAt: 'updated_at',
            createdAt: 'created_at',
            charset: "utf8",
            collate: "utf8_general_ci",
        }
    );
};
