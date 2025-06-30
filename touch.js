
function setupTouchControls() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
    <div id="accessibility-toggle">
        <label for="screenReaderToggle">Screen Reader</label>
        <input type="checkbox" id="screenReaderToggle" checked>
    </div>
    <div id="touch-controls" aria-label="Touch Controls">
        <button class="control" id="btn-left" aria-label="Move Left">◀</button>
        <button class="control" id="btn-right" aria-label="Move Right">▶</button>
        <button class="control" id="btn-up" aria-label="Move Up">▲</button>
        <button class="control" id="btn-down" aria-label="Move Down">▼</button>
        <button class="control" id="btn-a" aria-label="Press A">A</button>
        <button class="control" id="btn-b" aria-label="Press B">B</button>
        <button class="control" id="btn-start" aria-label="Start Button">Start</button>
        <button class="control" id="btn-select" aria-label="Select Button">Select</button>
    </div>
`;
    document.body.appendChild(wrapper);

    const keyMap = {
        "btn-left": jsnes.Controller.BUTTON_LEFT,
        "btn-right": jsnes.Controller.BUTTON_RIGHT,
        "btn-up": jsnes.Controller.BUTTON_UP,
        "btn-down": jsnes.Controller.BUTTON_DOWN,
        "btn-a": jsnes.Controller.BUTTON_A,
        "btn-b": jsnes.Controller.BUTTON_B,
        "btn-start": jsnes.Controller.BUTTON_START,
        "btn-select": jsnes.Controller.BUTTON_SELECT,
    };

    const screenReaderEnabled = () => document.getElementById("screenReaderToggle")?.checked;

    for (let id in keyMap) {
        const el = document.getElementById(id);
        el.addEventListener("touchstart", () => {
            nes.buttonDown(1, keyMap[id]);
            if (screenReaderEnabled()) el.setAttribute("aria-live", "assertive");
        });
        el.addEventListener("touchend", () => {
            nes.buttonUp(1, keyMap[id]);
            if (screenReaderEnabled()) el.setAttribute("aria-live", "off");
        });
    }
}

function pollGamepad() {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    if (!gamepads[0]) return;

    const pad = gamepads[0];
    if (!pad) return;

    const threshold = 0.3;
    nes.buttonDown(1, pad.axes[0] < -threshold ? jsnes.Controller.BUTTON_LEFT : jsnes.Controller.BUTTON_RIGHT);
    nes.buttonDown(1, pad.axes[1] < -threshold ? jsnes.Controller.BUTTON_UP : jsnes.Controller.BUTTON_DOWN);

    if (pad.buttons[0].pressed) nes.buttonDown(1, jsnes.Controller.BUTTON_A);
    if (pad.buttons[1].pressed) nes.buttonDown(1, jsnes.Controller.BUTTON_B);
    if (pad.buttons[9].pressed) nes.buttonDown(1, jsnes.Controller.BUTTON_START);
    if (pad.buttons[8].pressed) nes.buttonDown(1, jsnes.Controller.BUTTON_SELECT);

    requestAnimationFrame(pollGamepad);
}

window.addEventListener('load', () => {
    setupTouchControls();
    pollGamepad();
});
