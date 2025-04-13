// Chọn ra tất cả các nút bấm trạng thái
const activeChose = document.querySelectorAll("[button-status]");
if (activeChose.length > 0) {
    // Lấy URL hiện tại
    let url = new URL(window.location.href);

    activeChose.forEach(button => {
        button.addEventListener("click", () => {
            // Lấy giá trị trạng thái từ nút bấm
            const status = button.getAttribute("button-status");

            if (status) {
                url.searchParams.set("status", status); // Cập nhật trạng thái vào URL
            } else {
                url.searchParams.delete("status"); // Xóa nếu không có trạng thái
            }

            // Điều hướng đến URL mới
            window.location.href = url.href;
        });
    });
}

//Search 
const search = document.querySelector("form-search");
if(search){
    //Lấy URL hiện tại
    let url = new URL(window.location.href);
    search.addEventListener("submit", (e)=>{
        //tắt tự động làm mới
        e.preventDefault();
        //lấy giá trị nhập từ bàn phím
        const keyword = e.target.element.keyword.value;
        if(keyword){
            url.searchParams.set("keyword", keyword);
        }
        else{
            url.searchParams.delete("keyword");
        }

        window.location.href = url.href;
    })
    
}

//Pagination
    const PageLink = document.querySelectorAll("[button-page]");
    if(PageLink){
        PageLink.forEach((button) => {
            button.addEventListener('click', ()=>{
                let url = new URL(window.location.href);
                const indexpage = button.getAttribute("button-page");
                url.searchParams.set("page", indexpage);
                console.log(indexpage);
                window.location.href = url.href;
            })
        })
    }

//Ô checkbox
const changeAll = document.querySelector("[checkbox-multi]");
if(changeAll){
    const checkId = changeAll.querySelectorAll("input[name = 'id']");
    const checkAll = changeAll.querySelector("input[name='checkall']");

    checkAll.addEventListener("click", ()=>{
        checkId.forEach(input =>{
            if(checkAll.checked){
                input.checked = true;
            }
            else{
                input.checked = false;
            }
        })
    });

    checkId.forEach(input =>{
        input.addEventListener('click', ()=>{
            const countChecked = changeAll.querySelectorAll("input[name = 'id']:checked").length;
            if(countChecked == checkId.length){
                checkAll.checked = true;
            }
            else{
                checkAll.checked = false;
            }
        })
    })
}

//Change form 
const formChange = document.querySelector("[form-change-multi]");
if(formChange){
    formChange.addEventListener("submit", (e)=>{
        e.preventDefault();
        const changeAll = document.querySelector("[checkbox-multi]");
        const inputChecked = changeAll.querySelectorAll("input[name = 'id']:checked");
        //console.log(inputChecked);
        const typeChange = e.target.elements.type.value;
        if(typeChange == "deleted-all"){
            const Confirm = confirm("Bạn có chắc muốn xóa những sản phẩm này chứ?");
            if(!Confirm){
                return;
            }
        }   
        if(inputChecked.length > 0){
            let ids = [];
            //Lấy ô input
            const inputSearchId = formChange.querySelector("input[name = 'ids']");

            //Lấy danh sách id đã chọn
            inputChecked.forEach(input =>{
                const id = input.value;
                if(typeChange == "position"){
                    const position = input.closest("tr").querySelector("input[name='position']").value;
                    ids.push(`${id}-${position}`);
                }
                else{
                    ids.push(id);
                }    
            });
            inputSearchId.value = ids.join(", ");
            console.log(inputSearchId.value);
        }
            formChange.submit();    
    });
}

//Alert Change
const alertChange = document.querySelector("[show-alert]");
if(alertChange){
    const timeOffAlert = parseInt(alertChange.getAttribute("data-time"));
    setTimeout(() => {
        alertChange.classList.add("alert-hidden");
    }, timeOffAlert);
    const closeAlert = document.querySelector("[close-alert]");
    closeAlert.addEventListener("click", ()=>{
        alertChange.classList.add("alert-hidden");
    });
}

//Upload Image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
    const imageInput = document.querySelector("[image-input]");
    const imagePreview = document.querySelector("[image-preview]");
    imageInput.addEventListener("change", (e)=>{
        console.log(e.target.files);
        const file = e.target.files[0];
        console.log(file);
        if(file){
            imagePreview.src = URL.createObjectURL(file);
            console.log(imagePreview.src);
            const deleteImage = document.querySelector(".delete-btn");
            deleteImage.classList.remove("d-none");
            deleteImage.addEventListener("click", ()=>{
                imagePreview.src ="";
                deleteImage.classList.add("d-none");
            });   
        }  
    });
}

//Sắp xếp sản phẩm theo tiêu chí
const sortProduct = document.querySelector("[sort]");
console.log(sortProduct);
if(sortProduct){
    let url = new URL(window.location.href);
    const selectSort = document.querySelector("[sort-select]");
    const sortClear = document.querySelector("[sort-clear]");
    selectSort.addEventListener("change", (e)=>{
        console.log(e.target.value);
        const value = e.target.value;
        console.log(typeof value);
        let [sortKey, sortValue] = value.split("-");

        url.searchParams.set("sortKey", sortKey);
        url.searchParams.set("sortValue", sortValue);
        window.location.href = url.href;
    });
    sortClear.addEventListener("click", ()=>{
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");
        window.location.href = url.href;
    });
    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");
    const StringSort = `${sortKey}-${sortValue}`;
    if(StringSort){
        const optionSeleted = selectSort.querySelector(`option[value='${StringSort}']`);
        optionSeleted.selected = true;
    }
}