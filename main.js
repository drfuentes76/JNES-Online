
let nes;

function initNES() {
    const canvas = document.getElementById("nes-canvas");
    if (!canvas || !window.jsnes) {
        console.error("Canvas or JSNES engine not ready.");
        return false;
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
        onStatusUpdate: function () {},
        onAudioSample: function () {}
    });

    window.nes = nes;
    console.log("NES initialized.");
    return true;
}

function startSinglePlayer() {
    console.log("Starting single-player mode...");
    const romSelector = document.getElementById("romSelector");
    if (!romSelector) {
        console.error("ROM selector not found.");
        return;
    }

    const rom = romSelector.value || "tetris.nes";

    if (!nes) {
        const ready = initNES();
        if (!ready) return;
    }

    fetch(rom)
        .then(res => res.arrayBuffer())
        .then(buffer => {
            nes.loadROM(new Uint8Array(buffer));
            nes.frame();
            console.log("ROM loaded successfully.");
        })
        .catch(err => {
            console.error("Failed to load ROM:", err.message);
        });
}

window.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded. Emulator not yet started.");
});
