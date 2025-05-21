function load() {
    const from_yearElement = document.getElementById("from_year");
    const current_yearElement = document.getElementById("current_year");

    const date = new Date();

    from_yearElement.textContent = 2023;
    current_yearElement.textContent = date.getFullYear();
}
