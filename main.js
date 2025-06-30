
let nes;

function waitForCanvasAndInit() {
    const canvas = document.getElementById("nes-canvas");
    if (!canvas) {
        console.error("Canvas not found");
        return setTimeout(waitForCanvasAndInit, 100);
    }

    if (!window.jsnes) {
        console.error("JSNES engine not loaded");
        return setTimeout(waitForCanvasAndInit, 100);
    }

    console.log("Initializing NES...");
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

    console.log("Loading default ROM (tetris.nes)...");
    fetch("tetris.nes")
        .then(res => {
            if (!res.ok) throw new Error("ROM not found");
            return res.arrayBuffer();
        })
        .then(buffer => {
            nes.loadROM(new Uint8Array(buffer));
            nes.frame();
            console.log("ROM loaded and emulator started");
        })
        .catch(err => {
            console.error("ROM load failed:", err.message);
        });
}

window.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded");
    waitForCanvasAndInit();
});
