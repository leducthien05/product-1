const ProductCategory = require("../../model/product-category.model");
const filterStatus1 = require("../../helper/product-category/filterStatus");
const search = require("../../helper/product-category/search");
const pagination = require("../../helper/product-category/pagination");
const systemConfig = require("../../config/system");

module.exports.index = async (req, res)=>{
    let find ={
        deleted: false
    }
    //Hiện thị trạng thái sản phẩm
    const filterStatus = filterStatus1(req.query);
    if(req.query.status){
        find.status = req.query.status;
    }
    // Kết thúc in trạng thái sản phẩm

    //Tìm kiếm sản phẩm
    const searchProduct = search(req.query);
    if(req.query.keyword){
        find.title = searchProduct.regex;
    }
    //Kết thúc tìm kiếm sản phẩm

    //Phân trang
    const countRecord = await ProductCategory.countDocuments(find);
    const objectPagination = pagination(req.query, countRecord);
    //Kết thúc phân trang
    let cnt = 0;
    function createTree(arr, parent_id = ""){
        const Tree = [];
        arr.forEach(item =>{
            if(item.parent_id  == parent_id){
                cnt ++;
                const newItem = item;
                newItem.index = cnt;
                const children = createTree(arr, item._id);
                if(children.length > 0){
                    newItem.children = children;
                }
                Tree.push(newItem);
            }
        });
        return Tree;
    }
    const record = await ProductCategory.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip);
    const newrecord = createTree(record);
    res.render('admin/pages/product-category/index', {
        titlePage:"Trang danh mục sản phẩm",
        productCategory : newrecord,
        filterStatus: filterStatus,
        keyword: searchProduct.key,
        pagination: objectPagination
    });
}

module.exports.create = async (req, res)=>{
    let find = {
        deleted: false
    };
    function createTree(arr, parent_id = ""){
        const Tree = [];
        arr.forEach(item => {
            //Tìm phần tử cha
            if(item.parent_id == parent_id){
                const newItem = item;
                const children = createTree(arr, item._id);
                if(children.length > 0){
                    newItem.children = children;
                }
                Tree.push(newItem);
            }
        });
        return Tree;
    }
    const record = await ProductCategory.find(find);
    const newrecord = createTree(record);
    console.log(newrecord);
    res.render("admin/pages/product-category/create", {
        titlePage: "Trang danh mục sản phẩm",
        record: newrecord
    });
}

module.exports.createItem = async (req, res)=>{
    console.log(req.body);
    if(req.body.position == ""){
        const countProduct = await ProductCategory.countDocuments();
        req.body.position = countProduct + 1;
    }
    const product = await ProductCategory(req.body);
    await product.save();
    res.redirect(`${systemConfig.prefixAdmin}/product-category`);
}

module.exports.edit = async (req, res)=>{
    function createTree(arr, parent_id = ""){
        const Tree = [];
        arr.forEach(item =>{
            if(item.parent_id  == parent_id){
                const newItem = item;
                const children = createTree(arr, item._id);
                if(children.length > 0){
                    newItem.children = children;
                }
                Tree.push(newItem);
            }
        });
        return Tree;
    }
    const id = req.params.id;
    const find = {
        deleted: false,
        _id: id
    };
    const product = await ProductCategory.find({deleted: false});
    const record = await ProductCategory.findOne(find);
    const newrecord = createTree(product);
    console.log(newrecord);
    res.render("admin/pages/product-category/edit", {
        titlePage: "Trang chỉnh sửa danh mục sản phẩm",
        record: record,
        newrecord: newrecord
    })
}

module.exports.editItem = async (req, res)=>{
    const id = req.params.id;
    console.log(id);
    console.log(req.body);
    await ProductCategory.updateOne({_id: id}, req.body);
    res.redirect(`${systemConfig.prefixAdmin}/product-category`);
}

module.exports.detail = async (req, res)=>{
    const id = req.params.id;
    const find = {
        deleted: false,
        _id: id
    };
    const product = await ProductCategory.findOne(find);
    console.log(product);
    res.render("admin/pages/product-category/detail", {
        titlePage: "Trang chi tiết sản phẩm",
        product: product
    })
}

module.exports.delete = async (req, res)=>{
    const id = req.params.id;
    await ProductCategory.updateMany({_id: id}, {deleted: true});
    res.redirect("back");
}