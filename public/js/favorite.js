const handleErrors = async (err) => {
    if (err.status >= 400 && err.status < 600) {
        const errorJSON = await err.json();
        const errorsContainer = document.querySelector(".errors-container");
        let errorsHtml = [
            `
        <div class="alert alert-danger">
            Something went wrong. Please try again.
        </div>
      `,
        ];
        const { errors } = errorJSON;
        if (errors && Array.isArray(errors)) {
            errorsHtml = errors.map(
                (message) => `
          <div class="alert alert-danger">
              ${message}
          </div>
        `
            );
        }
        errorsContainer.innerHTML = errorsHtml.join("");
    } else {
        alert(
            "Something went wrong. Please check your internet connection and try again!"
        );
    }
};



const favoriteIcon = document.querySelector('.favoriteIcon');
const favoriteButton = document.getElementById("favoriteButton");
// const userId = parseInt(localStorage.getItem("WELP_CURRENT_USER_ID"));
const userId = 1;

/*
THIS PORTION OF THE CODE IS NOT WORKING
UNDEFINED RETURNING FROM FETCH REQUEST
*/
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch(`http://localhost:8080/users/${userId}/favorites`)
        
        if (!res.ok) {
            throw res;
        }
        const { restaurant, user } = res;
        console.log(restaurant, user);
        
        favoriteIcon.innerHTML = ''

    } catch (err) {
        console.log(err);
    }
});

