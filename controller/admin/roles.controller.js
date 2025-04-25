const Roles =require("../../model/roles.model");
const systemConfig = require("../../config/system");

module.exports.index = async (req, res)=>{
    const find ={
        deleted: false
    };

    const record = await Roles.find(find);
    res.render("admin/pages/roles/index", {
        titlePage: "Trang nhóm quyền",
        record: record
    })
}

module.exports.create = async (req, res)=>{
    res.render("admin/pages/roles/create", {
        titlePage: "Trang tạo phân quyền",
    });
}

module.exports.createItem = async (req, res)=>{
    try {
        const newRecord = new Roles(req.body);
        await newRecord.save();
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
    } catch (error) {
        res.redirect("back");
    }
}

module.exports.detail = async (req, res)=>{
    const id = req.params.id;
    const find = {
        deleted: false,
        _id: id
    };
    const record = await Roles.find(find);
    res.send("OK");
}

module.exports.edit = async (req, res)=>{
    const id = req.params.id;
    const find = {
        deleted: false,
        _id: id
    };
    
    const record = await Roles.findOne(find);
    console.log(record);
    res.render('admin/pages/roles/edit', {
        titlePage: "Trang chỉnh sửa quyền",
        record: record
    })
}

module.exports.editItem = async (req, res)=>{
    const id = req.params.id
    try {
        await Roles.updateOne({_id: id}, req.body);
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
    } catch (error) {
        res.redirect("back");
    }
    
}

module.exports.permission = async (req, res)=>{
    const find ={
        deleted: false
    };
    const record = await Roles.find(find);
    res.render("admin/pages/roles/permission", {
        titlePage: "Trang phân quyền",
        record: record
    });
}

module.exports.permissionItem = async (req, res) =>{
    try {
        const result = JSON.parse(req.body.permission);
        for(let item of result){
            await Roles.updateOne({_id: item.id}, {permission: item.permission});
        }
        req.flash("success", "Cập nhật thành công");
        res.redirect("back");
    } catch (error) {
        res.render("admin/pages/roles/404", {
            titlePage: "404"
        })
    }

    
}