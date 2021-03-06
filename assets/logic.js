//Initialize firebase
var config = {
  apiKey: "AIzaSyAmCRAqaUL7QpIkPPSn2sqAj9hjCRse8ws",
  authDomain: "employeeproject-21f77.firebaseapp.com",
  databaseURL: "https://employeeproject-21f77.firebaseio.com",
  projectId: "employeeproject-21f77",
  storageBucket: "employeeproject-21f77.appspot.com",
  messagingSenderId: "842985455265"
};
firebase.initializeApp(config);

var database = firebase.database();

//Onclick function to add train when button is clicked
document.querySelector("#add-train").addEventListener("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainInput = document.querySelector("#name-input").value.trim();
  var destinationInput = document.querySelector("#destination-input").value.trim();
  var timeInput = document.querySelector("#time-input").value.trim();
  var frequencyInput = document.querySelector("#frequency-input").value.trim();

  // Holds train data
  var newTrain = {
    train: trainInput,
    destination: destinationInput,
    time: timeInput,
    frequency: frequencyInput
  };

  // Uploads data to the Firebase database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.train);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  // Need to clear text box when train is added
  document.querySelector("#name-input").value = "";
  document.querySelector("#destination-input").value = "";
  document.querySelector("#time-input").value = "";
  document.querySelector("#frequency-input").value = "";
});

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainInput = childSnapshot.val().train;
  var destinationInput = childSnapshot.val().destination;
  var timeInput = childSnapshot.val().time;
  var frequencyInput = childSnapshot.val().frequency;

  console.log(trainInput);
  console.log(destinationInput);
  console.log(timeInput);
  console.log(frequencyInput);

  //******/Need to Add moment and time structure********

  //empty strings for minutesaway until next train
  var minsAway;
  //need to put in subtract 1 years for first train times that are after current time, 
  //otherwise will not calculate properly
  var firstTrain = moment(timeInput, "hh:mm").subtract(1, "years");
  // Difference in time between the current and firstTrain
  var diffTime = moment().diff(moment(firstTrain), "minutes");
  var remainder = diffTime % frequencyInput;
  // Minutes until next train
  var minsAway = frequencyInput - remainder;
  // Next train time
  var nextTrain = moment().add(minsAway, "minutes");
  nextTrain = moment(nextTrain).format("hh:mm");


  // create a temp object of our values
  let tempTrainData = {
    train: trainInput,
    destination: destinationInput,
    frequency: frequencyInput,
    nextTrain: nextTrain,
    minsAway: minsAway
  };
  console.log(tempTrainData);
//stores row in variable
  var newRow = document.createElement("tr");

  // Loop through the childSnapshot object
//This adds data in column inHTML
  for (let data of Object.values(tempTrainData)) {
    let newTd = document.createElement("td");
    newTd.innerText = data;
    newRow.appendChild(newTd);
  }

  // Append the new row to the table
  document.querySelector("#train-table > tbody").appendChild(newRow);
});

