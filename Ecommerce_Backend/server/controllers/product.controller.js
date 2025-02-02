const { protect } = require('../middlewares/auth.middleware.js');
const Product = require('../models/product.model.js');

const createProduct = async(req, res) => {
    try {
        const { 
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collection,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
        } = req.body;

        const product = new Product({
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collection,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
            user : req.user._id, //reference to the admin user who is creating
        });

        const createdProduct = await product.save();
        res.status(201).json({
            createdProduct,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('server Error');
    }
};

module.exports = {
    createProduct,
}