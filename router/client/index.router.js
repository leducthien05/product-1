module.exports = (app) =>{
    const productRouter = require("./product.router");
    const homeRouter = require("./home.router");

    //đăng ký homeRouter cho route gốc '/'
    app.use("/", homeRouter);
    // đăng ký productRouter cho router '/product'
    app.use("/", productRouter); 
} 