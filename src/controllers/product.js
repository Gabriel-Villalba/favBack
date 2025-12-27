const { Product, Category } = require("../db");
const { Op } = require("sequelize");

/* =========================
   GET PRODUCTS (PAGINADO)
========================= */
const getProducts = async (req, res) => {
  try {
    let { page = 1, limit = 8 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const offset = (page - 1) * limit;

    const { count, rows } = await Product.findAndCountAll({
      where: { Delete: false },
      include: [
        {
          model: Category,
          attributes: ["name"],
          through: { attributes: [] }
        }
      ],
      limit,
      offset,
      order: [["createdAt", "DESC"]]
    });

    return res.status(200).json({
      products: rows,
      totalProducts: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return res.status(500).json({ error: "Error al obtener productos" });
  }
};

/* =========================
   GET PRODUCT BY ID
========================= */
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await Product.findOne({
      where: { id, Delete: false },
      include: [
        {
          model: Category,
          attributes: ["name"],
          through: { attributes: [] }
        }
      ]
    });

    if (!producto) {
      return res.status(404).send("Producto no existe");
    }

    return res.status(200).json(producto);
  } catch (error) {
    console.error("Error getProductById:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};


/* =========================
   SEARCH PRODUCT BY NAME
========================= */
const getProductByName = async (req, res) => {
  const { name } = req.params;

  try {
    if (!name) {
      return res.status(400).send("Ingrese un producto");
    }

    const productos = await Product.findAll({
      where: {
        Nombre: {
          [Op.iLike]: `%${name}%`
        },
        Delete: false
      },
      include: [
        {
          model: Category,
          attributes: ["name"],
          through: { attributes: [] }
        }
      ]
    });

    if (!productos.length) {
      return res.status(404).send("No se encontraron productos");
    }

    return res.status(200).json(productos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/* =========================
   CREATE PRODUCT
========================= */
const createProduct = async (req, res) => {
  try {
    const {
      Nombre,
      Descripcion,
      Precio,
      Stock,
      Imagen_URL,
      onOffer,
      Brand,
      name // categorías
    } = req.body;

    if (!Nombre || !Descripcion || !Precio || !Imagen_URL || !Brand) {
      return res.status(400).send("Completar los campos obligatorios");
    }

    const productoExistente = await Product.findOne({ where: { Nombre } });
    if (productoExistente) {
      return res.status(400).send("Producto ya existe");
    }

    const newProduct = await Product.create({
      Nombre,
      Descripcion,
      Precio,
      Stock,
      Imagen_URL,
      onOffer,
      Brand
    });

    if (name) {
      const categories = await Category.findAll({
        where: { name }
      });
      await newProduct.addCategory(categories);
    }

    return res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al crear producto:", error.message);
    return res.status(500).send("Error interno del servidor");
  }
};

/* =========================
   UPDATE PRODUCT
========================= */
const updateProduct = async (req, res) => {
  const {
    id,
    Nombre,
    Descripcion,
    Precio,
    Stock,
    Imagen_URL,
    onOffer,
    Brand,
    name
  } = req.body;

  try {
    const product = await Product.findByPk(id, {
      include: [
        {
          model: Category,
          attributes: ["name"]
        }
      ]
    });

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    await product.update({
      Nombre,
      Descripcion,
      Precio,
      Stock,
      Imagen_URL,
      onOffer,
      Brand
    });

    if (name) {
      const categories = await Category.findAll({
        where: { name }
      });
      await product.setCategories(categories);
    }

    return res.status(200).json({ message: "Producto actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

/* =========================
   SOFT DELETE
========================= */
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    await product.update({ Delete: true });

    res.status(200).send("Producto eliminado (borrado lógico)");
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
};

/* =========================
   RESTORE PRODUCT
========================= */
const restoreProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    await product.update({ Delete: false });

    res.status(200).send("Producto restaurado correctamente");
  } catch (error) {
    console.error("Error al restaurar producto:", error);
    res.status(500).json({ error: "Error al restaurar producto" });
  }
};

module.exports = {
  getProductById,
  getProducts,
  getProductByName,
  createProduct,
  updateProduct,
  deleteProduct,
  restoreProduct
};

