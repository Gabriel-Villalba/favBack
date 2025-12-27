// models/PaymentMethod.js
import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define("PaymentMethod", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false, // MercadoPago
    },

    provider: {
      type: DataTypes.STRING, // mercadopago
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    tableName: "payment_methods",
    timestamps: true,
  });
};
