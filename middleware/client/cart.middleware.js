const Cart = require("../../model/cart.model");

module.exports.cartMiddleware = async (req, res, next)=>{
    if(!req.cookies.cartID){
        const cart = new Cart();
        await cart.save();

        const timelive = 365 * 24 * 60 * 60;
        res.cookie("cartID", cart.id, {
            expires: new Date(Date.now() + timelive)
        });
    }
    else{
        const cart = await Cart.findOne({
            _id: req.cookies.cartID
        });

        cart.totalQuantity = cart.product.reduce((sum, item) => sum += item.quantity, 0);
        res.locals.minicart = cart;
    }
    next();
}