document.addEventListener("DOMContentLoaded", () => {
    const copyrightYear = document.getElementById("copyrightYear");
    const date = new Date();
    copyrightYear.textContent = `2023 - ${date.getFullYear()}`;

    // Buttons Animation
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((btn, i) => {
        btn.style.opacity = "0";
        btn.style.transform = "translateY(10px)";
        btn.style.animation = `fadeIn 0.3s ease forwards ${i * 0.1}s`;
    });

    // visitCounter
    let siteVisited = Number(localStorage.getItem("siteVisited") || 0);
    const isVisitCounted = Boolean(sessionStorage.getItem("isVisitCounted"));
    const visitCounter = document.getElementById("visitCounter");

    if (!isVisitCounted) {
        siteVisited++;
        sessionStorage.setItem("isVisitCounted", true);
        localStorage.setItem("siteVisited", siteVisited);
    }

    visitCounter.innerText = "Visit Count: " + siteVisited;
});
