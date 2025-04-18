module.exports = (objectPagination, query, countProduct)=>{
    if(query.page){
        objectPagination.indexPage = Number(query.page);
    }
    objectPagination.skip = (objectPagination.indexPage - 1)* objectPagination.limitItem;
    const numberPage = Math.ceil(countProduct / objectPagination.limitItem);
    objectPagination.numberPage = numberPage;

    return objectPagination;
}   
