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

//Need to have form and submit button
//Form name should include: Train Name, Destination, 
//First Train Time -- in military time, Frequency -- in minutes
//Need to be able to store and push text into html display for relevant fields
//Need to be able to sync up train time with realtime
//current wait time should reflect with train interval and real time
//Need to have click function to start timer when button clicked for train time
//Click function should also store and push text into html
