document.addEventListener("DOMContentLoaded", () => {
    const settingsButton = document.querySelector("#footer-set-btn");
    const settingsPopup = document.querySelector("#settings-popup");
    const closePopup = document.querySelector("#close-popup");
    const themeToggle = document.querySelector("#toggle-theme");

    // Open settings popup
    settingsButton.addEventListener("click", () => {
        settingsPopup.style.display = "block";
    });

    // Close popup
    closePopup.addEventListener("click", () => {
        settingsPopup.style.display = "none";
    });

});