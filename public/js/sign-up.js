import { handleErrors } from './utils.js';

const signUpForm = document.querySelector(".sign-up-form");
signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(signUpForm);
    const email = formData.get("email");
    const password = formData.get("password");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const city = formData.get("city");
    const state = formData.get("state");
    const image_url = formData.get("image_url");

    const body = {
        email,
        password,
        firstName,
        lastName,
        city,
        state,
        image_url
    }

    try {
        const res = await fetch("/users", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            throw res;
        }
        const { token, user: { id } } = await res.json();

        //Store Credentials in Local Storage 
        localStorage.setItem("WELP_USER_TOKEN", token);
        localStorage.setItem("WELP_CURRENT_USER_ID", id);
        //Redirect to Profile Page
        window.location.href = `/users/${id}`;

    } catch (err) {
        handleErrors(err);
    }
});