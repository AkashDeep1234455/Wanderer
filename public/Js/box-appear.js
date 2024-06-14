let user_entry = document.querySelector(".user_entry");
let box_appear = document.querySelector(".box-appear");
const success_flash = document.querySelector(".success");
const success_button = document.querySelector(".success_button");
let visible = true;



//function to display log-sign in box upon click
function boxDisplay(){
    event.stopPropagation();
    if(visible){
       box_appear.style.display = "flex";
       visible = false;
    }else{
        box_appear.style.display = "none";
        visible=true;
    }
}


user_entry.addEventListener("click",boxDisplay,);
window.addEventListener("click",()=>{
    if(!visible && !box_appear.contains(event.target) && event.target !== user_entry){
        box_appear.style.display = "none";
        visible=true;
    }
})

success_button.addEventListener("click",()=>{
    success_flash.classList.add('goUp');
    setTimeout(()=>{
        success_flash.style.display = "none";
    },400);
})

setTimeout(()=>{
    success_flash.classList.add('goUp');
    setTimeout(()=>{
        success_flash.style.display = "none";
    },400);
},3000);




