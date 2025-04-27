// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3g0el7Yuv_EWRK0V0hBSHN-W52K5OlTw",
  authDomain: "e-commerce-259fb.firebaseapp.com",
  projectId: "e-commerce-259fb",
  storageBucket: "e-commerce-259fb.firebasestorage.app",
  messagingSenderId: "595347692927",
  appId: "1:595347692927:web:7b58c87f919e8b63f08e4a",
  measurementId: "G-X0DW754QDG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
