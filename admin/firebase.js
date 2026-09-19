import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-storage.js';
export const app=initializeApp({apiKey:'AIzaSyD0jQXG7KQ-ypzoNitubt2AcYuEq7Ig_7M',authDomain:'travelvacationsadventure-1ec6d.firebaseapp.com',databaseURL:'https://travelvacationsadventure-1ec6d-default-rtdb.firebaseio.com',projectId:'travelvacationsadventure-1ec6d',storageBucket:'travelvacationsadventure-1ec6d.firebasestorage.app',messagingSenderId:'42553739998',appId:'1:42553739998:web:ad97d14835d91fadd2d04f',measurementId:'G-RS0LR52536'});
export const auth=getAuth(app);export const storage=getStorage(app);
