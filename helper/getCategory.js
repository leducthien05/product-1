const ProductCategory = require("../model/product-category.model");

module.exports.getCategory = async (parent_ID)=>{
    const getSubCategory = async (parent_ID)=>{
        const danhmuc = await ProductCategory.find({
            deleted: false,
            status: "active",
            parent_id: parent_ID
        });

        //nhóm các danh con vào một mảng
        let result = [...danhmuc];

        for(const item of danhmuc){
            const children = await getSubCategory(item.id);
            result = result.concat(children);
        }
        return result;
    }
    const allSub = await getSubCategory(parent_ID);
    return allSub;
}