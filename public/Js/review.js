let range = document.querySelector("#rating");
let star_glow = document.querySelectorAll(".star-glow");
let comment = document.querySelector("#comment");
let invalid_entry1 = document.querySelector("#invalid-entry1");
let invalid_entry2 = document.querySelector("#invalid-entry2");
let button = document.querySelector(".comment-submit-button");
let form = document.querySelector(".review-form");
const starContainers = document.querySelectorAll('[id^="show-stars-"]');


function changeColor(value){
    for(let i=0;i<star_glow.length;i++){
        if(i<value){
            star_glow[i].style.color = "orange";
        }else{
            star_glow[i].style.color = "gray";
        }
    }
}
range.addEventListener("input",()=>{
    changeColor(range.value);
})
changeColor(range.value);


///invalid entry
function invalidEntry(){
    if(comment.value.length===0){
        invalid_entry2.style.display = "none";
        invalid_entry1.style.display = "block";
        comment.classList.add("shadow");
    }else if(comment.value.length<10){
        invalid_entry1.style.display = "none";
        invalid_entry2.style.display = "block";
        comment.classList.add("shadow");
    }else{
        form.submit();
    }
}


form.addEventListener("submit",function(event){
    event.preventDefault();
    invalidEntry();
})


///changing star color based on rating

document.addEventListener('DOMContentLoaded', () => {
    // Change color of stars based on rating
    function changeStarColors(starsContainer, rating) {
        const stars = starsContainer.querySelectorAll('.star-glow');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.style.color = "orange";
            } else {
                star.style.color = "gray";
            }
        });
    }
    const starContainers = document.querySelectorAll('[id^="show-stars-"]');
    if(starContainers.length===0){
        const review_box = document.querySelector(".for-review");
        review_box.style.display = "none";
    }else{
        const review_box = document.querySelector(".for-review");
        review_box.style.display = "block";
    }

    starContainers.forEach(container => {
        const rating = container.getAttribute('data-rating');
        changeStarColors(container, rating);
    });
});