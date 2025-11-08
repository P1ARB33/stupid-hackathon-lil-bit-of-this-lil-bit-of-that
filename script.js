window.addEventListener("load", () => {
    setTimeout(() => {
        const modal = document.getElementById("six-seven");
        const grid = document.getElementById("button-grid");

        modal.style.display = "flex";

        const totalButtons = 112;
        let buttons = [];

        for (let i = 0; i < totalButtons; i++) {
            const btn = document.createElement("button");
            btn.className = "six-button";
            btn.textContent = "67";
            buttons.push(btn);
            grid.appendChild(btn);
        }

        // Closes only on the 67th 67
        const closeBtn = buttons[66];
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });

    }, 1000); // 10 seconds
});
