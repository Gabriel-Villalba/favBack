// models/ProductImage.js
import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define("ProductImage", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    publicId: {
      type: DataTypes.STRING,
      allowNull: false, // Cloudinary
    },

    isPrimary: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: "product_images",
    timestamps: true,
  });
};
