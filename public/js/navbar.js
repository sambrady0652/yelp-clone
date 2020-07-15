import { handleErrors } from './utils.js';

document.addEventListener('DOMContentLoaded', (e) => {

    const signUpButton = document.querySelector('.nav_sign-up-button');
    const loginButton = document.querySelector('.nav_log-in-button');
    const logoutButton = document.querySelector('.nav_log-out-button');
    const search = document.querySelector('.nav_search-form')

    signUpButton.addEventListener('click', (e) => {
        console.log('signup button clicked')
        window.location.href = '/users/signup';
    });

    loginButton.addEventListener('click', (e) => {
        console.log('login button clicked')
        window.location.href = '/login';
    });

    logoutButton.addEventListener('click', async (e) => {
        localStorage.removeItem("WELP_USER_TOKEN");
        localStorage.removeItem("WELP_CURRENT_USER_ID");
        window.location.href = '/';
    });

    search.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(search);
        const keyword = formData.get("keywordSearch");
        const location = formData.get("locationSearch");
        const body = { keyword, location };
        try {
            const res = await fetch('http://localhost:8081/search', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                throw res;
            }

            //TODO: Destructure elements of search from database ('xx = await res.json()'). Search for them

            window.location.href = '/search'
        }
        catch (err) {
            handleErrors(err)
        }
    })

});
