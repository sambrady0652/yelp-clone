window.addEventListener("DOMContentLoaded", () => {
    const writeReviewBtn = document.getElementById("review");
    const userId = localStorage.getItem("WELP_CURRENT_USER_ID")
    const restaurantIdElement = document.getElementById("restaurantId")
    const restaurantId = restaurantIdElement.innerHTML;

    writeReviewBtn.addEventListener("click", (e) => {
        const restaurantId = e.target.value
        window.location.href = `/restaurants/${restaurantId}/reviews/new`
    });
});
