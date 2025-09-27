const User = require("../../model/user.model");

const md5 = require("md5");

module.exports.register = async (req, res)=>{
    res.render("client/pages/user/register", {
        titlePage: "Đăng ký"
    });
}

module.exports.registerPost = async (req, res)=>{
    const email = req.body.email;
    const fullname = req.body.fullname;
    const exitEmail = await User.findOne({
        email: email
    });

    if(exitEmail){
        req.flash("error", "Email đã được đăng ký");
        res.redirect("back");
        return;
    }

    req.body.password = md5(req.body.password);

    const userInfo = {
        fullname: fullname,
        email: email,
        password: req.body.password
    }

    const user = new User(userInfo);
    user.save();

    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/");
}

module.exports.logout = async (req, res)=>{
    res.clearCookie("tokenUser");
    res.clearCookie("cartID");
    res.redirect("/");
}

module.exports.login = async (req, res)=>{
    res.render("client/pages/user/login", {
        titlePage: "Đăng nhập"
    });
}

module.exports.loginPost = async (req, res)=>{
    const email = req.body.email;
    
    const user = await User.findOne({
        email: email
    });

    if(!user){
        req.flash("error", "Email không tồn tại");
        res.redirect("back");
        return;
    }

    if(md5(req.body.password) !== user.password){
        req.flash("error", "Mật khẩu không đúng");
        res.redirect("back");
        return;
    }

    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/");
}