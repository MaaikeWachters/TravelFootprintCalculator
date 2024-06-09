// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { ref, set } from "firebase/database";
import distances from "../distances.json";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const travelDistances = 
  {
    "amsterdam-london-car": 534.25,
    "amsterdam-london-plane": 356.93,
    "amsterdam-london-train": 522.14,
    "amsterdam-berlin-car": 659.1,
    "amsterdam-berlin-plane": 577.42,
    "amsterdam-berlin-train": 655.64,
    "amsterdam-paris-car": 499.13,
    "amsterdam-paris-plane": 430.1,
    "amsterdam-paris-train": 525.07,
    "amsterdam-rome-car": 1650.97,
    "amsterdam-rome-plane": 1298.65,
    "amsterdam-rome-train": 1578.4,
    "amsterdam-vienna-car": 1147.56,
    "amsterdam-vienna-plane": 936.51,
    "amsterdam-vienna-train": 1277.55,
    "amsterdam-barcelona-car": 1530.99,
    "amsterdam-barcelona-plane": 1238.77,
    "amsterdam-barcelona-train": 1535.76,
    "amsterdam-copenhagen-car": 789.99,
    "amsterdam-copenhagen-plane": 621.76,
    "amsterdam-copenhagen-train": 1007.5,
    "amsterdam-prague-car": 878.24,
    "amsterdam-prague-plane": 709.98,
    "amsterdam-prague-train": 1031.34,
    "amsterdam-warsaw-car": 1200.41,
    "amsterdam-warsaw-plane": 1098.06,
    "amsterdam-warsaw-train": 1240.44,
    "london-amsterdam-car": 534.25,
    "london-amsterdam-plane": 356.93,
    "london-amsterdam-train": 522.14,
    "london-berlin-car": 1097.66,
    "london-berlin-plane": 931.85,
    "london-berlin-train": 1157.21,
    "london-paris-car": 456.24,
    "london-paris-plane": 343.56,
    "london-paris-train": 454.76,
    "london-rome-car": 1811.73,
    "london-rome-plane": 1435.48,
    "london-rome-train": 1692.11,
    "london-vienna-car": 1476.83,
    "london-vienna-plane": 1235.16,
    "london-vienna-train": 1533.07,
    "london-barcelona-car": 1488.11,
    "london-barcelona-plane": 1138.65,
    "london-barcelona-train": 1559.96,
    "london-copenhagen-car": 1250.3,
    "london-copenhagen-plane": 955.95,
    "london-copenhagen-train": 1459.99,
    "london-prague-car": 1379.34,
    "london-prague-plane": 1113.21,
    "london-prague-train": 1353.04,
    "london-warsaw-car": 1638.97,
    "london-warsaw-plane": 1452.33,
    "london-warsaw-train": 1696.63,
    "berlin-amsterdam-car": 659.1,
    "berlin-amsterdam-plane": 577.42,
    "berlin-amsterdam-train": 655.64,
    "berlin-london-car": 1097.66,
    "berlin-london-plane": 931.85,
    "berlin-london-train": 1157.21,
    "berlin-paris-car": 1046.87,
    "berlin-paris-plane": 878.05,
    "berlin-paris-train": 1153.82,
    "berlin-rome-car": 1504.75,
    "berlin-rome-plane": 1184.1,
    "berlin-rome-train": 1628.39,
    "berlin-vienna-car": 678.68,
    "berlin-vienna-plane": 523.63,
    "berlin-vienna-train": 677.5,
    "berlin-barcelona-car": 1864.44,
    "berlin-barcelona-plane": 1500.27,
    "berlin-barcelona-train": 2257.76,
    "berlin-copenhagen-car": 429.94,
    "berlin-copenhagen-plane": 355.99,
    "berlin-copenhagen-train": 618.29,
    "berlin-prague-car": 345.53,
    "berlin-prague-plane": 279.74,
    "berlin-prague-train": 347.61,
    "berlin-warsaw-car": 576.3,
    "berlin-warsaw-plane": 520.7,
    "berlin-warsaw-train": 586.93,
    "paris-amsterdam-car": 499.13,
    "paris-amsterdam-plane": 430.1,
    "paris-amsterdam-train": 525.07,
    "paris-london-car": 456.24,
    "paris-london-plane": 343.56,
    "paris-london-train": 454.76,
    "paris-berlin-car": 1046.87,
    "paris-berlin-plane": 878.05,
    "paris-berlin-train": 1153.82,
    "paris-rome-car": 1432.22,
    "paris-rome-plane": 1107.05,
    "paris-rome-train": 1117.2,
    "paris-vienna-car": 1236,
    "paris-vienna-plane": 1033.41,
    "paris-vienna-train": 1300.96,
    "paris-barcelona-car": 1031.58,
    "paris-barcelona-plane": 830.52,
    "paris-barcelona-train": 833.6,
    "paris-copenhagen-car": 1224.47,
    "paris-copenhagen-plane": 1027.62,
    "paris-copenhagen-train": 1465.87,
    "paris-prague-car": 1031.26,
    "paris-prague-plane": 881.76,
    "paris-prague-train": 996.76,
    "paris-warsaw-car": 1590.07,
    "paris-warsaw-plane": 1370.65
};

function getDistance(startingpoint, endingpoint) {
  const key = `${startingpoint.toLowerCase()}-${endingpoint.toLowerCase()}`;
  return travelDistances[key] || "Distance not found";
}

// Example usage:
const distance = getDistance("amsterdam", "rome");
console.log(distance); // Output: 345



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

