document.addEventListener("DOMContentLoaded", function() {
    var darkModeToggle = document.getElementById("darkModeToggle");
    var isLogoToggled = false;

    darkModeToggle.addEventListener("change", function() {
        isLogoToggled = !isLogoToggled;

        if (isLogoToggled) {
            startFight();
        } else {
            refreshPage();
        }

        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { "darkMode": isLogoToggled });
        });
    });

    function refreshPage(tabId) {
        chrome.tabs.reload(tabId);
    }

    function refresh_fight() {
        location.reload();
    }

    var isFighting = false;

    function startFight() {
        if (isFighting) return;
        isFighting = true;

        var stickman1 = document.getElementById("stickman1");
        var stickman2 = document.getElementById("stickman2");

        stickman1.style.display = "block";
        stickman2.style.display = "block";

        setTimeout(function() {
            var startPosition1 = stickman1.getBoundingClientRect();
            var startPosition2 = stickman2.getBoundingClientRect();
            var endPosition1 = stickman2.getBoundingClientRect();
            var endPosition2 = stickman1.getBoundingClientRect();
            var distanceX1 = endPosition1.x - startPosition1.x;
            var distanceY1 = endPosition1.y - startPosition1.y;
            var distanceX2 = endPosition2.x - startPosition2.x;
            var distanceY2 = endPosition2.y - startPosition2.y;

            stickman1.animate(
                [
                    { transform: "translate(0, 0)" },
                    { transform: `translate(${distanceX1}px, ${distanceY1}px)` }
                ],
                {
                    duration: 1000,
                    fill: "forwards"
                }
            );

            stickman2.animate(
                [
                    { transform: "translate(0, 0)" },
                    { transform: `translate(${distanceX2}px, ${distanceY2}px)` }
                ],
                {
                    duration: 1000,
                    fill: "forwards"
                }
            );

            stickman1.classList.add("fight-animation");
            stickman2.classList.add("fight-animation");

            setTimeout(function() {
                Math.random() > 0.5 ? stickman1.parentNode.removeChild(stickman1) : stickman2.parentNode.removeChild(stickman2);

                if (stickman1.parentNode === null && stickman2.parentNode !== null) {
                    setTimeout(function() {
                        refreshPage();
                    }, 500);
                    stickman2.style.transform = "translate(0, 0)";
                } else if (stickman1.parentNode !== null && stickman2.parentNode === null) {
                    setTimeout(function() {
                        document.documentElement.style.filter = "grayscale(100%)";
                    }, 500);
                    stickman1.style.transform = "translate(0, 0)";
                }

                setTimeout(function() {
                    refresh_fight();
                }, 1000);
            }, 1500);
            isFighting = false;
        });
    }
});
