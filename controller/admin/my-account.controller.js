const Accounts = require("../../model/accounts.model");
const md5 = require("md5");

module.exports.index = async (req, res)=>{
    res.render("admin/pages/my-account/index", {
        titlePage: "Trang thông tin cá nhân"
    });
}

module.exports.edit = async (req, res)=>{
    res.render("admin/pages/my-account/edit", {
        titlePage: "Trang chỉnh sửa thông tin "
    })
}

module.exports.editItem = async (req, res)=>{
    const id = res.locals.user.id;
    const emailExits = await Accounts.findOne({
        _id: {$ne: id},
        email: req.body.email,
        deleted: false
    });
    if(emailExits){
        req.flash("error", `Email ${req.body.email} đã tồn tại`);
    }
    else{
        if(!req.body.password){
            delete req.body.password;
        }
        else{
            req.body.password = md5(req.body.password);
        }

        try {
            await Accounts.updateOne({_id:id }, req.body);
            req.flash("success", "Cập nhật thành công");
        } catch (error) {
            console.log(error)
        }
    }
    res.redirect("back");

}