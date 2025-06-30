
firebase.auth().signInAnonymously()
  .then(() => console.log("Signed in anonymously"))
  .catch(error => console.error("Auth error:", error));
