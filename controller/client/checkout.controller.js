const Cart = require("../../model/cart.model");
const Product = require("../../model/product.model");
const NewPrice = require("../../helper/newPriceProduct");
const Order = require("../../model/order.model");

module.exports.index = async (req, res)=>{
    const idCart = req.cookies.cartID;

    const cart = await Cart.findOne({
        _id: idCart
    });


    for(const item of cart.product){
        const IDproduct = item.product_ID;
        const ProductInfo = await Product.findOne({
            _id: IDproduct
        }).select("name thumbnail price discountPercentage");

        item.newPrice = NewPrice.newPriceProduct(ProductInfo);
        item.totalPrice = item.newPrice * item.quantity;

        item.ProductInfo = ProductInfo;
    }


    cart.SumPrice = cart.product.reduce((sum, item) =>{ return sum + item.totalPrice}, 0);
    
    res.render("client/pages/checkout/index", {
        titlePage: "Thanh toán",
        Cart: cart
    });
}

module.exports.order = async (req, res)=>{
    const infoUser = req.body;
    const idCart = req.cookies.cartID;

    const cart = await Cart.findOne({
        _id: idCart
    });

    const ProductList = [];
    for (const item of cart.product) {
        const productInfo = {
            product_ID: item.product_ID,
            discountPercentage: 0,
            price: 0,
            quantity: item.quantity
        } ;

        const product = await Product.findOne({
            _id: item.product_ID
        }).select("price discountPercentage");

        productInfo.discountPercentage = product.discountPercentage;
        productInfo.price = product.price;

        ProductList.push(productInfo);
    }

    const orderInfo = {
        infoUser: infoUser,
        product: ProductList,
        status: "initial"
    };

    const order = new Order(orderInfo);
    order.save();

    await Cart.updateOne({
        _id: idCart
    }, {
        product: []
    })
   res.redirect(`/checkout/success/${order._id}`);
}