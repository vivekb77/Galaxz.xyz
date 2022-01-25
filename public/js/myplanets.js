//SHARE PLANETS START
//SOLASYS DETAILS START
//DISPLAY ALL PLANETS START
//ADD NEW PLANET START
//DELECT PLANET START
//EDIT PLANET START 

 
analytics.logEvent('MyPlanets Page used', { name: ''});

var solasysfromQ = new URLSearchParams(window.location.search);
    var galaxzId = solasysfromQ.get('gId');
    var solasysId = solasysfromQ.get('sId');
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
                getSolasysDetails(solasysId);
            }
            
            
        }
    })
}

//SHARE PLANETS START

function sharePlanets(){
    var urltoshare = "https://galaxz.xyz/planets.html?gId="+galaxzId+"&sId="+solasysId;
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

//SHARE PLANETS END


  //  SOLASYS DETAILS START

function getSolasysDetails(solasysId){


    const database = firebase.database();
    var  solasysArray = [];
  
    database.ref('/solasys').orderByChild('solasysId')
    .equalTo(solasysId).limitToFirst(1)
    .once("value",function(snapshot){
        if(snapshot.exists()){      // only if there is data // if solasys id in q string is wrong dont execute
            snapshot.forEach(
            function(snapshot) {
                
                    var name = snapshot.val().name;
                    var description = snapshot.val().description;
                    var createdById = snapshot.val().createdById;
                  
                               var solasysObject = 
                                    {
                                    "name":name,
                                    "description":description,
                                    "createdById":createdById,
                                    "solasysId":solasysId,
                                    };
                
                                
                                    solasysArray.push(solasysObject)
                
            });
           
            // move forward only if the solasys is owned by the logged in user
            //executed when OWN SOLASYS in Q string
           if(curatorId === solasysArray[0].createdById){
            
        
            AddSolasysCell(solasysArray);
            GetExistingPlanets(solasysArray[0].solasysId);

            // share solasys button at the top
            var sharelinktitle = document.createElement('h6');
            sharelinktitle.setAttribute('style',"color:#0085A1");
            sharelinktitle.innerText = "Share these PLANETS with Readers";
            document.getElementById('sharePlanets').append(sharelinktitle);

            var sharelink = document.createElement('img');
            sharelink.id = 'sharelink';
            sharelink.className = 'img-bottompara1'; 
            sharelink.setAttribute('onclick', "sharePlanets()");
            sharelink.src = 'assets/shareG.svg';
            document.getElementById('sharePlanets').append(sharelink);

           }  // if c id = s created id end
         
             // or send to login or mygalaxz
           //executed when other curators SOLASYS in Q string
           if(curatorId !== solasysArray[0].createdById){
            

            var solasystitle = document.createElement('h5');
            solasystitle.setAttribute('style',"color:red");
            solasystitle.innerText = "You do not own this SOLASYS to make changes to PLANETS under it";
            document.getElementById('sharePlanets').append(solasystitle);
            
               //go back to mygalaxz (not mysolasys) button or login
             var div4534 = document.createElement("div");
             div4534.className = 'rocketshipgobackahref';
             div4534.id = 'div4534';
             document.getElementById('sharePlanets').append(div4534);

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

        } // if c!= curator id of s
            
           } //if snapshot end

         
             //executed when  SOLASYS in Q string is worng
           else{

            var galaxztitle = document.createElement('h5');
            galaxztitle.setAttribute('style',"color:red");
            galaxztitle.innerText = "You do not own this SOLASYS to make changes to PLANETS under it";
            document.getElementById('sharePlanets').append(galaxztitle);
            
               //go back to mygalaxz button or login
             var div4534 = document.createElement("div");
             div4534.className = 'rocketshipgobackahref';
             div4534.id = 'div4534';
             document.getElementById('sharePlanets').append(div4534);

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
  

  
function AddSolasysCell (solasysArray){
 
    //remove the placeholer first
    const placeholder1 = document.getElementById('placeholder-animation1');
    placeholder1.innerHTML ='';
    const placeholder2 = document.getElementById('placeholder-animation2');
    placeholder2.innerHTML ='';
    const placeholder3 = document.getElementById('placeholder-animation3');
    placeholder3.innerHTML ='';

    var brrrrrr = document.createElement('br');
    document.getElementById('maindiv').append(brrrrrr);

  var solasystitle = document.createElement('h5');
  solasystitle.setAttribute('style',"color:#0085A1");
  solasystitle.innerText = "SOLASYS";
  document.getElementById('maindiv').append(solasystitle);
  
         var scounter = 0;  
  
   for (i=0 ;i < solasysArray.length; i++){
     
  var solasysdivnext = document.createElement('div');
  solasysdivnext.className = 'post-preview';
  solasysdivnext.id = 'solasysdivnext'+scounter;
  document.getElementById('maindiv').append(solasysdivnext);
  
  var stitleDesc = document.createElement('a');
  stitleDesc.id = 'stitleDesc'+scounter;
  document.getElementById('solasysdivnext'+scounter).append(stitleDesc);
  
  var stitle = document.createElement('h2');
  stitle.id = 'stitle'+scounter;
  stitle.className = 'post-title';
  stitle.innerText = solasysArray[i].name;
  document.getElementById('stitleDesc'+scounter).append(stitle);
  
  var spostsubtitle = document.createElement('h3');
  spostsubtitle.id = 'spostsubtitle'+scounter;
  spostsubtitle.className = 'post-subtitle';
  spostsubtitle.innerText = solasysArray[i].description;
  document.getElementById('stitleDesc'+scounter).append(spostsubtitle);
  
  
  //go back to galaxz button 
  var div4534 = document.createElement("div");
  div4534.className = 'rocketshipgobackahref';
  div4534.id = 'div4534';
  document.getElementById('maindiv').append(div4534);
  
  var gobacktoS = document.createElement('a');
  gobacktoS.setAttribute('href', "mysolasys.html?gId="+galaxzId);
  gobacktoS.id = 'gobacktoS';
  document.getElementById('div4534').append(gobacktoS);
  
  var rocketship = document.createElement('img');
  rocketship.id = 'rocketship';
  rocketship.className = 'rocketshipgoback';
  rocketship.src = 'assets/rocketship.png';
  document.getElementById('gobacktoS').append(rocketship);
  
  var hr6666 = document.createElement("hr");
  hr6666.className='my-4';
  document.getElementById('maindiv').append(hr6666);
  
  var solasystitletext = document.createElement('h5');
  solasystitletext.setAttribute('style',"color:#0085A1");
  solasystitletext.innerText = "PLANETS";
  document.getElementById('maindiv').append(solasystitletext);
  
  var brrrdfsdfdsrrr = document.createElement('br');
    document.getElementById('maindiv').append(brrrdfsdfdsrrr);
  
  ++scounter;

  
  }

  
}
  

 //  SOLASYS DETAILS END

 
//  DISPLAY ALL PLANETS START
    var isitnewPlanet = "No";
    var counter = 0;   // a global variable so that new ids are assigned to newly added planets
    var  planetsArray = [];
    
function GetExistingPlanets(solId){

   
    const database = firebase.database();
    

    database.ref('/articles').orderByChild('solasysId')
    .equalTo(solId).limitToLast(30)
    .once("value",function(ALLRecords){
        ALLRecords.forEach(
            function(CurrentRecord) {
               
    var galaxzId = CurrentRecord.val().galaxzId;
    var solasysId = CurrentRecord.val().solasysId;
    var articleId = CurrentRecord.val().articleId;
    var createdBy = CurrentRecord.val().curatedBy;
    var createdById = CurrentRecord.val().createdById;
    var createdDate = CurrentRecord.val().curatedDate;
    var name = CurrentRecord.val().name;
    var status = CurrentRecord.val().status;
    var description = CurrentRecord.val().description;
    var clicks = CurrentRecord.val().views;
    var likes = CurrentRecord.val().likes;
    var shares = CurrentRecord.val().shares;
    var url = CurrentRecord.val().url;
               

          var options = { month: 'short', day: 'numeric' };
           var formatteddate0  = new Date(createdDate);
          var formatteddate = (formatteddate0.toLocaleDateString("en-US", options));

               var planetsObject = 
                    {"galaxzId":galaxzId,
                    "solasysId":solasysId,
                    "articleId":articleId,
                    "status":status,
                    "createdBy":createdBy,
                    "createdById":createdById,
                    "formatteddate":formatteddate,
                    "name":name,
                    "description":description,
                    "clicks":clicks,
                    "likes":likes,
                    "shares":shares,
                    "url":url,
                    };
                
                    planetsArray.push(planetsObject)
                  
            });
           //sorting , new planets appear at the bottom , so curators can craft a story
            AddPlanetsCell(planetsArray);
     });

        
}


function AddPlanetsCell (planetsArray){


 for (i=0 ;i < planetsArray.length; i++){

var attachallplanetsdiv = document.createElement('div');
attachallplanetsdiv.className = 'post-preview';
attachallplanetsdiv.id = 'attachallplanetsdiv'+counter;
if(isitnewPlanet == "Yes"){
document.getElementById('newlyaddedPlanetplaceholderdiv').append(attachallplanetsdiv);
}
if(isitnewPlanet == "No"){
document.getElementById('maindiv').append(attachallplanetsdiv);
}

//attach all  existing planets to this div
var attachallplanetsdiv = document.createElement('div');
attachallplanetsdiv.className = 'post-preview';
attachallplanetsdiv.id = 'attachallplanetsdiv'+counter;
document.getElementById('maindiv').append(attachallplanetsdiv);

var toppara = document.createElement('p');
toppara.className = 'post-metagsp';
toppara.id = 'toppara'+counter;
document.getElementById('attachallplanetsdiv'+counter).append(toppara);

var curatorlink = document.createElement('a');
curatorlink.id = 'curatorlink'+counter;
document.getElementById('toppara'+counter).append(curatorlink);

var curatedBy = document.createElement('span');
curatedBy.id = 'curatedBy'+counter;
curatedBy.innerText = planetsArray[i].createdBy;
document.getElementById('curatorlink'+counter).append(curatedBy);

var curatedDate = document.createElement('span');
curatedDate.id = 'curatedDate'+counter;
curatedDate.innerText = planetsArray[i].formatteddate;
document.getElementById('toppara'+counter).append(curatedDate);


//url logic start

// only add href to a tag if there is url value in the array , using this for micro blow, lists , threads feature
    
var titleDesc = document.createElement('a');
//only set attribute if url is present
if (!planetsArray[i].url == "") {
titleDesc.setAttribute('href', planetsArray[i].url );
titleDesc.setAttribute('target', '_blank');
}
titleDesc.id = 'titleDesc'+counter;
document.getElementById('attachallplanetsdiv'+counter).append(titleDesc);

var title = document.createElement('h2');
title.id = 'post-title'+counter;
title.className = 'post-title';
title.innerText = planetsArray[i].name;
document.getElementById('titleDesc'+counter).append(title);

var postsubtitle = document.createElement('h3');
postsubtitle.id = 'post-subtitle'+counter;
postsubtitle.className = 'post-subtitle';
postsubtitle.innerText = planetsArray[i].description;
document.getElementById('titleDesc'+counter).append(postsubtitle);


var posturl = document.createElement('h3');
posturl.id = 'post-url'+counter;
posturl.className = 'post-url';  
if (!planetsArray[i].url == "") {
posturl.innerText = (planetsArray[i].url).substr(0,40) + "...";
posturl.setAttribute('style',"color:#0085A1");
posturl.setAttribute('rel',"noreferrer");
}
document.getElementById('titleDesc'+counter).append(posturl);

    

//url logic end

var br = document.createElement("br");
document.getElementById('attachallplanetsdiv'+counter).append(br);

var bottompara = document.createElement('p');
bottompara.className = 'post-metagsp';
bottompara.id = 'bottompara'+counter;
document.getElementById('attachallplanetsdiv'+counter).append(bottompara);

//show the number of  clicks only if url is present
if (planetsArray[i].url != "") {
var clicksBtn = document.createElement('span');
clicksBtn.id = 'clicksBtn'+counter;
clicksBtn.innerText = "Link Clicks";
document.getElementById('bottompara'+counter).append(clicksBtn);

var clicksval = document.createElement('span');
clicksval.id = 'clicksval'+counter;
clicksval.innerText = planetsArray[i].clicks;
document.getElementById('bottompara'+counter).append(clicksval);
} //

var likebtn = document.createElement('span');
likebtn.id = 'likebtn'+counter;
likebtn.innerText = "Likes";
document.getElementById('bottompara'+counter).append(likebtn);

var likesval = document.createElement('span');
likesval.id = 'likesval'+counter;
likesval.innerText = planetsArray[i].likes;
document.getElementById('bottompara'+counter).append(likesval);

var sharebtn = document.createElement('span');
sharebtn.id = 'sharebtn'+counter;
sharebtn.innerText = "Shares";
document.getElementById('bottompara'+counter).append(sharebtn);

var sharesval = document.createElement('span');
sharesval.id = 'sharesval'+counter;
sharesval.innerText = planetsArray[i].shares;
document.getElementById('bottompara'+counter).append(sharesval);

//edit / delete buttons start

var actionbuttons = document.createElement('p');
actionbuttons.className = 'post-metagsp';
actionbuttons.id = 'actionbuttons'+counter;
document.getElementById('attachallplanetsdiv'+counter).append(actionbuttons);

//status field
var statusofPlanet = document.createElement('h6');
statusofPlanet.className = 'img-bottompara1';
statusofPlanet.id = 'statusofPlanet'+counter;
statusofPlanet.innerText = planetsArray[i].status;
if(statusofPlanet.innerText=="Active"){
    statusofPlanet.setAttribute('style',"color:green");
}
if(statusofPlanet.innerText=="InActive"){
    statusofPlanet.setAttribute('style',"color:red");
}
document.getElementById('actionbuttons'+counter).append(statusofPlanet);

var actionbuttonEdit = document.createElement('img');
actionbuttonEdit.id = 'actionbuttonEdit'+counter;
actionbuttonEdit.className = 'img-bottompara1';
actionbuttonEdit.value = planetsArray[i].articleId;   
actionbuttonEdit.setAttribute('onclick', "EditPlanet(this.id,this.value)");
actionbuttonEdit.src = 'assets/editG.svg';
document.getElementById('actionbuttons'+counter).append(actionbuttonEdit);

var actionbuttonDelete = document.createElement('img');
actionbuttonDelete.id = 'actionbuttonDelete'+counter;
actionbuttonDelete.className = 'img-bottompara1';
actionbuttonDelete.value = planetsArray[i].articleId;   
actionbuttonDelete.setAttribute('onclick', "DeletePlanet(this.id,this.value)");
actionbuttonDelete.src = 'assets/deleteG.svg';
document.getElementById('actionbuttons'+counter).append(actionbuttonDelete);
//edit / delete buttons end

//edit planet area div start
//parent div for edit planet elements
var parentdiveditplanettextarea = document.createElement("div");
parentdiveditplanettextarea.id = 'parentdiveditplanettextarea'+counter;
document.getElementById('attachallplanetsdiv'+counter).append(parentdiveditplanettextarea);

//edit planet area div end


var hr = document.createElement("hr");
hr.className='my-4';
hr.id = 'hr'+counter;
document.getElementById('attachallplanetsdiv'+counter).append(hr);

++counter;

}


if(counter==planetsArray.length){  // so that these elemets and add button is added only once at the end

//placeholder div for newly added planet so that it appears below existing ones
var newlyaddedPlanetplaceholderdiv = document.createElement('div');
newlyaddedPlanetplaceholderdiv.className = 'post-preview';
newlyaddedPlanetplaceholderdiv.id = 'newlyaddedPlanetplaceholderdiv';
document.getElementById('maindiv').append(newlyaddedPlanetplaceholderdiv); 

 // parent div to attach add planets buttons areas
var parentdivaddPlanetsbutton = document.createElement("div");  
parentdivaddPlanetsbutton.id = 'parentdivaddPlanetsbutton';
document.getElementById('maindiv').append(parentdivaddPlanetsbutton);

 //label to display success message when planet is added
var addPlanetsuccesslbl = document.createElement("h6");
addPlanetsuccesslbl.id = "addPlanetsuccesslbl";
document.getElementById('parentdivaddPlanetsbutton').append(addPlanetsuccesslbl);

// add planet text and button
var addanewplanettext = document.createElement("h5");
addanewplanettext.id = "addanewplanettext";
addanewplanettext.innerText = "Add a New PLANET";
addanewplanettext.setAttribute('style',"color:#0085A1");
document.getElementById('parentdivaddPlanetsbutton').append(addanewplanettext);

var bdsfdfdfdfddsdfsdfr = document.createElement("br");
document.getElementById('parentdivaddPlanetsbutton').append(bdsfdfdfdfddsdfsdfr);

var addPlanetButton = document.createElement('img');
addPlanetButton.id = "addPlanetButton";
addPlanetButton.className = 'mygalaxzinfo';
addPlanetButton.src = 'assets/submit.svg';
addPlanetButton.setAttribute('onclick', "AddNewPlanet()");
document.getElementById('parentdivaddPlanetsbutton').append(addPlanetButton);

// parent div to attach add planets text areas
var parentdivaddPlanetselements = document.createElement("div");  
parentdivaddPlanetselements.id = 'parentdivaddPlanetselements';
document.getElementById('maindiv').append(parentdivaddPlanetselements);


}

++counter;  
// ++counter // issue (planetarray length cannot be 1 any time as when new planet added, array len is 1 )
// when user ads first planet add planet buttton is added again becuase counter and length of array is same
//so  the add solasys button is not added again is we ++ counter 

}

//  DISPLAY ALL PLANETS END

//ADD NEW PLANET START

// create new planet edit area
function AddNewPlanet(){

    document.getElementById('addPlanetButton').style.display = 'none';   // hide /not remove the "add planet" button 
    document.getElementById('addanewplanettext').style.display = 'none'; 
   // document.getElementById('parentdivaddPlanetsbutton').remove(); 
    
    
    let succmess = document.getElementById('addPlanetsuccesslbl');
    if(document.body.contains(succmess)){
        succmess.innerText = "";   // clear ,not remove element as needed again, the "success message" if present 
    }
    
     // child div to attach add planet edit areas/elements which is attaached to parent
    var childdivaddPlanetselements = document.createElement("div");  
    childdivaddPlanetselements.id = 'childdivaddPlanetselements';
    document.getElementById('parentdivaddPlanetselements').append(childdivaddPlanetselements);
    
    var br4dfdfdfd5345 =document.createElement('br');
    document.getElementById('childdivaddPlanetselements').append(br4dfdfdfd5345);

    //append all add elements to chhild div
    var sdfsdfsdfsdfsdf =document.createElement('h5');
    sdfsdfsdfsdfsdf.innerText = "Add a new PLANET";
    sdfsdfsdfsdfsdf.setAttribute('style',"color:Green");
    document.getElementById('childdivaddPlanetselements').append(sdfsdfsdfsdfsdf);

    var whattoadd43 =document.createElement('h6');
    whattoadd43.innerText = "A microblog, A thread, A list or and external article";
    whattoadd43.setAttribute('style',"color:#0085A1");
    document.getElementById('childdivaddPlanetselements').append(whattoadd43);
    
    var br4ddfdfdfd5345 =document.createElement('br');
    document.getElementById('childdivaddPlanetselements').append(br4ddfdfdfd5345);
    
    var titletext33 =document.createElement('h5');
    titletext33.innerText = "Planet Title";
    document.getElementById('childdivaddPlanetselements').append(titletext33);
    
    var br4dfd5345 =document.createElement('br');
    document.getElementById('childdivaddPlanetselements').append(br4dfd5345);
    
    var titletextarea = document.createElement('textarea');
    titletextarea.id = 'titletextarea';
    titletextarea.className = 'post-titlegsp';
    titletextarea.setAttribute('placeholder',"80 chars max");
    titletextarea.setAttribute('rows',"3");
    titletextarea.setAttribute('cols',"60");
    //titletextarea.setAttribute('minlength',"4");
    titletextarea.setAttribute('maxlength',"80");
    document.getElementById('childdivaddPlanetselements').append(titletextarea);
    
    var dfdfddfdfdf =document.createElement('br');
    document.getElementById('childdivaddPlanetselements').append(dfdfddfdfdf);
    var br4dff5345 =document.createElement('br');
    document.getElementById('childdivaddPlanetselements').append(br4dff5345);
    
    var titledesc33 =document.createElement('h5');
    titledesc33.innerText = "Planet Description";
    document.getElementById('childdivaddPlanetselements').append(titledesc33);
    
    var br4dfdf5345 =document.createElement('br');
    document.getElementById('childdivaddPlanetselements').append(br4dfdf5345);
    
    var descriptiontextarea = document.createElement('textarea');
    descriptiontextarea.id = 'descriptiontextarea';
    descriptiontextarea.className = 'post-titlegsp';
    descriptiontextarea.setAttribute('placeholder',"1000 chars max");
    descriptiontextarea.setAttribute('rows',"7");
    descriptiontextarea.setAttribute('cols',"60");
    //descriptiontextarea.setAttribute('minlength',"4");
    descriptiontextarea.setAttribute('maxlength',"1000");
    document.getElementById('childdivaddPlanetselements').append(descriptiontextarea);
    
    //url
    var dfdfdfdfddfdf =document.createElement('br');
    document.getElementById('childdivaddPlanetselements').append(dfdfdfdfddfdf);
    var br4dffdfdf5345 =document.createElement('br');
    document.getElementById('childdivaddPlanetselements').append(br4dffdfdf5345);
    
    var url_3453554 =document.createElement('h5');
    url_3453554.innerText = "URL - Optional (only https:// urls allowed)";
    document.getElementById('childdivaddPlanetselements').append(url_3453554);
    
    
    var br4dffdfddf5345 =document.createElement('br');
    document.getElementById('childdivaddPlanetselements').append(br4dffdfddf5345);
    
    var urltextarea = document.createElement('textarea');
    urltextarea.id = 'urltextarea';
    urltextarea.className = 'post-titlegsp';
    urltextarea.setAttribute('placeholder',"OPTIONAL - 200 chars max, only https:// urls allowed");
    urltextarea.setAttribute('rows',"2");
    urltextarea.setAttribute('cols',"60");
    //descriptiontextarea.setAttribute('minlength',"4");
    urltextarea.setAttribute('maxlength',"200");
    document.getElementById('childdivaddPlanetselements').append(urltextarea);
    
    
    //error message label
    var errormessagelbl = document.createElement('h6');
    errormessagelbl.className = 'post-metagsp';
    errormessagelbl.id = 'errormessagelbl';
    errormessagelbl.setAttribute('style',"color:red");
    document.getElementById('childdivaddPlanetselements').append(errormessagelbl);
    
    //submit  / cancel buttons
    
    
    var submitcancelbuttons = document.createElement('p');
    submitcancelbuttons.className = 'post-metagsp';
    submitcancelbuttons.id = 'submitcancelbuttons';
    document.getElementById('childdivaddPlanetselements').append(submitcancelbuttons);
    
    var actionbuttonSubmit = document.createElement('img');
    actionbuttonSubmit.id = 'actionbuttonSubmit';
    actionbuttonSubmit.className = 'img-bottompara1';  
    actionbuttonSubmit.setAttribute('onclick', "AddPlanet()");
    actionbuttonSubmit.src = 'assets/submit.svg';
    document.getElementById('submitcancelbuttons').append(actionbuttonSubmit);
    
    var actionbuttoncancel = document.createElement('img');
    actionbuttoncancel.id = 'actionbuttoncancel';
    actionbuttoncancel.className = 'img-bottompara1';  
    actionbuttoncancel.setAttribute('onclick', "CancelAddingPlanet()");
    actionbuttoncancel.src = 'assets/cancel.svg';
    document.getElementById('submitcancelbuttons').append(actionbuttoncancel);
    
    
    }
    

function CancelAddingPlanet(){
   
    document.getElementById('childdivaddPlanetselements').remove();  //remove the child div with all add elements
    document.getElementById('addPlanetButton').style.display = 'block';   // show the "add planet" button 
    document.getElementById('addanewplanettext').style.display = 'block'; 
   // document.getElementById('parentdivaddPlanetsbutton').add();
    

}

function AddPlanet(){
    
    //validate if text is entered
    if (document.getElementById("titletextarea").value.trim() == "")
    {
        var sdfsdfdfddf = document.getElementById('errormessagelbl')
        sdfsdfdfddf.innerText = "Please enter Planet Title";
        return false;
    }
    if (document.getElementById("descriptiontextarea").value.trim() == "")
    {
        var sdfsdfdfdfdfddf = document.getElementById('errormessagelbl')
        sdfsdfdfdfdfddf.innerText = "Please enter Planet Description";
        return false;
    }
    if (document.getElementById("titletextarea").value.trim().length > 80)
    {
        var sdfsdfdfddf = document.getElementById('errormessagelbl')
        sdfsdfdfddf.innerText = "Please enter Planet Title less than 80 chars";
        return false;
    }
    if (document.getElementById("descriptiontextarea").value.trim().length > 1000)
    {
        var sdfsdfdfdfdfddf = document.getElementById('errormessagelbl')
        sdfsdfdfdfdfddf.innerText = "Please enter Planet Description less than 1000 chars";
        return false;
    }
    if (document.getElementById("urltextarea").value.trim().length > 200)
    {
        var sdfsdfdfdfdfddf = document.getElementById('errormessagelbl')
        sdfsdfdfdfdfddf.innerText = "Please enter URL less than 200 chars";
        return false;
    }
    //url validation // only validate if url is entered
    if(document.getElementById("urltextarea").value.trim() != ""){
        
            if (!document.getElementById("urltextarea").value.trim().startsWith("https://") ){
                var sdfsdfdfddfdffdfddf = document.getElementById('errormessagelbl')
                sdfsdfdfddfdffdfddf.innerText = "Please enter https:// URL";
                return false;
            }
            
    }
    
//add planet


const pname = document.getElementById("titletextarea").value;
const pdescription = document.getElementById("descriptiontextarea").value;
const purl = document.getElementById("urltextarea").value;


const database = firebase.database();
const usersRef = database.ref('/articles');
const autoId = usersRef.push().key

usersRef.child(autoId).set({
articleId: autoId,
solasysId: solasysId,
galaxzId: galaxzId,
name: pname.trim(),
description: pdescription.trim(),
url:purl.trim(),
curatedBy: curatorName,
createdById: curatorId,
priority:1,   //not using this for anything now 
status: "Active",
views: 0,
likes:0,
shares: 0,
curatedDate: firebase.database.ServerValue.TIMESTAMP

})

var sdfsdfdfddfdfdfddf = document.getElementById('addPlanetsuccesslbl')
sdfsdfdfddfdfdfddf.innerText = "Planet Added";
sdfsdfdfddfdfdfddf.setAttribute('style',"color:green");

// increment 1 in solasys , number of articles
const database1 = firebase.database();
database1.ref('/solasys/' +solasysId).update({ 
numberOfArticles:firebase.database.ServerValue.increment(1)})

//clear the textareas

document.getElementById('childdivaddPlanetselements').remove();  //remove the child div with all add elements
document.getElementById('addPlanetButton').style.display = 'block';   // show the "add planet" button 
document.getElementById('addanewplanettext').style.display = 'block'; 

GetNewlyAddedPlanet(autoId);  // add the newly added Planet to the UI

}


function GetNewlyAddedPlanet(planId){
   
planetsArray = [];
isitnewPlanet = "Yes";
const database = firebase.database();

     database.ref('/articles').orderByChild('articleId')
     .equalTo(planId).limitToFirst(1)
     .once("value",function(ALLRecords){
         ALLRecords.forEach(
             function(CurrentRecord) {
                
     var galaxzId = CurrentRecord.val().galaxzId;
     var solasysId = CurrentRecord.val().solasysId;
     var articleId = CurrentRecord.val().articleId;
     var createdBy = CurrentRecord.val().curatedBy;
     var createdById = CurrentRecord.val().createdById;
     var createdDate = CurrentRecord.val().curatedDate;
     var name = CurrentRecord.val().name;
     var status = CurrentRecord.val().status;
     var description = CurrentRecord.val().description;
     var clicks = CurrentRecord.val().views;
     var likes = CurrentRecord.val().likes;
     var shares = CurrentRecord.val().shares;
     var url = CurrentRecord.val().url;
                
 
           var options = { month: 'short', day: 'numeric' };
            var formatteddate0  = new Date(createdDate);
           var formatteddate = (formatteddate0.toLocaleDateString("en-US", options));
 
                var planetsObject = 
                     {"galaxzId":galaxzId,
                     "solasysId":solasysId,
                     "articleId":articleId,
                     "status":status,
                     "createdBy":createdBy,
                     "createdById":createdById,
                     "formatteddate":formatteddate,
                     "name":name,
                     "description":description,
                     "clicks":clicks,
                     "likes":likes,
                     "shares":shares,
                     "url":url,
                     };
                 
                     planetsArray.push(planetsObject)
                   
             });
            //sorting , new planets appear at the bottom , so curators can craft a story
            console.log(planetsArray);
             AddPlanetsCell(planetsArray);
      });

}
//ADD NEW PLANET END


//DELECT PLANET START
function DeletePlanet(tagId,planId){
    //first remove the error message
    var element =  document.getElementById('cantdeletePlanet');
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
      //delete Planet
      var deletePlanetpopupbutton = document.getElementById('deletePlanetpopupbutton');
      deletePlanetpopupbutton.onclick = function() {
        showpopup.style.display = "none";
       
       let extractnumberfromid = tagId.substr(18);
       var clickedplanetdiv = "attachallplanetsdiv"+extractnumberfromid;
      
        const database = firebase.database();
        database.ref('/articles/' +planId).remove();    // delete from DB
        document.getElementById(clickedplanetdiv).remove();   // remove the deleted planet from UI

        // decrement 1 in solasys , number of articles
        const database1 = firebase.database();
        database1.ref('/solasys/' +solasysId).update({ 
        numberOfArticles:firebase.database.ServerValue.increment(-1)})
       
    
    }

}

//DELECT PLANET END



//EDIT PLANET START 

//show the text areas under the solasys
var ptitleedited;
var pdescedited ;
var purledited
var pstatusofplanet;
var titleDesc;


function EditPlanet(tagid,planetId){

    let pname;
    let pdesc;
    let purl;
    let pstatus;
    

    // get p name and p desc from db for the edited s
const database = firebase.database();
database.ref('/articles').orderByChild('articleId')
    .equalTo(planetId).limitToFirst(1)  
    .once("value",function(ALLRecords){
        ALLRecords.forEach(
            function(CurrentRecord) {
               
     pname = CurrentRecord.val().name;
     pdesc = CurrentRecord.val().description;
     purl = CurrentRecord.val().url;
     pstatus = CurrentRecord.val().status;
          });
          titletextarea44.innerText = pname;
          descriptiontextarea33.innerText = pdesc;
          urltextarea333.innerText = purl;

          if(pstatus == "Active"){
           document.getElementById('radiobuttonActive').setAttribute('checked',"checked");
        }
        if(pstatus == "InActive"){
           document.getElementById('radiobuttonInactive').setAttribute('checked',"checked");
        }

       });  

  // first remove the edit boxes if its already displayed for another galaxz and then add for other because we are reusing ids
var element =  document.getElementById('childdiveditplanettextarea');
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
   
var parentdiveditplanettextarea = "parentdiveditplanettextarea"+extractnumberfromid;

 ptitleedited = "post-title"+extractnumberfromid;  // UpdateGalaxzAfterEdit() to work
 pdescedited = "post-subtitle"+extractnumberfromid; // for UpdateGalaxzAfterEdit() to work
 purledited = "post-url"+extractnumberfromid;
 titleDesc = "titleDesc"+extractnumberfromid;
 pstatusofplanet = "statusofPlanet"+extractnumberfromid;  //for UpdateGalaxzAfterEdit() to work
 
//success message tag to parent edit div
var successmessage443 =document.createElement('h6');
successmessage443.id = 'successmessage443';
successmessage443.className = 'post-metagsp';
successmessage443.setAttribute('style',"color:green");
document.getElementById(parentdiveditplanettextarea).append(successmessage443);  

//child tag under  parent edit div which hold all editing elements 
var childdiveditplanettextarea =document.createElement('div');
childdiveditplanettextarea.id = 'childdiveditplanettextarea'
document.getElementById(parentdiveditplanettextarea).append(childdiveditplanettextarea);  


var titletexfdft4433 =document.createElement('h5');
titletexfdft4433.innerText = "Update Planet";
titletexfdft4433.setAttribute('style',"color:green");
document.getElementById('childdiveditplanettextarea').append(titletexfdft4433);

var br4dferddfd5345 =document.createElement('br');
document.getElementById('childdiveditplanettextarea').append(br4dferddfd5345);

var titletext4433 =document.createElement('h5');
titletext4433.innerText = "Planet Title";
document.getElementById('childdiveditplanettextarea').append(titletext4433);

var titletextarea44 = document.createElement('textarea');
titletextarea44.id = 'titletextarea44';
titletextarea44.className = 'post-titlegsp';
titletextarea44.setAttribute('placeholder',"80 chars");
titletextarea44.setAttribute('rows',"3");
titletextarea44.setAttribute('cols',"60");
//titletextarea.setAttribute('minlength',"4");
titletextarea44.setAttribute('maxlength',"80");
document.getElementById('childdiveditplanettextarea').append(titletextarea44);

var dfdfdffddfdfdfdf =document.createElement('br');
document.getElementById('childdiveditplanettextarea').append(dfdfdffddfdfdfdf);
var erewwedfrwer =document.createElement('br');
document.getElementById('childdiveditplanettextarea').append(erewwedfrwer);

var titledesc334 =document.createElement('h5');
titledesc334.innerText = "Planet Description";
document.getElementById('childdiveditplanettextarea').append(titledesc334);

// var br4dfdfdfd5345 =document.createElement('br');
// document.getElementById('childdiveditplanettextarea').append(br4dfdfdfd5345);

var descriptiontextarea33 = document.createElement('textarea');
descriptiontextarea33.id = 'descriptiontextarea33';
descriptiontextarea33.className = 'post-titlegsp';
descriptiontextarea33.setAttribute('placeholder',"1000 chars");
descriptiontextarea33.setAttribute('rows',"7");
descriptiontextarea33.setAttribute('cols',"60");
//descriptiontextarea.setAttribute('minlength',"4");
descriptiontextarea33.setAttribute('maxlength',"1000");
document.getElementById('childdiveditplanettextarea').append(descriptiontextarea33);

var br4dfdddfddsdfsdafsdfd5345 =document.createElement('br');
document.getElementById('childdiveditplanettextarea').append(br4dfdddfddsdfsdafsdfd5345);
var erewwerwer =document.createElement('br');
document.getElementById('childdiveditplanettextarea').append(erewwerwer);

var titletext4433 =document.createElement('h5');
titletext4433.innerText = "URL - Optional (only https:// urls allowed)";
document.getElementById('childdiveditplanettextarea').append(titletext4433);

var urltextarea333 = document.createElement('textarea');
urltextarea333.id = 'urltextarea333';
urltextarea333.className = 'post-titlegsp';
urltextarea333.setAttribute('placeholder',"OPTIONAL 200 chars (only https:// urls allowed)");
urltextarea333.setAttribute('rows',"2");
urltextarea333.setAttribute('cols',"60");
//titletextarea.setAttribute('minlength',"4");
urltextarea333.setAttribute('maxlength',"200");
document.getElementById('childdiveditplanettextarea').append(urltextarea333);

var dfdfdfdfdfdf =document.createElement('br');
document.getElementById('childdiveditplanettextarea').append(dfdfdfdfdfdf);

var br4dfdddfddsdfsdafsdfd5345 =document.createElement('br');
document.getElementById('childdiveditplanettextarea').append(br4dfdddfddsdfsdafsdfd5345);

var titletexfdft4433 =document.createElement('h6');
titletexfdft4433.innerText = "Active";
document.getElementById('childdiveditplanettextarea').append(titletexfdft4433);

var radiobuttons = document.createElement('INPUT');
radiobuttons.setAttribute('type',"radio");
radiobuttons.id = 'radiobuttonActive';
radiobuttons.className = 'radiobuttons';
radiobuttons.setAttribute('name',"Samename");
radiobuttons.setAttribute('value',"Active");
document.getElementById('childdiveditplanettextarea').append(radiobuttons);

var titletexfddffdft4433 =document.createElement('h6');
titletexfddffdft4433.innerText = "InActive";
document.getElementById('childdiveditplanettextarea').append(titletexfddffdft4433);

var radiobuttons = document.createElement('INPUT');
radiobuttons.setAttribute('type',"radio");
radiobuttons.id = 'radiobuttonInactive';
radiobuttons.className = 'radiobuttons';
radiobuttons.setAttribute('name',"Samename");
radiobuttons.setAttribute('value',"InActive");
document.getElementById('childdiveditplanettextarea').append(radiobuttons);



//error message label
var errormessage545 = document.createElement('h6');
errormessage545.className = 'post-metagsp';
errormessage545.id = 'errormessage545';
errormessage545.setAttribute('style',"color:red");
document.getElementById('childdiveditplanettextarea').append(errormessage545);

//submit  / cancel buttons

var actionbuttonSubmit4333 = document.createElement('img');
actionbuttonSubmit4333.id = 'childdiveditplanettextarea';   //send this id of div holding all edit elemets so that div can be removd  //19 
actionbuttonSubmit4333.className = 'img-bottompara1'; 
actionbuttonSubmit4333.value = planetId;  
actionbuttonSubmit4333.setAttribute('onclick', "UpdatePlanet(this.id,this.value)");
actionbuttonSubmit4333.src = 'assets/submit.svg';
document.getElementById('childdiveditplanettextarea').append(actionbuttonSubmit4333);

var actionbuttoncancel74465 = document.createElement('img');
actionbuttoncancel74465.id = 'actionbuttoncancel74465';
actionbuttoncancel74465.className = 'img-bottompara1';  
actionbuttoncancel74465.value = "childdiveditplanettextarea"; 
actionbuttoncancel74465.setAttribute('onclick', "CancelUpdatingPlanet(this.value)");
actionbuttoncancel74465.src = 'assets/cancel.svg';
document.getElementById('childdiveditplanettextarea').append(actionbuttoncancel74465);

var br4dfdfddfdfd5345 =document.createElement('br');
document.getElementById('childdiveditplanettextarea').append(br4dfdfddfdfd5345);

//edit solasys area end

}

function CancelUpdatingPlanet(childdiveditplanettextarea){
    //hide the div

    document.getElementById(childdiveditplanettextarea).remove();
    
}

function UpdatePlanet(childdivid,planetId){
    
    //validate if text is entered
    if (document.getElementById("titletextarea44").value.trim() == "")
    {
        var sdfsdfffdfddf = document.getElementById('errormessage545')
        sdfsdfffdfddf.innerText = "Please enter Planet Title";
        return false;
    }
    if (document.getElementById("descriptiontextarea33").value.trim() == "")
    {
        var sdfsdfdfddfdfdfddf = document.getElementById('errormessage545')
        sdfsdfdfddfdfdfddf.innerText = "Please enter Planet Description";
        return false;
    }
    if (document.getElementById("titletextarea44").value.trim().length >80)
    {
        var sdfsdfffdfddf = document.getElementById('errormessage545')
        sdfsdfffdfddf.innerText = "Please enter Planet Title less than 80 chars";
        return false;
    }
    if (document.getElementById("descriptiontextarea33").value.trim().length>1000)
    {
        var sdfsdfdfddfdfdfddf = document.getElementById('errormessage545')
        sdfsdfdfddfdfdfddf.innerText = "Please enter Planet Description less than 1000 chars";
        return false;
    }
    if (document.getElementById("urltextarea333").value.trim().length > 200)
    {
        var sdfsdfdfdfdfddf = document.getElementById('errormessage545')
        sdfsdfdfdfdfddf.innerText = "Please enter URL less than 200 chars";
        return false;
    }
    //url validation // only validate if url is entered
    if(document.getElementById("urltextarea333").value.trim() != ""){
        
            if (!document.getElementById("urltextarea333").value.trim().startsWith("https://") ){
                var sdfsdfdfddfdffdfddf = document.getElementById('errormessage545')
                sdfsdfdfddfdffdfddf.innerText = "Please enter https:// URL";
                return false;
            }
            
    }
     
//update Planet in db


const pname = document.getElementById("titletextarea44").value;
const pdescription = document.getElementById("descriptiontextarea33").value;
const purl = document.getElementById("urltextarea333").value;
const pstatus = document.querySelector('input[name = Samename]:checked').value;

const database = firebase.database();

database.ref('/articles/' +planetId).update({ 
 name: pname.trim(),
 description: pdescription.trim(),
 url:purl.trim(),
 status:pstatus,
})

var sdfsdfdfddfdfdfddf = document.getElementById('successmessage443')
sdfsdfdfddfdfdfddf.innerText = "PLANET Updated";
//clear the textareas

document.getElementById(childdivid).remove();

UpdateUIAfterEdit(planetId);

}

// update the UI with new details
function UpdateUIAfterEdit(planetId){
let pname;
let pdesc;
let purl;
let pstatus;
 
    // get g name and g desc for the edited after eding is done
const database = firebase.database();
database.ref('/articles').orderByChild('articleId')
    .equalTo(planetId).limitToFirst(1)  
    .once("value",function(ALLRecords){
        ALLRecords.forEach(
            function(CurrentRecord) {
               
     pname = CurrentRecord.val().name;
     pdesc = CurrentRecord.val().description;
     purl = CurrentRecord.val().url;
     pstatus = CurrentRecord.val().status;
          });
          
          document.getElementById(ptitleedited).innerText = pname;
          document.getElementById(pdescedited).innerText = pdesc;

        if(!purl == ""){
            document.getElementById(purledited).innerText = purl;
            document.getElementById(titleDesc).setAttribute('href', purl );
            document.getElementById(purledited).setAttribute('style',"color:#0085A1");
            document.getElementById(titleDesc).setAttribute('target', '_blank');
            document.getElementById(purledited).setAttribute('rel',"noreferrer");
        }
        if(purl == ""){
            document.getElementById(purledited).innerText = "";
            document.getElementById(titleDesc).removeAttribute('href', purl );
            document.getElementById(titleDesc).removeAttribute('target', '_blank');
            document.getElementById(purledited).removeAttribute('style',"color:#0085A1");
            document.getElementById(purledited).removeAttribute('rel',"noreferrer");
        }
          

          if(pstatus=="Active"){
            document.getElementById(pstatusofplanet).innerText = pstatus;
            document.getElementById(pstatusofplanet).setAttribute('style',"color:green");
            }
            if(pstatus=="InActive"){
                document.getElementById(pstatusofplanet).innerText = pstatus;
                document.getElementById(pstatusofplanet).setAttribute('style',"color:red");
                }
       

       });  
    }

//EDIT PLANET END 

 