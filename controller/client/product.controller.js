const Product = require("../../model/product.model");
const ProductCategory = require("../../model/product-category.model");
const helper = require("../../helper/newPriceProduct");
const getCategory = require("../../helper/getCategory");

module.exports.index = async (req, res) =>{
  let find ={
    delete: false,
    status: "active"
  }

  const product = await Product.find(find).sort({position: "desc"});
  res.render('client/pages/product/index', {
    title: "Trang danh sách sản phẩm",
    product: product
  });
}

module.exports.category = async (req, res)=>{
  const slug = req.params.slugCategory;
  const category = await ProductCategory.findOne({
    deleted: false,
    status: "active",
    slug: slug
  });

  
  const listCategory = await getCategory.getCategory(category.id);
  const record = listCategory.map(item => item.id);

  const product = await Product.find({
    delete: false,
    status: "active",
    product_parent_id: { $in: [category.id, ...record] }
  });

  const newproduct = helper.newPrice(product)
  res.render('client/pages/product/index', {
    title: category.slug,
    product: newproduct
  })
}

module.exports.detail = async (req, res)=>{
  const slug = req.params.slug;
  const product = await Product.findOne({
    delete: false,
    status: "active",
    slug: slug
  });

  if(product.product_parent_id){
    const categoryItem = await ProductCategory.findOne({
      deleted: false,
      _id: product.product_parent_id,
      status: "active"
    }); 
    product.category = categoryItem;
    console.log("Category:", categoryItem);
    console.log("Product:", product);

  }

  product.newPrice = helper.newPriceProduct(product);
  res.render("client/pages/product/detail", {
    title: product.title,
    productDetail: product
  });
}
