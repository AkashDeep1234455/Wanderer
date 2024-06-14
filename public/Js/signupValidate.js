const invalid_entry1 = document.querySelector("#invalid-entry1");
const invalid_entry2 = document.querySelector("#invalid-entry2");
const invalid_entry3 = document.querySelector("#invalid-entry3");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const email = document.querySelector("#email");
const form =  document.querySelector(".signupform");
const success_flash = document.querySelector(".success");
const success_button = document.querySelector(".success_button");

const button = document.querySelector(".submit-button");

function validate(){
    if(username.value.length===0){
        invalid_entry1.style.display = "block";
        setTimeout(()=>{
            invalid_entry1.style.display = "none";
        },2000)
    }else{
        invalid_entry1.style.display = "none";
    }
    if(password.value.length===0){
        invalid_entry2.style.display = "block";
        setTimeout(()=>{
            invalid_entry2.style.display = "none";
        },2000)
    }else{
        invalid_entry2.style.display = "none";
    }
    if(email.value.length===0){
        invalid_entry3.style.display = "block";
        setTimeout(()=>{
            invalid_entry3.style.display = "none";
        },2000)
    }else{
        invalid_entry3.style.display = "none";
    }
    if(email.value.length!==0&&username.value.length!==0&&password.value.length!==0){
        form.submit();
    }
}


form.addEventListener("submit",function(event){
    console.log("heard");
    event.preventDefault();
    validate();
});


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