const router = require("express").Router();
const { protect, admin} = require('../middlewares/auth.middleware.js');
const Product = require('../models/product.model.js');

// @route -POST /api/products @access-ADMIN

router.post("/", protect, admin, async(req, res) => {
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
            collections,
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
            collections,
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
});

//route PUT udate existing product /api/product/:id
router.put('/:id', protect, admin, async(req, res) => {
    
    try {
    
        //Find Product 
        let product = await Product.findById(req.params.id);
        if(product) {
            //update
            Object.assign(product, req.body);

            const updatedProduct = await product.save();
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({
                message : "Product Not found"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

// @route DELETE /api/product/:id ... acess - ADMIN
router.delete('/:id', protect, admin, async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(product){
            await product.deleteOne();
            res.json({message : "Product removed"});
        } else {
            res.status(404).json({message : "Product not Found"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

//@route GET  /api/product/- all products @access - public
router.get("/", async(req, res) => {
    try {
        const {
            collection,
            size,
            color,
            gender,
            minPrice,
            maxPrice,
            sortBy,
            search,
            category,
            material,
            brand,
            limit
        } = req.query; 

        let query = {};

        //filterlogic
        if(collection && collection.toLocaleLowerCase() !== 'all') {
            query.collection = collection;
        }

        if(category && category.toLocaleLowerCase() !== 'all') {
            query.category = category;
        }

        if(material) {
            query.material = {$in: material.split(",")};
        }

        if(brand) {
            query.brand = {$in: brand.split(",")};
        }

        if(size) {
            query.sizes = {$in: size.split(",")};
        }

        if(color) {
            query.colors = {$in: [color]};
        }

        if(gender) {
            query.gender = gender;
        }

        if(minPrice || maxPrice) {
            query.price = {};
            if(minPrice) query.price.$gte = Number(minPrice);
            if(maxPrice) query.price.$lte = Number(maxPrice);
        }

        if(search) {
            query.$or = [
                {name : {$regex: search, $options: "i"}},
                {description : {$regex: search, $options: "i"}},
            ]
        }

        //Sorting --
        let sort = {};
        if(sortBy) {
            switch (sortBy) {
                case "priceAsc":
                    sort = {price : 1};
                    break;
                case "priceDesc":
                    sort = {price : -1};
                    break;
                case "popularity":
                    sort ={rating : -1};
                    break;
                default:
                    break;   
            }
        }

        //Fetch data fromdatabse
        let products = await Product.find(query)
            .sort(sort)
            .limit(Number(limit) || 0);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

//getting a single product by its id @access - Public

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(product) {
            res.json(product);
        } else {
            res.status(404).json({message : 'Product Not Found'});
        }
    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error");
    }
})

module.exports = router;