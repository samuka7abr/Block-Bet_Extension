export const getUserBlockedSites = (callback) => {
    chrome.storage.local.get({ userBlockedSites: [] }, data => {
        callback(data.userBlockedSites);
    });
};

export const setUserBlockedSites = (sites) => {
    chrome.storage.local.set({ userBlockedSites: sites });
};
