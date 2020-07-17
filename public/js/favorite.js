// import { handleErrors } from './utils';

// const favoriteIcon = document.querySelector('.favoriteIcon');
// const favoriteButton = document.getElementById("favoriteButton");
// const userId = parseInt(localStorage.getItem("WELP_CURRENT_USER_ID"));
// // const userId = 1;

/*
THIS PORTION OF THE CODE IS NOT WORKING
UNDEFINED RETURNING FROM FETCH REQUEST
// */
// document.addEventListener('DOMContentLoaded', async () => {

//     favoriteButton.addEventListener('click', (e) => {
//         const res = await fetch(`/users/${userId}/favortes`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body
//         })
//     })
//     try {
//         const res = await fetch(`/users/${userId}/favorites`)

//         if (!res.ok) {
//             throw res;
//         }
//         const { restaurant, user } = await res.json();

//     } catch (err) {
//         handleErrors(err);
//     }
// });

