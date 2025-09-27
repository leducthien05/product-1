//Lưu thay đổi số lượng sản phẩm trong giỏ hàng
const inputQuantity = document.querySelectorAll("input[name='quantity']");
if(inputQuantity.length > 0){
    inputQuantity.forEach((input)=>{
        input.addEventListener("change", ()=>{
            const ID = input.getAttribute("product-id");
            const value = input.value;

            window.location.href = `/cart/update/${ID}/${value}`;
        })
    })
}