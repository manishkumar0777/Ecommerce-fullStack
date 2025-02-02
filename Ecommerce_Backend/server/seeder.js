const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/product.model');
const User = require('./models/user.model');
const products = require('./data/products');

dotenv.config();

//connect mongo
mongoose.connect(process.env.DB_URL);

//function to seed data
const seedData = async() => {
    try {
        //clearing existing data
        await Product.deleteMany();
        await User.deleteMany();
        //create a default admin User
        const createdUser = await User.create({
            name : "Admin User",
            email: "adminexample@gmail.com",
            password : "123456",
            role : "ADMIN",
        });

        //assign default userId to each Product 
        const userID = createdUser._id;

        const sampleProduct = products.map((product) => {
            return {...product, user : userID};
        });

        //inserting sample prodct data to  database 
        await Product.insertMany(sampleProduct);
        console.log("product data seeded successfully");
        process.exit();

    } catch (error) {
        console.error("error seeding the data",error);
        process.exit(1);
    }
};

seedData();