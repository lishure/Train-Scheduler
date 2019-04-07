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
  document.querySelector("#add-train").addEventListener("click", function(event) {
    event.preventDefault();

 // Grabs user input
 var trainInput = document.querySelector("#name-input").value.trim();
 var destinationInput = document.querySelector("#destination-input").value.trim();
 //******/Need to Add moment and time structure********
 //********************************************************** */
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
//alert
  alert("Train successfully added");

    // Need to clear text box when train is added
    document.querySelector("#name-input").value = "";
    document.querySelector("#destination-input").value = "";
    document.querySelector("#time-input").value = "";
    document.querySelector("#frequency-input").value = "";
  });

  // Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainInput = childSnapshot.val().train;
    var destinationInput = childSnapshot.val().destination;
    var timeInput = childSnapshot.val().time;
    var frequencyInput = childSnapshot.val().frequency;
  
    // Employee Info
    console.log(trainInput);
    console.log(destinationInput);
    console.log(timeInput);
    console.log(frequencyInput);

     // create a temp object of our values
  let tempTrainData = {
    train: trainInput,
    destination: destinationInput,
    frequency: frequencyInput
  };

var newRow = document.createElement("tr");

  // Loop through the childSnapshot object

  for (let empdata of Object.values(tempTrainData)) {
    let newTd = document.createElement("td");
    newTd.innerText = empdata;
    newRow.appendChild(newTd);
  }

  // Append the new row to the table
  document.querySelector("#train-table > tbody").appendChild(newRow);
});
//Need to have form and submit button
//Form name should include: Train Name, Destination, 
//First Train Time -- in military time, Frequency -- in minutes
//Need to be able to store and push text into html display for relevant fields
//Need to be able to sync up train time with realtime
//current wait time should reflect with train interval and real time
//Need to have click function to start timer when button clicked for train time
//Click function should also store and push text into html
