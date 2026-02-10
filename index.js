// Funktion, um das Bild regelmäßig zu aktualisieren
function refreshDiscordBanner() {
    const banner = document.getElementById("discord-banner");
    const newBanner = new Image();
    
    // Neue URL mit Cache-Busting-Parameter (um sicherzustellen, dass ein neues Bild geladen wird)
    const newSrc = `https://lanyard.cnrad.dev/api/720992368110862407?showDisplayName=false&hideProfile=true&borderRadius=3px&idleMessage=I'm%20currently%20not%20doing%20anything&bg=000000&hideTimestamp=true&hideDiscrim=false&_=${Date.now()}`;
    
    newBanner.src = newSrc;

    // Event: Bild ist vollständig geladen
    newBanner.onload = () => {
        banner.src = newSrc; // Ersetze das alte Bild
    };

    // Optional: Fehlerhandling (falls das neue Bild nicht geladen werden kann)
    newBanner.onerror = () => {
        console.error("Das neue Banner-Bild konnte nicht geladen werden.");
    };
}

// Alle 10 Sekunden aktualisieren
setInterval(refreshDiscordBanner, 10000);

async function refreshDiscordAvatar() {
    const avatarImg = document.getElementById("avatar");
    if (!avatarImg) return;

    try {
        // Lanyard API aufrufen, um den aktuellen Avatar-Hash zu bekommen
        const response = await fetch("https://api.lanyard.rest/v1/users/720992368110862407");
        if (!response.ok) throw new Error("API konnte nicht geladen werden");
        
        const data = await response.json();
        const avatarHash = data?.data?.discord_user?.avatar;

        if (!avatarHash) {
            console.warn("Kein Avatar gefunden, Standardbild bleibt.");
            return;
        }

        // Prüfen, ob Avatar animiert ist (a_ am Anfang)
        const isAnimated = avatarHash.startsWith("a_");
        const newSrc = `https://cdn.discordapp.com/avatars/720992368110862407/${avatarHash}.${isAnimated ? "gif" : "png"}?size=1024&_=${Date.now()}`;

        // Neues Bild vorbereiten (Cache-Busting durch Timestamp)
        const newAvatar = new Image();
        newAvatar.src = newSrc;

        newAvatar.onload = () => {
            avatarImg.src = newSrc;
        };

        newAvatar.onerror = () => {
            console.error("Das neue Avatar-Bild konnte nicht geladen werden.");
        };
    } catch (err) {
        console.error("Fehler beim Laden des Avatars:", err);
    }
}

// Aufrufen beim Laden der Seite
window.addEventListener("load", refreshDiscordAvatar);
