document.addEventListener("DOMContentLoaded", () => {
    let id = localStorage.getItem("WELP_CURRENT_USER_ID")
    let hiddenUserId = document.getElementById("hidden_userId")
    let editReviewBtn = document.getElementsByClassName("editReview")
    console.log(editReviewBtn)

    for(let i = 0; i < editReviewBtn.length; i++){
        if(id === hiddenUserId.innerHTML){
            editReviewBtn[i].hidden = false;
            console.log("inside hiddendiv")
        }
    }


})
