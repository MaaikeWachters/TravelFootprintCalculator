// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { ref, set } from "firebase/database";
import distances from "../distances.json";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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
const db = getFirestore(app);

console.log(db);

const textareaEl = document.getElementById("post-input");
const postButtonEl = document.getElementById("post-btn");

postButtonEl.addEventListener("click", postButtonPressed);

function postButtonPressed() {
  console.log("pressed");
  const postBody = textareaEl.value;

  if (postBody) {
    addUserToDB(postBody);
 //   clearInputField(textareaEl);
  }
}

async function addUserToDB(postBody) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      body: postBody,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e.message);
  }
}

// // Function to handle form submission
// function submitForm() {
//   const form = document.getElementById("userInput");
//   const gender = document.getElementById("gender");

//   if (form) {
//     form.addEventListener("submit", (event) => {
//       event.preventDefault();
//       const selectedValue = gender.value;
//       console.log("Selected value:", selectedValue);

//       // Generate a user ID
//       const userId = generateUserId();
//       console.log("User ID:", userId);

//       set(ref(db, "users/" + userId), {
//         gender: selectedValue,
//       })
//         .then(() => {
//           console.log("Data saved successfully.");
//         })
//         .catch((error) => {
//           console.error("Error saving data: ", error);
//         });
//     });
//   } else {
//     console.error("Form not found!");
//   }
// }

// // Add event listener for DOMContentLoaded to setup the form
// document.addEventListener("DOMContentLoaded", (event) => {
//   submitForm();
// });

// Export the submitForm function
//window.submitForm = submitForm;

// function calculateDistance(startingpoint, endingpoint) {}

// function calculateOffset(emissions) {
//   let offsetOptions = [];
//   let noMeat = emissions / 3;
//   let plasticBags = emissions / 5;

//   offsetOptions.add(noMeat, plasticBags);

//   return offsetOptions;
// }

// function calculateEmissions(userChoice, distance) {
//   if (userChoice === "car") {
//     return distance * 0, 384551;
//   } else if (userChoice === "train") {
//     return distance * 0, 115043499999999;
//   } else {
//     return distance * 0, 69187;
//   }

//   function renderEmissions() {
//     renderOffsetOptions();
//   }
// }

// function renderOffsetOptions(emissions) {
//   calculateOffset(emissions);
//   const offsetEl = document.getElementById("offset-options");

//   for (i === 0; i < offsetOptions.length; i++) {
//     offsetEl.innerHTML = `<li>${offsetOptions[i]}</li>`;
//   }
// }

