const productRouter = require("./product.router");
const homeRouter = require("./home.router");
const searchRouter = require("./search.router");
const cartRouter = require("./cart.router");
const checkoutRouter = require("./checkout.router");
const userRouter = require("./user.router");

const ProductCategoryMiddleware = require("../../middleware/client/product.middleware");
const cartMiddleware = require("../../middleware/client/cart.middleware");
const userMiddleware = require("../../middleware/client/user.middleware");
const settingMiddleware = require("../../middleware/client/settingGeneral.middleware");

module.exports = (app) =>{
    app.use(userMiddleware.user);
    app.use(ProductCategoryMiddleware.ProductMidlleware);
    app.use(cartMiddleware.cartMiddleware);
    app.use(settingMiddleware.general);
    
    app.use("/", homeRouter);
    app.use("/product", productRouter); 
    app.use("/search", searchRouter); 
    app.use("/cart", cartRouter); 
    app.use("/checkout", checkoutRouter);
    app.use("/user", userRouter);

} 