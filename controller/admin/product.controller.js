//Thêm phần module vào đây
const Product = require("../../model/product.model");
const Search = require("../../helper/Searcher");
const filterStatus = require("../../helper/fiterStatus");
const systemConfig = require("../../config/system");
module.exports.product = async (req, res) =>{
    //Hiển thị trạng thái sản phẩm
    const StatusProduct = filterStatus(req.query);
    // console.log(req.query.status);
    //Điều kiện hiện thị sản phẩm
        let find = {
            delete: false
        }
        if(req.query.status){
            find.status = req.query.status;
        }
        
    //Tìm kiếm sản phẩm
        const moduleSearch = Search(req.query);
        if(moduleSearch.regex){
            find.name = moduleSearch.regex;
        }
    //Phân trang danh sách sản phẩm
        let Page = {
            indexPage: 1,
            limitItem: 5
        }
        if(req.query.page){
            Page.indexPage = Number(req.query.page);
        }
        //Số sản phẩm bắt đầu lấy sau mỗi trang
        Page.skip = (Page.indexPage - 1) * Page.limitItem;

        //Tính số trang sản phẩm
        const countPage = await Product.countDocuments(find);
        Page.numberPage = Math.ceil(countPage / Page.limitItem);      
    //lấy sản phẩm in ra màn hình
    const product = await Product.find(find).sort({position: "desc"}).limit(Page.limitItem).skip(Page.skip);
    res.render("admin/pages/product/index", {
        titlePage :"Trang danh sách sản phẩm",
        product: product,
        statusList: StatusProduct,
        keyword: moduleSearch.keyword,
        pagination: Page

    });
}
//[PATCH] /admin/product/changeStatus/:status/:id
module.exports.changeStatus = async (req, res) =>{
    //console.log(req.params);
    const id = req.params.id;
    const status = req.params.status;

    await Product.updateOne({_id: id}, {status: status});
    req.flash("success", "Đã thay đổi trạng thái sản phẩm thành công!");
    res.redirect('back');
}
//[PATCH] /admin/product/change-multi
module.exports.changeMulti = async (req, res) =>{
    console.log(req.body);
    const id = req.body.ids.split(", ");
    const status = req.body.type;
    switch (status) {
        case "active":
            await Product.updateMany({_id: {$in: id}},{status: status});
            break;
        case "inactive":
            await Product.updateMany({_id: {$in: id}},{status: status});
            break;
        case "deleted-all":
            await Product.updateMany({_id: {$in: id}},{delete: true});
            break;
        case "position":
            for (const item of id) {
                let [idPosition, position] = item.split("-");
                position = parseInt(position);
                await Product.updateOne({_id: idPosition},{position: position});
            } 
            
        default:
            break;
    }
    req.flash("success", "Đã thay đổi trạng thái sản phẩm thành công!");
    res.redirect('back');
}
//[DELETE] /admin/product/delete
module.exports.delete = async (req, res) =>{
    console.log(req.params.id);
    const id = req.params.id;
    const deleted = true;
    await Product.updateOne({_id: id}, {delete: deleted});
    req.flash("success", "Đã xóa sản phẩm thành công!");
    res.redirect('back');
}
//[GET] /admin/product/create
module.exports.create = async (req, res) =>{
    res.render("admin/pages/product/create", {
        tiltePage: "Trang tạo sản phẩm"
    })
}
//[POST] /admin/product/createItem
module.exports.createItem = async (req, res) =>{
    console.log(req.body);
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if(req.body.position ==""){
        const countProduct = await Product.countDocuments();
        req.body.position = countProduct + 1;
    }
    else{
        req.body.position = parseInt(req.body.position);
    }
    req.body.thumbnail = `/uploads/${req.file.filename}`;
    const productItem = await Product(req.body);
    productItem.save();
    res.redirect(`${systemConfig.prefixAdmin}/product`);
}
//[GET] /admin/product/edit/:id
module.exports.edit = async (req, res) =>{
    console.log(req.params.id);
    const find = {
        delete: false,
        _id: req.params.id
    }
    const product = await Product.find(find);
    console.log(product);
    res.render('admin/pages/product/edit', {
        titlePage: "Trang chỉnh sửa sản phẩm",
        product: product[0]
    });
}
//[PATCH] /admin/product/edit/:id
module.exports.editItem = async (req, res) =>{
    const id = req.params.id;
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if(req.body.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    try {
        await Product.updateOne({_id: id}, req.body); 
        req.flash("success", "Cập nhật thành công");
        res.redirect(`back`);
    } catch (error) {
        req.flash("error", "Chỉnh sản phẩm không thành công");
        res.redirect(`back`);
    }
    
}
//[GET] /admin/product/detail/:slug
module.exports.detail = async (req, res) =>{
    console.log(req.params.slug);
    try {
        const find = {
            delete: false,
            slug: req.params.slug
        };
        const product = await Product.findOne(find);
        console.log(product);
        res.render('admin/pages/product/detail', {
            titlePage: product.slug,
            product: product
        });
    } catch (error) {
        res.send(error);
    }
}