window.addEventListener("load", () => {

    // --- Popup #1 elements ---
    const popupOne = document.getElementById("six-seven");
    const buttonGrid = document.getElementById("button-grid");

    // --- Popup #2 elements ---
    const popupTwo = document.getElementById("mr-peebles");
    const videoContainer = document.getElementById("video-container");
    const video = document.getElementById("popup-video");
    const videoClose = document.getElementById("video-close");

    // --- Flip-a-coin elements ---
    const coinPopup = document.getElementById("flip-coin-container");
    const flipButton = document.getElementById("flip-coin");

    // Add a paragraph for displaying coin result
    let coinResult = document.getElementById("coin-result");
    if (!coinResult) {
        coinResult = document.createElement("p");
        coinResult.id = "coin-result";
        document.getElementById("flip-container").appendChild(coinResult);
    }

    let popupOneShown = false;
    let popupTwoShown = false;

    // --- Popup show/hide functions ---
    const showPopupOne = () => {
        if (!popupOneShown) {
            popupOne.style.display = "flex";
            popupOneShown = true;
        }
    };
    const hidePopupOne = () => popupOne.style.display = "none";

    const showPopupTwo = () => {
        if (!popupTwoShown) {
            popupTwo.style.display = "flex";
            popupTwoShown = true;
            video.muted = false;
            video.play(); // ensure video plays on show
        }
    };
    const hidePopupTwo = () => {
        video.pause();       // stop the video
        video.currentTime = 0; // reset to start
        popupTwo.style.display = "none";
    };

    const showCoinPopup = () => coinPopup.style.display = "flex";
    const hideCoinPopup = () => coinPopup.style.display = "none";

    // --- Random first popup ---
    const firstPopupIsOne = Math.random() < 0.5;
    setTimeout(() => {
        firstPopupIsOne ? showPopupOne() : showPopupTwo();
    }, 1000);

    // --- Popup #1: 112 buttons ---
    const totalButtons = 112;
    let buttons = [];
    for (let i = 0; i < totalButtons; i++) {
        const btn = document.createElement("button");
        btn.className = "six-button";
        btn.textContent = "67";
        buttons.push(btn);
        buttonGrid.appendChild(btn);
    }

    // Close Popup #1 only on 67th button
    const closeBtnOne = buttons[66];
    closeBtnOne.addEventListener("click", () => {
        hidePopupOne();
        setTimeout(showPopupTwo, 2000);
    });

    // --- Popup #2 Close Video triggers coin flip ---
    videoClose.addEventListener("click", () => {
        showCoinPopup();
        coinResult.textContent = "Click Flip to see the result!";
    });

    // --- Flip-a-coin logic ---
    flipButton.addEventListener("click", () => {
        const isSuccess = Math.random() < 0.05; // 5% chance
        const resultText = isSuccess ? "Heads! Success!" : "Tails! Try again!";
        coinResult.textContent = resultText;

        if (isSuccess) {
            hideCoinPopup();
            hidePopupTwo(); // stops and closes video
        }
    });

});
