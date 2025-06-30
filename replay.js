
let replayFrames = [];

function captureFrame(state) {
    replayFrames.push(state);
}

function playReplay(frames, interval = 1000 / 60) {
    let i = 0;
    const canvas = document.getElementById("nes-canvas");
    const ctx = canvas.getContext("2d");

    function drawNextFrame() {
        if (i >= frames.length) return;
        const frame = frames[i++];
        const imageData = ctx.getImageData(0, 0, 256, 240);
        for (let j = 0; j < frame.length; j++) {
            imageData.data[j] = frame[j];
        }
        ctx.putImageData(imageData, 0, 0);
        setTimeout(drawNextFrame, interval);
    }

    drawNextFrame();
}
