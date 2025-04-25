const tablePermission = document.querySelector("[table-permission]");
if(tablePermission){
    let permission = [];  
    const buttonSubmit = document.querySelector("[button-submit]");
    buttonSubmit.addEventListener("click", ()=>{
        const rows = tablePermission.querySelectorAll("[data-name]");
        rows.forEach(item =>{
            const name = item.getAttribute("data-name");
            const inputs = item.querySelectorAll("input");
            if(name == "id"){
                inputs.forEach(input =>{
                    const id = input.value;
                    permission.push({
                        id: id,
                        permission: []
                    });
                });
            }else{
                inputs.forEach((input, index)=>{
                    const check = input.checked;
                    if(check == true){
                        permission[index].permission.push(name);
                    }                   
                }); 
            }
            
        });
        if(permission.length > 0){
            const formPermission = document.querySelector("#form-permission");
            const inputForm = formPermission.querySelector("[name='permission']");
            const result = JSON.stringify(permission);
            inputForm.value = result;
            formPermission.submit();
        }
    });    
}

//Data record
const dataForm = document.querySelector("[data-record]");
if(dataForm){
    const tablePermission = document.querySelector("[table-permission]");
    const data = dataForm.getAttribute("data-record");
    const result = JSON.parse(data);
    result.forEach((item, index)=>{
        const permission = item.permission;
        
        permission.forEach(permission=>{
            const row = tablePermission.querySelector(`[data-name='${permission}']`);
            const input = row.querySelectorAll("input")[index];
            input.checked = true;
        });
    });
}