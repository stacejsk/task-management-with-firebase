// users.js
import { db } from './firebase-config.js';
import { collection, addDoc, doc, runTransaction } from "firebase/firestore";

// Add a new user document with an auto-incrementing ID
async function addUserWithAutoIncrement(email,displayName) {
  try {
    const userRef = await runTransaction(db, async (transaction) => {
      const counterRef = doc(db, "counters", "userCounter");
      const counterDoc = await transaction.get(counterRef);
      if (!counterDoc.exists()) {
        throw new Error("Counter document does not exist!");
      }

      const newId = counterDoc.data().currentId + 1;
      transaction.update(counterRef, { currentId: newId });

      const userDocRef = doc(db, "users", newId.toString());
      transaction.set(userDocRef, {
        email: email,
        displayName: displayName,
        createdAt: new Date().toISOString()
      });

      return userDocRef;
    });

    console.log("User document written with ID: ", userRef.id);
  } catch (e) {
    console.error("Transaction failed: ", e);
  }
}

addUserWithAutoIncrement().catch(console.error);
