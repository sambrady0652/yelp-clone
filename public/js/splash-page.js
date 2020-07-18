document.addEventListener("DOMContentLoaded", () => {
    const deliveryBtn = document.getElementById("orderBar-Delivery");
    const pizzaBtn = document.getElementById("orderBar-Pizza");
    const chineseBtn = document.getElementById("orderBar-Chinese");
    const xBtn = document.getElementById("orderBar-x");
    const quickLinksItalian = document.getElementById("quickLinks-italian");
    const quickLinksChinese = document.getElementById("quickLinks-chinese");
    const quickLinksFrench = document.getElementById("quickLinks-french");
    const unknown = document.getElementById("splashUnknown");
    const known = document.getElementById("splashKnownAlt");
    const splashProfileBtn = document.getElementById("splashProfileBtn");
    const splashAccSettingsBtn = document.getElementById("splashAccSettingsBtn");

    const userId = localStorage.getItem("WELP_CURRENT_USER_ID");
    const token = localStorage.getItem("WELP_USER_TOKEN");

    if (userId !== null) {
        known.classList.remove("hidden")
        unknown.classList.add("hidden");
    }

    // -- Button Event Listeners
    deliveryBtn.addEventListener("click", (e) => {

    });
    pizzaBtn.addEventListener("click", (e) => {

    });
    chineseBtn.addEventListener("click", (e) => {

    });
    xBtn.addEventListener("click", (e) => {

    });
    quickLinksItalian.addEventListener("click", (e) => {

    });
    quickLinksChinese.addEventListener("click", (e) => {

    });
    quickLinksFrench.addEventListener("click", (e) => {

    });
    splashProfileBtn.addEventListener("click", (e) => {
        window.location.href = `/users/${userId}`;
    });
    splashAccSettingsBtn.addEventListener("click", (e) => {
        window.location.href = `/users/${userId}/settings`
    });

})