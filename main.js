
let nes;
let canvasReady = false;

function initNES() {
    const canvas = document.getElementById("nes-canvas");
    if (!canvas) {
        console.error("Canvas not found.");
        return;
    }

    nes = new jsnes.NES({
        onFrame: function (framebuffer_24) {
            const ctx = canvas.getContext("2d");
            const imageData = ctx.getImageData(0, 0, 256, 240);
            for (let i = 0; i < framebuffer_24.length; i++) {
                imageData.data[i] = framebuffer_24[i];
            }
            ctx.putImageData(imageData, 0, 0);
        },
        onStatusUpdate: function () { },
        onAudioSample: function () { }
    });

    window.nes = nes;
    canvasReady = true;
}

function loadROMFromURL(url) {
    fetch(url)
        .then(res => res.arrayBuffer())
        .then(buffer => {
            if (!nes) initNES();
            nes.loadROM(new Uint8Array(buffer));
            nes.frame();
        });
}

function loadSelectedROM() {
    const selector = document.getElementById("romSelector");
    if (selector) {
        loadROMFromURL(selector.value);
    }
}

function uploadCustomROM() {
    const input = document.getElementById("romUploader");
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function () {
            if (!nes) initNES();
            nes.loadROM(new Uint8Array(reader.result));
            nes.frame();

            const selector = document.getElementById("romSelector");
            const newOption = document.createElement("option");
            newOption.text = file.name;
            newOption.value = file.name;
            selector.add(newOption);
            selector.value = file.name;
        };
        reader.readAsArrayBuffer(file);
    }
}

window.addEventListener("load", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const room = urlParams.get("room");
    initNES(); // Always init NES early
    if (room) {
        document.getElementById("room").value = room;
        document.getElementById("mode").value = "multi";
        document.getElementById("multiplayer-options").style.display = "block";
        joinRoom();
    }
});
