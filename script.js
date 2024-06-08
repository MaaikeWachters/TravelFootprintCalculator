// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWciAGh3ZokBMZZUjy0gIR_uzWjiwkLys",
  authDomain: "travelfootprintcalculato-fb1ef.firebaseapp.com",
  projectId: "travelfootprintcalculato-fb1ef",
  storageBucket: "travelfootprintcalculato-fb1ef.appspot.com",
  messagingSenderId: "752591049226",
  appId: "1:752591049226:web:3dbead4f67c96a8965c5f3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

function submitForm(name) {
  var nameValue = document.getElementById("name").value;
  set(ref(db, "users/" + userId), {
    username: nameValue,
  });
}
