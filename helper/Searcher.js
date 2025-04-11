module.exports = (query) =>{
    var obSearch = {
        keyword: ""
    }
    if(query.keyword){
        obSearch.keyword = query.keyword;
    }
    if(query.keyword){
        keyword = query.keyword;
        const regex = new RegExp(keyword, "i");
        obSearch.regex = regex;
    }
    return obSearch;
}