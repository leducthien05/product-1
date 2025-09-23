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