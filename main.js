document.addEventListener("DOMContentLoaded", () => {
    const copyrightYear = document.getElementById("copyrightYear");
    const date = new Date();
    copyrightYear.textContent = `2023 - ${date.getFullYear()}`;

    // Initialize digital clock
    updateClock();
    setInterval(updateClock, 1000);

    // Enhanced Buttons Animation with staggered timing
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((btn, i) => {
        btn.style.opacity = "0";
        btn.style.transform = "translateY(20px)";
        btn.style.animation = `fadeIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards ${i * 0.08}s`;
    });

    // Add smooth interactive effects to buttons
    buttons.forEach(btn => {
        btn.addEventListener("mouseenter", () => {
            btn.style.transform = "translateY(-5px) scale(1.02)";
        });
        
        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "translateY(0) scale(1)";
        });

        btn.addEventListener("mousedown", () => {
            btn.style.transform = "translateY(-2px) scale(0.98)";
        });

        btn.addEventListener("mouseup", () => {
            btn.style.transform = "translateY(-5px) scale(1.02)";
        });
    });

    // visitCounter with animation
    let siteVisited = Number(localStorage.getItem("siteVisited") || 0);
    const isVisitCounted = Boolean(sessionStorage.getItem("isVisitCounted"));
    const visitCounter = document.getElementById("visitCounter");

    if (!isVisitCounted) {
        siteVisited++;
        sessionStorage.setItem("isVisitCounted", true);
        localStorage.setItem("siteVisited", siteVisited);
    }

    animateCounter(visitCounter, siteVisited);
});

// Update digital clock
function updateClock() {
    const clockElement = document.getElementById("digitalClock");
    const now = new Date();
    
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = String(hours).padStart(2, '0');
    
    clockElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}

// Animate counter number
function animateCounter(element, target) {
    let current = 0;
    const step = Math.ceil(target / 30);
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.innerText = "Visit Count: " + current;
    }, 20);
}
