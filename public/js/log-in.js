import { handleErrors } from './utils.js';

const logInForm = document.querySelector(".log-in-form");
logInForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(logInForm);
    const email = formData.get("email");
    const password = formData.get("password");
    const body = { email, password };
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