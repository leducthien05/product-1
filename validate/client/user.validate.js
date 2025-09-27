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