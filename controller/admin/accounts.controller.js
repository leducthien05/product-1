const Accounts = require("../../model/accounts.model");
const Roles = require("../../model/roles.model");
const md5 = require("md5");
const systemConfig = require("../../config/system");

module.exports.index = async (req, res)=>{
    const find = {
        deleted: false
    }
    const record = await Accounts.find(find).select("-password -token");
    for(const item of record){
        const role = await Roles.findOne({
            deleted: false,
            _id: item.roles_ID
        });
        item.role = role;
    }

    res.render("admin/pages/accounts/index", {
        titlePage: "Danh sách tài khoản",
        record: record
    })
}

module.exports.create = async (req, res)=>{
    const record = await Roles.find({
        deleted: false,
    });
    res.render("admin/pages/accounts/create", {
        titlePage: "Trạng tạo tài khoản",
        record: record
    })
}

module.exports.createItem = async (req, res)=>{
    try {
        req.body.password = md5(req.body.password);
        const email = req.body.email;
        const emailExits = await Accounts.findOne({
            email: email,
            deleted: false
        });
        if(emailExits){
            req.flash("error", "Tài khoản email này đã tồn tại");
            res.redirect("back");
            return;
        }

        if(!req.body.password){
            req.flash("error", "Vui lòng nhập mật khẩu!");
            res.redirect("back");
            return;
        }

        const record = new Accounts(req.body);
        await record.save();
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
        
    } catch (error) {
        res.redirect("back");
    }

}

module.exports.edit = async (req, res)=>{
    const id = req.params.id;
    const find = {
        deleted: false,
        _id: id
    };
    const roles  = await Roles.find({
        deleted: false
    })
    const record = await Accounts.findOne(find);
    res.render("admin/pages/accounts/edit", {
        titlePage: "Trang chỉnh sửa tài khoản",
        record: record,
        roles: roles
    })
}

module.exports.editItem = async (req, res)=>{
    try {
        const id = req.params.id;
        const email = req.body.email;
        const emailExits = await Accounts.findOne({
            _id: {$ne: id},
            email: email,
            deleted: false
        });
        if(emailExits){
            req.flash("error", "email đã tồn tại!");
            res.redirect("back");
            return;
        }else{
            if(!req.body.password){
                delete req.body.password;
            }
            else{
                req.body.password = md5(req.body.password);
            }
            console.log(req.body);
            await Accounts.updateOne({_id: id}, req.body);
            res.redirect(`${systemConfig.prefixAdmin}/accounts`);
        }

    } catch (error) {
        console.log(error);
        res.redirect("back");
        
    }
}