document.addEventListener("DOMContentLoaded", function() {
    var darkModeToggle = document.getElementById("darkModeToggle");
    var logoElement = document.getElementById("logo");
    var isLogoToggled = false;
    var storedDarkMode = localStorage.getItem("darkMode");

    if (storedDarkMode === "true") {
        darkModeToggle.checked = true;
        applyDarkMode(true);
        showStickman1();
    }

    darkModeToggle.addEventListener("change", function() {
        isLogoToggled = !isLogoToggled;

        if (isLogoToggled) {
            applyDarkMode(true);
            localStorage.setItem("darkMode", "true");
            showStickman1();
        } else {
            applyDarkMode(false);
            localStorage.setItem("darkMode", "false");
            showStickman2();
            refreshPage();
        }

        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { "darkMode": isLogoToggled });
        });
    });

    function applyDarkMode(isDarkMode) {
        if (isDarkMode) {
            document.documentElement.style.filter = "grayscale(100%)";
        } else {
            document.documentElement.style.filter = "";
        }
    }

    function refreshPage(tabId) {
        chrome.tabs.reload(tabId);
    }

    function showStickman1() {
        var stickman1 = document.getElementById("stickman1");
        var stickman2 = document.getElementById("stickman2");

        stickman1.style.display = "block";
        stickman2.style.display = "none";
        stickman1.classList.add("dance-animation");
        stickman2.classList.remove("dance-animation");
    }

    function showStickman2() {
        var stickman1 = document.getElementById("stickman1");
        var stickman2 = document.getElementById("stickman2");

        stickman1.style.display = "none";
        stickman2.style.display = "block";
        stickman2.classList.add("dance-animation");
        stickman1.classList.remove("dance-animation");
    }
});
