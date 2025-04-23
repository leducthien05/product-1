//Thay đổi form trạng thái
const buttonChange = document.querySelectorAll("[change-status-multi]");
const formChangeStatus = document.querySelector("#form-change-status");
const path = formChangeStatus.getAttribute("data-path");
console.log(path);
if(buttonChange.length > 0 ){
    buttonChange.forEach(button =>{
        button.addEventListener("click", (e)=>{
            e.preventDefault();
            const status = button.getAttribute("status");
            const id = button.getAttribute("id");
            let changeStatus = (status == "active") ? "inactive" : "active";
            const action = path + `/${changeStatus}/${id}?_method=PATCH`;
            formChangeStatus.action = action;

            formChangeStatus.submit();
        });
    })
}

//Delete Product
const buttonDelete = document.querySelectorAll("[button-delete]");
const formDelete = document.querySelector("#form-delete");
const pathDelete = formDelete.getAttribute("data-path");

if(buttonDelete.length > 0){
    buttonDelete.forEach(button =>{
        button.addEventListener("click", (e)=>{
            e.preventDefault();
            const Confirm = confirm("Bạn có chắc muốn xóa sản phẩm này chứ hả?");
            if(Confirm){
                const id = button.getAttribute("id-delete");
                const action = pathDelete + `/${id}?_method=DELETE`;
                formDelete.action = action;
                formDelete.submit();
            }
        })
    })
}