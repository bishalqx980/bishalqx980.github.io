document.addEventListener("DOMContentLoaded", async function() {
    const initial_log = document.getElementById("initial_log");
    const container = document.getElementById("container_to_display");

    // Getting bot_token from json file
    const json_data = await load_data();
    const bot_token = json_data.bot_token;
    const ping_url = `https://api.telegram.org/bot${bot_token}/getMe`;

    initial_log.innerText += "[+] Please wait...\n";
    initial_log.innerText += "[+] Sending ping to Telegram API !!\n";
    
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

        const ping_response = await fetch(ping_url, { signal: controller.signal });

        const result = await ping_response.json();

        clearTimeout(timeout);

        if (ping_response.ok) {
            // Show the container if ping is ok
            initial_log.style.display = "none";
            container.style.display = "";
        } else {
            initial_log.innerText += `[-] Error (${response.status}): ${result.description}\n`;
        }
    } catch (error) {
        initial_log.innerText += `[-] Error ${error}\n`;
        initial_log.innerText += `[!] Can't contact with Telegram API, please check your internet connection & try again!\n`;
    }
});

function log_message(message) {
    document.getElementById("log").innerHTML = message;
}

async function load_data() {
    const cached_data = sessionStorage.getItem("data");

    if (cached_data) {
        return JSON.parse(cached_data);
    } else {
        const json_path = "https://gist.githubusercontent.com/bishalqx980/4a063168c8bfd6fd16a4b280d6e31728/raw/me.json";

        try {
            const response = await fetch(json_path);

            if (response.ok) {
                const data = await response.json();
                sessionStorage.setItem("data", JSON.stringify(data));
                return data;
            } else {
                log_message("⚠️ Error (" + response.status + ") loading JSON data!");
            }
        } catch (error) {
            log_message(error);
        }
    }
}

async function send_discord_message(webhook_url, content) {
    try {
        const response = await fetch(webhook_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: content
            })
        });

        if (response.ok) {
            console.log("Discord message sent!");
        } else {
            console.log("Discord error:", response.status);
        }

    } catch (err) {
        console.log("Discord failed:", err);
    }
}

async function send_discord_file(webhook_url, file, message) {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("content", message);

    try {
        const response = await fetch(webhook_url, {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            console.log("Discord file sent!");
        } else {
            console.log("Discord file error:", response.status);
        }

    } catch (err) {
        console.log("Discord upload failed:", err);
    }
}

async function send_req(bot_token, method, data = {}) {
    const api_url = `https://api.telegram.org/bot${bot_token}/${method}`;
    log_message("🔃 Sending Request...");

    try {
        let response = await fetch(api_url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });

        let result = await response.json();

        if (response.status == 200) {
            log_message("✅ Request successful !!");
            return result;
        } else {
            log_message(`⚠️ Error (${response.status}): ${result.description}`);
        }
    } catch (error) {
        log_message(`⚠️ Error ${error}`);
    }
}

async function send_message() {
    let sender_name = document.getElementById("sender_name");
    let message_box = document.getElementById("message_box");

    if (!sender_name.value) sender_name.value = "Me";

    if (!message_box.value) {
        message_box.focus();
        log_message("Message can't be empty!");
        return;
    }

    let json_data = await load_data();
    let { bot_token, chat_id, discord_webhook } = json_data;

    /* Telegram Message */
    let tg_message = `
<blockquote><b>New Message!</b></blockquote>

<b>Name:</b> ${sender_name.value}
<b>Message:</b> <code>${message_box.value}</code>
<b>Device:</b> <code>${navigator.userAgent}</code>
<b>Language:</b> <code>${navigator.language} (${navigator.languages.join(", ")})</code>
<b>Screen:</b> <code>${screen.width}x${screen.height}</code>`;

    let tg_data = {
        chat_id: chat_id,
        text: tg_message,
        parse_mode: "HTML"
    };

    /* Discord Message (Plain text / markdown) */
    let dc_message = `
**📩 New Message | <@&1462103653883314287>**

👤 Name: ${sender_name.value}
💬 Message: ${message_box.value}
💻 Device: ${navigator.userAgent}
🗣️ Language: ${navigator.language} (${navigator.languages.join(", ")})
🖥️ Screen: ${screen.width}x${screen.height}
`;

    /* Send Both */
    await send_req(bot_token, "sendMessage", tg_data);

    if (discord_webhook) {
        await send_discord_message(discord_webhook, dc_message);
    }
}

async function send_file() {
    const fileInput = document.getElementById("fileInput");
    const files = Array.from(fileInput.files);
    if (!files.length) {
        log_message("Please choose at least one file!");
        return;
    }

    const sender_name = document.getElementById("sender_name");
    const message_box = document.getElementById("message_box");

    const name = sender_name.value || "Me";
    const messageText = message_box.value || "None";

    const json_data = await load_data();
    const { bot_token, chat_id, discord_webhook } = json_data;

    const tg_message = `
<blockquote><b>New Message!</b></blockquote>
<b>Name:</b> ${name}
<b>Message:</b> <code>${messageText}</code>
<b>Device info:</b> <code>${navigator.userAgent}</code>
<b>Language:</b> <code>${navigator.language} (${navigator.languages.join(", ")})</code>
<b>Screen:</b> <code>${screen.width}x${screen.height}</code>
`;

    const dc_message = `
**📩 New Message | <@&1462103653883314287>**
👤 Name: ${sender_name.value}
💬 Message: ${message_box.value}
💻 Device: ${navigator.userAgent}
🗣️ Language: ${navigator.language} (${navigator.languages.join(", ")})
🖥️ Screen: ${screen.width}x${screen.height}
`;

    let sent = 0;
    const failed = [];

    for (const [i, file] of files.entries()) {
        const formData = new FormData();
        formData.append("chat_id", chat_id);
        formData.append("caption", tg_message);
        formData.append("document", file);
        formData.append("parse_mode", "HTML");

        log_message(`Uploading file ${i + 1} of ${files.length}: <b>${file.name}</b>...`);

        try {
            const response = await fetch(`https://api.telegram.org/bot${bot_token}/sendDocument`, {
                method: "POST",
                body: formData
            });
            const result = await response.json();

            if (response.ok) {
                // Send to Discord
                if (discord_webhook) {
                    await send_discord_file(
                        discord_webhook,
                        file,
                        dc_message
                    );
                }

                log_message(`✅ Sent (${i + 1}/${files.length}): ${file.name}`);
                sent++;
            } else {
                const error_message = `❌ Error sending ${file.name}: ${result.description}`;
                log_message(error_message);
                failed.push(error_message);
            }
        } catch (err) {
            const error_message = `⚠️ Upload failed for ${file.name}: ${err}`;
            log_message(error_message);
            failed.push(error_message);
        }
    }

    log_message(`Sent ${sent}/${files.length}, Failed: ${failed.length}\n${failed.join("\n")}`);
}
