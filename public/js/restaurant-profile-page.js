window.addEventListener("DOMContentLoaded", () => {
    const writeReviewBtn = document.getElementById("review");
    const userId = localStorage.getItem("WELP_CURRENT_USER_ID")

    writeReviewBtn.addEventListener("click", (e) => {
        const restaurantId = e.target.value
        console.log(restaurantId, userId);

        // window.location.href = "/restaurant"
    });
});