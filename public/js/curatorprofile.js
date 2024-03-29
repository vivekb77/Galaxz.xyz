
analytics.logEvent('Curator Profile Page Viewed', {
    content_type: 'Text',
    content_id: 'P1245343771003',
    items: [{ name: 'x?Curatorprofilepageviewd' }]
  });

//only sign in ano if no user 
checkLogin();
function checkLogin() {
    firebase.auth().onAuthStateChanged((user)=>{
        if(!user){
            firebase.auth().signInAnonymously();
            //console.log(user);
        }
    })
}

    var curatorIdfromQ = new URLSearchParams(window.location.search);
    var curatorId = curatorIdfromQ.get('cId');
    var curatorName = curatorIdfromQ.get('cName');
    document.getElementById('CuratorTitle').innerText = "GALAXZ - "+curatorName; // set the title of page to curator name
    var cname = document.getElementById('curatorname');
    cname.innerText = curatorName;


var  galaxzArray = [];

function GetCuratorGalaxzies(){

    // pull all galaxzies created by curator 
    
    const database = firebase.database();
    
    database.ref('/galaxz').orderByChild("createdById")
    .equalTo(curatorId).limitToLast(10)  
    .once("value",function(ALLRecords){
        ALLRecords.forEach(
            function(CurrentRecord) {
               
    var galaxzId = CurrentRecord.val().galaxzId;
    var createdBy = CurrentRecord.val().createdBy;
    var createdById = CurrentRecord.val().createdById;
    var createdDate = CurrentRecord.val().createdDate;
    var status = CurrentRecord.val().status;
    var name = CurrentRecord.val().name;
    var description = CurrentRecord.val().description;
    var numberOfSolasys = CurrentRecord.val().numberOfSolasys;
    var views = CurrentRecord.val().views;
    var followers = CurrentRecord.val().followers;
    var shares = CurrentRecord.val().shares;
    var priority = CurrentRecord.val().priority;
    
          let options = { month: 'short', day: 'numeric' };
           let formatteddate0  = new Date(createdDate);
          var formatteddate = (formatteddate0.toLocaleDateString("en-US", options));

               var galaxzObject = 
                    {"galaxzId":galaxzId,
                    "createdBy":createdBy,
                    "createdById":createdById,
                    "formatteddate":formatteddate,
                    "status":status,
                    "name":name,
                    "description":description,
                    "numberOfSolasys":numberOfSolasys,
                    "views":views,
                    "followers":followers,
                    "shares":shares,
                    "priority":priority};
                
                 galaxzArray.push(galaxzObject)
                  
            });
           // filter the inactive ones
            galaxzArray = galaxzArray.filter(function(filterByStatus) {
            return filterByStatus.status == "Active"; });
        
           //sorting , the higher the priority, the above galaxz appears
           galaxzArray.sort((a, b) => {
            return b.priority - a.priority;
           
       });
        
        
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
      
   
    var counter = 0;  

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
//curatorlink.setAttribute('href', "curatorprofile.html?cId="+ galaxzArray[i].createdById+"&cName="+galaxzArray[i].createdBy);
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

document.getElementById('viewsBtn'+counter).appendChild( document.createTextNode( '\u00A0\u00A0\u00A0' ) );

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
    let len = galaxzArray.length - 1;
    document.getElementById('hr'+len).remove();
   
}
else{
//if there is no data , something is fucked up
var galaxzdiv = document.createElement('div');
galaxzdiv.className = 'post-preview';
galaxzdiv.id = 'galaxzdiv';
document.getElementById('maindiv').append(galaxzdiv);

var title = document.createElement('h2');
title.id = 'post-title';
title.className = 'post-title';
title.innerText = "No Galaxzies to show!";
document.getElementById('galaxzdiv').append(title);

var sdfsdfsdf = document.createElement('br');
document.getElementById('galaxzdiv').append(sdfsdfsdf);

analytics.logEvent('No Galaxz shown on curator profile page error', { name: 'fatal error'});

}

//go back to galaxz button at the bottom
var div4534 = document.createElement("div");
div4534.className = 'rocketshipgobackahref';
div4534.id = 'div4534';
document.getElementById('maindiv').append(div4534);

var gobacktoG = document.createElement('a');
gobacktoG.setAttribute('href', "index.html");
gobacktoG.setAttribute('onclick', "countGoBackToGalaxz()");
gobacktoG.id = 'gobacktoG';
document.getElementById('div4534').append(gobacktoG);

var rocketship = document.createElement('img');
rocketship.id = 'rocketship';
rocketship.className = 'rocketshipgoback';
rocketship.src = 'assets/rocketship.png';
document.getElementById('gobacktoG').append(rocketship);
var br89999 = document.createElement('br');
document.getElementById('maindiv').append(br89999);

}

//increment views in DB when clicked
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
     //console.log(urltoshare);

     //name of galaxz to share
    // let extractnumberfromid = id.substr(9);
    // let galaxznametag = "post-title"+extractnumberfromid;
    // var galaxzname = document.getElementById(galaxznametag).innerText;
    // var messagetoshare = "Hey! check out this Galaxz about "+galaxzname;  // find a nice message here to add
    // //console.log(messagetoshare);

//show popup
var showpopup = document.getElementById('modal-container-url');
showpopup.classList.add('show');
showpopup.style.display = "flex";

// var urldisplay = document.getElementById('url');
// urldisplay.innerText = urltoshare;
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
    
      analytics.logEvent('Galaxz from Curator Profile is shared', { name: 'X?Shared'});

}



     //for google analytics to count how many navigates from C profile to G view
     function countGoBackToGalaxz(){
      analytics.logEvent('User Navigated from Curator Profile to Galaxz', { name: 'NavFromCPtoG'});
   }