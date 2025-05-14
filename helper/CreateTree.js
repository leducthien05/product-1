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

module.exports = createTree;