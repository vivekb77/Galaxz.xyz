  //SHARE SOLASYS START
  //  GALAXZ DETAILS START
  //  DISPLAY ALL SOLASYS DETAILS START
  //ADD NEW SOLASYS START
  //DELECT GALAXZ START
  //EDIT GALAXZ START 

  //test cases
  // log in with twitter , new , existing , when anonomous login is present , when not
  // log in with google , new , existing , when anonomous login is present , when not
  // log out and try again
  //q string has galaxz creared by user  - all displayed 
  // q string has galaxz not created by user  -- error , you do not own this galaxz
  // wrong g id in q string which do not exist in DB   -- you do not own this galaxz
  // add first galaxz , add more , 
  //delete with solasys >0 , =0 

var galaxzIdfromQ = new URLSearchParams(window.location.search);
    var galaxzId = galaxzIdfromQ.get('gId')
    var curatorName;
    var curatorId;

function logout(){
    firebase.auth().signOut()
    location.replace("login.html") //  send to home page to login after logout
}

checkLogin();
function checkLogin() {
    firebase.auth().onAuthStateChanged((user)=>{

        if(!user){
            location.replace("login.html") // if user is not logged in , send to login
        }
        if(user){
            var userisAorNot = user.isAnonymous.toString();

            if(userisAorNot === "true"){
                location.replace("login.html") // if user isAnonymous and not logged in , send to home page to login
            }
            if(userisAorNot === "false"){
                document.getElementById("curatorname").innerHTML = user.displayName 
                document.getElementById("curatoremail").innerHTML = user.email  // if user is logged in , show my galaxz page
                curatorEmail = user.email;
                curatorId = user.uid;
                curatorName = user.displayName ;
               // var uid = user.uid;
                getGalaxzDetails(curatorId);
            }
            
            
        }
    })
}

//SHARE SOLASYS START

function ShareSolasys(galId){
    var urltoshare = "https://galaxz.xyz/solasys.html?gId="+galId;
     //show popup
     var showpopup = document.getElementById('modal-container-url');
     showpopup.classList.add('show');
     showpopup.style.display = "flex";

     var urldisplay = document.getElementById('url');
     urldisplay.innerText = urltoshare;
   //copy url 
     var  copyurl = document.getElementById('copy-url');
       copyurl.onclick = function() {
           
       if (!navigator.clipboard) {
       showpopup.style.display = "none";
       }
// works only on https
        navigator.clipboard
        .writeText(urltoshare);
        showpopup.style.display = "none";
       
       }
  
}

//SHARE SOLASYS END


  //  GALAXZ DETAILS START

function getGalaxzDetails(curatorId){


    const database = firebase.database();
    var  galaxzArray = [];
  
    database.ref('/galaxz').orderByChild('galaxzId')
    .equalTo(galaxzId).limitToLast(1)
    .once("value",function(snapshot){
        if(snapshot.exists()){      // only if there is data
            snapshot.forEach(
            function(snapshot) {
                
                    var name = snapshot.val().name;
                    var description = snapshot.val().description;
                    var createdById = snapshot.val().createdById;
                  
                               var galaxzObject = 
                                    {
                                    "name":name,
                                    "description":description,
                                    "createdById":createdById,
                                    };
                
                                
                                    galaxzArray.push(galaxzObject)
                
            });
           
            // move forward only if the galaxz is owned by the logged in user
            //executed when OWN GALAXZ in Q string
           if(curatorId === galaxzArray[0].createdById){
           
            AddGalaxzCell(galaxzArray);
            GetExistingSolasys();

            // share solasys button at the top
            var sharelinktitle = document.createElement('h6');
            sharelinktitle.setAttribute('style',"color:#0085A1");
            sharelinktitle.innerText = "Share SOLASYS";
            document.getElementById('shareSolasys').append(sharelinktitle);

            var sharelink = document.createElement('img');
            sharelink.id = 'sharelink';
            sharelink.className = 'img-bottompara1';
            sharelink.value = galaxzId;   
            sharelink.setAttribute('onclick', "ShareSolasys(this.value)");
            sharelink.src = 'assets/shareG.svg';
            document.getElementById('shareSolasys').append(sharelink);

           }  // if c id = g created id end
         
             // or send to login or mygalaxz
           //executed when other curators GALAXZ in Q string
           if(curatorId !== galaxzArray[0].createdById){
            
            var galaxztitle = document.createElement('h5');
            galaxztitle.setAttribute('style',"color:red");
            galaxztitle.innerText = "You do not own this GALAXZ to make changes to SOLASYS under it";
            document.getElementById('shareSolasys').append(galaxztitle);
            
               //go back to mygalaxz button or login
             var div4534 = document.createElement("div");
             div4534.className = 'rocketshipgobackahref';
             div4534.id = 'div4534';
             document.getElementById('shareSolasys').append(div4534);

             var gobacktoG = document.createElement('a');
             gobacktoG.setAttribute('href', "mygalaxz.html");
             gobacktoG.id = 'gobacktoG';
             document.getElementById('div4534').append(gobacktoG);

             var rocketship = document.createElement('img');
             rocketship.id = 'rocketship';
             rocketship.className = 'rocketshipgoback';
             rocketship.src = 'assets/rocketship.png';
             document.getElementById('gobacktoG').append(rocketship);

             var br33334 = document.createElement("br");
             br33334.className='my-4';
             document.getElementById('maindiv').append(br33334);
          
              //remove the placeholer first
             const placeholder1 = document.getElementById('placeholder-animation1');
             placeholder1.innerHTML ='';
             const placeholder2 = document.getElementById('placeholder-animation2');
             placeholder2.innerHTML ='';
             const placeholder3 = document.getElementById('placeholder-animation3');
             placeholder3.innerHTML ='';

        } // if c!= curator id of g
            
           } //if snapshot end

         
             //executed when  GALAXZ in Q string is worng
           else{
            var galaxztitle = document.createElement('h5');
            galaxztitle.setAttribute('style',"color:red");
            galaxztitle.innerText = "You do not own this GALAXZ to make changes to SOLASYS under it";
            document.getElementById('shareSolasys').append(galaxztitle);
            
               //go back to mygalaxz button or login
             var div4534 = document.createElement("div");
             div4534.className = 'rocketshipgobackahref';
             div4534.id = 'div4534';
             document.getElementById('shareSolasys').append(div4534);

             var gobacktoG = document.createElement('a');
             gobacktoG.setAttribute('href', "mygalaxz.html");
             gobacktoG.id = 'gobacktoG';
             document.getElementById('div4534').append(gobacktoG);

             var rocketship = document.createElement('img');
             rocketship.id = 'rocketship';
             rocketship.className = 'rocketshipgoback';
             rocketship.src = 'assets/rocketship.png';
             document.getElementById('gobacktoG').append(rocketship);

             var br33334 = document.createElement("br");
             br33334.className='my-4';
             document.getElementById('maindiv').append(br33334);
          
              //remove the placeholer first
             const placeholder1 = document.getElementById('placeholder-animation1');
             placeholder1.innerHTML ='';
             const placeholder2 = document.getElementById('placeholder-animation2');
             placeholder2.innerHTML ='';
             const placeholder3 = document.getElementById('placeholder-animation3');
             placeholder3.innerHTML ='';
           }
           
        
        
     });
  
    }
  
  
  
  function AddGalaxzCell (galaxzArray){
 
    //remove the placeholer first
    const placeholder1 = document.getElementById('placeholder-animation1');
    placeholder1.innerHTML ='';
    const placeholder2 = document.getElementById('placeholder-animation2');
    placeholder2.innerHTML ='';
    const placeholder3 = document.getElementById('placeholder-animation3');
    placeholder3.innerHTML ='';

    var brrrrrr = document.createElement('br');
    document.getElementById('maindiv').append(brrrrrr);

  var galaxztitle = document.createElement('h5');
  galaxztitle.setAttribute('style',"color:#0085A1");
  galaxztitle.innerText = "GALAXZ";
  document.getElementById('maindiv').append(galaxztitle);
  
         var counter = 0;  
  
   for (i=0 ;i < galaxzArray.length; i++){
     
  var galaxzdivnext = document.createElement('div');
  galaxzdivnext.className = 'post-preview';
  galaxzdivnext.id = 'galaxzdivnext'+counter;
  document.getElementById('maindiv').append(galaxzdivnext);
  
  var gtitleDesc = document.createElement('a');
  gtitleDesc.id = 'gtitleDesc'+counter;
  document.getElementById('galaxzdivnext'+counter).append(gtitleDesc);
  
  var gtitle = document.createElement('h2');
  gtitle.id = 'gtitle'+counter;
  gtitle.className = 'post-title';
  gtitle.innerText = galaxzArray[i].name;
  document.getElementById('gtitleDesc'+counter).append(gtitle);
  
  var gpostsubtitle = document.createElement('h3');
  gpostsubtitle.id = 'gpostsubtitle'+counter;
  gpostsubtitle.className = 'post-subtitle';
  gpostsubtitle.innerText = galaxzArray[i].description;
  document.getElementById('gtitleDesc'+counter).append(gpostsubtitle);
  
  
  //go back to galaxz button 
  var div4534 = document.createElement("div");
  div4534.className = 'rocketshipgobackahref';
  div4534.id = 'div4534';
  document.getElementById('maindiv').append(div4534);
  
  var gobacktoG = document.createElement('a');
  gobacktoG.setAttribute('href', "mygalaxz.html?gId="+galaxzId);
  gobacktoG.id = 'gobacktoG';
  document.getElementById('div4534').append(gobacktoG);
  
  var rocketship = document.createElement('img');
  rocketship.id = 'rocketship';
  rocketship.className = 'rocketshipgoback';
  rocketship.src = 'assets/rocketship.png';
  document.getElementById('gobacktoG').append(rocketship);
  
  var hr6666 = document.createElement("hr");
  hr6666.className='my-4';
  document.getElementById('maindiv').append(hr6666);
  
  var galaxztitle444 = document.createElement('h5');
  galaxztitle444.setAttribute('style',"color:#0085A1");
  galaxztitle444.innerText = "SOLASYS";
  document.getElementById('maindiv').append(galaxztitle444);
  
  var brrrdfsdfdsrrr = document.createElement('br');
    document.getElementById('maindiv').append(brrrdfsdfdsrrr);
  
  ++counter;

  
  }
  
    }
  

    //  GALAXZ DETAILS END

    //  DISPLAY ALL SOLASYS DETAILS START
    var isitnewG = "No"; 
    var counter = 0; 
    var  solasysArray = [];
    
function GetExistingSolasys(){
   
    const database = firebase.database();
    

    database.ref('/solasys').orderByChild('galaxzId')
    .equalTo(galaxzId).limitToLast(30)
    .once("value",function(ALLRecords){
        ALLRecords.forEach(
            function(CurrentRecord) {
               
    var galaxzId = CurrentRecord.val().galaxzId;
    var solasysId = CurrentRecord.val().solasysId;
    var createdBy = CurrentRecord.val().createdBy;
    var createdById = CurrentRecord.val().createdById;
    var createdDate = CurrentRecord.val().createdDate;
    var name = CurrentRecord.val().name;
    var status = CurrentRecord.val().status;
    var description = CurrentRecord.val().description;
    var numberOfArticles = CurrentRecord.val().numberOfArticles;
    var views = CurrentRecord.val().views;
    var followers = CurrentRecord.val().followers;
    var shares = CurrentRecord.val().shares;
               

          var options = { month: 'short', day: 'numeric' };
           var formatteddate0  = new Date(createdDate);
          var formatteddate = (formatteddate0.toLocaleDateString("en-US", options));

               var solasysObject = 
                    {"galaxzId":galaxzId,
                    "solasysId":solasysId,
                    "status":status,
                    "createdBy":createdBy,
                    "createdById":createdById,
                    "formatteddate":formatteddate,
                    "name":name,
                    "description":description,
                    "numberOfArticles":numberOfArticles,
                    "views":views,
                    "followers":followers,
                    "shares":shares,
                    };
                
                 solasysArray.push(solasysObject)
                  
            });
           //sorting , new solasys appear at the bottom , so curators can craft a story
            AddSolasysCell(solasysArray);
        
     });

        
}


function AddSolasysCell (solasysArray){
   

 for (i=0 ;i < solasysArray.length; i++){
   
   
    var galaxzdiv = document.createElement('div');
    galaxzdiv.className = 'post-preview';
    galaxzdiv.id = 'galaxzdiv'+counter;
    if(isitnewG == "Yes"){
    document.getElementById('newlyaddedSolasysplaceholderdiv').append(galaxzdiv);
    }
    if(isitnewG == "No"){
    document.getElementById('maindiv').append(galaxzdiv);
    }

var toppara = document.createElement('p');
toppara.className = 'post-meta';
toppara.id = 'toppara'+counter;
document.getElementById('galaxzdiv'+counter).append(toppara);

var curatorlink = document.createElement('a');
curatorlink.id = 'curatorlink'+counter;
document.getElementById('toppara'+counter).append(curatorlink);

var curatedBy = document.createElement('span');
curatedBy.id = 'curatedBy'+counter;
curatedBy.innerText = solasysArray[i].createdBy;
document.getElementById('curatorlink'+counter).append(curatedBy);

var curatedDate = document.createElement('span');
curatedDate.id = 'curatedDate'+counter;
curatedDate.innerText = solasysArray[i].formatteddate;
document.getElementById('toppara'+counter).append(curatedDate);


var titleDesc = document.createElement('a');
titleDesc.setAttribute('href', "myplanets.html?gId="+ solasysArray[i].galaxzId+ "&sId=" +solasysArray[i].solasysId);
titleDesc.id = 'titleDesc'+counter;
titleDesc.value = solasysArray[i].solasysId;
document.getElementById('galaxzdiv'+counter).append(titleDesc);

var title = document.createElement('h2');
title.id = 'post-title'+counter;
title.className = 'post-title';
title.innerText = solasysArray[i].name;
document.getElementById('titleDesc'+counter).append(title);

var postsubtitle = document.createElement('h3');
postsubtitle.id = 'post-subtitle'+counter;
postsubtitle.className = 'post-subtitle';
postsubtitle.innerText = solasysArray[i].description;
document.getElementById('titleDesc'+counter).append(postsubtitle);

var br = document.createElement("br");
document.getElementById('galaxzdiv'+counter).append(br);

var bottompara = document.createElement('p');
bottompara.className = 'post-meta';
bottompara.id = 'bottompara'+counter;
document.getElementById('galaxzdiv'+counter).append(bottompara);

var noofarticlesBtn = document.createElement('span');
noofarticlesBtn.id = 'noofarticlesBtn'+counter;
noofarticlesBtn.innerText = "Planets";
document.getElementById('bottompara'+counter).append(noofarticlesBtn);

var solasysval = document.createElement('span');
solasysval.id = 'solasysval'+counter;
solasysval.innerText = solasysArray[i].numberOfArticles;
document.getElementById('bottompara'+counter).append(solasysval);

var viewsBtn = document.createElement('span');
viewsBtn.id = 'viewsBtn'+counter;
viewsBtn.innerText = "Views";
document.getElementById('bottompara'+counter).append(viewsBtn);

var viewsval = document.createElement('span');
viewsval.id = 'viewsval'+counter;
viewsval.innerText = solasysArray[i].views;
document.getElementById('bottompara'+counter).append(viewsval);

var followbtn = document.createElement('span');
followbtn.id = 'followbtn'+counter;
followbtn.innerText = "Likes";
document.getElementById('bottompara'+counter).append(followbtn);

var followsval = document.createElement('span');
followsval.id = 'followsval'+counter;
followsval.innerText = solasysArray[i].followers;
document.getElementById('bottompara'+counter).append(followsval);

var sharebtn = document.createElement('span');
sharebtn.id = 'sharebtn'+counter;
sharebtn.innerText = "Shares";
document.getElementById('bottompara'+counter).append(sharebtn);

var sharesval = document.createElement('span');
sharesval.id = 'sharesval'+counter;
sharesval.innerText = solasysArray[i].shares;
document.getElementById('bottompara'+counter).append(sharesval);

//edit / delete buttons start

var actionbuttons = document.createElement('p');
actionbuttons.className = 'post-meta';
actionbuttons.id = 'actionbuttons'+counter;
document.getElementById('galaxzdiv'+counter).append(actionbuttons);

//status field
var statusofS = document.createElement('h6');
statusofS.className = 'img-bottompara1';
statusofS.id = 'statusofS'+counter;
statusofS.innerText = solasysArray[i].status;
if(statusofS.innerText=="Active"){
    statusofS.setAttribute('style',"color:green");
}
if(statusofS.innerText=="InActive"){
    statusofS.setAttribute('style',"color:red");
}
document.getElementById('actionbuttons'+counter).append(statusofS);

var actionbuttonEdit = document.createElement('img');
actionbuttonEdit.id = 'actionbuttonEdit'+counter;
actionbuttonEdit.className = 'img-bottompara1';
actionbuttonEdit.value = solasysArray[i].solasysId;   
actionbuttonEdit.setAttribute('onclick', "EditSolasys(this.id,this.value)");
actionbuttonEdit.src = 'assets/editG.svg';
document.getElementById('actionbuttons'+counter).append(actionbuttonEdit);

var actionbuttonDelete = document.createElement('img');
actionbuttonDelete.id = 'actionbuttonDelete'+counter;
actionbuttonDelete.className = 'img-bottompara1';
actionbuttonDelete.value = solasysArray[i].solasysId;   
actionbuttonDelete.setAttribute('onclick', "DeleteSolasys(this.id,this.value)");
actionbuttonDelete.src = 'assets/deleteG.svg';
document.getElementById('actionbuttons'+counter).append(actionbuttonDelete);
//edit / delete buttons end

//edit solasys area div start
//parent div for edit solasys elements
var parentdiveditsolasys = document.createElement("div");
parentdiveditsolasys.id = 'parentdiveditsolasys'+counter;
document.getElementById('galaxzdiv'+counter).append(parentdiveditsolasys);

//edit solasys area div end


var hr = document.createElement("hr");
hr.className='my-4';
hr.id = 'hr'+counter;
document.getElementById('galaxzdiv'+counter).append(hr);

++counter;

}



// //remove the last hr only if there is data in the array
// if (solasysArray.length>0)
// {
// let len = solasysArray.length - 1;
// document.getElementById('hr'+len).remove();
// }

if(counter==solasysArray.length){  // so that these elemets and add button is added only once at the end

//placeholder div for newly added solasys so that it appears at the below existing ones
var newlyaddedSolasysplaceholderdiv = document.createElement('div');
newlyaddedSolasysplaceholderdiv.className = 'post-preview';
newlyaddedSolasysplaceholderdiv.id = 'newlyaddedSolasysplaceholderdiv';
document.getElementById('maindiv').append(newlyaddedSolasysplaceholderdiv); 


 // parent div to attach add solasys edit area
 var parentdivaddSolasys = document.createElement("div");  
 parentdivaddSolasys.id = 'parentdivaddSolasys';
 document.getElementById('maindiv').append(parentdivaddSolasys);


 //label to display success message
var addSolasyssuccesslbl = document.createElement("h6");
addSolasyssuccesslbl.id = "addSolasyssuccesslbl";
document.getElementById('maindiv').append(addSolasyssuccesslbl);
var bdsfdfdfdfddsdfsdfr = document.createElement("br");
document.getElementById('maindiv').append(bdsfdfdfdfddsdfsdfr);

// add solasys text and button
var addSolasystext = document.createElement("h5");
addSolasystext.id = "addSolasystext";
addSolasystext.innerText = "Add New SOLASYS";
addSolasystext.setAttribute('style',"color:#0085A1");
document.getElementById('maindiv').append(addSolasystext);

var bdsfdfdfdfddsdfsdfr = document.createElement("br");
document.getElementById('maindiv').append(bdsfdfdfdfddsdfsdfr);


var addSolasysButton = document.createElement('img');
addSolasysButton.id = "addSolasysButton";
addSolasysButton.className = 'mygalaxzinfo';
addSolasysButton.src = 'assets/submit.svg';
addSolasysButton.setAttribute('onclick', "AddNewSolasys()");
document.getElementById('maindiv').append(addSolasysButton);

var bdsfdfdfdsdfsdfr = document.createElement("br");
document.getElementById('maindiv').append(bdsfdfdfdsdfsdfr);
 }


}

//  DISPLAY ALL SOLASYS DETAILS END

//ADD NEW SOLASYS START


// create new solasys edit area
function AddNewSolasys(){

    document.getElementById('addSolasysButton').style.display = 'none';   // hide /not remove the "add solasys" button 
    document.getElementById('addSolasystext').style.display = 'none'; 
    
    let succmess = document.getElementById('addSolasyssuccesslbl');
    if(document.body.contains(succmess)){
        succmess.innerText = "";   // clear ,not remove element as needed again, the "success message" if present 
    }
    
     // child div to attach add solasys edit area
    var childdivaddSolasys = document.createElement("div");  
    childdivaddSolasys.id = 'childdivaddSolasys';
    document.getElementById('parentdivaddSolasys').append(childdivaddSolasys);
    
    var br4dfdfdfd5345 =document.createElement('br');
    document.getElementById('childdivaddSolasys').append(br4dfdfdfd5345);

    //append all add elements to chhild div
    var sdfsdfsdfsdfsdf =document.createElement('h5');
    sdfsdfsdfsdfsdf.innerText = "Add a new SOLASYS";
    sdfsdfsdfsdfsdf.setAttribute('style',"color:Green");
    document.getElementById('childdivaddSolasys').append(sdfsdfsdfsdfsdf);
    
    var br4ddfdfdfd5345 =document.createElement('br');
    document.getElementById('childdivaddSolasys').append(br4ddfdfdfd5345);
    
    var titletext33 =document.createElement('h5');
    titletext33.innerText = "Solasys Title";
    document.getElementById('childdivaddSolasys').append(titletext33);
    
    var br4dfd5345 =document.createElement('br');
    document.getElementById('childdivaddSolasys').append(br4dfd5345);
    
    var titletextarea = document.createElement('textarea');
    titletextarea.id = 'titletextarea';
    titletextarea.className = 'post-title';
    titletextarea.setAttribute('placeholder',"80 chars max");
    titletextarea.setAttribute('rows',"3");
    titletextarea.setAttribute('cols',"60");
    //titletextarea.setAttribute('minlength',"4");
    titletextarea.setAttribute('maxlength',"80");
    document.getElementById('childdivaddSolasys').append(titletextarea);
    
    var dfdfdfdf =document.createElement('br');
    document.getElementById('childdivaddSolasys').append(dfdfdfdf);
    var br4dff5345 =document.createElement('br');
    document.getElementById('childdivaddSolasys').append(br4dff5345);
    
    var titledesc33 =document.createElement('h5');
    titledesc33.innerText = "Solasys Description";
    document.getElementById('childdivaddSolasys').append(titledesc33);
    
    var br4dfdf5345 =document.createElement('br');
    document.getElementById('childdivaddSolasys').append(br4dfdf5345);
    
    var descriptiontextarea = document.createElement('textarea');
    descriptiontextarea.id = 'descriptiontextarea';
    descriptiontextarea.className = 'post-title';
    descriptiontextarea.setAttribute('placeholder',"140 chars max");
    descriptiontextarea.setAttribute('rows',"5");
    descriptiontextarea.setAttribute('cols',"60");
    //descriptiontextarea.setAttribute('minlength',"4");
    descriptiontextarea.setAttribute('maxlength',"140");
    document.getElementById('childdivaddSolasys').append(descriptiontextarea);
    
    
    //error message label
    var errormessagelbl = document.createElement('h6');
    errormessagelbl.className = 'post-meta';
    errormessagelbl.id = 'errormessagelbl';
    errormessagelbl.setAttribute('style',"color:red");
    document.getElementById('childdivaddSolasys').append(errormessagelbl);
    
    //submit  / cancel buttons
    
    
    var submitcancelbuttons = document.createElement('p');
    submitcancelbuttons.className = 'post-meta';
    submitcancelbuttons.id = 'submitcancelbuttons';
    document.getElementById('childdivaddSolasys').append(submitcancelbuttons);
    
    var actionbuttonSubmit = document.createElement('img');
    actionbuttonSubmit.id = 'actionbuttonSubmit';
    actionbuttonSubmit.className = 'img-bottompara1';  
    actionbuttonSubmit.setAttribute('onclick', "AddSolasys()");
    actionbuttonSubmit.src = 'assets/submit.svg';
    document.getElementById('submitcancelbuttons').append(actionbuttonSubmit);
    
    var actionbuttoncancel = document.createElement('img');
    actionbuttoncancel.id = 'actionbuttoncancel';
    actionbuttoncancel.className = 'img-bottompara1';  
    actionbuttoncancel.setAttribute('onclick', "CancelAddingSolasys()");
    actionbuttoncancel.src = 'assets/cancel.svg';
    document.getElementById('submitcancelbuttons').append(actionbuttoncancel);
    
    
    
    // var br4ddfdfdsfdsdfd5345 =document.createElement('hr');
    // document.getElementById('div3423423').append(br4ddfdfdsfdsdfd5345);
    
    }
    

function CancelAddingSolasys(){
   
    document.getElementById('childdivaddSolasys').remove();  //remove the child div with all add elements
    document.getElementById('addSolasysButton').style.display = 'block';   // show the "add solasys" button 
    document.getElementById('addSolasystext').style.display = 'block'; 
    
}

function AddSolasys(){
    
    //validate if text is entered
    if (document.getElementById("titletextarea").value == "")
    {
        var sdfsdfdfddf = document.getElementById('errormessagelbl')
        sdfsdfdfddf.innerText = "Please enter Solasys Title";
        return false;
    }
    if (document.getElementById("descriptiontextarea").value == "")
    {
        var sdfsdfdfdfdfddf = document.getElementById('errormessagelbl')
        sdfsdfdfdfdfddf.innerText = "Please enter Solasys Description";
        return false;
    }
    
//add solasys


const sname = document.getElementById("titletextarea").value;
const sdescription = document.getElementById("descriptiontextarea").value;

const database = firebase.database();
const usersRef = database.ref('/solasys');
const autoId = usersRef.push().key

usersRef.child(autoId).set({
 name: sname.trim(),
 description: sdescription.trim(),
 createdBy: curatorName,
 createdById: curatorId,
 solasysId:autoId,
 galaxzId: galaxzId,
 priority:1,   //so that it appears at the bottom , admin will update the priority
 status: "Active",
 numberOfArticles:  0,
 views: 0,
 followers:0,
 shares: 0,
 createdDate: firebase.database.ServerValue.TIMESTAMP

})

var sdfsdfdfddfdfdfddf = document.getElementById('addSolasyssuccesslbl')
sdfsdfdfddfdfdfddf.innerText = "Solasys Added";
sdfsdfdfddfdfdfddf.setAttribute('style',"color:green");

// increment 1 in galaxz , number of solasys
const database1 = firebase.database();
database1.ref('/galaxz/' +galaxzId).update({ 
  numberOfSolasys:firebase.database.ServerValue.increment(1)})

//clear the textareas
document.getElementById('childdivaddSolasys').remove();  //remove the child div with all add elements
document.getElementById('addSolasysButton').style.display = 'block';   // show the "add solasys" button 
document.getElementById('addSolasystext').style.display = 'block'; 


GetNewlyAddedSolasys(autoId);  // add the newly added Galaxz to the UI

}


function GetNewlyAddedSolasys(solId){
     isitnewG = "Yes";

    const database = firebase.database();
    var  solasysArray = [];

    database.ref('/solasys').orderByChild('solasysId')
    .equalTo(solId).limitToLast(1)
    .once("value",function(ALLRecords){
        ALLRecords.forEach(
            function(CurrentRecord) {
               
    var galaxzId = CurrentRecord.val().galaxzId;
    var solasysId = CurrentRecord.val().solasysId;
    var createdBy = CurrentRecord.val().createdBy;
    var createdById = CurrentRecord.val().createdById;
    var createdDate = CurrentRecord.val().createdDate;
    var name = CurrentRecord.val().name;
    var status = CurrentRecord.val().status;
    var description = CurrentRecord.val().description;
    var numberOfArticles = CurrentRecord.val().numberOfArticles;
    var views = CurrentRecord.val().views;
    var followers = CurrentRecord.val().followers;
    var shares = CurrentRecord.val().shares;
               

          var options = { month: 'short', day: 'numeric' };
           var formatteddate0  = new Date(createdDate);
          var formatteddate = (formatteddate0.toLocaleDateString("en-US", options));

               var solasysObject = 
                    {"galaxzId":galaxzId,
                    "solasysId":solasysId,
                    "status":status,
                    "createdBy":createdBy,
                    "createdById":createdById,
                    "formatteddate":formatteddate,
                    "name":name,
                    "description":description,
                    "numberOfArticles":numberOfArticles,
                    "views":views,
                    "followers":followers,
                    "shares":shares,
                    };
                
                 solasysArray.push(solasysObject)
                  
            });
           //sorting , new solasys appear at the bottom , so curators can craft a story
            AddSolasysCell(solasysArray);
        
     });

    

}
//ADD NEW SOLASYS END



//DELECT GALAXZ START
function DeleteSolasys(tagId,solId){
    //first remove the error message
    var element =  document.getElementById('cantdeletesolasys');
      if (document.body.contains(element))
       {
     element.remove();
       }

   
      //show po up
      var showpopup = document.getElementById('modal-container');
      showpopup.classList.add('show');
      showpopup.style.display = "flex";
    //close popup
      var  closepopup = document.getElementById('closepopupbutton');
        closepopup.onclick = function() {
        showpopup.style.display = "none";
    }
      //delete Galaxz
      var deleteSolasyspopupbutton = document.getElementById('deleteSolasyspopupbutton');
      deleteSolasyspopupbutton.onclick = function() {
        showpopup.style.display = "none";
       
       let extractnumberfromid = tagId.substr(18);
       var clickedsolasysdiv = "galaxzdiv"+extractnumberfromid;
       var numberofarticles = "solasysval"+extractnumberfromid;
       var noofarticles = document.getElementById(numberofarticles).innerText;
       
       //can delete only if number of  solasys = 0
       if(noofarticles > 0){
        var clickedsolasysroottag = "parentdiveditsolasys"+extractnumberfromid;
        //success message tag to rootedit div
        var cantdeletesolasys =document.createElement('h6');
        cantdeletesolasys.id = 'cantdeletesolasys';
        cantdeletesolasys.className = 'post-meta';
        cantdeletesolasys.innerText = "There are PLANETS under this SOLASYS, delete them first to delete SOLASYS";
        cantdeletesolasys.setAttribute('style',"color:red");
        document.getElementById(clickedsolasysroottag).append(cantdeletesolasys);
       }
      else{
        const database = firebase.database();
        database.ref('/solasys/' +solId).remove();    // delete from DB
        document.getElementById(clickedsolasysdiv).remove();   // remove the deleted solasys from UI

        // decrement 1 in galaxz , number of solasys
        const database1 = firebase.database();
        database1.ref('/galaxz/' +galaxzId).update({ 
        numberOfSolasys:firebase.database.ServerValue.increment(-1)})
       }
    
    }

}

//DELECT GALAXZ END



//EDIT GALAXZ START 

//show the text areas under the solasys
var stitleedited;
var sdescedited ;
var statusofS;


function EditSolasys(tagid,solId){

    let gname;
    let gdesc;
    let status;
    

    // get s name and s desc from db for the edited s
const database = firebase.database();
database.ref('/solasys').orderByChild('solasysId')
    .equalTo(solId).limitToFirst(1)  
    .once("value",function(ALLRecords){
        ALLRecords.forEach(
            function(CurrentRecord) {
               
     sname = CurrentRecord.val().name;
     sdesc = CurrentRecord.val().description;
     status = CurrentRecord.val().status;
          });
          titletextarea44.innerText = sname;
          descriptiontextarea33.innerText = sdesc;
          if(status == "Active"){
           document.getElementById('radiobuttonActive').setAttribute('checked',"checked");
        }
        if(status == "InActive"){
           document.getElementById('radiobuttonInactive').setAttribute('checked',"checked");
        }

       });  

  // first remove the edit boxes if its already displayed for another galaxz and then add for other because we are reusing ids
var element =  document.getElementById('childdiveditsolasys');
if (document.body.contains(element))
{
    element.remove();
}
var successmessage443333 =  document.getElementById('successmessage443');
if (document.body.contains(successmessage443333))
{
    successmessage443333.remove();
}


//get the edited solasys tag  where edit button was clicked and append all  editing elements below

let extractnumberfromid = tagid.substr(16);
   
var parentdiveditsolasys = "parentdiveditsolasys"+extractnumberfromid;

stitleedited = "post-title"+extractnumberfromid;  // UpdateGalaxzAfterEdit() to work
 sdescedited = "post-subtitle"+extractnumberfromid; // for UpdateGalaxzAfterEdit() to work
 statusofS = "statusofS"+extractnumberfromid;  //for UpdateGalaxzAfterEdit() to work
 
//success message tag to parent edit div
var successmessage443 =document.createElement('h6');
successmessage443.id = 'successmessage443';
successmessage443.className = 'post-meta';
successmessage443.setAttribute('style',"color:green");
document.getElementById(parentdiveditsolasys).append(successmessage443);  

//child tag under  parent edit div which hold all editing elements 
var childdiveditsolasys =document.createElement('div');
childdiveditsolasys.id = 'childdiveditsolasys'
document.getElementById(parentdiveditsolasys).append(childdiveditsolasys);  


var titletexfdft4433 =document.createElement('h5');
titletexfdft4433.innerText = "Update Galaxz";
titletexfdft4433.setAttribute('style',"color:green");
document.getElementById('childdiveditsolasys').append(titletexfdft4433);

var titletext4433 =document.createElement('h5');
titletext4433.innerText = "Galaxz Title";
document.getElementById('childdiveditsolasys').append(titletext4433);

var br4dfddfd5345 =document.createElement('br');
document.getElementById('childdiveditsolasys').append(br4dfddfd5345);

var titletextarea44 = document.createElement('textarea');
titletextarea44.id = 'titletextarea44';
titletextarea44.className = 'post-title';
titletextarea44.setAttribute('placeholder',"80 chars");
titletextarea44.setAttribute('rows',"3");
titletextarea44.setAttribute('cols',"60");
//titletextarea.setAttribute('minlength',"4");
titletextarea44.setAttribute('maxlength',"80");
document.getElementById('childdiveditsolasys').append(titletextarea44);

var dfdfdfdfdfdf =document.createElement('br');
document.getElementById('childdiveditsolasys').append(dfdfdfdfdfdf);
var br4dfddff5345 =document.createElement('br');
document.getElementById('childdiveditsolasys').append(br4dfddff5345);

var titledesc334 =document.createElement('h5');
titledesc334.innerText = "Galaxz Description";
document.getElementById('childdiveditsolasys').append(titledesc334);

var br4dfdfdfd5345 =document.createElement('br');
document.getElementById('childdiveditsolasys').append(br4dfdfdfd5345);

var descriptiontextarea33 = document.createElement('textarea');
descriptiontextarea33.id = 'descriptiontextarea33';
descriptiontextarea33.className = 'post-title';
descriptiontextarea33.setAttribute('placeholder',"140 chars");
descriptiontextarea33.setAttribute('rows',"5");
descriptiontextarea33.setAttribute('cols',"60");
//descriptiontextarea.setAttribute('minlength',"4");
descriptiontextarea33.setAttribute('maxlength',"140");
document.getElementById('childdiveditsolasys').append(descriptiontextarea33);

var br4dfdfdfd5dfd345 =document.createElement('br');
document.getElementById('childdiveditsolasys').append(br4dfdfdfd5dfd345);

var titletexfdft4433 =document.createElement('h6');
titletexfdft4433.innerText = "Active";
document.getElementById('childdiveditsolasys').append(titletexfdft4433);

var radiobuttons = document.createElement('INPUT');
radiobuttons.setAttribute('type',"radio");
radiobuttons.id = 'radiobuttonActive';
radiobuttons.className = 'radiobuttons';
radiobuttons.setAttribute('name',"Samename");
radiobuttons.setAttribute('value',"Active");
document.getElementById('childdiveditsolasys').append(radiobuttons);

var titletexfddffdft4433 =document.createElement('h6');
titletexfddffdft4433.innerText = "InActive";
document.getElementById('childdiveditsolasys').append(titletexfddffdft4433);

var radiobuttons = document.createElement('INPUT');
radiobuttons.setAttribute('type',"radio");
radiobuttons.id = 'radiobuttonInactive';
radiobuttons.className = 'radiobuttons';
radiobuttons.setAttribute('name',"Samename");
radiobuttons.setAttribute('value',"InActive");
document.getElementById('childdiveditsolasys').append(radiobuttons);



//error message label
var errormessage545 = document.createElement('h6');
errormessage545.className = 'post-meta';
errormessage545.id = 'errormessage545';
errormessage545.setAttribute('style',"color:red");
document.getElementById('childdiveditsolasys').append(errormessage545);

//submit  / cancel buttons

var actionbuttonSubmit4333 = document.createElement('img');
actionbuttonSubmit4333.id = 'childdiveditsolasys';   //send this id of div holding all edit elemets so that div can be removd  //19 
actionbuttonSubmit4333.className = 'img-bottompara1'; 
actionbuttonSubmit4333.value = solId;  
actionbuttonSubmit4333.setAttribute('onclick', "UpdateSolasys(this.id,this.value)");
actionbuttonSubmit4333.src = 'assets/submit.svg';
document.getElementById('childdiveditsolasys').append(actionbuttonSubmit4333);

var actionbuttoncancel74465 = document.createElement('img');
actionbuttoncancel74465.id = 'actionbuttoncancel74465';
actionbuttoncancel74465.className = 'img-bottompara1';  
actionbuttoncancel74465.value = "childdiveditsolasys"; 
actionbuttoncancel74465.setAttribute('onclick', "CancelUpdatingSolasys(this.value)");
actionbuttoncancel74465.src = 'assets/cancel.svg';
document.getElementById('childdiveditsolasys').append(actionbuttoncancel74465);

var br4dfdfddfdfd5345 =document.createElement('br');
document.getElementById('childdiveditsolasys').append(br4dfdfddfdfd5345);

//edit solasys area end

}

function CancelUpdatingSolasys(childdiveditsolasys){
    //hide the div
    document.getElementById('titletextarea44').value = "";
    document.getElementById('descriptiontextarea33').value = "";
    document.getElementById(childdiveditsolasys).remove();
    
}

function UpdateSolasys(childdivid,solId){
    
    //validate if text is entered
    if (document.getElementById("titletextarea44").value == "")
    {
        var sdfsdfffdfddf = document.getElementById('errormessage545')
        sdfsdfffdfddf.innerText = "Please enter Solasys Title";
        return false;
    }
    if (document.getElementById("descriptiontextarea33").value == "")
    {
        var sdfsdfdfddfdfdfddf = document.getElementById('errormessage545')
        sdfsdfdfddfdfdfddf.innerText = "Please enter Solasys Description";
        return false;
    }
     
//update galaxz


const sname = document.getElementById("titletextarea44").value;
const sdescription = document.getElementById("descriptiontextarea33").value;
const status = document.querySelector('input[name = Samename]:checked').value;

const database = firebase.database();

database.ref('/solasys/' +solId).update({ 
 name: sname.trim(),
 description: sdescription.trim(),
 status:status,
})

var sdfsdfdfddfdfdfddf = document.getElementById('successmessage443')
sdfsdfdfddfdfdfddf.innerText = "SOLASYS Updated";
//clear the textareas
document.getElementById('titletextarea44').value = "";
document.getElementById('descriptiontextarea33').value = "";
document.getElementById(childdivid).remove();

UpdateUIAfterEdit(solId);

}

// update the UI with new details
function UpdateUIAfterEdit(solId){
let sname;
let sdesc
let status
 
    // get g name and g desc for the edited after eding is done
const database = firebase.database();
database.ref('/solasys').orderByChild('solasysId')
    .equalTo(solId).limitToFirst(1)  
    .once("value",function(ALLRecords){
        ALLRecords.forEach(
            function(CurrentRecord) {
               
     sname = CurrentRecord.val().name;
     sdesc = CurrentRecord.val().description;
     status = CurrentRecord.val().status;
          });
          
          document.getElementById(stitleedited).innerText = sname;
          document.getElementById(sdescedited).innerText = sdesc;
          if(status=="Active"){
            document.getElementById(statusofS).innerText = status;
            document.getElementById(statusofS).setAttribute('style',"color:green");
            }
            if(status=="InActive"){
                document.getElementById(statusofS).innerText = status;
                document.getElementById(statusofS).setAttribute('style',"color:red");
                }
       

       });  
    }

//EDIT GALAXZ END 
