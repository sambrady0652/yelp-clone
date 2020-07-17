document.addEventListener('DOMContentLoaded', (e) => {

    const signUpButton = document.querySelector('.nav_sign-up-button');
    const loginButton = document.querySelector('.nav_log-in-button');
    const logoutButton = document.querySelector('.nav_log-out-button');

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

});
