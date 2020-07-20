document.addEventListener("DOMContentLoaded", () => {
    //Retreive relevant information from DOM
    const userId = localStorage.getItem("WELP_CURRENT_USER_ID");
    const writeReviewBtn = document.getElementById("review");
    const restaurantIdElement = document.getElementById("restaurantId")
    const restaurantId = restaurantIdElement.innerHTML;
    const hoursBox = document.querySelector(".restaurantSubCard__hoursBox");

    /*Sets random hours of operation for businesses 
    NOTE: Hours of Operation was not provided via the Yelp API so this display fix
    was implemented as a way of having hours to display without populating the 
    information manually
    */

    const getHours = () => {
        const randomImg = Math.floor(Math.random() * Math.floor(5));
        const img = document.createElement('img');
        img.setAttribute("src", `/images/hours${randomImg}.jpg`);
        hoursBox.appendChild(img);
    };
    getHours();

    //Button Functionality
    writeReviewBtn.addEventListener("click", (e) => {
        const restaurantId = e.target.value
        window.location.href = `/restaurants/${restaurantId}/reviews/new`
    });
});
