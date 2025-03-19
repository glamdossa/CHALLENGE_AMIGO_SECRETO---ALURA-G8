// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
let amigos = [];
let amigosSorteados = [];
let currentAudio = null;
let longitudOriginal = null; 

function agregarAmigo() {
    let inputAmigo = document.getElementById("amigo");
    let nombreDeAmigo = inputAmigo.value.trim();

    if (nombreDeAmigo === "") {
        alert("Por favor, ingresa un nombre válido.");
        return;
    }

    if (amigos.includes(nombreDeAmigo)) {
        alert("Este nombre ya ha sido ingresado.");
        inputAmigo.value = "";
        return;
    }

    amigos.push(nombreDeAmigo);
    inputAmigo.value = "";
    mostrarAmigos();

    let drawButton = document.querySelector(".button-draw");
    drawButton.classList.toggle("fixed", amigos.length >= 4);

    let listaul = document.getElementById("listaAmigos");
    listaul.classList.toggle("compact", amigos.length >= 4);
}

function mostrarAmigos() {
    let listaul = document.getElementById("listaAmigos");
    listaul.innerHTML = "";
    amigos.forEach(amigo => {
        let li = document.createElement("li");
        li.textContent = amigo;
        listaul.appendChild(li);
    });
}

function sortearAmigo() {
    if (amigos.length === 0) {
        alert("Necesitas agregar al menos un amigo para poder sortear.");
        return;
    }

    if (longitudOriginal === null) {
        longitudOriginal = amigos.length + amigosSorteados.length;
    }

    const indice = Math.floor(Math.random() * amigos.length);
    const AmigoSecreto = amigos[indice];

    document.getElementById("resultado").innerHTML = `El amigo secreto es ${AmigoSecreto}`;

    amigos.splice(indice, 1);
    amigosSorteados.push(AmigoSecreto);
    mostrarAmigos();

    if (AmigoSecreto.trim().toLowerCase() === "johnny silverhand") {
        const audioFragmento = new Audio("assets/johnny1.m4a");
        currentAudio = audioFragmento;
        audioFragmento.play().then(() => {
            document.getElementById("audio-controls").style.display = "flex";
            document.getElementById("btnPause").textContent = "Pausar Canción";
        });

        audioFragmento.addEventListener("ended", () => {
            document.getElementById("audio-controls").style.display = "none";
            mostrarBotonContinuar();
        });
    }

    if (amigosSorteados.length === longitudOriginal) {
        mostrarBotonReiniciar();
    }
}

function mostrarBotonContinuar() {
    document.getElementById("continuar-container").style.display = "flex";
}

function mostrarBotonReiniciar() {
    document.getElementById("reiniciarButton").style.display = "block";
}

document.getElementById("btnContinuar").addEventListener("click", () => {
    document.getElementById("continuar-container").style.display = "none";

    const audioCompleto = new Audio("./assets/neverfade.m4a");
    currentAudio = audioCompleto;
    audioCompleto.play().then(() => {
        document.getElementById("audio-controls").style.display = "flex";
        document.getElementById("btnPause").textContent = "Pausar Canción";
    });

    audioCompleto.addEventListener("ended", () => {
        document.getElementById("audio-controls").style.display = "none";
    });
});

document.getElementById("btnPause").addEventListener("click", () => {
    if (currentAudio) {
        if (currentAudio.paused) {
            currentAudio.play().then(() => {
                document.getElementById("btnPause").textContent = "Pausar Canción";
            });
        } else {
            currentAudio.pause();
            document.getElementById("btnPause").textContent = "Reanudar Canción";
        }
    }
});

document.getElementById("reiniciarButton").addEventListener("click", reiniciarJuego);

function reiniciarJuego() {
    amigos = [];
    amigosSorteados = [];
    longitudOriginal = null;
    mostrarAmigos();
    document.getElementById("resultado").innerHTML = "";
    document.querySelector(".button-draw").classList.remove("fixed");
    document.getElementById("listaAmigos").classList.remove("compact");
    document.getElementById("continuar-container").style.display = "none";
    document.getElementById("audio-controls").style.display = "none";
    document.querySelector(".button-draw").style.display = "inline-block";
}
