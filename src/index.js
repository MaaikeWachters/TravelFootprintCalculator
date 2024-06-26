// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { ref, set } from "firebase/database";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const travelDistances = {
  "amsterdam-london-car": 534,
  "amsterdam-london-plane": 356,
  "amsterdam-london-train": 522,
  "amsterdam-berlin-car": 659,
  "amsterdam-berlin-plane": 577,
  "amsterdam-berlin-train": 655,
  "amsterdam-paris-car": 499,
  "amsterdam-paris-plane": 430,
  "amsterdam-paris-train": 525,
  "amsterdam-rome-car": 1651,
  "amsterdam-rome-plane": 1299,
  "amsterdam-rome-train": 1578,
  "amsterdam-vienna-car": 1148,
  "amsterdam-vienna-plane": 937,
  "amsterdam-vienna-train": 1278,
  "amsterdam-barcelona-car": 1531,
  "amsterdam-barcelona-plane": 1239,
  "amsterdam-barcelona-train": 1536,
  "amsterdam-copenhagen-car": 790,
  "amsterdam-copenhagen-plane": 622,
  "amsterdam-copenhagen-train": 1008,
  "amsterdam-prague-car": 878,
  "amsterdam-prague-plane": 710,
  "amsterdam-prague-train": 1031,
  "amsterdam-warsaw-car": 1200,
  "amsterdam-warsaw-plane": 1098,
  "amsterdam-warsaw-train": 1240,
  "london-amsterdam-car": 534,
  "london-amsterdam-plane": 356,
  "london-amsterdam-train": 522,
  "london-berlin-car": 1098,
  "london-berlin-plane": 932,
  "london-berlin-train": 1157,
  "london-paris-car": 456,
  "london-paris-plane": 344,
  "london-paris-train": 455,
  "london-rome-car": 1812,
  "london-rome-plane": 1435,
  "london-rome-train": 1692,
  "london-vienna-car": 1477,
  "london-vienna-plane": 1235,
  "london-vienna-train": 1533,
  "london-barcelona-car": 1488,
  "london-barcelona-plane": 1139,
  "london-barcelona-train": 1560,
  "london-copenhagen-car": 1250,
  "london-copenhagen-plane": 956,
  "london-copenhagen-train": 1460,
  "london-prague-car": 1379,
  "london-prague-plane": 1113,
  "london-prague-train": 1353,
  "london-warsaw-car": 1639,
  "london-warsaw-plane": 1452,
  "london-warsaw-train": 1697,
  "berlin-amsterdam-car": 659,
  "berlin-amsterdam-plane": 577,
  "berlin-amsterdam-train": 655,
  "berlin-london-car": 1098,
  "berlin-london-plane": 932,
  "berlin-london-train": 1157,
  "berlin-paris-car": 1047,
  "berlin-paris-plane": 878,
  "berlin-paris-train": 1154,
  "berlin-rome-car": 1505,
  "berlin-rome-plane": 1184,
  "berlin-rome-train": 1628,
  "berlin-vienna-car": 679,
  "berlin-vienna-plane": 524,
  "berlin-vienna-train": 678,
  "berlin-barcelona-car": 1864,
  "berlin-barcelona-plane": 1500,
  "berlin-barcelona-train": 2258,
  "berlin-copenhagen-car": 430,
  "berlin-copenhagen-plane": 356,
  "berlin-copenhagen-train": 618,
  "berlin-prague-car": 346,
  "berlin-prague-plane": 280,
  "berlin-prague-train": 348,
  "berlin-warsaw-car": 576,
  "berlin-warsaw-plane": 521,
  "berlin-warsaw-train": 587,
  "paris-amsterdam-car": 499,
  "paris-amsterdam-plane": 430,
  "paris-amsterdam-train": 525,
  "paris-london-car": 456,
  "paris-london-plane": 344,
  "paris-london-train": 455,
  "paris-berlin-car": 1047,
  "paris-berlin-plane": 878,
  "paris-berlin-train": 1154,
  "paris-rome-car": 1432,
  "paris-rome-plane": 1107,
  "paris-rome-train": 1117,
  "paris-vienna-car": 1236,
  "paris-vienna-plane": 1033,
  "paris-vienna-train": 1301,
  "paris-barcelona-car": 1032,
  "paris-barcelona-plane": 831,
  "paris-barcelona-train": 834,
  "paris-copenhagen-car": 1224,
  "paris-copenhagen-plane": 1028,
  "paris-copenhagen-train": 1466,
  "paris-prague-car": 1031,
  "paris-prague-plane": 882,
  "paris-prague-train": 997,
  "paris-warsaw-car": 1590,
  "paris-warsaw-plane": 1371,
  "paris-warsaw-train": 1717,
  "rome-amsterdam-car": 1651,
  "rome-amsterdam-plane": 1299,
  "rome-amsterdam-train": 1578,
  "rome-london-car": 1812,
  "rome-london-plane": 1435,
  "rome-london-train": 1692,
  "rome-berlin-car": 1505,
  "rome-berlin-plane": 1184,
  "rome-berlin-train": 1628,
  "rome-paris-car": 1432,
  "rome-paris-plane": 1107,
  "rome-paris-train": 1117,
  "rome-vienna-car": 1120,
  "rome-vienna-plane": 765,
  "rome-vienna-train": 1280,
  "rome-barcelona-car": 1357,
  "rome-barcelona-plane": 862,
  "rome-barcelona-train": 1371,
  "rome-copenhagen-car": 1900,
  "rome-copenhagen-plane": 1534,
  "rome-copenhagen-train": 1861,
  "rome-prague-car": 1301,
  "rome-prague-plane": 923,
  "rome-prague-train": 1306,
  "rome-warsaw-car": 1787,
  "rome-warsaw-plane": 1318,
  "rome-warsaw-train": 2134,
  "vienna-amsterdam-car": 1148,
  "vienna-amsterdam-plane": 937,
  "vienna-amsterdam-train": 1278,
  "vienna-london-car": 1477,
  "vienna-london-plane": 1235,
  "vienna-london-train": 1533,
  "vienna-berlin-car": 679,
  "vienna-berlin-plane": 524,
  "vienna-berlin-train": 678,
  "vienna-paris-car": 1236,
  "vienna-paris-plane": 1033,
  "vienna-paris-train": 1301,
  "vienna-rome-car": 1120,
  "vienna-rome-plane": 765,
  "vienna-rome-train": 1280,
  "vienna-barcelona-car": 1781,
  "vienna-barcelona-plane": 1350,
  "vienna-barcelona-train": 1736,
  "vienna-copenhagen-car": 1135,
  "vienna-copenhagen-plane": 871,
  "vienna-copenhagen-train": 1469,
  "vienna-prague-car": 337,
  "vienna-prague-plane": 253,
  "vienna-prague-train": 334,
  "vienna-warsaw-car": 674,
  "vienna-warsaw-plane": 558,
  "vienna-warsaw-train": 720,
  "barcelona-amsterdam-car": 1531,
  "barcelona-amsterdam-plane": 1239,
  "barcelona-amsterdam-train": 1536,
  "barcelona-london-car": 1488,
  "barcelona-london-plane": 1139,
  "barcelona-london-train": 1560,
  "barcelona-berlin-car": 1864,
  "barcelona-berlin-plane": 1500,
  "barcelona-berlin-train": 2258,
  "barcelona-paris-car": 1032,
  "barcelona-paris-plane": 831,
  "barcelona-paris-train": 834,
  "barcelona-rome-car": 1357,
  "barcelona-rome-plane": 862,
  "barcelona-rome-train": 1371,
  "barcelona-vienna-car": 1781,
  "barcelona-vienna-plane": 1350,
  "barcelona-vienna-train": 1736,
  "barcelona-copenhagen-car": 2136,
  "barcelona-copenhagen-plane": 1761,
  "barcelona-copenhagen-train": 2579,
  "barcelona-prague-car": 1713,
  "barcelona-prague-plane": 1354,
  "barcelona-prague-train": 1914,
  "barcelona-warsaw-car": 2409,
  "barcelona-warsaw-plane": 1868,
  "barcelona-warsaw-train": 2776,
  "copenhagen-amsterdam-car": 790,
  "copenhagen-amsterdam-plane": 622,
  "copenhagen-amsterdam-train": 1008,
  "copenhagen-london-car": 1250,
  "copenhagen-london-plane": 956,
  "copenhagen-london-train": 1460,
  "copenhagen-berlin-car": 430,
  "copenhagen-berlin-plane": 356,
  "copenhagen-berlin-train": 618,
  "copenhagen-paris-car": 1224,
  "copenhagen-paris-plane": 1028,
  "copenhagen-paris-train": 1466,
  "copenhagen-rome-car": 1900,
  "copenhagen-rome-plane": 1534,
  "copenhagen-rome-train": 1861,
  "copenhagen-vienna-car": 1135,
  "copenhagen-vienna-plane": 871,
  "copenhagen-vienna-train": 1469,
  "copenhagen-barcelona-car": 2136,
  "copenhagen-barcelona-plane": 1761,
  "copenhagen-barcelona-train": 2579,
  "copenhagen-prague-car": 779,
  "copenhagen-prague-plane": 635,
  "copenhagen-prague-train": 1076,
  "copenhagen-warsaw-car": 1005,
  "copenhagen-warsaw-plane": 675,
  "copenhagen-warsaw-train": 1357,
  "prague-amsterdam-car": 878,
  "prague-amsterdam-plane": 710,
  "prague-amsterdam-train": 1031,
  "prague-london-car": 1379,
  "prague-london-plane": 1113,
  "prague-london-train": 1353,
  "prague-berlin-car": 346,
  "prague-berlin-plane": 280,
  "prague-berlin-train": 348,
  "prague-paris-car": 1031,
  "prague-paris-plane": 882,
  "prague-paris-train": 997,
  "prague-rome-car": 1301,
  "prague-rome-plane": 923,
  "prague-rome-train": 1306,
  "prague-vienna-car": 337,
  "prague-vienna-plane": 253,
  "prague-vienna-train": 334,
  "prague-barcelona-car": 1713,
  "prague-barcelona-plane": 1354,
  "prague-barcelona-train": 1914,
  "prague-copenhagen-car": 779,
  "prague-copenhagen-plane": 635,
  "prague-copenhagen-train": 1076,
  "prague-warsaw-car": 678,
  "prague-warsaw-plane": 521,
  "prague-warsaw-train": 683,
  "warsaw-amsterdam-car": 1200,
  "warsaw-amsterdam-plane": 1098,
  "warsaw-amsterdam-train": 1240,
  "warsaw-london-car": 1639,
  "warsaw-london-plane": 1452,
  "warsaw-london-train": 1697,
  "warsaw-berlin-car": 576,
  "warsaw-berlin-plane": 521,
  "warsaw-berlin-train": 587,
  "warsaw-paris-car": 1590,
  "warsaw-paris-plane": 1371,
  "warsaw-paris-train": 1717,
  "warsaw-rome-car": 1787,
  "warsaw-rome-plane": 1318,
  "warsaw-rome-train": 2134,
  "warsaw-vienna-car": 674,
  "warsaw-vienna-plane": 558,
  "warsaw-vienna-train": 720,
  "warsaw-barcelona-car": 2409,
  "warsaw-barcelona-plane": 1868,
  "warsaw-barcelona-train": 2776,
  "warsaw-copenhagen-car": 1005,
  "warsaw-copenhagen-plane": 675,
  "warsaw-copenhagen-train": 1357,
  "warsaw-prague-car": 678,
  "warsaw-prague-plane": 521,
  "warsaw-prague-train": 683,
};

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get the select elements
const genderSelect = document.getElementById("gender");
const genderSelectionEl = document.getElementById("gender-selection");

const ageSelect = document.getElementById("age");
const ageSelectionEl = document.getElementById("age-selection");

const nationalitySelect = document.getElementById("nationality");
const nationalitySelectionEl = document.getElementById("nationality-selection");

const startingpointSelect = document.getElementById("startingpoint");
const startingpointSelectionEl = document.getElementById(
  "startingpoint-selection"
);

const destinationSelect = document.getElementById("destination");
const destinationSelectionEl = document.getElementById("destination-selection");

const transportmodeSelect = document.getElementById("transport-mode-selection");
const transportmodeSelectionEl = document.getElementById("transport-mode");

const offsetSelect = document.getElementById("offset");
const offsetSelectionEl = document.getElementById("offset-selection");

const calculateEmissionsBtn = document.getElementById(
  "calculate-emissions-btn"
);

const totalEmissionsEl = document.getElementById("total-emissions");

const submitBtnEl = document.getElementById("submit-btn");
const confirmationEl = document.getElementById("confirmation");

// set calculation variables
let startingPoint = "";
let destination = "";
let modeOfTransport = "";
let calculatedDistance_car = 0;
let calculatedDistance_train = 0;
let calculatedDistance_plane = 0;
let calculatedEmissions_car = 0;
let calculatedEmissions_train = 0;
let calculatedEmissions_plane = 0;
let chosenEmissionsForModeOfTransport = 0;
let selectedTransportmode = "";
let selectedOffset = "";
let selectedGender = "";
let selectedAge = "";
let selectedNationality = "";
let selectedStartingpoint = "";
let selectedDestination = "";
let noBeef = 0;
let cycling = 0;
let plasticBags = 0;
let secondhandClothing = 0;
let plantTrees = 0;

let showButton = true;
const btn = document.getElementById("btn-container");

function renderButton() {
  if (showButton) {
    if (btn) {
      btn.innerHTML = `<button class="btn w-80 bg-red-500 text-black" type="button" id="submit-btn">Submit</button>`;
      const submitBtnEl = document.getElementById("submit-btn");
      if (submitBtnEl) {
        submitBtnEl.addEventListener("click", addUserToDB);
      }
    } else {
      console.error("Element with ID 'btn-container' not found.");
    }
  }
}

renderButton();

// Select gender
genderSelect.addEventListener("change", function () {
  selectedGender = genderSelect.value;
  console.log("Selected gender:", selectedGender);
});

// Select age
ageSelect.addEventListener("change", function () {
  selectedAge = ageSelect.value;
  console.log("Selected age:", selectedAge);
});

// Select nationality

const nationalities = [
  "Afghan",
  "Albanian",
  "Algerian",
  "American",
  "Andorran",
  "Angolan",
  "Antiguans",
  "Argentinean",
  "Armenian",
  "Australian",
  "Austrian",
  "Azerbaijani",
  "Bahamian",
  "Bahraini",
  "Bangladeshi",
  "Barbadian",
  "Barbudans",
  "Batswana",
  "Belarusian",
  "Belgian",
  "Belizean",
  "Beninese",
  "Bhutanese",
  "Bolivian",
  "Bosnian",
  "Brazilian",
  "British",
  "Bruneian",
  "Bulgarian",
  "Burkinabe",
  "Burmese",
  "Burundian",
  "Cambodian",
  "Cameroonian",
  "Canadian",
  "Cape Verdean",
  "Central African",
  "Chadian",
  "Chilean",
  "Chinese",
  "Colombian",
  "Comoran",
  "Congolese",
  "Costa Rican",
  "Croatian",
  "Cuban",
  "Cypriot",
  "Czech",
  "Danish",
  "Djibouti",
  "Dominican",
  "Dutch",
  "East Timorese",
  "Ecuadorean",
  "Egyptian",
  "Emirian",
  "Equatorial Guinean",
  "Eritrean",
  "Estonian",
  "Ethiopian",
  "Fijian",
  "Filipino",
  "Finnish",
  "French",
  "Gabonese",
  "Gambian",
  "Georgian",
  "German",
  "Ghanaian",
  "Greek",
  "Grenadian",
  "Guatemalan",
  "Guinea-Bissauan",
  "Guinean",
  "Guyanese",
  "Haitian",
  "Herzegovinian",
  "Honduran",
  "Hungarian",
  "I-Kiribati",
  "Icelander",
  "Indian",
  "Indonesian",
  "Iranian",
  "Iraqi",
  "Irish",
  "Israeli",
  "Italian",
  "Ivorian",
  "Jamaican",
  "Japanese",
  "Jordanian",
  "Kazakhstani",
  "Kenyan",
  "Kittian and Nevisian",
  "Kuwaiti",
  "Kyrgyz",
  "Laotian",
  "Latvian",
  "Lebanese",
  "Liberian",
  "Libyan",
  "Liechtensteiner",
  "Lithuanian",
  "Luxembourger",
  "Macedonian",
  "Malagasy",
  "Malawian",
  "Malaysian",
  "Maldivan",
  "Malian",
  "Maltese",
  "Marshallese",
  "Mauritanian",
  "Mauritian",
  "Mexican",
  "Micronesian",
  "Moldovan",
  "Monacan",
  "Mongolian",
  "Moroccan",
  "Mosotho",
  "Motswana",
  "Mozambican",
  "Namibian",
  "Nauruan",
  "Nepalese",
  "New Zealander",
  "Nicaraguan",
  "Nigerian",
  "Nigerien",
  "North Korean",
  "Northern Irish",
  "Norwegian",
  "Omani",
  "Pakistani",
  "Palauan",
  "Panamanian",
  "Papua New Guinean",
  "Paraguayan",
  "Peruvian",
  "Polish",
  "Portuguese",
  "Qatari",
  "Romanian",
  "Russian",
  "Rwandan",
  "Saint Lucian",
  "Salvadoran",
  "Samoan",
  "San Marinese",
  "Sao Tomean",
  "Saudi",
  "Scottish",
  "Senegalese",
  "Serbian",
  "Seychellois",
  "Sierra Leonean",
  "Singaporean",
  "Slovakian",
  "Slovenian",
  "Solomon Islander",
  "Somali",
  "South African",
  "South Korean",
  "Spanish",
  "Sri Lankan",
  "Sudanese",
  "Surinamer",
  "Swazi",
  "Swedish",
  "Swiss",
  "Syrian",
  "Taiwanese",
  "Tajik",
  "Tanzanian",
  "Thai",
  "Togolese",
  "Tongan",
  "Trinidadian or Tobagonian",
  "Tunisian",
  "Turkish",
  "Tuvaluan",
  "Ugandan",
  "Ukrainian",
  "Uruguayan",
  "Uzbekistani",
  "Venezuelan",
  "Vietnamese",
  "Welsh",
  "Yemenite",
  "Zambian",
  "Zimbabwean",
];

// Populate the nationality dropdown
nationalities.forEach((nationality) => {
  const option = document.createElement("option");
  option.value = nationality;
  option.text = nationality;
  nationalitySelect.appendChild(option);
});

// Choose nationality
nationalitySelect.addEventListener("change", function () {
  selectedNationality = nationalitySelect.value;
  console.log("Selected nationality:", selectedNationality);
});

// Choose starting point
startingpointSelect.addEventListener("change", function () {
  selectedStartingpoint = startingpointSelect.value;
  console.log("Selected startingpoint:", selectedStartingpoint);
  startingPoint = selectedStartingpoint;
});

// Choose destination
destinationSelect.addEventListener("change", function () {
  selectedDestination = destinationSelect.value;
  console.log("Selected destination:", selectedDestination);
  destination = selectedDestination;
});

calculateEmissionsBtn.addEventListener("click", function () {
  const key_car = `${startingPoint}-${destination}-car`;
  const key_train = `${startingPoint}-${destination}-train`;
  const key_plane = `${startingPoint}-${destination}-plane`;
  console.log(key_car);
  console.log(key_train);
  console.log(key_plane);
  calculatedDistance_car = travelDistances[key_car];
  calculatedDistance_train = travelDistances[key_train];
  calculatedDistance_plane = travelDistances[key_plane];

  console.log(calculatedDistance_car);
  console.log(calculatedDistance_train);
  console.log(calculatedDistance_plane);

  calculatedEmissions_car = calculatedDistance_car * 0.384551;
  calculatedEmissions_train = calculatedDistance_train * 0.115043499999999;
  calculatedEmissions_plane = calculatedDistance_plane * 0.69187;

  console.log(calculatedEmissions_car);
  console.log(calculatedEmissions_train);
  console.log(calculatedEmissions_plane);

  renderEmissions();
  chooseModeOfTransport();
});

function renderEmissions() {
  transportmodeSelect.innerHTML = `<div class="transport-options-container">
  <p class="mx-4 mt-4">Please choose which mode of transport you would like to use for your travels.</p>
  <input type="radio" id="car" name="transport" value="car" class="m-6">
<label for="car">Car: ${calculatedEmissions_car.toFixed(2)} kg CO2 </label><br>
<input type="radio" id="train" name="transport" value="train" class="m-6">
<label for="train">Train: ${calculatedEmissions_train.toFixed(
    2
  )} kg CO2</label><br>
<input type="radio" id="plane" name="transport" value="plane" class="m-6">
<label for="plane">Plane: ${calculatedEmissions_plane.toFixed(2)} kg CO2</label>
</div>
`;
}

function chooseModeOfTransport() {
  document
    .querySelectorAll('input[type="radio"][name="transport"]')
    .forEach(function (radio) {
      radio.addEventListener("change", function () {
        // Inside the event listener, get the value of the selected radio button
        selectedTransportmode = this.value; // 'this' refers to the radio button that was changed

        // transportmodeSelectionEl.innerHTML = `<p class="mt-8 font-bold text-lg">Selected mode of transport: ${selectedTransportmode}</p>`;
        console.log("Selected mode of transport:", selectedTransportmode);

        // You can proceed with your logic here
        if (selectedTransportmode === "car") {
          chosenEmissionsForModeOfTransport = calculatedEmissions_car;
          renderTotals();
          renderEmissionsForChosenTransport();
          return chosenEmissionsForModeOfTransport;
        } else if (selectedTransportmode === "train") {
          chosenEmissionsForModeOfTransport = calculatedEmissions_train;
          renderTotals();
          renderEmissionsForChosenTransport();
          return chosenEmissionsForModeOfTransport;
        } else {
          chosenEmissionsForModeOfTransport = calculatedEmissions_plane;
          renderTotals();
          renderEmissionsForChosenTransport();
          return chosenEmissionsForModeOfTransport;
        }
      });
    });
}

function renderTotals() {
  totalEmissionsEl.innerHTML = `<p class="mt-8">Chosen mode of transport: ${selectedTransportmode} </p>
  <p>Total emissions: ${chosenEmissionsForModeOfTransport.toFixed(2)}</p>`;
}

function calculateOffset() {
  noBeef = chosenEmissionsForModeOfTransport / 27;
  cycling = chosenEmissionsForModeOfTransport / 0.15;
  plasticBags = chosenEmissionsForModeOfTransport / 0.03549;
  secondhandClothing = chosenEmissionsForModeOfTransport / 25;
  plantTrees = chosenEmissionsForModeOfTransport / 22.68;
}

function renderEmissionsForChosenTransport() {
  calculateOffset();
  offsetSelect.innerHTML = `
  <input type="radio" id="nobeef" name="offset" value="nobeef" class="m-6">
  <label for="nobeef">No beef: do not eat ${noBeef.toFixed(
    2
  )} kg of beef.</label></br>
  <input type="radio" id="cycling" name="offset" value="cycling" class="m-6">
  <label for="cycling">Cycling: cycle ${cycling.toFixed(
    2
  )} km instead of driving a car.</label></br>
  <input type="radio" id="plastic-bags" name="offset" value="plastic-bags" class="m-6">
  <label for="plastic-bags">Plastic bags: say no to ${plasticBags.toFixed(
    2
  )} plastic bags.</label></br>
  <input type="radio" id="secondhand-clothing" name="offset" value="secondhand-clothing" class="m-6">
  <label for="secondhand-clothing">Secondhand clothing: buy ${secondhandClothing.toFixed(
    2
  )} kg of secondhand clothing instead of new.</label></br>
  <input type="radio" id="plant-trees" name="offset" value="plant-trees" class="m-6">
  <label for="plant-trees">Plant trees: plant ${plantTrees.toFixed(
    2
  )} trees.</label></br>
`;
  chooseOffset();
}

function chooseOffset() {
  document
    .querySelectorAll('input[type="radio"][name="offset"]')
    .forEach(function (radio) {
      radio.addEventListener("change", function () {
        // Inside the event listener, get the value of the selected radio button
        selectedOffset = this.value; // 'this' refers to the radio button that was changed
        console.log("Selected offset: ", selectedOffset);
      });
    });
}

function renderConfirmation() {
  btn.innerHTML = ``;
  confirmationEl.innerHTML = `<p class="text-2xl text-center">Thank you for submitting your answers!</p>`;
}

async function addUserToDB(gender) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      gender: selectedGender,
      age: selectedAge,
      nationality: selectedNationality,
      startingpoint: selectedStartingpoint,
      destination: selectedDestination,
      distancetrain: calculatedDistance_train,
      distancecar: calculatedDistance_car,
      distanceplane: calculatedDistance_plane,
      selectedtransportmode: selectedTransportmode,
      emissionstrain: calculatedEmissions_train,
      emissionscar: calculatedEmissions_car,
      emissionsplane: calculatedEmissions_plane,
      selectedoffset: selectedOffset,
      nobeefoffset: noBeef,
      cyclingoffset: cycling,
      plasticbagsoffset: plasticBags,
      secondhandclothingoffset: secondhandClothing,
      planttreesoffset: plantTrees,
    });
    console.log("Document written with ID: ", docRef.id);
    renderConfirmation();
  } catch (error) {
    console.error("Error adding document: ", error.message);
  }
}
