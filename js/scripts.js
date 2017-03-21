
/*============================
* Firebase
=============================*/
// Initialize Firebase
var config = {
  apiKey: "AIzaSyA55vLG1-2CmLYq1aEoH3opjmVXhseYZJE",
  authDomain: "employeetracker-d9eea.firebaseapp.com",
  databaseURL: "https://employeetracker-d9eea.firebaseio.com",
  storageBucket: "employeetracker-d9eea.appspot.com",
  messagingSenderId: "155975263921"
};
firebase.initializeApp(config);
var db = firebase.database();


//** Available Methods for Firebase Auth
// auth.signInWithEmailAndPassword(email,pass);
// auth.createUserWithEmailAndPassword(email, pass);
// auth.onAuthStateChanged(firebaseUser => {});

// Get elements
const txtEmail = document.getElementById('InputEmail');
const txtPassword = document.getElementById('InputPassword');
const btnLogin = document.getElementById('signIn');
const btnSignUp = document.getElementById('signUp');
const btnLogout = document.getElementById('logOut');
const addFormContainer = document.getElementById('addFormContainer');
// Add a login event to handle existing users
btnLogin.addEventListener('click', e => {
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  // Sign In
  const promise = auth.signInWithEmailAndPassword(email,pass);
  promise.catch(e => console.log(e.message));

});
// Add a SIgn Up event to handle a brand new user
btnSignUp.addEventListener('click', e => {
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  // Sign In
  const promise = auth.createUserWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));
});

// Add a SIgn Up event to handle a brand new user
btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser){
    const uid = firebaseUser.uid;
    //log out the user
    console.log(firebaseUser.uid);
    //show log out button
    btnLogout.classList.remove('hide');
    //show additional information form
    addFormContainer.classList.remove('hide');
    // Add a click handler to add information
    addInfo.addEventListener('click', e => {
      const ageTxt = document.getElementById('age');
      const petNameTxt = document.getElementById('petName');
      const notesTxt = document.getElementById('notes');
      //Get the Values form the form
      const age = ageTxt.value;
      const petName = petNameTxt.value;
      const notes = notesTxt.value;
      //make reference with the uid
      var ref = db.ref("users/" + uid);
      // Set the data in the Db
      ref.set({
        age: age,
        petname: petName,
        notes: notes
      });
    });
  }else{
    console.log("user not logged in");
    //Hide logout
    btnLogout.classList.add('hide');
    //Hide additional information form
    addFormContainer.classList.add('hide');
  }
});
