
analytics.logEvent('Solasys Page Viewed', {
    content_type: 'Text',
    content_id: 'P1001',
    items: [{ name: 'x?Solasyspageviewd' }]
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
 
    var galaxzIdfromQ = new URLSearchParams(window.location.search);
    var galaxzId = galaxzIdfromQ.get('gId')
    var solasysId = galaxzIdfromQ.get('sId');

    //for google analytics to count how many navigates from solasys to Galaxz view
     function countGoBackToGalaxz(){
        analytics.logEvent('User Navigated from Solasys to Galaxz', { name: 'NavFromStoG'});
     }

// display galaxz details first
GetGalaxz();
// then solasys
GetSolasys();
function GetSolasys(){


    const database = firebase.database();
    var  solasysArray = [];

    database.ref('/solasys').orderByChild('galaxzId')
    .equalTo(galaxzId).limitToLast(15)
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
           //sorting , new solasys appear at the bottom
           solasysArray = solasysArray.filter(function(filterByStatus) {
            return filterByStatus.status == "Active"; });
            //solasysArray.reverse();
            AddSolasysCell(solasysArray);
        
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
    
    var counter = 0;  

 for (i=0 ;i < solasysArray.length; i++){
   
   
var galaxzdiv = document.createElement('div');
galaxzdiv.className = 'post-preview';
galaxzdiv.id = 'galaxzdiv'+counter;
document.getElementById('maindiv').append(galaxzdiv);

var toppara = document.createElement('p');
toppara.className = 'post-meta';
toppara.id = 'toppara'+counter;
document.getElementById('galaxzdiv'+counter).append(toppara);

var curatorlink = document.createElement('a');
curatorlink.setAttribute('href', "curatorprofile.html?cId="+ solasysArray[i].createdById+"&cName="+solasysArray[i].createdBy);
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
titleDesc.setAttribute('href', "planets.html?gId="+ solasysArray[i].galaxzId+ "&sId=" +solasysArray[i].solasysId);
titleDesc.id = 'titleDesc'+counter;
//titleDesc.setAttribute('onclick', "IncrementView(this.id)");
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

var solasysBtn = document.createElement('img');
solasysBtn.id = 'solasysBtn'+counter;
solasysBtn.className = 'img-bottompara';
solasysBtn.src = 'assets/noofarticles.svg';
document.getElementById('bottompara'+counter).append(solasysBtn);

var solasysval = document.createElement('span');
solasysval.id = 'solasysval'+counter;
solasysval.innerText = solasysArray[i].numberOfArticles;
document.getElementById('bottompara'+counter).append(solasysval);

var viewsBtn = document.createElement('img');
viewsBtn.id = 'viewsBtn'+counter;
viewsBtn.className = 'img-bottompara';
viewsBtn.src = 'assets/views.svg';
document.getElementById('bottompara'+counter).append(viewsBtn);

var viewsval = document.createElement('span');
viewsval.id = 'viewsval'+counter;
viewsval.innerText = solasysArray[i].views;
document.getElementById('bottompara'+counter).append(viewsval);

var followsBtn = document.createElement('img');
followsBtn.id = 'followsBtn'+counter;
followsBtn.className = 'img-bottompara';
followsBtn.value = solasysArray[i].solasysId;   
followsBtn.setAttribute('onclick', "IncrementFollows(this.id)");
followsBtn.src = 'assets/like.svg';
document.getElementById('bottompara'+counter).append(followsBtn);

var followsval = document.createElement('span');
followsval.id = 'followsval'+counter;
followsval.innerText = solasysArray[i].followers;
document.getElementById('bottompara'+counter).append(followsval);

var sharesBtn = document.createElement('img');
sharesBtn.id = 'sharesBtn'+counter;
sharesBtn.className = 'img-bottompara';
sharesBtn.value = solasysArray[i].solasysId;
sharesBtn.setAttribute('onclick', "IncrementShares(this.id)");
sharesBtn.src = 'assets/share.svg';
document.getElementById('bottompara'+counter).append(sharesBtn);

var sharesval = document.createElement('span');
sharesval.id = 'sharesval'+counter;
sharesval.innerText = solasysArray[i].shares;
document.getElementById('bottompara'+counter).append(sharesval);

var hr = document.createElement("hr");
hr.className='my-4';
hr.id = 'hr'+counter;
document.getElementById('galaxzdiv'+counter).append(hr);

++counter;

}

//remove the last hr only if there is data in the array
if (solasysArray.length>0)
{
let len = solasysArray.length - 1;
document.getElementById('hr'+len).remove();
}
else
{
//if there is no data , display go back to Galaxz view
var galaxzdiv = document.createElement('div');
galaxzdiv.className = 'post-preview';
galaxzdiv.id = 'galaxzdiv';
document.getElementById('maindiv').append(galaxzdiv);

var title = document.createElement('h2');
title.id = 'post-title';
//title.setAttribute('style',"color:#0085A1");
title.innerText = "Oops! this GALAXZ got no SOLASYS, click the Rocket to go back and check out other GALAXZies";
document.getElementById('galaxzdiv').append(title);

var rocketclick = document.createElement('a');
rocketclick.setAttribute('href', "index.html");
rocketclick.id = 'rocketclick';
document.getElementById('galaxzdiv').append(rocketclick);

var rocket = document.createElement('img');
rocket.id = 'rocket';
rocket.className = 'rocketgoback';
rocket.src = 'assets/rocket.svg';
document.getElementById('rocketclick').append(rocket);

//analytics
analytics.logEvent('No Solasys shown error', { name: 'fatal error'});


}

}


//increment followers by 1 on the UI and DB
function IncrementFollows(id){
    
    document.getElementById(id).src = "assets/likefill.svg";

    let newid1 = id.substr(10);
    let newid = "followsval"+newid1;

    var like = document.getElementById(newid).innerText;
    addedlike = ++like;
    document.getElementById(newid).innerHTML = addedlike ;   
    
    var clickedSolasystag = document.getElementById(id);
    const database = firebase.database();
    database.ref('/solasys/' +clickedSolasystag.value).update({ 
    followers:firebase.database.ServerValue.increment(1)})
}



//increment shares by 1 on the UI and DB and open sharing options
function IncrementShares(id){
  
    document.getElementById(id).src = "assets/sharefill.svg";
    var clickedSolasystag = document.getElementById(id);
    
    //url to share
     var urltoshare = "solasys.html?gId="+galaxzId;  // sharing the gId solasys.html?gId=-MrKGzWbTPKEoDRYmopf
    // console.log(urltoshare);

     //name of solasys to share
    let extractnumberfromid = id.substr(9);
    let solasysnametag = "post-title"+extractnumberfromid;
    var solasysname = document.getElementById(solasysnametag).innerText;
    var messagetoshare = "Hey! check out this Solasys about "+solasysname;  // find a nice message here to add
   // console.log(messagetoshare);

   //show po up
   var showpopup = document.getElementById('modal-container');
      showpopup.classList.add('show');
      showpopup.style.display = "flex";
    //close popup
      var  closepopup = document.getElementById('closepopup');
      closepopup.addEventListener('click',()=>{
        showpopup.classList.remove('show');
        showpopup.style.display = "none";
      });

     //increment shares by 1 on the UI and DB
    let newid1 = id.substr(9);
    let newid = "sharesval"+newid1;
    var shareit = document.getElementById(newid).innerText;
    addedshare = ++shareit;
    document.getElementById(newid).innerHTML = addedshare ;   

    const database = firebase.database();
    database.ref('/solasys/' +clickedSolasystag.value).update({ 
    shares:firebase.database.ServerValue.increment(1)})

   //log shared details to analytics
    
   analytics.logEvent('Solasys Shared', { name: 'X?Shared'});

}




// display galaxz details at the top

function GetGalaxz(){


  const database = firebase.database();
  var  galaxzArray = [];

  database.ref('/galaxz').orderByChild('galaxzId')
  .equalTo(galaxzId).limitToLast(1)
  .once("value",function(ALLRecords){
      ALLRecords.forEach(
          function(CurrentRecord) {
      
  var name = CurrentRecord.val().name;
  var description = CurrentRecord.val().description;
  var status = CurrentRecord.val().status;

             var galaxzObject = 
                  {
                  "name":name,
                  "description":description,
                  "status":status,
                  };
              
                  galaxzArray.push(galaxzObject)
             
          });
         // only the active ones
         galaxzArray = galaxzArray.filter(function(filterByStatus) {
          return filterByStatus.status == "Active"; });
          document.getElementById('SolasysTitle').innerText = "GALAXZ - "+galaxzArray[0].name; // set the title of page to galaxz name
          AddGalaxzCell(galaxzArray);

      
   });

  }



function AddGalaxzCell (galaxzArray){

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
gobacktoG.setAttribute('href', "index.html?gId="+galaxzId);
gobacktoG.setAttribute('onclick', "countGoBackToGalaxz()");
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

var br33334 = document.createElement("br");
br33334.className='my-4';
document.getElementById('maindiv').append(br33334);

++counter;





}

  }

IncrementGalaxzView();
  //increment a view on galaxz in DB when solasys page is viewed
function IncrementGalaxzView(){
  const database = firebase.database();
  database.ref('/galaxz/' +galaxzId).update({ 
  views:firebase.database.ServerValue.increment(1)})

}