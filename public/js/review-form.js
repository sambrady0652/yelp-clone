document.addEventListener('DOMContentLoaded', () => {
    let userIdElement = document.getElementById("userId")
    userIdElement.value = localStorage.getItem('WELP_CURRENT_USER_ID')
    console.log(localStorage.getItem('WELP_CURRENT_USER_ID'))

    // Collects all the elements related to Rating
    const rateDefault = document.querySelector(".reviewRatingDefault");
    const rate1 = document.getElementById("reviewRatingHover-1");
    const rate2 = document.getElementById("reviewRatingHover-2");
    const rate3 = document.getElementById("reviewRatingHover-3");
    const rate4 = document.getElementById("reviewRatingHover-4");
    const rate5 = document.getElementById("reviewRatingHover-5");
    const rating = document.getElementById("ratingFormInput");

    // Event Listeners for 'transparent' buttons on clickable star rating
    // --- sets rating as value of input on line 19 on review-form.pug
    rate1.addEventListener("click", (e) => {
        console.log("BUTTON CLICKED!!!")
        const newRateImg = e.target.value;
        rateDefault.removeAttribute("class", "reviewRatingDefault--showDefault");
        rateDefault.setAttribute("class", `mainReviewCard__rating reviewRatingDefault reviewRatingDefault--${newRateImg}`);
        rating.setAttribute("value", 1);
    })
    rate2.addEventListener("click", (e) => {
        console.log("BUTTON CLICKED!!!")
        const newRateImg = e.target.value;
        rateDefault.removeAttribute("class", "reviewRatingDefault--showDefault");
        rateDefault.setAttribute("class", `mainReviewCard__rating reviewRatingDefault reviewRatingDefault--${newRateImg}`);
        rating.setAttribute("value", 2);
    })
    rate3.addEventListener("click", (e) => {
        console.log("BUTTON CLICKED!!!")
        const newRateImg = e.target.value;
        rateDefault.removeAttribute("class", "reviewRatingDefault--showDefault");
        rateDefault.setAttribute("class", `mainReviewCard__rating reviewRatingDefault reviewRatingDefault--${newRateImg}`);
        rating.setAttribute("value", 3);
    })
    rate4.addEventListener("click", (e) => {
        console.log("BUTTON CLICKED!!!")
        const newRateImg = e.target.value;
        rateDefault.removeAttribute("class", "reviewRatingDefault--showDefault");
        rateDefault.setAttribute("class", `mainReviewCard__rating reviewRatingDefault reviewRatingDefault--${newRateImg}`);
        rating.setAttribute("value", 4);
    })
    rate5.addEventListener("click", (e) => {
        console.log("BUTTON CLICKED!!!")
        const newRateImg = e.target.value;
        rateDefault.removeAttribute("class", "reviewRatingDefault--showDefault");
        rateDefault.setAttribute("class", `mainReviewCard__rating reviewRatingDefault reviewRatingDefault--${newRateImg}`);
        rating.setAttribute("value", 5);
    })







})
