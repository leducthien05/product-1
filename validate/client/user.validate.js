const { model } = require("mongoose");

module.exports.register = (req, res, next)=>{
    if(!req.body.fullname){
        req.flash("warn", "Vui lòng nhập tên tài khoản!");
        res.redirect(`back`);
        return;
    }

    if(!req.body.email){
        req.flash("warn", "Vui lòng nhập tài khoản email!");
        res.redirect(`back`);
        return;
    }

    if(!req.body.password){
        req.flash("warn", "Vui lòng nhập mật khẩu!");
        res.redirect(`back`);
        return;
    }
    next();
}

module.exports.login = (req, res, next)=>{
    if(!req.body.email){
        req.flash("warn", "Vui lòng nhập tài khoản email!");
        res.redirect(`back`);
        return;
    }

    if(!req.body.password){
        req.flash("warn", "Vui lòng nhập mật khẩu!");
        res.redirect(`back`);
        return;
    }
    next();
}

module.exports.otp = (req, res, next)=>{
    if(!req.body.otp){
        req.flash("warn", "Vui lòng nhập mã OTP!");
        res.redirect(`back`);
        return;
    }
}
module.exports.resetPassword = (req, res, next)=>{
    if(!req.body.password){
        req.flash("warn", "Vui lòng nhập tài khoản password mới!");
        res.redirect(`back`);
        return;
    }

    if(!req.body.repassword){
        req.flash("warn", "Vui lòng xác nhận mật khẩu!");
        res.redirect(`back`);
        return;
    }

    if(req.body.password != req.body.repassword){
        req.flash("warn", "Mật khẩu không khớp!");
        res.redirect(`back`);
        return;
    }
    next();
}