import { getUserBlockedSites, setUserBlockedSites } from './storageManager.js';

// Badges definidos com base em marcos de dias (1 semana, 1 mês, etc.)
const badges = [
    { name: "1 Semana", days: 7 },
    { name: "2 Semanas", days: 14 },
    { name: "3 Semanas", days: 21 },
    { name: "1 Mês", days: 30 },
    { name: "3 Meses", days: 90 },
    { name: "6 Meses", days: 180 },
    { name: "1 Ano", days: 365 }
];

// Função para iniciar o progresso de um site recém-adicionado
export const startSiteProgress = (site) => {
    const startDate = new Date().toISOString();
    getUserBlockedSites((blockedSites) => {
        const updatedSites = [...blockedSites, { url: site, startDate, badges: [] }];
        setUserBlockedSites(updatedSites);
    });
};

// Função para calcular o tempo desde a data de bloqueio
const calculateDaysSince = (startDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const diffTime = today - start;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

// Função para atualizar o progresso e atribuir badges
export const updateProgress = () => {
    getUserBlockedSites((blockedSites) => {
        const updatedSites = blockedSites.map(site => {
            const daysBlocked = calculateDaysSince(site.startDate);

            // Atribuir badges com base no progresso em dias
            site.badges = badges.filter(badge => 
                daysBlocked >= badge.days && !site.badges.includes(badge.name)
            ).map(badge => badge.name);

            return site;
        });

        // Salva a lista atualizada com os novos badges atribuídos
        setUserBlockedSites(updatedSites);
    });
};

// Função para exibir o progresso na interface
export const displayProgress = (container) => {
    getUserBlockedSites((blockedSites) => {
        container.innerHTML = ""; // Limpa o conteúdo atual
        blockedSites.forEach(site => {
            const daysBlocked = calculateDaysSince(site.startDate);
            const siteElement = document.createElement("div");
            siteElement.className = "site-progress";

            const title = document.createElement("h3");
            title.textContent = `${site.url} - ${daysBlocked} dias bloqueado`;
            siteElement.appendChild(title);

            const badgeList = document.createElement("ul");
            site.badges.forEach(badge => {
                const badgeItem = document.createElement("li");
                badgeItem.className = "badge";
                badgeItem.textContent = badge;
                badgeList.appendChild(badgeItem);
            });

            siteElement.appendChild(badgeList);
            container.appendChild(siteElement);
        });
    });
};
