// Initialize Firebase
var config = {
  apiKey: "AIzaSyAo_Lb9g7O3SDfeb2iF1IQ0h59HbWKWOFw",
  authDomain: "webfom-registration.firebaseapp.com",
  databaseURL: "https://webfom-registration.firebaseio.com",
  projectId: "webfom-registration",
  storageBucket: "webfom-registration.appspot.com",
  messagingSenderId: "1042479881724"
};
firebase.initializeApp(config);

// Reference messages collection
var messagesRef = firebase.database().ref('registrations');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  //Get value
  var firstname = getInputVal('firstname');
  var lastname = getInputVal('lastname');
  var username = getInputVal('username');
  var eventslist = getInputVal('eventslist');
  var email = getInputVal('email');
  var phone = getInputVal('phone');
  var comment = getInputVal('comment');

  // Save message
  saveMessage(firstname, lastname, username, eventslist, email, phone, comment);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get form value
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(firstname, lastname, username, eventslist, email, phone, comment){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    firstname: firstname,
    lastname: lastname,
    username: username,
    eventslist: eventslist,
    email: email,
    phone: phone,
    comment: comment
  });
}