// tasks.js
import { db } from './firebase-config.js';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

// Add a new task
export async function addTask(task) {
  try {
    const docRef = await addDoc(collection(db, "tasks"), task);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Get all tasks
export async function getTasks() {
  const querySnapshot = await getDocs(collection(db, "tasks"));
  const tasks = [];
  querySnapshot.forEach((doc) => {
    tasks.push({ id: doc.id, ...doc.data() });
  });
  return tasks;
}

// Update a task
export async function updateTask(taskId, updatedTask) {
  const taskRef = doc(db, "tasks", taskId);
  await updateDoc(taskRef, updatedTask);
}

// Delete a task
export async function deleteTask(taskId) {
  const taskRef = doc(db, "tasks", taskId);
  await deleteDoc(taskRef);
}
