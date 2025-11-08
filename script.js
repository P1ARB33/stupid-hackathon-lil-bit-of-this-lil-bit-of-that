window.addEventListener("load", () => {
    setTimeout(() => {
        const modal = document.getElementById("six-seven");
        const grid = document.getElementById("button-grid");

        modal.style.display = "block";

        const totalButtons = 10 * 10;
        let buttons = [];

        for (let i = 0; i < totalButtons; i++) {
            const btn = document.createElement("button");
            btn.className = "six-button";
            btn.textContent = "67";
            buttons.push(btn);
            grid.appendChild(btn);
        }

        // Randomly assign close functionality to **one** button
        const closeBtn = buttons[6];
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });

    }, 10000); // 10 seconds
});
