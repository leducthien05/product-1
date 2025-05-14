const systemConfig = require("../../config/system");
const Accounts = require("../../model/accounts.model");
const Roles =require("../../model/roles.model");


module.exports.middleware = async (req, res, next)=>{
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

        //Đưa tài khoản và quyền thành toàn cục để sử dụng
        res.locals.user = user;
        res.locals.role = role;
        next();
    }
}