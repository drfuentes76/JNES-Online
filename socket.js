
const socket = io();

function joinRoom() {
    const username = document.getElementById("username").value;
    const room = document.getElementById("room").value;
    socket.emit("join", { room, username });

    const inviteLink = window.location.origin + window.location.pathname + "?room=" + encodeURIComponent(room);
    document.getElementById("inviteLink").textContent = "Invite link: " + inviteLink;

    const rom = document.getElementById("romSelector").value;
    fetch(rom)
        .then(res => res.arrayBuffer())
        .then(buffer => {
            const romData = new Uint8Array(buffer);
            nes.loadROM(romData);
            nes.frame();
            socket.emit("rom", { room, rom: Array.from(romData) });
        });
}

socket.on("rom", data => {
    const romArray = new Uint8Array(data.rom);
    nes.loadROM(romArray);
    nes.frame();
});
