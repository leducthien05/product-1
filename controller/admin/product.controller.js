//Thêm phần module vào đây
const Product = require("../../model/product.model");
const Accounts = require("../../model/accounts.model");
const Search = require("../../helper/Searcher");
const filterStatus = require("../../helper/fiterStatus");
const systemConfig = require("../../config/system");
const ProductCategory = require("../../model/product-category.model");

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
    //Sắp xếp sản phẩm theo tiêu chí
        let sort = {};
        if(req.query.sortKey && req.query.sortValue){
            sort[req.query.sortKey] = req.query.sortValue;
        }
        else{
            sort.position = "desc";
        }
    //Tính số trang sản phẩm
        const countPage = await Product.countDocuments(find);
        Page.numberPage = Math.ceil(countPage / Page.limitItem);      
    //lấy sản phẩm in ra màn hình
        const products = await Product.find(find).sort(sort).limit(Page.limitItem).skip(Page.skip);

    //Lưu lịch sử tạo sản phẩm
        for(const product of products){
            //Lấy thông tin người tạo 
            const user = await Accounts.findOne({
                deleted: false,
                _id: product.createdBy.account_ID
            });

            if(user){
                product.userName = user.fullname;
            }

            //Lấy thông tin người sửa cuối cùng
            const updatedBy = product.updatedBy[product.updatedBy.length - 1];
            if(updatedBy){
                const userUploaded = await Accounts.findOne({
                    deleted: false,
                    _id: updatedBy.account_ID
                });

                if(userUploaded){
                    updatedBy.nameUpdated = userUploaded.fullname
                }
            }
            
        }
    //Hiển thị ra ngoài giao diện
        res.render("admin/pages/product/index", {
            titlePage :"Trang danh sách sản phẩm",
            product: products,
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
    const updated = await Accounts.find({
        account_ID: res.locals.user.id,
        updatedAt: new Date
    });

    const id = req.body.ids.split(", ");
    const status = req.body.type;
    switch (status) {
        case "active":
            await Product.updateMany({_id: {$in: id}},{
                status: status,
                $push: { updatedBy: updated }
            });
            break;
        case "inactive":
            await Product.updateMany({_id: {$in: id}},{
                status: status,
                $push: { updatedBy: updated }
            });
            break;
        case "deleted-all":
            await Product.updateMany(
                {_id: {$in: id}},
                {
                    delete: true,
                    deleteBy:{
                        account_Id: res.locals.user.id,
                        deletedAt: Date.now
                    }
                }
            );
            //await Product.deleteMany({_id: {$in: id}},{delete: true});
            break;
        case "position":
            for (const item of id) {
                let [idPosition, position] = item.split("-");
                position = parseInt(position);
                await Product.updateOne({_id: idPosition},{
                    position: position,
                    $push: { updatedBy: updated }
                });
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
    const find = {
        deleted: false
    }
    function createTree(arr, parent_id = ""){
        const tree = [];
        arr.forEach(item => {
            if(item.parent_id == parent_id){
                const newItem = item;
                const children = createTree(arr, item.id);
                if(children.length > 0){
                    newItem.children = children;
                }
                tree.push(newItem);
            }
        });
        return tree;
    }
    const product = await ProductCategory.find(find);
    const record = createTree(product);
    res.render("admin/pages/product/create", {
        tiltePage: "Trang tạo sản phẩm",
        record: record
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

    req.body.createdBy = {
        account_ID: res.locals.user.id
    }
    const productItem = await Product(req.body);
    productItem.save();
    res.redirect(`${systemConfig.prefixAdmin}/product`);
}

//[GET] /admin/product/edit/:id
module.exports.edit = async (req, res) =>{
    const id = req.params.id;
    const find = {
        delete: false,
        _id: id
    }
    const product = await Product.findOne(find);
    res.render('admin/pages/product/edit', {
        titlePage: "Trang chỉnh sửa sản phẩm",
        product: product
    });
}

//[PATCH] /admin/product/edit/:id
module.exports.editItem = async (req, res) =>{
    const id = req.params.id;
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    const updated = {
        account_ID: res.locals.user.id,
        updatedAt: new Date
    }
    try {
        await Product.updateOne({_id: id}, 
            {
                ...req.body,
                $push: { updatedBy: updated }
            }
        ); 
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