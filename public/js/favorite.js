import { handleErrors } from './utils.js';
document.addEventListener('DOMContentLoaded', async () => {
    const userId = parseInt(localStorage.getItem("WELP_CURRENT_USER_ID"));
    const restaurantId = document.getElementById("restaurantId").innerHTML;
    const favoriteButton = document.getElementById("favoriteButton");
    const favoriteStar = document.querySelector(".favoriteStar");
    favoriteButton.addEventListener('click', async (e) => {
        try {
            const res = await fetch(`/users/${userId}/favorites`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId, restaurantId })
            });

            if (!res.ok) {
                throw res;
            }

            const favorite = await res.json();
            if (favorite !== null) {
                favoriteStar.classList.add("fa-star")
                favoriteStar.classList.remove("fa-star-o")
            }
            else {
                favoriteStar.classList.remove("fa-star")
                favoriteStar.classList.add("fa-star-o")
            }

        } catch (err) {
            console.error(err);
        }
    })
});

