document.addEventListener("DOMContentLoaded", () => {
    //Retreive Buttons from DOM
    const xBtn = document.getElementById("orderBar-x");
    const quickLinksItalian = document.getElementById("quickLinks-italian");
    const quickLinksChinese = document.getElementById("quickLinks-chinese");
    const quickLinksFrench = document.getElementById("quickLinks-french");
    const splashProfileBtn = document.getElementById("splashProfileBtn");
    const splashAccSettingsBtn = document.getElementById("splashAccSettingsBtn");
    //Divs containing buttons. known = Profile/Settings, unknown = Login/Signup
    const unknown = document.getElementById("splashUnknown");
    const known = document.getElementById("splashKnownAlt");
    //orderBar can be hidden
    const orderBar = document.querySelector(".orderBar");

    //Retreive User Info from DOM 
    const userId = localStorage.getItem("WELP_CURRENT_USER_ID");

    //Show/Hide Appropriate Buttons
    if (userId !== null) {
        known.classList.remove("hidden")
        unknown.classList.add("hidden");
    }

    //Show/Hide Order Bar
    xBtn.addEventListener("click", (e) => {
        orderBar.classList.add("hidden");
    });

    //Main Splash Buttons
    quickLinksItalian.addEventListener("click", async (e) => {
        const keyword = e.target.value;
        window.location.href = `/search/${keyword}`
    });
    quickLinksChinese.addEventListener("click", async (e) => {
        const keyword = e.target.value;
        window.location.href = `/search/${keyword}`
    });
    quickLinksFrench.addEventListener("click", async (e) => {
        const keyword = e.target.value;
        window.location.href = `/search/${keyword}`
    });
    splashProfileBtn.addEventListener("click", (e) => {
        window.location.href = `/users/${userId}`;
    });
    splashAccSettingsBtn.addEventListener("click", (e) => {
        window.location.href = `/users/${userId}/settings`
    });

})