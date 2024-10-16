const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
    const { name, price, brand, specifications, catagory } = req.body;
    const images = req.files?.map(file => `data:${file.mimetype};base64,${file.buffer.toString('base64')}`);
  
    const newProduct = new Product({
      name,
      price,
      brand,
      specifications: specifications ? specifications.split(',') : [],
      imgSrc: images[0],
      images,
      catagory,
    });
  
    try {
      const savedProduct = await newProduct.save();
      res.json(savedProduct);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json({ msg: 'Product removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};