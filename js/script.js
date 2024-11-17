// Server details
const serverIP = "146.190.174.248:2050"; 
const apiUrl = `https://api.mcsrvstat.us/2/${serverIP}`;

// Elements
const statusElement = document.getElementById("server-status");

// Fetch server status
async function fetchServerStatus() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.online) {
            const players = data.players ? data.players.online : 0;
            const maxPlayers = data.players ? data.players.max : 0;
            statusElement.innerHTML = `
                <p>Server is <strong>Online</strong></p>
                <p>Players Online: ${players}/${maxPlayers}</p>
            `;
            statusElement.classList.add("online");
        } else {
            statusElement.innerHTML = `
                <p>Server is <strong>Offline</strong></p>
            `;
            statusElement.classList.add("offline");
        }
    } catch (error) {
        console.error("Error fetching server status:", error);
        statusElement.innerHTML = `
            <p>Could not fetch server status.</p>
        `;
    }
}
function copyIP() {
    const ipElement = document.querySelector(".ip-box");
    const textArea = document.createElement("textarea");
    const ip = ipElement.textContent.trim().split(" ")[0];

    textArea.value = ip;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();

    const tooltip = ipElement.querySelector(".copy-tooltip");
    tooltip.textContent = "Copied!";
    tooltip.classList.add("show");

    setTimeout(() => {
        tooltip.classList.remove("show");
        tooltip.textContent = "Click to copy";
    }, 2000);
}

// Fetch status on page load
fetchServerStatus();
