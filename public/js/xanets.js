
analytics.logEvent('Planets Page Viewed', {
    content_type: 'Text',
    content_id: 'P1245343771002',
    items: [{ name: 'x?Planetpageviewd' }]
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


    var solasysfromQ = new URLSearchParams(window.location.search);
     var solasysId = solasysfromQ.get('sId');
     var galaxzId = solasysfromQ.get('gId');
 
     
     //for google analytics to count how many navigates from S to G view
function countGoBackToSolasys(){
        analytics.logEvent('User Navigated from Planet to Solasys', { name: 'NavFromXtoS'});
     }

     var  articlesArray = [];

// display solasys details 
 
 GetSolasys();
 // display solasys details at the top

function GetSolasys(){


  const database = firebase.database();
  var  solasysArray = [];

  database.ref('/solasys').orderByChild('solasysId')
  .equalTo(solasysId).limitToLast(1)
  .once("value",function(ALLRecords){
      ALLRecords.forEach(
          function(CurrentRecord) {
      
  var name = CurrentRecord.val().name;
  var description = CurrentRecord.val().description;
  var status = CurrentRecord.val().status;

             var solasysObject = 
                  {
                  "name":name,
                  "description":description,
                  "status":status,
                  
                  };
              
               solasysArray.push(solasysObject)
               
                
          });
         // only the actice ones
         solasysArray = solasysArray.filter(function(filterByStatus) {
          return filterByStatus.status == "Active"; });

          if(solasysArray.length >0){
             // then Xanets if solasys is inactive show its inactive and do not show planets
             document.getElementById('XanetTitle').innerText = "PLANETS under SOLASYS - "+solasysArray[0].name; // set the title of page to solasys name
               AddSolasysCell(solasysArray);

               // then planets if the solasys is active
               GetXanets();  
          }
          if(solasysArray.length  === 0){

            //remove the placeholer first
            const placeholder1 = document.getElementById('placeholder-animation1');
            placeholder1.innerHTML ='';
            const placeholder2 = document.getElementById('placeholder-animation2');
            placeholder2.innerHTML ='';
            const placeholder3 = document.getElementById('placeholder-animation3');
            placeholder3.innerHTML ='';
            
            //if there the solasys is inactive , display go back to Galaxz view
              var galaxzdiv = document.createElement('div');
              galaxzdiv.className = 'post-preview';
              galaxzdiv.id = 'galaxzdiv';
              document.getElementById('maindiv').append(galaxzdiv);
              console.log("Inactive");

              var title = document.createElement('h2');
              title.id = 'post-title';
              //title.setAttribute('style',"color:#0085A1");
              title.innerText = "Oops! can't view PLANETS because this SOLASYS is made InActive by the curator, click the Rocket to go back and check out other SOLASYSes";
              document.getElementById('galaxzdiv').append(title);
              
              var rocketclick = document.createElement('a');
              rocketclick.setAttribute('href', "solasys.html?gId="+ galaxzId);
              rocketclick.id = 'rocketclick';
              document.getElementById('galaxzdiv').append(rocketclick);

              var rocket = document.createElement('img');
              rocket.id = 'rocket';
              rocket.className = 'rocketgoback';
              rocket.src = 'assets/rocket.svg';
              document.getElementById('rocketclick').append(rocket);

              

         }
      
   });

  }


 
function GetXanets(){

    const database = firebase.database();

    database.ref('/articles').orderByChild('solasysId')
    .equalTo(solasysId).limitToLast(30)
    .once("value",function(ALLRecords){
        ALLRecords.forEach(
            function(CurrentRecord) {
               
    var solasysId = CurrentRecord.val().solasysId;
    var articleId = CurrentRecord.val().articleId;
    var curatedBy = CurrentRecord.val().curatedBy;
    var createdById = CurrentRecord.val().createdById;
    var curatedDate = CurrentRecord.val().curatedDate;
    var name = CurrentRecord.val().name;
    var status = CurrentRecord.val().status;
    var description = CurrentRecord.val().description;
    var url = CurrentRecord.val().url;
    var views = CurrentRecord.val().views;
    var likes = CurrentRecord.val().likes;
    var shares = CurrentRecord.val().shares;
               
       
          var options = { month: 'short', day: 'numeric' };
           var formatteddate0  = new Date(curatedDate);
          var formatteddate = (formatteddate0.toLocaleDateString("en-US", options));
                 
               var articlesObject = 
                    {"solasysId":solasysId,
                    "articleId":articleId,
                    "curatedBy":curatedBy,
                    "createdById":createdById,
                    "formatteddate":formatteddate,
                    "name":name,
                    "status":status,
                    "description":description,
                    "url":url,
                    "views":views,
                    "likes":likes,
                    "shares":shares,
                    };
                
                    articlesArray.push(articlesObject)
                  
            });
           //sorting , new ones appear at the bottom to from a list or a thread 
           articlesArray = articlesArray.filter(function(filterByStatus) {
            return filterByStatus.status == "Active"; });
           //articlesArray.reverse();
          
            AddXanetCell(articlesArray);
            
        
     });

        
}


function AddXanetCell (articlesArray){
  
  //remove the placeholer first
  const placeholder1 = document.getElementById('placeholder-animation1');
  placeholder1.innerHTML ='';
  const placeholder2 = document.getElementById('placeholder-animation2');
  placeholder2.innerHTML ='';
  const placeholder3 = document.getElementById('placeholder-animation3');
  placeholder3.innerHTML ='';
  

 var counter = 0;  

 for (i=0 ;i < articlesArray.length; i++){
 
   
var galaxzdiv = document.createElement('div');
galaxzdiv.className = 'post-preview';
galaxzdiv.id = 'galaxzdiv'+counter;
document.getElementById('maindiv').append(galaxzdiv);

var toppara = document.createElement('p');
toppara.className = 'post-meta';
toppara.id = 'toppara'+counter;
document.getElementById('galaxzdiv'+counter).append(toppara);

var curatorlink = document.createElement('a');
curatorlink.setAttribute('href', "curatorprofile.html?cId="+ articlesArray[i].createdById+"&cName="+articlesArray[i].curatedBy);
curatorlink.id = 'curatorlink'+counter;
document.getElementById('toppara'+counter).append(curatorlink);

var curatedBy = document.createElement('span');
curatedBy.id = 'curatedBy'+counter;
curatedBy.innerText = articlesArray[i].curatedBy;
document.getElementById('curatorlink'+counter).append(curatedBy);

var curatedDate = document.createElement('span');
curatedDate.id = 'curatedDate'+counter;
curatedDate.innerText = articlesArray[i].formatteddate;
document.getElementById('toppara'+counter).append(curatedDate);

// only add href to a tag if there is url value in the array , using this for micro blow, lists QandAs feature
if (articlesArray[i].url == "") {

var titleDesc = document.createElement('a');
titleDesc.id = 'titleDesc'+counter;
document.getElementById('galaxzdiv'+counter).append(titleDesc);

var title = document.createElement('h2');
title.id = 'post-title'+counter;
title.className = 'post-title';
title.innerText = articlesArray[i].name;
document.getElementById('titleDesc'+counter).append(title);

var postsubtitle = document.createElement('h3');
postsubtitle.id = 'post-subtitle'+counter;
postsubtitle.className = 'post-subtitle';
postsubtitle.innerText = articlesArray[i].description;
document.getElementById('titleDesc'+counter).append(postsubtitle);

}  
//if url is present add a tag href attribute
else {

  var titleDesc = document.createElement('a');
titleDesc.setAttribute('href', articlesArray[i].url );
titleDesc.setAttribute('target', '_blank');
titleDesc.setAttribute('onclick', "IncrementView(this.id)");
titleDesc.value = articlesArray[i].articleId;
titleDesc.id = 'titleDesc'+counter;
document.getElementById('galaxzdiv'+counter).append(titleDesc);

var title = document.createElement('h2');
title.id = 'post-title'+counter;
title.className = 'post-title';
title.innerText = articlesArray[i].name;
document.getElementById('titleDesc'+counter).append(title);

var postsubtitle = document.createElement('h3');
postsubtitle.id = 'post-subtitle'+counter;
postsubtitle.className = 'post-subtitle';
postsubtitle.innerText = articlesArray[i].description;
document.getElementById('titleDesc'+counter).append(postsubtitle);

var posturl = document.createElement('h3');
posturl.id = 'post-url'+counter;
posturl.className = 'post-url';  
posturl.innerText = (articlesArray[i].url).substr(0,40) + "...";
posturl.setAttribute('style',"color:#0085A1");
posturl.setAttribute('rel',"noopener");
document.getElementById('titleDesc'+counter).append(posturl);
}

var br5 = document.createElement("br");
document.getElementById('galaxzdiv'+counter).append(br5);

var bottompara = document.createElement('p');
bottompara.className = 'post-meta';
bottompara.id = 'bottompara'+counter;
document.getElementById('galaxzdiv'+counter).append(bottompara);

// views removed on the UI

// var viewsBtn = document.createElement('img');
// viewsBtn.id = 'viewsBtn'+counter;
// viewsBtn.className = 'img-bottompara';
// viewsBtn.src = 'assets/views.svg';
// document.getElementById('bottompara'+counter).append(viewsBtn);

// var viewsval = document.createElement('span');
// viewsval.id = 'viewsval'+counter;
// viewsval.innerText = articlesArray[i].views;
// document.getElementById('bottompara'+counter).append(viewsval);


var followsBtn = document.createElement('img');
followsBtn.id = 'followsBtn'+counter;
followsBtn.className = 'img-bottompara';
followsBtn.value = articlesArray[i].articleId;   
followsBtn.setAttribute('onclick', "IncrementFollows(this.id)");
followsBtn.src = 'assets/like.svg';
document.getElementById('bottompara'+counter).append(followsBtn);


var followsval = document.createElement('span');
followsval.id = 'followsval'+counter;
followsval.innerText = articlesArray[i].likes;
document.getElementById('bottompara'+counter).append(followsval);

var sharesBtn = document.createElement('img');
sharesBtn.id = 'sharesBtn'+counter;
sharesBtn.className = 'img-bottompara';
sharesBtn.value = articlesArray[i].articleId;
sharesBtn.setAttribute('onclick', "IncrementShares(this.id)");
sharesBtn.src = 'assets/share.svg';
document.getElementById('bottompara'+counter).append(sharesBtn);


var sharesval = document.createElement('span');
sharesval.id = 'sharesval'+counter;
sharesval.innerText = articlesArray[i].shares;
document.getElementById('bottompara'+counter).append(sharesval);

var hr = document.createElement("hr");
hr.className='my-4';
hr.id = 'hr'+counter;
document.getElementById('galaxzdiv'+counter).append(hr);

++counter;

}

//remove the last hr only if there is data in the array
if (articlesArray.length>0)
{
    let len = articlesArray.length - 1;
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
title.innerText = "Oops! this SOLASYS got no PLANETS, click the Rocket to go back and check out other SOLASYS";
document.getElementById('galaxzdiv').append(title);

var rocketclick = document.createElement('a');
rocketclick.setAttribute('href', "solasys.html?gId="+ galaxzId);
rocketclick.id = 'rocketclick';
document.getElementById('galaxzdiv').append(rocketclick);

var rocket = document.createElement('img');
rocket.id = 'rocket';
rocket.className = 'rocketgoback';
rocket.src = 'assets/rocket.svg';
document.getElementById('rocketclick').append(rocket);

//analytics
analytics.logEvent('No Planet shown error', { name: 'fatal error'});


}

}


//increment views in DB when clicked
function IncrementView(id){
    var clickedArticletag = document.getElementById(id);
    const database = firebase.database();
    database.ref('/articles/' +clickedArticletag.value).update({ 
    views:firebase.database.ServerValue.increment(1)})

    //google analytics add event 
    analytics.logEvent('Article Read', { name: 'Article Read'});
 
}

//increment followers by 1 on the UI and DB
function IncrementFollows(id){
    
    document.getElementById(id).src = "assets/likefill.svg";

    let newid1 = id.substr(10);
    let newid = "followsval"+newid1;

    var like = document.getElementById(newid).innerText;
    addedlike = ++like;
    document.getElementById(newid).innerHTML = addedlike ;   
    
    var clickedArticletag = document.getElementById(id);
    const database = firebase.database();
    database.ref('/articles/' +clickedArticletag.value).update({ 
    likes:firebase.database.ServerValue.increment(1)})
}

//increment shares by 1 on the UI and DB and open sharing options
function IncrementShares(id){
  
    document.getElementById(id).src = "assets/sharefill.svg";
    var clickedArticletag = document.getElementById(id);
    
    //url to share
     var urltoshare = "planets.html?gId="+galaxzId+"&sId="+solasysId;  // sharing the gId solasys.html?gId=-MrKGzWbTPKEoDRYmopf
    // console.log(urltoshare);

     //name of galaxz to share
    let extractnumberfromid = id.substr(9);
    let articlenametag = "post-title"+extractnumberfromid;
    var articlename = document.getElementById(articlenametag).innerText;
    var messagetoshare = "Hey! check out this Article about "+articlename;  // find a nice message here to add
    //console.log(messagetoshare);

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
    database.ref('/articles/' +clickedArticletag.value).update({ 
    shares:firebase.database.ServerValue.increment(1)})
 
    //log shared details to analytics
    
 analytics.logEvent('Planet Shared', { name: 'X?Shared'});


   
}







function AddSolasysCell (solasysArray){

var solasystitle = document.createElement('h5');
solasystitle.setAttribute('style',"color:#0085A1");
solasystitle.innerText = "SOLASYS";
document.getElementById('maindiv').append(solasystitle);

       var counter = 0;  

 for (i=0 ;i < solasysArray.length; i++){
   
   
var solasysdiv = document.createElement('div');
solasysdiv.className = 'post-preview';
solasysdiv.id = 'solasysdiv'+counter;
document.getElementById('maindiv').append(solasysdiv);


var stitleDesc = document.createElement('a');
stitleDesc.id = 'stitleDesc'+counter;
document.getElementById('solasysdiv'+counter).append(stitleDesc);

var stitle = document.createElement('h2');
stitle.id = 'stitle'+counter;
stitle.className = 'post-title';
stitle.innerText = solasysArray[i].name;
document.getElementById('stitleDesc'+counter).append(stitle);

var spostsubtitle = document.createElement('h3');
spostsubtitle.id = 'spostsubtitle'+counter;
spostsubtitle.className = 'post-subtitle';
spostsubtitle.innerText = solasysArray[i].description;
document.getElementById('stitleDesc'+counter).append(spostsubtitle);

//go back to solasys button 
var div4534 = document.createElement("div");
div4534.className = 'rocketshipgobackahref';
div4534.id = 'div4534';
document.getElementById('maindiv').append(div4534);

var gobacktoS = document.createElement('a');
gobacktoS.setAttribute('href', "solasys.html?gId="+ galaxzId);
gobacktoS.setAttribute('onclick', "countGoBackToSolasys()");
gobacktoS.id = 'gobacktoS';
document.getElementById('div4534').append(gobacktoS);

var rocketship = document.createElement('img');
rocketship.id = 'rocketship';
rocketship.className = 'rocketshipgoback';
rocketship.src = 'assets/rocketship.png';
document.getElementById('gobacktoS').append(rocketship);


var hr31 = document.createElement("hr");
hr31.className='my-4';
document.getElementById('maindiv').append(hr31);

var xanettitle = document.createElement('h5');
xanettitle.setAttribute('style',"color:#0085A1");
xanettitle.innerText = "PLANETS";
document.getElementById('maindiv').append(xanettitle);


var br34 = document.createElement("br");
br34.className='my-4';
document.getElementById('maindiv').append(br34);



++counter;

}
}

IncrementSolasysView();
 //increment views for solasys in DB when planet page is viewed
function IncrementSolasysView(){
  //view counting need to move to xanet js to count views from direct link visits rather than just clicks on solasys here
  //tried but if sid is wrong in the Qstring it add a new solasys
    const database = firebase.database();
    database.ref('/solasys/' +solasysId).update({ 
    views:firebase.database.ServerValue.increment(1)})
 
}