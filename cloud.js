
function saveGameProgress(playerId, saveData) {
    db.collection("cloud_saves").doc(playerId).set({
        save: saveData,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        console.log("Save successful");
    });
}

function loadGameProgress(playerId, callback) {
    db.collection("cloud_saves").doc(playerId).get().then(doc => {
        if (doc.exists) {
            console.log("Save loaded");
            callback(doc.data().save);
        } else {
            console.log("No save found");
            callback(null);
        }
    });
}
