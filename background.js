chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({ "darkMode": false });
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.darkMode !== undefined) {
        chrome.storage.sync.set({ "darkMode": message.darkMode });
        sendResponse({ success: true });
    }
});
