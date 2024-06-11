// main.js
import { signUp, signIn, logOut, onAuthStateChanged } from './auth.js';
import { addUserWithAutoIncrement, getTasks, addTask, updateTask, deleteTask } from './tasks.js';

// Elements
const signUpForm = document.getElementById('signUpForm');
const signInForm = document.getElementById('signInForm');
const logOutButton = document.getElementById('logOutButton');
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

function toggleForms(e) {
    e.preventDefault();
    let loginForm = document.getElementById('login-form');
    let registerForm = document.getElementById('register-form');

    if (registerForm.style.display === 'none' || registerForm.style.display === '' ){
        loginForm.style.display = 'none';
        registerForm.style.display ='block' ;
    }else {
        registerForm.style.display= 'none';
        loginForm.style.display = 'block';
    }
    
};

// Get current user ID
let currentUserId = null;

// Listen to authentication state changes
onAuthStateChanged((user) => {
  if (user) {
    currentUserId = user.uid;
    console.log('User signed in:', currentUserId);
    loadTasks();
  } else {
    currentUserId = null;
    console.log('User signed out');
    taskList.innerHTML = '';
  }
});

// Sign up
signUpForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = signUpForm['email'].value;
  const password = signUpForm['password'].value;
  const displayName = signUpForm['displayName'].value;
  try {
    await addUserWithAutoIncrement(email, displayName);
    await signUp(email, password);
    console.log('User signed up');
  } catch (error) {
    console.error(error);
  }
});

// Sign in
signInForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = signInForm['email'].value;
  const password = signInForm['password'].value;
  try {
    await signIn(email, password);
    console.log('User signed in');
  } catch (error) {
    console.error(error);
  }
});

// Log out
logOutButton.addEventListener('click', async () => {
  try {
    await logOut();
    console.log('User signed out');
    taskList.innerHTML = '';
  } catch (error) {
    console.error(error);
  }
});

// Add task
taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!currentUserId) return;

  const task = {
    title: taskForm['title'].value,
    description: taskForm['description'].value,
    status: 'pending',
    dueDate: new Date(taskForm['dueDate'].value).toISOString(),
    createdAt: new Date().toISOString()
  };
  try {
    const taskId = await addTask(currentUserId, task);
    console.log('Task added with ID:', taskId);
    loadTasks();
  } catch (error) {
    console.error(error);
  }
});

// Load tasks
async function loadTasks() {
  if (!currentUserId) return;

  try {
    const tasks = await getTasks(currentUserId);
    taskList.innerHTML = '';
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = `${task.title}: ${task.description} (Due: ${task.dueDate})`;
      const updateButton = document.createElement('button');
      updateButton.textContent = 'Update';
      updateButton.addEventListener('click', () => updateTask(currentUserId, task.id, { title: 'Updated Task' }));
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', async () => {
        await deleteTask(currentUserId, task.id);
        loadTasks();
      });
      li.appendChild(updateButton);
      li.appendChild(deleteButton);
      taskList.appendChild(li);
    });
  } catch (error) {
    console.error(error);
  }
}
