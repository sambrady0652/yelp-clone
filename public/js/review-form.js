document.addEventListener('DOMContentLoaded', () => {
    // Retreive buttons from DOM
    const rateDefault = document.querySelector(".reviewRatingDefault");
    const rate1 = document.getElementById("reviewRatingHover-1");
    const rate2 = document.getElementById("reviewRatingHover-2");
    const rate3 = document.getElementById("reviewRatingHover-3");
    const rate4 = document.getElementById("reviewRatingHover-4");
    const rate5 = document.getElementById("reviewRatingHover-5");
    const rating = document.getElementById("ratingFormInput");

    //Event Listeners to change buttons' color when clicked:
    // Event Listeners for 'transparent' buttons on clickable star rating
    // --- sets rating as value of input on line 19 on review-form.pug
    rate1.addEventListener("click", (e) => {
        const newRateImg = e.target.value;
        rateDefault.removeAttribute("class", "reviewRatingDefault--showDefault");
        rateDefault.setAttribute("class", `mainReviewCard__rating reviewRatingDefault reviewRatingDefault--${newRateImg}`);
        rating.setAttribute("value", 1);
    })
    rate2.addEventListener("click", (e) => {
        const newRateImg = e.target.value;
        rateDefault.removeAttribute("class", "reviewRatingDefault--showDefault");
        rateDefault.setAttribute("class", `mainReviewCard__rating reviewRatingDefault reviewRatingDefault--${newRateImg}`);
        rating.setAttribute("value", 2);
    })
    rate3.addEventListener("click", (e) => {
        const newRateImg = e.target.value;
        rateDefault.removeAttribute("class", "reviewRatingDefault--showDefault");
        rateDefault.setAttribute("class", `mainReviewCard__rating reviewRatingDefault reviewRatingDefault--${newRateImg}`);
        rating.setAttribute("value", 3);
    })
    rate4.addEventListener("click", (e) => {
        const newRateImg = e.target.value;
        rateDefault.removeAttribute("class", "reviewRatingDefault--showDefault");
        rateDefault.setAttribute("class", `mainReviewCard__rating reviewRatingDefault reviewRatingDefault--${newRateImg}`);
        rating.setAttribute("value", 4);
    })
    rate5.addEventListener("click", (e) => {
        const newRateImg = e.target.value;
        rateDefault.removeAttribute("class", "reviewRatingDefault--showDefault");
        rateDefault.setAttribute("class", `mainReviewCard__rating reviewRatingDefault reviewRatingDefault--${newRateImg}`);
        rating.setAttribute("value", 5);
    });

    const userId = localStorage.getItem("WELP_CURRENT_USER_ID")
    let userIdForm = document.getElementById("userId")
    userIdForm.value = userId;

});
