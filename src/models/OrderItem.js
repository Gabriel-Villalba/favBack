// models/OrderItem.js
import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define("OrderItem", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false, // precio al momento de la compra
    },
  }, {
    tableName: "order_items",
    timestamps: true,
  });
};
