// Initialize Firebase
var config = {
  apiKey: "AIzaSyAbs25bnIeFQjJYsh3pP6G68vUUvRWw6CA",
  authDomain: "mict-19dcd.firebaseapp.com",
  databaseURL: "https://mict-19dcd.firebaseio.com",
  projectId: "mict-19dcd",
  storageBucket: "mict-19dcd.appspot.com",
  messagingSenderId: "1010096184290",
  appId: "1:1010096184290:web:9535ffbc9b768901"
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

  // checkEmailExists();
  // Save message
  saveMessage(firstname, lastname, username, eventslist, email, phone, comment);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },6000);


  // Clear form
  document.getElementById('contactForm').reset();
}

function checkEmailExists(){
  var inputMail = document.getElementById('email').value;
 var  outputMail = firebase.database().ref('registrations').OrderByChild('email');
if(inputMail == outputMail){
document.querySelector('.alert_1').style.display ='block';

setTimeout(function(){
  document.querySelector('.alert_1').style.display = 'none';
},3000);
}
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