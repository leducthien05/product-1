const productCategory = require("./product-category.router");
const dashboardRouter = require("./dashboard.router");
const productRouter = require("./product.router");

module.exports = (app)=>{
    const configSystems = require("../../config/system");
    const PATH_ADMIN = configSystems.prefixAdmin;
    app.use(PATH_ADMIN + "/product", productRouter);
    app.use(PATH_ADMIN + "/dashboard", dashboardRouter);
    app.use(PATH_ADMIN + "/product-category", productCategory);
}

