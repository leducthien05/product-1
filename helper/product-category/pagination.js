module.exports = (query, countProduct)=>{
    let objectPagination = {
        indexPage: 1,
        limitItem: countProduct
    }
    if(query.page){
        objectPagination.indexPage = Number(query.page);
    }
    objectPagination.skip = (objectPagination.indexPage - 1)* objectPagination.limitItem;
    const numberPage = Math.ceil(countProduct / objectPagination.limitItem);
    objectPagination.numberPage = numberPage;

    return objectPagination;
}   
