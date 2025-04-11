const { product } = require("../../controller/admin/product.controller");

module.exports = (app)=>{
    const dashboardRouter = require("./dashboard.router");
    const productRouter = require("./product.router");
    const prefixAdmin = require("../../config/system");

    app.use(prefixAdmin.prefixAdmin + "/product", productRouter);
    app.use(prefixAdmin.prefixAdmin + "/dashboard", dashboardRouter);
}

