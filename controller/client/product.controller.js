const Product = require("../../model/product.model")

module.exports.index = async (req, res) =>{
  let find ={
    delete: false
  }

  const product = await Product.find(find).sort({position: "desc"});
    res.render('client/pages/product/index', {
        title: "Trang danh sách sản phẩm",
        product: product
      });
}

