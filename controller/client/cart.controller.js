const Cart = require("../../model/cart.model");

module.exports.index = async (req, res)=>{
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

    res.redirect("back");
}