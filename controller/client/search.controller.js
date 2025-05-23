const Product = require("../../model/product.model");
const helper = require("../../helper/newPriceProduct");

module.exports.search = async (req, res)=>{
    const keyword = req.query.keyword;
    let product = []
    if(keyword){
        const regex = new RegExp(keyword, "i");
        const result = await Product.find({
            name: regex,
            delete: false,
            status: "active"
        });
        product = helper.newPrice(result);
    }
    
    res.render("client/pages/search/index", {
        titlePage: "Kết quả tìm kiếm",
        keyword: keyword,
        product: product
    })
}
