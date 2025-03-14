document.addEventListener("DOMContentLoaded", () => {
    const settingsButton = document.querySelector("#settings-button");
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

    // Toggle Dark/Light Mode
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        themeToggle.textContent = document.body.classList.contains("light-mode") ? "Light Mode" : "Dark Mode";
    });
});