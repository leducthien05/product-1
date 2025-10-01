const User = require("../../model/user.model");
const PasswordForgot = require("../../model/passwordForgot.model");
const Cart = require("../../model/cart.model");

const md5 = require("md5");
const generateHelper = require("../../helper/generate");
const nodemailerHelper = require("../../helper/nodemailer");

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

    const cart = await Cart.findOne({
        userID: user._id
    });
    if(cart){
        res.cookie("cartID", cart._id);
    }
    else{
        await Cart.updateOne({
            _id: req.cookies.cartID
        }, {
            userID: user._id
        })
    }
    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/");
}

module.exports.passwordForgot = async (req, res)=>{
    res.render("client/pages/user/passwordForgot", {
        titlePage: "Quên mật khẩu"
    });
}

module.exports.passwordForgotPost = async (req, res)=>{
    const email = req.body.email;
    const user = await User.findOne({
        email: email
    });

    if(!user){
        req.flash("error", "Email không tồn tại");
        req.redirect("back");
        return;
    }

    //Tạo mã OTP
    const otp = generateHelper.generateRandomNumber(6);

    const objectPasswordForgot = {
        email: email,
        otp: otp,
        expiresAt: Date.now() + 120000,
    }
    
    const forgot = new PasswordForgot(objectPasswordForgot);
    await forgot.save();

    const subject = "Mã OTP để lấy lại mật khẩu";
    const html = `Mã OTP để lấy lại mật khẩu là: <b>${otp}</b>.
    Chỉ có hiệu lực trong 2 phút!`

    nodemailerHelper.sendMail(email, subject, html);

    res.cookie("tokenUser", user.tokenUser);
    res.redirect(`/user/password/otpPassword?email=${email}`);
}

module.exports.otpPassword = async (req, res)=>{
    const email = req.query.email;
    res.render("client/pages/user/otpPassword", {
        titlePage: "Nhập mã OTP",
        email: email
    });
}

module.exports.otpPasswordPost = async (req, res)=>{
    const email = req.body.email;
    const otp = req.body.otp;

    const result = await PasswordForgot.findOne({
        email: email,
        otp: otp
    });

    if(!result){
        req.flash("error", "Mã OTP không chính xác hoặc đã hết hạn");
        res.redirect("back");
        return;
    }

    res.redirect("/user/password/reset");
}

module.exports.reset = async (req, res)=>{
    res.render("client/pages/user/reset", {
        titlePage:"Thay đổi mật khẩu"
    })
}

module.exports.resetPost = async (req, res)=>{
    const password = req.body.password;
    const tokenUser = req.cookies.tokenUser;

    const user = await User.updateOne({
        tokenUser: tokenUser
    }, {
        password: md5(password)
    });

    res.redirect("/");
}

module.exports.info = async (req, res)=>{
    const tokenUser = req.cookies.tokenUser;

    const user = await User.findOne({
        tokenUser: tokenUser
    }).select("-password");

    res.render("client/pages/user/info", {
        titlePage: "Thông tin cá nhân",
        user: user
    })

}