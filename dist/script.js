// Initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';

const firebaseConfig = {
  apiKey: "AIzaSyDWs_XpIXuqwOi9lkQXDcaKvhnNf2SvovA",
  authDomain: "pocketwatchers-696c1.firebaseapp.com",
  databaseURL: "https://pocketwatchers-696c1-default-rtdb.firebaseio.com/",
  projectId: "pocketwatchers-696c1",
  storageBucket: "pocketwatchers-696c1.appspot.com",
  messagingSenderId: "1067329525191",
  appId: "1:1067329525191:web:7103e18ed7ef6d326275e2",
  measurementId: "G-ECT5Y08C6B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to save email to Firebase Realtime Database
const submitEmail = (email) => {
  if (!email || !email.includes('@')) {
    alert('Please enter a valid email address');
    return;
  }

  const emailRef = ref(database, 'subscribers/' + btoa(email));
  set(emailRef, {
    email: email,
    timestamp: new Date().toISOString()
  }).then(() => {
    alert('Thanks for subscribing!');
    document.getElementById('emailInput').value = '';
  }).catch((error) => {
    console.error('Error saving email:', error);
    alert('Failed to save your email. Please try again.');
  });
};

// Add event listener when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const submitButton = document.getElementById('submitEmailButton');
  if (submitButton) {
    submitButton.addEventListener('click', () => {
      const email = document.getElementById('emailInput').value;
      submitEmail(email);
    });
  }
});