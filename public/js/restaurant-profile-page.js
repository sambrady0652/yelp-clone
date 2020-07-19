window.addEventListener("DOMContentLoaded", () => {
    const userId = localStorage.getItem("WELP_CURRENT_USER_ID");
    const writeReviewBtn = document.getElementById("review");
    const userId = localStorage.getItem("WELP_CURRENT_USER_ID")
    const restaurantIdElement = document.getElementById("restaurantId")
    const restaurantId = restaurantIdElement.innerHTML;
    const hoursBox = document.querySelector(".restaurantSubCard__hoursBox");

    const getHours = () => {
        const randomImg = Math.floor(Math.random() * Math.floor(5));
        const img = document.createElement('img');
        img.setAttribute("src", `/images/hours${randomImg}.jpg`);
        hoursBox.appendChild(img);
    };

    getHours();

    writeReviewBtn.addEventListener("click", (e) => {
        const restaurantId = e.target.value
        window.location.href = `/restaurants/${restaurantId}/reviews/new`
    });
});
