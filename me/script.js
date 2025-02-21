function load() {
    let width = screen.width;
    if (width < 400) {
        document.body.style.width = "400px";
    }
}

async function log_message(message) {
    let log = document.getElementById("log");
    log.innerHTML = message;
}

async function load_data() {
    const json_path = "https://gist.githubusercontent.com/bishalqx980/4a063168c8bfd6fd16a4b280d6e31728/raw/data.json";
    try {
        let response = await fetch(json_path);
        if (response.ok) {
            let data = response.json();
            return data;
        } else {
            await log_message("Error: (" + response.status + ") loading JSON data!");
            return
        }
    } catch (error) {
        await log_message(error);
    }
}

async function send_req(bot_token, method, data) {
    await log_message("Sending...")
    const api_url = `https://api.telegram.org/bot${bot_token}/${method}`;
    try {
        let response = await fetch(api_url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });

        let result = await response.json();

        if (response.ok) {
            await log_message("Sent successfully!");
            return result;
        } else {
            await log_message(`Error (${response.status}): ${result.description}`);
            return
        }
    } catch (error) {
        await log_message(`Error: ${error}`);
    }
}

async function send_message() {
    let sender_name = document.getElementById("sender_name");
    let message_box = document.getElementById("message_box");

    if (!sender_name.value) {
        sender_name.value = "Unknown";
    }

    if (!message_box.value) {
        message_box.focus();
        await log_message("Message Box can't be empty!");
        return
    }

    let json_data = await load_data();
    let bot_token = json_data.BOT_TOKENS.TheValorantLover;
    let chat_id = json_data.CHAT_ID;
    let message = `
<b>Name:</b> ${sender_name.value}
<b>Message:</b> <blockquote>${message_box.value}</blockquote>
<b>Device info:</b>
<code>${navigator.userAgent}</code>
<b>Screen:</b> <code>${screen.width}x${screen.height}</code>`

    let data = {
        "chat_id": chat_id,
        "text": message,
        "parse_mode": "HTML"
    };

    await send_req(bot_token, "sendMessage", data);
}

async function send_photo() {
    let sender_name = document.getElementById("sender_name");
    let message_box = document.getElementById("message_box");

    if (!sender_name.value) {
        sender_name.value = "Unknown";
    }

    if (!message_box.value) {
        message_box.focus();
        await log_message("Message Box can't be empty!");
        return
    }

    let json_data = await load_data();
    let bot_token = json_data.BOT_TOKENS.TheValorantLover;
    let chat_id = json_data.CHAT_ID;
    let message = `
<b>Name:</b> ${sender_name.value}
<b>Device info:</b>
<code>${navigator.userAgent}</code>
<b>Screen:</b> <code>${screen.width}x${screen.height}</code>`

    let data = {
        "chat_id": chat_id,
        "photo": message_box.value,
        "caption": message,
        "parse_mode": "HTML"
    };

    await send_req(bot_token, "sendPhoto", data);
}
