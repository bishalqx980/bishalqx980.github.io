document.addEventListener("DOMContentLoaded", function() {
    const victimName = localStorage.getItem("victimName");
    const victimNameInput = document.getElementById("victimNameInput");
    const displayVictimName = document.getElementById("displayVictimName");

    const oldVictimForm = document.getElementById("oldVictimForm");
    const oldVictimFormMSG = document.getElementById("oldVictimFormMSG");
    const newVictimForm = document.getElementById("newVictimForm");
    const logDiv = document.getElementById("logDiv");

    const executeHackMe = document.getElementById("executeHackMe");
    const clearVictimName = document.getElementById("clearVictimName");

    if (!victimName || victimName == "null") {
        newVictimForm.classList.remove("hidden");
    } else {
        oldVictimForm.classList.remove("hidden");
        oldVictimFormMSG.textContent = "You are already hacked 🤣 !!";
        displayVictimName.textContent = victimNameInput.value;
        
    }

    // on input > name type > it will update Victim Name on display
    victimNameInput.addEventListener("input", function() {
        displayVictimName.textContent = `name="${victimNameInput.value}"`;
    });

    // Execute button call
    executeHackMe.addEventListener("click", async function() {
        let victimName = victimNameInput.value;

        if (!victimName) {
            victimNameInput.focus();
            return;
        }

        displayVictimName.textContent = "";
        newVictimForm.classList.add("hidden");
        logDiv.classList.remove("hidden");
        // saving victim name on localstorage
        localStorage.setItem("victimName", victimName);

        // Fun part
        logMessage("Getting ready...\n");
        logMessage("Your name: " + victimName + "\n");
        logMessage("Gathering information...\n");

        let message = `<b>Name:</b> <code>${victimName}</code>\n`;
        const deviceInfo = {
            userAgent: navigator.userAgent,
            language: navigator.language,

            screenWidth: screen.width,
            screenHeight: screen.height
        }

        for (const info in deviceInfo) {
            message += `<b>${info}:</b> <code>${deviceInfo[info]}</code>\n`;
            logMessage(`${info}: ${deviceInfo[info]}`);
        }
        
        logMessage("Variables set!\n");
        logMessage("Sending information...\n");

        const response = await sendTelegramMessage(message);
        if (response == 200) {
            logMessage("You are hacked 😝 !!");
        } else if (response == 900) {
            logMessage("Something went wrong! Retrying...");
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    });

    // Clear victim name from localstorage
    clearVictimName.addEventListener("click", function() {
        localStorage.setItem("victimName", "null");
        window.location.reload();
    });
});

function logMessage(message) {
    const logArea = document.getElementById("logArea");
    logArea.innerHTML += `<p>[+] ${message}</p>`;
}

async function fetchData(path) {
    try {
        const response = await fetch(path);
        const data = await response.json();
        return data;
    } catch (error) {
        logMessage(error);
    }
}

async function sendTelegramMessage(message) {
    const data = await fetchData("./data.json");

    const botToken = atob(data.TOKEN);
    const chatID = data.CHAT_ID;
    
    if (!botToken || !chatID) {
        logMessage("Error: Required data are missing...", "An error occured!");
        return
    }

    // logMessage("Sending information...");

    const apiURL = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
        const response = await fetch(apiURL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                chat_id: chatID,
                text: message,
                parse_mode: "HTML"
            })
        });
        
        if (response.status == 200) {
            logMessage("Information sent successfully!");
            return 200;
        } else {
            logMessage("Information wasn't sent!");
            return 900;
        }
    } catch (error) {
        logMessage(error);
    }
}
