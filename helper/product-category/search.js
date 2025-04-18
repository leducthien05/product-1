module.exports = (query)=>{
    let obSearch = {
        keyword: ""
    }
    // let keyword = "";
    if(query.keyword){
        obSearch.keyword = query.keyword;

        const regex = new RegExp(obSearch.keyword, "i");
        obSearch.regex = regex;
    }
    return obSearch;
}