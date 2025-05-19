const productRouter = require("./product.router");
const homeRouter = require("./home.router");
const ProductCategoryMiddleware = require("../../middleware/client/product.middleware");

module.exports = (app) =>{
    app.use(ProductCategoryMiddleware.ProductMidlleware);
    app.use("/", homeRouter);
    app.use("/product", productRouter); 
} 