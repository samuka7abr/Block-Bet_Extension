const updateBlockingRules = (blockedSites) => {
    const rules = blockedSites.map((site, index) => ({
        id: index + 1,
        priority: 1,
        action: { type: "block" },
        condition: { urlFilter: `*://${site}/*` }
    }));

    chrome.declarativeNetRequest.updateDynamicRules({
        addRules: rules,
        removeRuleIds: rules.map(rule => rule.id)
    });
};

// Carregar sites bloqueados da API na inicialização
fetch("http://localhost:3000/blocked-sites")
    .then(response => response.json())
    .then(data => {
        const initialSites = data.map(site => site.url);
        updateBlockingRules(initialSites);
    })
    .catch(error => console.error("Erro ao carregar sites bloqueados da API:", error));
