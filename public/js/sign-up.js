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

    const body = {
        email,
        password,
        firstName,
        lastName,
        city,
        state,
    }

    try {
        const res = await fetch("http://localhost:8081/users", {
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

        // storage access_token in localStorage:
        localStorage.setItem("WELP_USER_TOKEN", token);
        localStorage.setItem("WELP_CURRENT_USER_ID", id);
        // const id = parseInt(localStorage.getItem("WELP_CURRENT_USER_ID"))
        window.location.href = `/users/${parseInt(id, 10)}`;

    } catch (err) {
        handleErrors(err);
    }
});