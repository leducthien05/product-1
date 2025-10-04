const productCategory = require("./product-category.router");
const dashboardRouter = require("./dashboard.router");
const productRouter = require("./product.router");
const rolesRouter = require("./roles.router");
const accountsRouter = require("./accounts.router");
const authRouter = require("./auth.router");
const middlewareAuth = require("../../middleware/admin/auth.middleware");
const myaccount = require("./my-account.router");
const settinggeneralRouter = require("./setting.router");

module.exports = (app)=>{
    const configSystems = require("../../config/system");
    const PATH_ADMIN = configSystems.prefixAdmin;
    app.use(PATH_ADMIN + "/product",middlewareAuth.middleware, productRouter);
    app.use(PATH_ADMIN + "/dashboard",middlewareAuth.middleware, dashboardRouter);
    app.use(PATH_ADMIN + "/product-category",middlewareAuth.middleware, productCategory);
    app.use(PATH_ADMIN + "/roles",middlewareAuth.middleware, rolesRouter);
    app.use(PATH_ADMIN + "/accounts",middlewareAuth.middleware, accountsRouter);
    app.use(PATH_ADMIN + "/myaccount",middlewareAuth.middleware, myaccount);
    app.use(PATH_ADMIN + "/auth", authRouter);
    app.use(PATH_ADMIN + "/setting", middlewareAuth.middleware, settinggeneralRouter);


}

