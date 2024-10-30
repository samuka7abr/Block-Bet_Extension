document.addEventListener("DOMContentLoaded", () => {
    const addSiteButton = document.getElementById("add-site");
    const exportListButton = document.getElementById("export-list");

    addSiteButton.addEventListener("click", () => {
        const site = prompt("Digite o site que deseja bloquear:");
        if (site) {
            chrome.storage.local.get({ userBlockedSites: [] }, data => {
                const userBlockedSites = data.userBlockedSites;
                userBlockedSites.push(site);
                chrome.storage.local.set({ userBlockedSites });
            });
        }
    });

    exportListButton.addEventListener("click", () => {
        chrome.storage.local.get("userBlockedSites", data => {
            const jsonData = JSON.stringify(data.userBlockedSites, null, 2);
            const blob = new Blob([jsonData], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "userBlockedSites.json";
            a.click();
            URL.revokeObjectURL(url);
        });
    });
});
