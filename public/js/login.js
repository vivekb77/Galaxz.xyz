

document.getElementById("loginwithgoogle").addEventListener('click', GoogleLogIn) 

var Gprovider = new firebase.auth.GoogleAuthProvider();

document.getElementById("loginwithtwitter").addEventListener('click', TwitterLogIn) 

var Tprovider = new firebase.auth.TwitterAuthProvider();

function GoogleLogIn(){

    firebase.auth()
  .signInWithPopup(Gprovider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
 
    // ...
  }).catch((error) => {
   
  });

}

//var TwitteruserId;

function TwitterLogIn(){

    firebase.auth()
  .signInWithPopup(Tprovider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    //TwitteruserId = result.additionalUserInfo.username
    // ...
  }).catch((error) => {
   
  });

}

// when a user successfully signs in , can get info about user in this observer
firebase.auth().onAuthStateChanged((user)=>{

  // if(!user){
  //     location.replace("login.html") // if user is not logged in , send to login
  // }
  if(user){
      var userisAorNot = user.isAnonymous.toString();
    
      // if(userisAorNot === "true"){
      //   firebase.auth().signOut();  //remove the ano user first 
      //   console.log(userisAorNot);
      //   console.log(user);
      // }
      if(userisAorNot === "false"){
        AddUser(user);
      }
      
      
  }
})

//https://firebase.google.com/docs/database/web/read-and-write

function AddUser(user) {

const database = firebase.database();
const usersRef = database.ref('/curators');

usersRef.child(user.uid).set({
  curatorId: user.uid,
  curatorName: user.displayName.substring(0,20),
  curatorEmail: user.email,
  //twitterUserName: TwitteruserId,
  emailVerified: user.emailVerified,
  creationTime: user.metadata.creationTime,
  lastSignInTime: user.metadata.lastSignInTime,
}, 
(error) => {
  if (error) {
    // The write failed...
  } else {
    location.replace("mygalaxz.html");  // only redirect after data ia added to db or user details are not fetched on mygalaxz
  }
});

}




//promise example with timeout

// const myPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('foo');
//   }, 300);
// });

// myPromise
//   .then(handleResolvedA, handleRejectedA)
//   .then(handleResolvedB, handleRejectedB)
//   .then(handleResolvedC, handleRejectedC);



//promise example with verifying data that was retrived

// function AddUser(user){


//   const userIsAddedPromise = new Promise((resolve,reject) => {
  
//   const database = firebase.database();
//   const usersRef = database.ref('/curators');
//   const cId = user.uid;
  
//    usersRef.child(cId).set({
//    curatorId: cId,
//    curatorName: user.displayName.substring(0,20),
//    curatorEmail: user.email,
//    emailVerified: user.emailVerified,
//    creationTime: user.metadata.creationTime,
//    lastSignInTime: user.metadata.lastSignInTime,
//    });

//    if (snapshot.exists){
//     //there is data and do the nextThing()
//   resolve();
//  }
//  else {
//    //no data abort
//      reject();
//   }
  
//    });
  
  
//   userIsAddedPromise.then(() => nextThing() );
  
//   }