import { handleErrors } from './utils.js';

const logInForm = document.querySelector(".log-in-form");
logInForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(logInForm);
    const email = formData.get("email");
    const password = formData.get("password");
    const body = { email, password };
    try {
        const res = await fetch("http://localhost:8081/login", {
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