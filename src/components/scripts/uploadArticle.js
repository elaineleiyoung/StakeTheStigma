function handleSubmit() {
    const auth = getAuth();
    const userRef = doc(db, "users", auth.currentUser.uid);
  
    // Add topics array to user profile in Firestore
    setDoc(userRef, { topics: selectedTopics }, { merge: true })
      .then(() => {
        navigate("/dashboard", { state: { uuid: auth.currentUser.uid } });
      })
      .catch((error) => {
        alert(error.message);
      });
  }
  