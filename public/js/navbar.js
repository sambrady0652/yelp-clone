document.addEventListener('DOMContentLoaded', (e) => {

    const signUpButton = document.querySelector('.nav_sign-up-button');
    const loginButton = document.querySelector('.nav_log-in-button');
    const logoutButton = document.querySelector('.nav_log-out-button');
    const myProfile = document.querySelector('.nav_my_profile_button');
    const id = localStorage.getItem("WELP_CURRENT_USER_ID");
    const token = localStorage.getItem("WELP_USER_TOKEN");

    if (id !== null) {
        signUpButton.classList.add("d-none");
        loginButton.classList.add("d-none");
    }
    if (id === null) {
        myProfile.classList.add("d-none");
        logoutButton.classList.add("d-none");
    }

    signUpButton.addEventListener('click', (e) => {
        window.location.href = '/users/signup';
    });

    loginButton.addEventListener('click', (e) => {
        window.location.href = '/login';
    });

    logoutButton.addEventListener('click', async (e) => {
        localStorage.removeItem("WELP_USER_TOKEN");
        localStorage.removeItem("WELP_CURRENT_USER_ID");
        window.location.href = '/';
    });

    myProfile.addEventListener('click', (e) => {
        window.location.href = `/users/${id}`
    });

});
