const systemConfig = require("../../config/system");
const Accounts = require("../../model/accounts.model");
const Roles =require("../../model/roles.model");

const middlewareAuthor = async (req, res)=>{
    if(!req.cookies.token){
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    }
    else{
        //Lấy tài khoản truy cập trang web
        const user = await Accounts.findOne({
            deleted: false,
            token: req.cookies.token
        }).select("-password");

        //Lấy những quyền mà tài khoản này có
        const role = await Roles.findOne({
            deleted: false,
            _id: user.roles_ID
        });
        return role;
    }
    
}

module.exports.AaccoutCreate = async (req, res, next)=>{
    const role = await middlewareAuthor(req, res);
    if(role.permission.includes("account_create")){
        next();
    }
    else{
        res.send("Bạn không có quyền truy cập");
    }
}

module.exports.AaccoutEdit = async (req, res, next)=>{
    const role = await middlewareAuthor(req, res);
    if(role.permission.includes("account_edit")){
        next();
    }
    else{
        res.send("Bạn không có quyền truy cập");
    }
}

module.exports.ProductEdit = async (req, res, next)=>{
    const role = await middlewareAuthor(req, res);
    if(role.permission.includes("products_edit")){
        next();
    }
    else{
        res.send("Bạn không có quyền truy cập");
    }
}

module.exports.ProductCreate = async (req, res, next)=>{
    const role = await middlewareAuthor(req, res);
    if(role.permission.includes("products_create")){
        next();
    }
    else{
        res.send("Bạn không có quyền truy cập");
    }
}
