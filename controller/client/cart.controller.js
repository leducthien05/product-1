const Cart = require("../../model/cart.model");
const Product = require("../../model/product.model");
const NewPrice = require("../../helper/newPriceProduct");

module.exports.addProduct = async (req, res)=>{
    const cartID = req.cookies.cartID;
    const ProductID = req.params.id;
    const ProductQuantity = parseInt(req.body.quantity);

    const objectCart = {
        product_ID: ProductID,
        quantity: ProductQuantity
    };

    const cart = await Cart.findOne({
        _id: cartID
    });

    //Tìm mặt hàng đã tồn tại trong giỏ hàng
    const productAdd = cart.product.find(item => item.product_ID == ProductID);
    if(productAdd){
        const newQuantity = productAdd.quantity + ProductQuantity;

        await Cart.updateOne(
            {
                _id: cartID,
                "product.product_ID": ProductID
            },
            {
                $set: {
                    "product.$.quantity": newQuantity
                }
            }
        )
    }else{
        await Cart.updateOne(
            {
                _id: cartID
            },
            {
                $push: { product: objectCart }
            }
        )
    }
    req.flash("success", "Thêm vào giỏ hàng thành công");
    res.redirect("back");
}

module.exports.index = async (req, res)=>{
    const IDcart = req.cookies.cartID;
    const cart = await Cart.findOne({
        _id: IDcart
    });
    console.log(cart);

    for (const item of cart.product) {
        const IDproduct = item.product_ID;
        const productInfo = await Product.findOne({
            _id: IDproduct
        }).select("name thumbnail slug discountPercentage price");

        item.newPrice = NewPrice.newPriceProduct(productInfo);

        item.totalPrice = item.newPrice * item.quantity;

        item.productInfo = productInfo;
    }

    cart.SumPrice = cart.product.reduce((sum, item) =>{return sum + item.totalPrice}, 0);

    res.render("client/pages/cart/index", {
        titlePage: "Giỏ hàng",
        productList: cart
    });
}