module.exports.item = (req, res, next)=>{
    if(!req.body.name){
        req.flash("warn", "Vui lòng nhập tiêu đề của sản phẩm!");
        res.redirect(`back`);
        return;
    }
    next();
}