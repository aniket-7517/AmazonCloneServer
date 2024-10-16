const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// mongoose.connect('mongodb://127.0.0.1:27017/ecommerce').then(() => {
//     console.log("DB connected")
// })

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.listen(3010, () => console.log('Server running on port 3010'));

const dburl = "mongodb+srv://aniketkarangale75:J747vYAqf8EU0p4M@cluster0.4japkbu.mongodb.net/amazon_clone?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(dburl).then(() => {
    console.log("DB connected")
})