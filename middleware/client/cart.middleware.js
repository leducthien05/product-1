const Cart = require("../../model/cart.model");

module.exports.cartMiddleware = async (req, res, next) => {
    const user = res.locals.user
    if(user) {
        if (!req.cookies.cartID) {
            const cart = new Cart();
            cart.userID = user._id;
            await cart.save();

            const timelive = 365 * 24 * 60 * 60 * 1000;
            res.cookie("cartID", cart.id, {
                expires: new Date(Date.now() + timelive)
            });
        }
        else {
            const cart = await Cart.findOne({
                _id: req.cookies.cartID,
                userID: user._id
            });
            if(cart){
                cart.totalQuantity = cart.product.reduce((sum, item) => sum += item.quantity, 0);
                res.locals.minicart = cart;
            }
            
        }
    } else {
        if (!req.cookies.cartID) {
            const cart = new Cart();
            await cart.save();

            const timelive = 365 * 24 * 60 * 60 * 1000;
            res.cookie("cartID", cart.id, {
                expires: new Date(Date.now() + timelive)
            });
        }
        else {
            const cart = await Cart.findOne({
                _id: req.cookies.cartID
            });
            if(cart){
                cart.totalQuantity = cart.product.reduce((sum, item) => sum += item.quantity, 0);
                res.locals.minicart = cart;
            }
        }
    }

    next();
}