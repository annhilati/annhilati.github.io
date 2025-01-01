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
