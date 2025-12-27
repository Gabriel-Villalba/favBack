module.exports = (sequelize, DataTypes) => {
  sequelize.define(
    'Cart',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      status: {
        type: DataTypes.ENUM('active', 'converted', 'abandoned'),
        allowNull: false,
        defaultValue: 'active',
      },

      // Futuro: carrito invitado
      sessionId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'carts',
      timestamps: true,
    }
  );
};
