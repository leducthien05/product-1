        

module.exports = (query) => {
    //Xây dựng bộ lọc button
    let filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Không hoạt động",
            status: "inactive",
            class: ""
        }
    ]
    //Xác định trạng thái của sản phẩm để in ra trình duyệt
    if(query.status){
        const index = filterStatus.findIndex(item => item.status == query.status);
        filterStatus[index].class = "active";
    }
    else{
        const index = filterStatus.findIndex(item => item.status == "");
        filterStatus[index].class = "active";
    }
    return filterStatus;
}