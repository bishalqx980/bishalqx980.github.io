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
    
    // Add to style tag
    const style = document.createElement("style");
    style.textContent = `
        @keyframes fadeIn {
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});
