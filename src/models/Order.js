// models/Order.js
import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define("Order", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        "pending",
        "paid",
        "cancelled",
        "failed"
      ),
      defaultValue: "pending",
    },

    paymentStatus: {
      type: DataTypes.STRING, // MercadoPago status
    },

    paymentReference: {
      type: DataTypes.STRING, // MP payment_id
    },
  }, {
    tableName: "orders",
    timestamps: true,
  });
};
