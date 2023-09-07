// See https://firebase.google.com/docs/web/setup#project_setup for how to auto-generate this config
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

var database = firebase.database();

database.ref('attendance').once('value', function(snapshot) {
  if (snapshot.exists()) {
    var content = '';
    snapshot.forEach(function(data) {
      var val = data.val();
      content += '<tr>';
      content += '<td>' + val.status + '</td>';
      content += '<td>' + val.timestamp + '</td>';
      content += '</tr>';
    });
    $('#table1').append(content);
  }
});