document.addEventListener("DOMContentLoaded", () => {
    const addSiteButton = document.getElementById("add-site");
    const blockedSitesList = document.getElementById("blocked-sites-list");

    const displayBlockedSites = () => {
        chrome.storage.local.get({ userBlockedSites: [] }, data => {
            const userBlockedSites = data.userBlockedSites || [];
            blockedSitesList.innerHTML = "";

            userBlockedSites.forEach(site => {
                const listItem = document.createElement("li");
                listItem.textContent = site;

                const removeButton = document.createElement("button");
                removeButton.textContent = "Remover";
                removeButton.style.marginLeft = "10px";
                removeButton.addEventListener("click", () => {
                    removeSiteFromBlocked(site);
                });

                listItem.appendChild(removeButton);
                blockedSitesList.appendChild(listItem);
            });
        });
    };

    // Função para adicionar um site à lista de bloqueios
    addSiteButton.addEventListener("click", () => {
        let site = prompt("Digite o site que deseja bloquear (exemplo: example.com):");
        if (site) {
            site = site.replace(/^https?:\/\//, "");

            chrome.storage.local.get({ userBlockedSites: [] }, data => {
                const userBlockedSites = data.userBlockedSites;
                if (!userBlockedSites.includes(site)) {
                    userBlockedSites.push(site);
                    chrome.storage.local.set({ userBlockedSites }, displayBlockedSites);
                }
            });
        }
    });

    // Função para remover um site do armazenamento e atualizar o bloqueio
    const removeSiteFromBlocked = (site) => {
        chrome.storage.local.get({ userBlockedSites: [] }, data => {
            const userBlockedSites = data.userBlockedSites.filter(s => s !== site);
            chrome.storage.local.set({ userBlockedSites }, displayBlockedSites);
        });
    };

    displayBlockedSites(); // Inicializa a lista ao carregar
});
