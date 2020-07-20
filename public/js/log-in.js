import { handleErrors } from './utils.js';

//Retreive info from DOM 
const logInForm = document.querySelector(".log-in-form");
const guestForm = document.querySelector(".guest-form");

//User Login
logInForm.addEventListener("submit", async (e) => {
    //Retreive Form Information from login form.
    e.preventDefault();
    const formData = new FormData(logInForm);
    const email = formData.get("email");
    const password = formData.get("password");
    const body = { email, password };
    //Post the login information, receive JSON
    try {
        const res = await fetch("/login", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw res;
        }
        //Parse JSON return
        const { token, user: { id } } = await res.json();

        // Store token and ID in Local Storage
        localStorage.setItem("WELP_USER_TOKEN", token);
        localStorage.setItem("WELP_CURRENT_USER_ID", id);
        //Redirect to Profile Page 
        window.location.href = `/users/${id}`;

    } catch (err) {
        console.error(err);
    }

});

//Guest Login
guestForm.addEventListener("submit", async (e) => {
    //Retreive Form Information from login form.
    e.preventDefault();
    const formData = new FormData(guestForm);
    const email = formData.get("email");
    const password = formData.get("password");
    const body = { email, password };
    //Post the login information, receive JSON
    try {
        const res = await fetch("/login", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw res;
        }
        //Parse JSON return
        const { token, user: { id } } = await res.json();

        // Store token and ID in Local Storage
        localStorage.setItem("WELP_USER_TOKEN", token);
        localStorage.setItem("WELP_CURRENT_USER_ID", id);
        //Redirect to Profile Page 
        window.location.href = `/users/${id}`;

    } catch (err) {
        handleErrors(err);
    }

});