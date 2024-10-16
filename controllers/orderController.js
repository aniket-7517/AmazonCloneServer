const Order = require('../models/Order');
const Cart = require('../models/Cart');

exports.placeOrder = async (req, res) => {
    try {
        const { items, name, address, paymentMethod } = req.body;
        
        if (!name || !address || !paymentMethod) {
            return res.status(400).json({ msg: 'Please provide name, address, and payment method.' });
        }

        const cart = await Cart.findOne({ userId: req.user.id }).lean().populate('products.productId');
        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        const order = new Order({
            userId: req.user.id,
            products: cart.products,
            payment: {
                name,
                address,
                paymentMethod,
            }
        });

        await order.save();

        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).populate('products.productId');
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.cancelOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }
        if (order.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }
        res.json({ msg: 'Order cancelled' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
