// Initialize Firebase
var config = {
    apiKey: "AIzaSyDjh5LaGAMA9tsrKKYJgRyQ7k9Uwd58L2k",
    authDomain: "ictsummit-af35b.firebaseapp.com",
    databaseURL: "https://ictsummit-af35b.firebaseio.com",
    projectId: "ictsummit-af35b",
    storageBucket: "ictsummit-af35b.appspot.com",
    messagingSenderId: "904951502575"
};
firebase.initializeApp(config);

// Reference messages collection
var messagesRef = firebase.database().ref('Web-Contacts');

// Listen for form submit
document.getElementById('contact').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  //Get value
  var name = getInputVal('name');
//  var lastname = getInputVal('lastname');
  //var username = getInputVal('username');
  var email = getInputVal('email');
  var message = getInputVal('message');
 // var comment = getInputVal('comment');
// var field = getInputVal('field');

  // Save message
  saveMessage(name, email, message);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('contact').reset();

  
}

// Function to get form value
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email, message){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
   name:name,
   // lastname: lastname,
   // username: username,
   email: email,
   message: message,
  // field: field
  });
 
  alert('Thank You, Your message has been submitted successfully');
        window.location.href='index.html';
}