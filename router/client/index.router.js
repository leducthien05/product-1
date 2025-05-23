const productRouter = require("./product.router");
const homeRouter = require("./home.router");
const searchRouter = require("./search.router");
const cartRouter = require("./cart.router");

const ProductCategoryMiddleware = require("../../middleware/client/product.middleware");
const cartMiddleware = require("../../middleware/client/cart.middleware");

module.exports = (app) =>{
    app.use(ProductCategoryMiddleware.ProductMidlleware);
    app.use(cartMiddleware.cartMiddleware);
    app.use("/", homeRouter);
    app.use("/product", productRouter); 
    app.use("/search", searchRouter); 
    app.use("/cart", cartRouter); 

} 