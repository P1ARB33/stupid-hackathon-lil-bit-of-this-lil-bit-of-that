window.addEventListener("load", () => {

    const popupOne = document.getElementById("six-seven");
    const buttonGrid = document.getElementById("button-grid");
    const popupTwo = document.getElementById("mr-peebles");
    const video = document.getElementById("popup-video");
    const videoClose = document.getElementById("video-close");
    const coinPopup = document.getElementById("flip-coin-container");
    const flipButton = document.getElementById("flip-coin");
    const coinResult = document.getElementById("coin-result");

    let popupOneShown = false;
    let popupTwoShown = false;

    // --- Popup show/hide ---
    const showPopupOne = () => { if(!popupOneShown){ popupOne.style.display="flex"; popupOneShown=true; } };
    const hidePopupOne = () => popupOne.style.display="none";

    const showPopupTwo = () => {
        if(!popupTwoShown){
            popupTwo.style.display="flex";
            popupTwoShown=true;
            video.play().catch(()=>{});
        }
    };
    const hidePopupTwo = () => { video.pause(); video.currentTime=0; popupTwo.style.display="none"; };

    const showCoinPopup = () => coinPopup.style.display="flex";
    const hideCoinPopup = () => coinPopup.style.display="none";

    // --- Random first popup after 10 seconds ---
    const firstPopupIsOne = Math.random() < 0.5;
    setTimeout(() => {
        firstPopupIsOne ? showPopupOne() : showPopupTwo();
    }, 10000);

    // --- Popup #1 buttons ---
    const totalButtons = 112;
    let buttons = [];
    for(let i=0;i<totalButtons;i++){
        const btn=document.createElement("button");
        btn.className="six-button";
        btn.textContent="67";
        buttons.push(btn);
        buttonGrid.appendChild(btn);
    }
    const closeBtnOne = buttons[66];
    closeBtnOne.addEventListener("click",()=>{
        hidePopupOne();
        setTimeout(showPopupTwo,2000);
    });

    // --- Popup #2 close triggers coin flip ---
    videoClose.addEventListener("click", ()=>{
        showCoinPopup();
        coinResult.textContent="Click Flip to see the result!";
    });

    // --- Flip-a-coin logic 15% ---
    flipButton.addEventListener("click", ()=>{
        const isSuccess = Math.random() < 0.15;
        coinResult.textContent = isSuccess ? "Heads! Success!" : "Tails! Try again!";
        if(isSuccess){
            hideCoinPopup();
            hidePopupTwo();
            if(!popupOneShown) setTimeout(showPopupOne,2000);
        }
    });

    // --- Flash-bang ---
    const flashFiles = [
        "media/flash/astolfo.png","media/flash/chris-from-tinder.jpg","media/flash/david.png",
        "media/flash/denji.jpg","media/flash/dih.png","media/flash/dio.png",
        "media/flash/goldship.png","media/flash/horse.jpg","media/flash/im-goated.jpg",
        "media/flash/ksi.jpeg","media/flash/megumin.png","media/flash/miku.png",
        "media/flash/piccolo.png","media/flash/redditor.png","media/flash/sukuna.png",
        "media/flash/the-lion.png","media/flash/tsundere.png"
    ];

    function flashBang(){
        if (!(popupOneShown || popupTwoShown || coinPopup.style.display === "flex")) return;
        const src = flashFiles[Math.floor(Math.random()*flashFiles.length)];
        const img = document.createElement('img');
        img.src=src; img.alt='flash'; img.className='flash-bang';
        document.body.appendChild(img);
        try{ if(window._flashAudio && window._flashAudio.src){ const s=window._flashAudio.cloneNode(); s.play().catch(()=>{}); }}catch(e){}
        img.addEventListener('animationend',()=>{try{img.remove();}catch(e){}});
        return img;
    }

    try{ const _a=new Audio('media/audio/flash-bang.mp3'); _a.preload='auto'; _a.volume=0.9; window._flashAudio=_a; }catch(e){window._flashAudio=null;}
    window.flashBang=flashBang;
    document.addEventListener('keydown', e=>{ if(e.key==='f'||e.key==='F') flashBang(); });

    function _randMs(min=1000,max=15000){return Math.floor(Math.random()*(max-min+1))+min;}
    let _randomFlashTimeout=null,_randomFlashRunning=false;
    function startRandomAutoFlash(runImmediate=false,minMs=1000,maxMs=15000){
        _randomFlashRunning=true;
        if(runImmediate) flashBang();
        const scheduleNext=()=>{ if(!_randomFlashRunning) return; _randomFlashTimeout=setTimeout(()=>{ flashBang(); scheduleNext(); },_randMs(minMs,maxMs)); };
        scheduleNext(); return _randomFlashTimeout;
    }
    function stopRandomAutoFlash(){ _randomFlashRunning=false; if(_randomFlashTimeout){clearTimeout(_randomFlashTimeout); _randomFlashTimeout=null;} }
    window.startRandomAutoFlash=startRandomAutoFlash;
    window.stopRandomAutoFlash=stopRandomAutoFlash;
    startRandomAutoFlash(true,1000,15000);

    // --- First click interaction to unmute audio & play video ---
    function handleFirstUserInteraction(){
        if(window._flashAudio) window._flashAudio.muted=false;
        if(popupTwoShown){ video.play().catch(()=>{}); }
        window.removeEventListener("click",handleFirstUserInteraction);
    }
    window.addEventListener("click", handleFirstUserInteraction, { once: true });

    // =====================
    // Clairo Lyrics Quiz
    // =====================
    const answers = {
        q1: "curse",
        q2: "fool",
        q3: "silly",
        q4: "hair",
        q5: "yesterday"
    };

    document.getElementById("check-answers").addEventListener("click", () => {
        let score = 0;

        Object.keys(answers).forEach((id) => {
            const userInput = document.getElementById(id).value.trim().toLowerCase();
            const resultDiv = document.getElementById(`${id}-result`);

            if (userInput === answers[id]) {
                resultDiv.textContent = "✅ Correct!";
                resultDiv.className = "result correct";
                score++;
            } else {
                resultDiv.textContent = "❌ Wrong!";
                resultDiv.className = "result wrong";
            }
        });

        document.getElementById("quiz-summary").textContent =
            `You got ${score} out of 5 correct.`;
    });

});
