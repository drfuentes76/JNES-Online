
function submitScore(player, score) {
    db.collection("leaderboard").add({
        player: player,
        score: score,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        console.log("Score submitted");
        renderLeaderboard();
    });
}

function renderLeaderboard() {
    const container = document.getElementById("leaderboard");
    if (!container) return;

    db.collection("leaderboard")
        .orderBy("score", "desc")
        .limit(5)
        .get()
        .then(snapshot => {
            container.innerHTML = "<h3>Leaderboard</h3>";
            snapshot.forEach(doc => {
                const data = doc.data();
                container.innerHTML += `<p>${data.player}: ${data.score}</p>`;
            });
        });
}
