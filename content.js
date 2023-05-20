chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.darkMode) {
        if (request.darkMode === true) {
            document.documentElement.style.filter = "grayscale(100%)";
        } else {
            document.documentElement.style.filter = "none";
        }
    }
});
