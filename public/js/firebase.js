// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyCAFcJgh3zDD1QhIStikR9gMWxjaQ5tVnI",
  //authDomain: "galaxz.firebaseapp.com",
  authDomain: "galaxz.xyz",  // for twitter and google auth
  databaseURL: "https://galaxz-default-rtdb.firebaseio.com",
  projectId: "galaxz",
  storageBucket: "galaxz.appspot.com",
  messagingSenderId: "8289726070",
  appId: "1:8289726070:web:5c75248fc04ed297383957",
  measurementId: "G-2WV0JV7TWT"  //this is needed for analytics
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();
