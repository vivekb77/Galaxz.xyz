analytics.logEvent('Galaxz Page Viewed', {
  content_type: 'Text',
  content_id: 'P124534371000',
  items: [{ name: 'x?Galaxzpageviewd' }]
});


//only sign in ano if no user 
checkLogin();
function checkLogin() {   // does not work as auth takes time and galaxz details are pulled before this is done , so wait for this to complete and then fetch galaxz details
    
    firebase.auth().onAuthStateChanged((user)=>{
        if(!user){
            firebase.auth().signInAnonymously();
            
        }
    })
}



var galaxzIdfromQ = new URLSearchParams(window.location.search);
var galaxzId = galaxzIdfromQ.get('gId')

var  galaxzArrayQ = [];
var  galaxzArray = [];
var counter = 0;  

function GetGalaxz(){

    //if there is galaxzid passed in query string , add the galaxz at the top and the rest below
 if (galaxzId !== null){

    var sharedgalaxz = document.createElement('h5');
    sharedgalaxz.setAttribute('style',"color:#0085A1");
    sharedgalaxz.innerText = "Home Galaxz";
    document.getElementById('maindiv').append(sharedgalaxz);
    var brshared = document.createElement("br");
    document.getElementById('maindiv').append(brshared);
    
    const database = firebase.database();

database.ref('/galaxz').orderByChild("galaxzId")
.equalTo(galaxzId).limitToLast(1)  
.once("value",function(ALLRecords){
    ALLRecords.forEach(
        function(CurrentRecord) {
           
var galaxzId = CurrentRecord.val().galaxzId;
var createdBy = CurrentRecord.val().createdBy;
var createdById = CurrentRecord.val().createdById;
var createdDate = CurrentRecord.val().createdDate;
var name = CurrentRecord.val().name;
var status = CurrentRecord.val().status;   //curator made it active show at the top home ga;laxz section only when in Q string  , see pull all active g function
var description = CurrentRecord.val().description;
var numberOfSolasys = CurrentRecord.val().numberOfSolasys;
var views = CurrentRecord.val().views;
var followers = CurrentRecord.val().followers;
var shares = CurrentRecord.val().shares;
var priority = CurrentRecord.val().priority;  //curator made it active show at the top when in Q string
           

      let options = { month: 'short', day: 'numeric' };
       let formatteddate0  = new Date(createdDate);
      var formatteddate = (formatteddate0.toLocaleDateString("en-US", options));

             
           var galaxzObjectQ = 
                {"galaxzId":galaxzId,
                "createdBy":createdBy,
                "createdById":createdById,
                "formatteddate":formatteddate,
                "name":name,
                "status":status,
                "description":description,
                "numberOfSolasys":numberOfSolasys,
                "views":views,
                "followers":followers,
                "shares":shares,
                "priority":priority};
            
                galaxzArrayQ.push(galaxzObjectQ)
        });
         galaxzArrayQ = galaxzArrayQ.filter(function(filterByStatus) {
          return filterByStatus.status == "Active"; });
         
        //only call the func if there is data , happens if gid in url is wrong
        if (galaxzArrayQ.length >0){
        AddGalaxzCell(galaxzArrayQ);
        }
        else{  // no galaxz to show , this error message
            var otherGalaxzies = document.createElement('h5');
            otherGalaxzies.setAttribute('style',"color:#0085A1");
            otherGalaxzies.innerText = "Oops! the Galaxz you are looking for is unreachable";
            document.getElementById('maindiv').append(otherGalaxzies);
            var brshared1 = document.createElement("br");
            document.getElementById('maindiv').append(brshared1);
            
        }
        
        var otherGalaxzies = document.createElement('h5');
        otherGalaxzies.setAttribute('style',"color:#0085A1");
        otherGalaxzies.innerText = "Other interesting Galaxzies you may like";
        document.getElementById('maindiv').append(otherGalaxzies);
        var brshared1 = document.createElement("br");
        document.getElementById('maindiv').append(brshared1);

    });
}
    // pull all active galaxzies 


    const database = firebase.database();
    
    database.ref('/galaxz').orderByChild("adminGstatus")
    .equalTo("Active").limitToLast(30)  
    .once("value",function(ALLRecords){
        ALLRecords.forEach(
            function(CurrentRecord) {
               
    var galaxzId = CurrentRecord.val().galaxzId;
    var createdBy = CurrentRecord.val().createdBy;
    var createdById = CurrentRecord.val().createdById;
    var createdDate = CurrentRecord.val().createdDate;
    var name = CurrentRecord.val().name;
    var status = CurrentRecord.val().adminGstatus;  //curator made it active but do not show on home page till admin makes it active and sets priority
    var description = CurrentRecord.val().description;
    var numberOfSolasys = CurrentRecord.val().numberOfSolasys;
    var views = CurrentRecord.val().views;
    var followers = CurrentRecord.val().followers;
    var shares = CurrentRecord.val().shares;
    var priority = CurrentRecord.val().adminGpriority;   //curator made it active but do not show on home page till admin makes it active and sets priority
               
   

          let options = { month: 'short', day: 'numeric' };
           let formatteddate0  = new Date(createdDate);
          var formatteddate = (formatteddate0.toLocaleDateString("en-US", options));

               var galaxzObject = 
                    {"galaxzId":galaxzId,
                    "createdBy":createdBy,
                    "createdById":createdById,
                    "formatteddate":formatteddate,
                    "name":name,
                    "status":status,
                    "description":description,
                    "numberOfSolasys":numberOfSolasys,
                    "views":views,
                    "followers":followers,
                    "shares":shares,
                    "priority":priority};
                
                 galaxzArray.push(galaxzObject)
                  
            });
           //sorting ,  higher priority,  galaxz appears at top
            galaxzArray.sort((a, b) => {
            return b.priority - a.priority;
            
      });      
    
         counter = 1;  
        AddGalaxzCell(galaxzArray);
        
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

 for (i=0 ;i < galaxzArray.length; i++){
   
   
var galaxzdiv = document.createElement('div');
galaxzdiv.className = 'post-preview';
galaxzdiv.id = 'galaxzdiv'+counter;
document.getElementById('maindiv').append(galaxzdiv);

var toppara = document.createElement('p');
toppara.className = 'post-meta';
toppara.id = 'toppara'+counter;
document.getElementById('galaxzdiv'+counter).append(toppara);

var curatorlink = document.createElement('a');
curatorlink.setAttribute('href', "curatorprofile.html?cId="+ galaxzArray[i].createdById+"&cName="+galaxzArray[i].createdBy);
curatorlink.id = 'curatorlink'+counter;
document.getElementById('toppara'+counter).append(curatorlink);

var curatedBy = document.createElement('span');
curatedBy.id = 'curatedBy'+counter;
curatedBy.innerText = galaxzArray[i].createdBy;
document.getElementById('curatorlink'+counter).append(curatedBy);

var curatedDate = document.createElement('span');
curatedDate.id = 'curatedDate'+counter;
curatedDate.innerText = galaxzArray[i].formatteddate;
document.getElementById('toppara'+counter).append(curatedDate);

var titleDesc = document.createElement('a');
titleDesc.setAttribute('href', "solasys.html?gId="+ galaxzArray[i].galaxzId);
//titleDesc.setAttribute('onclick', "IncrementView(this.id)");
titleDesc.id = 'titleDesc'+counter;
titleDesc.value = galaxzArray[i].galaxzId;
document.getElementById('galaxzdiv'+counter).append(titleDesc);

var title = document.createElement('h2');
title.id = 'post-title'+counter;
title.className = 'post-title';
title.innerText = galaxzArray[i].name;
document.getElementById('titleDesc'+counter).append(title);

var postsubtitle = document.createElement('h3');
postsubtitle.id = 'post-subtitle'+counter;
postsubtitle.className = 'post-subtitle';
postsubtitle.innerText = galaxzArray[i].description;
document.getElementById('titleDesc'+counter).append(postsubtitle);

var br = document.createElement("br");
document.getElementById('galaxzdiv'+counter).append(br);

var bottompara = document.createElement('p');
bottompara.className = 'post-meta';
bottompara.id = 'bottompara'+counter;
document.getElementById('galaxzdiv'+counter).append(bottompara);

var solasysBtn = document.createElement('img');
solasysBtn.id = 'solasysBtn'+counter;
solasysBtn.className = 'img-bottompara';
solasysBtn.src = 'assets/noofsolasys.svg';
document.getElementById('bottompara'+counter).append(solasysBtn);

var solasysval = document.createElement('span');
solasysval.id = 'solasysval'+counter;
solasysval.innerText = galaxzArray[i].numberOfSolasys;
document.getElementById('bottompara'+counter).append(solasysval);

var viewsBtn = document.createElement('img');
viewsBtn.id = 'viewsBtn'+counter;
viewsBtn.className = 'img-bottompara';
viewsBtn.src = 'assets/views.svg';
document.getElementById('bottompara'+counter).append(viewsBtn);

var viewsval = document.createElement('span');
viewsval.id = 'viewsval'+counter;
viewsval.innerText = galaxzArray[i].views;
document.getElementById('bottompara'+counter).append(viewsval);

var followsBtn = document.createElement('img');
followsBtn.id = 'followsBtn'+counter;
followsBtn.className = 'img-bottompara';
followsBtn.value = galaxzArray[i].galaxzId;   
followsBtn.setAttribute('onclick', "IncrementFollows(this.id)");
followsBtn.src = 'assets/like.svg';
document.getElementById('bottompara'+counter).append(followsBtn);

var followsval = document.createElement('span');
followsval.id = 'followsval'+counter;
followsval.innerText = galaxzArray[i].followers;
document.getElementById('bottompara'+counter).append(followsval);

var sharesBtn = document.createElement('img');
sharesBtn.id = 'sharesBtn'+counter;
sharesBtn.value = galaxzArray[i].galaxzId;
sharesBtn.setAttribute('onclick', "IncrementShares(this.id)");
sharesBtn.className = 'img-bottompara';
sharesBtn.src = 'assets/share.svg';
document.getElementById('bottompara'+counter).append(sharesBtn);

var sharesval = document.createElement('span');
sharesval.id = 'sharesval'+counter;
sharesval.innerText = galaxzArray[i].shares;
document.getElementById('bottompara'+counter).append(sharesval);

var hr = document.createElement("hr");
hr.className='my-4';
hr.id = 'hr'+counter;
document.getElementById('galaxzdiv'+counter).append(hr);

++counter;

}

//remove the last hr only if there is data in the array
if (galaxzArray.length>0)
{
    //skip for the  galaxz where len is 1 and only remove hr for the last one 
   if(galaxzArray.length>1){ 
    let len = galaxzArray.length;
    document.getElementById('hr'+len).remove(); 
   }
   
}

else{
//if there is no data , something is fucked up
var galaxzdiv1 = document.createElement('div');
galaxzdiv1.className = 'post-preview';
galaxzdiv1.id = 'galaxzdiv1';
document.getElementById('maindiv').append(galaxzdiv1);

var title = document.createElement('h2');
title.id = 'post-title';
title.className = 'post-title';
title.innerText = "Oops! Something went wrong!";
document.getElementById('galaxzdiv1').append(title);

 //log error details to analytics
    
 analytics.logEvent('No Galaxz shown error', { name: 'fatal error'});
}

}

// //increment a view in DB when g clicked
// function IncrementView(id){
//     var clickedGalaxztag = document.getElementById(id);
//     const database = firebase.database();
//     database.ref('/galaxz/' +clickedGalaxztag.value).update({ 
//     views:firebase.database.ServerValue.increment(1)})
 
// }

//increment followers by 1 on the UI and DB
function IncrementFollows(id){
    
    document.getElementById(id).src = "assets/likefill.svg";

    let newid1 = id.substr(10);
    let newid = "followsval"+newid1;

    var like = document.getElementById(newid).innerText;
    addedlike = ++like;
    document.getElementById(newid).innerHTML = addedlike ;   
    
    var clickedGalaxztag = document.getElementById(id);
    const database = firebase.database();
    database.ref('/galaxz/' +clickedGalaxztag.value).update({ 
    followers:firebase.database.ServerValue.increment(1)})
}

//increment shares by 1 on the UI and DB and open sharing options
function IncrementShares(id){
    
    document.getElementById(id).src = "assets/sharefill.svg";
    var clickedGalaxztag = document.getElementById(id);
    
    //url to share
     var urltoshare = "https://galaxz.xyz/index.html?gId="+ clickedGalaxztag.value;

    //  //name of galaxz to share
    // let extractnumberfromid = id.substr(9);
    // let galaxznametag = "post-title"+extractnumberfromid;
    // var galaxzname = document.getElementById(galaxznametag).innerText;
    // var messagetoshare = galaxzname; 

   //show popup
   var showpopup = document.getElementById('modal-container-url');
   showpopup.classList.add('show');
   showpopup.style.display = "flex";

//    var urldisplay = document.getElementById('url');
//    urldisplay.innerText = urltoshare;
//    var galaxztoshare = document.getElementById('galaxztoshare');
//    galaxztoshare.innerText = messagetoshare;

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
     

     //increment shares by 1 on the UI and DB
    let newid1 = id.substr(9);
    let newid = "sharesval"+newid1;
    var shareit = document.getElementById(newid).innerText;
    addedshare = ++shareit;
    document.getElementById(newid).innerHTML = addedshare ;   

    const database = firebase.database();
    database.ref('/galaxz/' +clickedGalaxztag.value).update({ 
    shares:firebase.database.ServerValue.increment(1)})

    //log shared details to analytics
    
    analytics.logEvent('Galaxz Shared', { name: 'X?Shared'});

   
}



