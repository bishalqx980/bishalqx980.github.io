const charMap = {
    'A': 'ᴀ',
    'B': 'ʙ',
    'C': 'ᴄ',
    'D': 'ᴅ',
    'E': 'ᴇ',
    'F': 'ғ',
    'G': 'ɢ',
    'H': 'ʜ',
    'I': 'ɪ',
    'J': 'ᴊ',
    'K': 'ᴋ',
    'L': 'ʟ',
    'M': 'ᴍ',
    'N': 'ɴ',
    'O': 'ᴏ',
    'P': 'ᴘ',
    'Q': 'ǫ',
    'R': 'ʀ',
    'S': 's',
    'T': 'ᴛ',
    'U': 'ᴜ',
    'V': 'ᴠ',
    'W': 'ᴡ',
    'X': 'x',
    'Y': 'ʏ',
    'Z': 'ᴢ'
}

function convertFonts(text) {
    let storage = "";

    for (const char of text) {
        storage += charMap[char.toUpperCase()] || char;
    }

    return storage;
}

document.addEventListener("DOMContentLoaded", function() {
    const TinyCapsCB = document.getElementById("TinyCapsCB");
    const TinyCapsCBLocalStorage = localStorage.getItem("TinyCapsCB");

    const Response = document.getElementById("Response");
    const CopyButton = document.getElementById("CopyButton");

    if (TinyCapsCBLocalStorage == "true") {
        TinyCapsCB.checked = true;
    } else {
        TinyCapsCB.checked = false;
    }

    // copy button
    CopyButton.addEventListener("click", function() {
        const ResponseLocalStorage = localStorage.getItem("Response");

        navigator.clipboard.writeText(ResponseLocalStorage);
        CopyButton.textContent = "ᴄᴏᴘɪᴇᴅ ✅";
        // restore button text
        setTimeout(function() {
            CopyButton.textContent = "ᴄᴏᴘʏ ʀᴇsᴘᴏɴsᴇ 📄";
        }, 2000)
    });

    // base64 encode / decode
    document.getElementById("encodeText").addEventListener("click", function() {
        const inputArea = document.getElementById("inputArea");

        if (!inputArea.value) {
            Response.textContent = "⚠ ᴛᴇxᴛ ᴀʀᴇᴀ ᴄᴀɴ'ᴛ ʟᴇᴀᴠᴇ ᴇᴍᴘᴛʏ...!!";
            return;
        }
        
        const encodedText = btoa(inputArea.value);
        Response.textContent = encodedText;
        localStorage.setItem("Response", encodedText);
    });

    document.getElementById("decodeBase64").addEventListener("click", function() {
        const inputArea = document.getElementById("inputArea");

        if (!inputArea.value) {
            Response.textContent = "⚠ ᴛᴇxᴛ ᴀʀᴇᴀ ᴄᴀɴ'ᴛ ʟᴇᴀᴠᴇ ᴇᴍᴘᴛʏ...!!";
            return;
        }

        const decodedText = atob(inputArea.value);
        Response.textContent = decodedText;
        localStorage.setItem("Response", decodedText);
    });
    
    // URL shortener
    document.getElementById("ShortURL").addEventListener("click", async function() {
        const inputArea = document.getElementById("inputArea");
        const shortenerAPI = "ZDhlOTllMDc1MjZhMDhjNmMxMzdlZDBkZGQ5OTkxMTI2NmNhODk1MA==";

        if (!inputArea.value) {
            Response.textContent = "⚠ ᴛᴇxᴛ ᴀʀᴇᴀ ᴄᴀɴ'ᴛ ʟᴇᴀᴠᴇ ᴇᴍᴘᴛʏ...!!";
            return;
        }

        Response.textContent = "⚡ Please wait...";

        const params = new URLSearchParams({
            api: atob(shortenerAPI),
            url: inputArea.value,
            format: "text"
        });

        const apiURL = `https://shrinkme.io/api?${params}`;
        const response = await fetch(apiURL);
        if (response.status != 200) {
            Response.textContent = `Something went wrong! Error [${response.status}]`;
            return;
        }

        const shortedURL = await response.text();
        Response.textContent = shortedURL || "⚠ ɪɴᴠᴀʟɪᴅ ᴜʀʟ";

        if (shortedURL) {
            localStorage.setItem("Response", shortedURL);
        }
    });

    // Tiny Caps font
    document.getElementById("doTinyCaps").addEventListener("click", function() {
        const inputArea = document.getElementById("inputArea");
        
        if (!inputArea.value) {
            Response.textContent = "⚠ ᴛᴇxᴛ ᴀʀᴇᴀ ᴄᴀɴ'ᴛ ʟᴇᴀᴠᴇ ᴇᴍᴘᴛʏ...!!";
            return;
        }

        const ConvertedFont = convertFonts(inputArea.value);
        Response.textContent = ConvertedFont;
        localStorage.setItem("Response", ConvertedFont);
    });

    // Auto tiny caps font
    document.getElementById("inputArea").addEventListener("input", function() {
        const TinyCapsCB = document.getElementById("TinyCapsCB");

        if (TinyCapsCB.checked == true) {
            const inputArea = document.getElementById("inputArea");
            const ConvertedFont = convertFonts(inputArea.value);

            Response.textContent = ConvertedFont;
            localStorage.setItem("Response", ConvertedFont);
        }
    });

    // Auto tiny caps Checkbox change/update
    document.getElementById("TinyCapsCB").addEventListener("change", function() {
        const TinyCapsCB = document.getElementById("TinyCapsCB");

        if (TinyCapsCB.checked == true) {
            localStorage.setItem("TinyCapsCB", "true");
            Response.innerHTML = "Auto TinyCapsFont Enabled ✅";
        } else {
            localStorage.setItem("TinyCapsCB", "false");
            Response.innerHTML = "Auto TinyCapsFont Disabled ❌";
        }
    });
    
    // Clock
    setInterval(function () {
        const date = new Date();
        let hour = date.getHours(); // hour will be changed later
        const min = date.getMinutes();
        const sec = date.getSeconds();
    
        if (hour > 12) {
            hour = hour - 12;
            am_pm = "ᴘᴍ";
        } else if (hour < 12) {
            am_pm = "ᴀᴍ";
        } else {
            hour = 12;
            am_pm = "ᴘᴍ";
        }
    
        document.getElementById("clock").innerHTML = `${hour}:${min}:${sec} ${am_pm}`;
    }, 1000);
});
