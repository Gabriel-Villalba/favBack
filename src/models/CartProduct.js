module.exports = (sequelize, DataTypes) => {
  sequelize.define(
    'CartProduct',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          min: 1,
        },
      },

      // Precio del producto en el momento que se agregó al carrito
      priceSnapshot: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      tableName: 'cart_products',
      timestamps: true,
    }
  );
};
