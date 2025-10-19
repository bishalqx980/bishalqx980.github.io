function log_message(message) {
    let log = document.getElementById("log");
    log.innerHTML = message;
}

async function load_data() {
    const json_path = "https://gist.githubusercontent.com/bishalqx980/4a063168c8bfd6fd16a4b280d6e31728/raw/me.json";
    try {
        let response = await fetch(json_path);
        if (response.ok) {
            let data = await response.json();
            return data;
        } else {
            log_message("⚠️ Error (" + response.status + ") loading JSON data!");
        }
    } catch (error) {
        log_message(error);
    }
}

async function send_req(bot_token, method, data) {
    log_message("Sending...");
    const api_url = `https://api.telegram.org/bot${bot_token}/${method}`;
    try {
        let response = await fetch(api_url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });

        let result = await response.json();

        if (response.status == 200) {
            log_message("✅ Sent successfully!");
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

    if (!sender_name.value) sender_name.value = "Anonymous";
    if (!message_box.value) {
        message_box.focus();
        log_message("Message can't be empty!");
        return;
    }

    let json_data = await load_data();
    let bot_token = json_data.bot_token;
    let chat_id = json_data.chat_id;

    let message = `
<blockquote><b>New Message!</b></blockquote>

<b>Name:</b> ${sender_name.value}
<b>Message:</b> <code>${message_box.value}</code>
<b>Device info:</b> <code>${navigator.userAgent}</code>
<b>Language:</b> <code>${navigator.language} (${navigator.languages.join(", ")})</code>
<b>Screen:</b> <code>${screen.width}x${screen.height}</code>`;

    let data = {
        "chat_id": chat_id,
        "text": message,
        "parse_mode": "HTML"
    };

    await send_req(bot_token, "sendMessage", data);
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

    const name = sender_name.value || "Anonymous";
    const messageText = message_box.value || "None";

    const json_data = await load_data();
    const { bot_token, chat_id } = json_data;

    const message = `
<blockquote><b>New Message!</b></blockquote>
<b>Name:</b> ${name}
<b>Message:</b> <code>${messageText}</code>
<b>Device info:</b> <code>${navigator.userAgent}</code>
<b>Language:</b> <code>${navigator.language} (${navigator.languages.join(", ")})</code>
<b>Screen:</b> <code>${screen.width}x${screen.height}</code>`;

    let sent = 0;
    const failed = [];

    for (const [i, file] of files.entries()) {
        const formData = new FormData();
        formData.append("chat_id", chat_id);
        formData.append("caption", message);
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
