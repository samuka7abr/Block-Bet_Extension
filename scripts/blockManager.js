export const addSiteToBlock = (site) => {
    chrome.storage.local.get({ userBlockedSites: [] }, data => {
        const userBlockedSites = data.userBlockedSites;
        userBlockedSites.push(site);
        chrome.storage.local.set({ userBlockedSites });
    });
};
