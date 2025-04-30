const Accounts = require("../../model/accounts.model");
const md5 = require("md5");
const systemConfig = require("../../config/system");


module.exports.login = async (req, res)=>{
    res.render("admin/pages/auth/login", {
        titlePage: "Đăng nhập"
    });
}

module.exports.loginAccount = async (req, res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await Accounts.findOne({
            deleted: false,
            email: email
        });
        if(!user){
            req.flash("error", "Email này không tồn tại!");
            res.redirect("back");
            return;
        }

        if(md5(password) != user.password){
            console.log(user.password);
            console.log(user.password)

            req.flash("error", "Mật khẩu không đúng");
            res.redirect("back");
            return;
        }

        if(user.status != "active"){
            req.flash("error", "Tài khoản đã bị khóa");
            res.redirect("back");
            return;
        }

        res.cookie("token", user.token);
        res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
    } catch (error) {
        console.error(error); // Ghi log lỗi ra console
        res.status(500).send("Đã xảy ra lỗi máy chủ.");
    }
}

module.exports.logout = async (req, res)=>{
    res.clearCookie("token");
    res.render("admin/pages/auth/login", {
        titlePage: "Đăng nhập"
    });
}