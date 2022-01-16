document.getElementById("loginForm").addEventListener("submit",(event)=>{
    event.preventDefault()
})

// all these methods an be found in doc of firebase web- get started
firebase.auth().onAuthStateChanged((user)=>{   // when a user successfully signs in , can get info about user in this observer
    if(user){
        location.replace("mygalaxz.html")  // if user is authencated , send to admin view
    }
})

function login(){
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    firebase.auth().signInWithEmailAndPassword(email, password)  //  sign in 
    .catch((error)=>{
        document.getElementById("error").innerHTML = error.message
    })
}

//no sign up and forgot password for now , we'll manage curators manually via console
// function signUp(){
//     const email = document.getElementById("email").value
//     const password = document.getElementById("password").value
//     firebase.auth().createUserWithEmailAndPassword(email, password)  

//     .catch((error) => {
//         document.getElementById("error").innerHTML = error.message
//     });
// }

// function forgotPass(){
//     const email = document.getElementById("email").value
//     firebase.auth().sendPasswordResetEmail(email)   
//     .then(() => {
//         alert("Reset link sent to your email id")
//     })
//     .catch((error) => {
//         document.getElementById("error").innerHTML = error.message
//     });
// }