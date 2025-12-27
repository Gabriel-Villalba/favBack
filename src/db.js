require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DEPLOY
} = process.env; 
// ===============================
// CONEXIÓN
// ===============================
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/favstore`,
  {
    logging: false,
    native: false,
  }
);

// ===============================
// CARGA DE MODELOS
// ===============================
const basename = path.basename(__filename);

fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, '/models', file));
    model(sequelize);
  });

// Capitalizamos nombres de modelos
const entries = Object.entries(sequelize.models);
const capsEntries = entries.map(([name, model]) => [
  name.charAt(0).toUpperCase() + name.slice(1),
  model,
]);
sequelize.models = Object.fromEntries(capsEntries);

// ===============================
// MODELOS
// ===============================
const {
  User,
  Product,
  ProductImage,
  Category,
  Order,
  OrderItem,
  PaymentMethod,
  Cart,
  CartProduct,
} = sequelize.models;


// ===============================
// RELACIONES
// ===============================

// Categorías ↔ Productos
Category.hasMany(Product);
Product.belongsTo(Category);

// Productos ↔ Imágenes
Product.hasMany(ProductImage, { onDelete: 'CASCADE' });
ProductImage.belongsTo(Product);

// Usuarios ↔ Órdenes
User.hasMany(Order);
Order.belongsTo(User);

// Órdenes ↔ Productos (OrderItem)
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

// Métodos de pago ↔ Órdenes
PaymentMethod.hasMany(Order);
Order.belongsTo(PaymentMethod);

// Usuario ↔ Carrito
User.hasOne(Cart);
Cart.belongsTo(User);

// Carrito ↔ Productos
Cart.belongsToMany(Product, { through: CartProduct });
Product.belongsToMany(Cart, { through: CartProduct });

// ===============================
// SEED DE CATEGORÍAS
// ===============================
const categories = [
  { name: 'Asadores' },
  { name: 'Asador Horno' },
  { name: 'accesorios' },
  { name: 'Agro & Ganadería' },
  { name: 'Hogar & Parque' },
];

const cargarCategorias = async () => {
  try {
    await Category.bulkCreate(categories, { ignoreDuplicates: true });
    console.log('✅ Categorías cargadas');
  } catch (error) {
    console.error('❌ Error cargando categorías', error);
  }
};

// ===============================
// EXPORTS
// ===============================
module.exports = {
  ...sequelize.models,
  conn: sequelize,
  cargarCategorias,
};
