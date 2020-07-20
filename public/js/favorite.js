import { handleErrors } from './utils.js';
document.addEventListener('DOMContentLoaded', async () => {
    //Get the requisite information from the DOM 
    const userId = parseInt(localStorage.getItem("WELP_CURRENT_USER_ID"));
    const restaurantId = document.getElementById("restaurantId").innerHTML;
    const favoriteButton = document.getElementById("favoriteButton");
    const favoriteStar = document.querySelector(".favoriteStar");
    favoriteButton.addEventListener('click', async (e) => {
        try {
            //Retrieve JSON information
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

            //Parse JSON info. It will either return a newFav Object or Null
            const favorite = await res.json();
            //If favorite is not null, add the 'favorited' stylings (fills in the gold star)
            if (favorite !== null) {
                favoriteStar.classList.add("fa-star")
                favoriteStar.classList.remove("fa-star-o")
            }
            else {
                favoriteStar.classList.remove("fa-star")
                favoriteStar.classList.add("fa-star-o")
            }

        } catch (err) {
            handleErrors(err);
        }
    })
});

