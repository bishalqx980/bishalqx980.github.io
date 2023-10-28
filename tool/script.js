// Copy
function CopyResponse() {
    let CopyButton = document.getElementById("CopyButton");
    let CopyResponse = localStorage.getItem("Response");

    navigator.clipboard.writeText(CopyResponse);
    CopyButton.innerHTML = "Cᴏᴘɪᴇᴅ ✅";
    setTimeout(
        function() {
            CopyButton.innerHTML = "Cᴏᴘʏ 📄";
        }, 3000
    )
}

// base64 decode
function decode() {
    let Response = document.getElementById("Response");
    let inputArea = document.getElementById("inputArea");

    if (inputArea.value != "") {
        let decoded_text = atob(inputArea.value);
        Response.innerHTML = decoded_text;
        localStorage.setItem("Response", decoded_text);
        CopyButton.style.display = "";
    }else {
        Response.innerHTML = "⚠ Tᴇxᴛ Aʀᴇᴀ ᴄᴀɴ'ᴛ ʟᴇᴀᴠᴇ ᴇᴍᴘᴛʏ...!!";
    }
}

// base64 encode
function encode() {
    let Response = document.getElementById("Response");
    let inputArea = document.getElementById("inputArea");

    if (inputArea.value != "") {
        let encoded_text = btoa(inputArea.value);
        Response.innerHTML = encoded_text;
        localStorage.setItem("Response", encoded_text);
        CopyButton.style.display = "";
    }else {
        Response.innerHTML = "⚠ Tᴇxᴛ Aʀᴇᴀ ᴄᴀɴ'ᴛ ʟᴇᴀᴠᴇ ᴇᴍᴘᴛʏ...!!";
    }
}

// URL Shortener
function URLShortener() {
    let Response = document.getElementById("Response");
    let inputArea = document.getElementById("inputArea");
    let api_key = "d8e99e07526a08c6c137ed0ddd99911266ca8950";

    if (inputArea.value != "") {
        let url = "https://shrinkme.io/api?api="+ api_key +"&url="+ inputArea.value +"&format=text"
    
        let api = new XMLHttpRequest();
        api.open("GET", url, true);
        api.send();
        api.onload = function() {
            let api_response = api.response;
            if (api_response == "") {
                Response.innerHTML = "⚠ Iɴᴠᴀʟɪᴅ URL !!";
                CopyButton.style.display = "none";
            }else {
                Response.innerHTML = api_response;
                localStorage.setItem("Response", api_response);
                CopyButton.style.display = "";
            }
        }
    }else {
        Response.innerHTML = "⚠ Tᴇxᴛ Aʀᴇᴀ ᴄᴀɴ'ᴛ ʟᴇᴀᴠᴇ ᴇᴍᴘᴛʏ...!!";
    }
}

// TinyCaps Font
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
};

function TinyCaps() {
    let Response = document.getElementById("Response");
    let inputArea = document.getElementById("inputArea");
    let ConvertedFont = '';

    for (const char of inputArea.value) {
        const transformedChar = charMap[char.toUpperCase()] || char;
        ConvertedFont += transformedChar;
    }

    Response.innerText = ConvertedFont;
    localStorage.setItem("Response", ConvertedFont);
    CopyButton.style.display = "";
}
