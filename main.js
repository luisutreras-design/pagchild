let currentAudio = null;
function meditacion() {
    const audio = document.getElementById("meditaciona");

    // Si ya hay un audio sonando y no es este, lo detenemos
    if (currentAudio && currentAudio !== audio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    // Reproducir o pausar el audio
    if (audio.paused) {
        iniciar()
        audio.play();
        currentAudio = audio;

    } else {
        pausa()
        audio.pause();

    }
}


let segundo = 0
let minuto = 0
let intervalo = null
let enMarcha = false

function actualizarDisplay() {
    let min;
    if (minuto < 10) {
        min = "0" + minuto;

    } else {
        min = minuto
    }
    let seg;
    if (segundo < 10) {
        seg = "0" + segundo
    } else {
        seg = segundo
    }
    document.getElementById("display").textContent = min + ":" + seg;
}



function iniciar() {
    if (!enMarcha) {
        enMarcha = true;
        intervalo = setInterval(function () {
            segundo++
            if (segundo === 60) {
                segundo = 0
                minuto++
            }
            actualizarDisplay()
        }, 1000)
    }
}

function pausa() {
    clearInterval(intervalo)
    enMarcha = false
}
/////codigo luis



let countdown;
let duration = 5 * 60; // minutos por defecto
let remaining = duration;

function startSession(id) {
    const audio = document.getElementById(id);

    // Detener audio anterior
    if (currentAudio && currentAudio !== audio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    // Reproducir o pausar audio
    if (audio.paused) {
        audio.play();
        currentAudio = audio;
        showCounter();
        startCounter();
    } else {
        audio.pause();
        stopCounter();
        hideCounter();
    }
}

function showCounter() {
    document.getElementById("counter").style.display = "block";
}

function hideCounter() {
    document.getElementById("counter").style.display = "none";
}

function startCounter() {
    remaining = duration;
    updateCounter();
    clearInterval(countdown);
    countdown = setInterval(() => {
        remaining--;
        updateCounter();
        if (remaining <= 0) {
            clearInterval(countdown);
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }
            hideCounter();
        }
    }, 1000);
}

function stopCounter() {
    clearInterval(countdown);
}

function updateCounter() {
    const minutes = String(Math.floor(remaining / 60)).padStart(2, '0');
    const seconds = String(remaining % 60).padStart(2, '0');
    document.getElementById("counter").textContent = `Tiempo: ${minutes}:${seconds}`;
}

// Guardar ajustes desde la tuerca
function saveSettings() {
    const mins = document.getElementById("minutesInput").value;
    duration = mins * 60;
    remaining = duration;
    updateCounter();
}