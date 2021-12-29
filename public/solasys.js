
firebase.auth().signInAnonymously()
.then(() => {

})
.catch((error) => {
});

    var galaxzIdfromQ = new URLSearchParams(window.location.search);
    var galaxzId = galaxzIdfromQ.get('gId')

    var gobacktoG = document.getElementById('gobacktoG');
    gobacktoG.setAttribute('href', "index.html");
    var br1 = document.createElement("br");
     document.getElementById('gobacktoG').append(br1);
     var rocketship = document.createElement('img');
    rocketship.id = 'rocketship';
    rocketship.className = 'rocketshipgoback';
    rocketship.src = 'assets/rocketship.svg';
     document.getElementById('gobacktoG').append(rocketship);
    

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
               
               
         // var formatteddate = new Date(createdDate).toDateString();

          var options = { month: 'short', day: 'numeric' };
           var formatteddate0  = new Date(createdDate);
          var formatteddate = (formatteddate0.toLocaleDateString("en-US", options));

                //create an array , sort on priority
                
                 
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
           //sorting , new solasys appear at the top
           solasysArray = solasysArray.filter(function(filterByStatus) {
            return filterByStatus.status == "Active"; });
            solasysArray.reverse();
            AddSolasysCell(solasysArray);
        
     });

        
}


function AddSolasysCell (solasysArray){
   
    var counter = 0;  // to create unique ids for the tags for each galaxz

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

document.getElementById('curatedBy'+counter).appendChild( document.createTextNode( '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' ) );

var curatedDate = document.createElement('span');
curatedDate.id = 'curatedDate'+counter;
curatedDate.innerText = solasysArray[i].formatteddate;
document.getElementById('toppara'+counter).append(curatedDate);


var titleDesc = document.createElement('a');
titleDesc.setAttribute('href', "xanets.html?gId="+ solasysArray[i].galaxzId+ "&sId=" +solasysArray[i].solasysId);
titleDesc.id = 'titleDesc'+counter;
titleDesc.setAttribute('onclick', "IncrementView(this.id)");
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

//document.getElementById('solasysBtn'+counter).appendChild( document.createTextNode( '\u00A0\u00A0\u00A0' ) );


var solasysval = document.createElement('span');
solasysval.id = 'solasysval'+counter;
solasysval.innerText = solasysArray[i].numberOfArticles;
document.getElementById('bottompara'+counter).append(solasysval);

document.getElementById('solasysval'+counter).appendChild( document.createTextNode( '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' ) );

var viewsBtn = document.createElement('img');
viewsBtn.id = 'viewsBtn'+counter;
viewsBtn.className = 'img-bottompara';
viewsBtn.src = 'assets/views.svg';
document.getElementById('bottompara'+counter).append(viewsBtn);

//document.getElementById('viewsBtn'+counter).appendChild( document.createTextNode( '\u00A0\u00A0\u00A0' ) );

var viewsval = document.createElement('span');
viewsval.id = 'viewsval'+counter;
viewsval.innerText = solasysArray[i].views;
document.getElementById('bottompara'+counter).append(viewsval);

document.getElementById('viewsval'+counter).appendChild( document.createTextNode( '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' ) );


var followsBtn = document.createElement('img');
followsBtn.id = 'followsBtn'+counter;
followsBtn.className = 'img-bottompara';
followsBtn.value = solasysArray[i].solasysId;   
followsBtn.setAttribute('onclick', "IncrementFollows(this.id)");
followsBtn.src = 'assets/like.svg';
document.getElementById('bottompara'+counter).append(followsBtn);

//document.getElementById('followsBtn'+counter).appendChild( document.createTextNode( '\u00A0\u00A0\u00A0' ) );


var followsval = document.createElement('span');
followsval.id = 'followsval'+counter;
followsval.innerText = solasysArray[i].followers;
document.getElementById('bottompara'+counter).append(followsval);

document.getElementById('followsval'+counter).appendChild( document.createTextNode( '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' ) );

var sharesBtn = document.createElement('img');
sharesBtn.id = 'sharesBtn'+counter;
sharesBtn.className = 'img-bottompara';
sharesBtn.value = solasysArray[i].solasysId;
sharesBtn.setAttribute('onclick', "IncrementShares(this.id)");
sharesBtn.src = 'assets/share.svg';
document.getElementById('bottompara'+counter).append(sharesBtn);

//document.getElementById('sharesBtn'+counter).appendChild( document.createTextNode( '\u00A0\u00A0\u00A0' ) );


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
title.className = 'post-title';
title.innerText = "Oops! this GALAXZ is inhabitable, click the Rocket to go back and check out other GALAXZies";
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

}

}


//increment views in DB when clicked
function IncrementView(id){
    var clickedSolasystag = document.getElementById(id);
    const database = firebase.database();
    database.ref('/solasys/' +clickedSolasystag.value).update({ 
    views:firebase.database.ServerValue.increment(1)})
 
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

     //name of galaxz to share
    let extractnumberfromid = id.substr(9);
    let solasysnametag = "post-title"+extractnumberfromid;
    var solasysname = document.getElementById(solasysnametag).innerText;
    var messagetoshare = "Hey! check out this Solasys about "+solasysname;  // find a nice message here to add
   // console.log(messagetoshare);

     //increment shares by 1 on the UI and DB
    let newid1 = id.substr(9);
    let newid = "sharesval"+newid1;
    var shareit = document.getElementById(newid).innerText;
    addedshare = ++shareit;
    document.getElementById(newid).innerHTML = addedshare ;   

    const database = firebase.database();
    database.ref('/solasys/' +clickedSolasystag.value).update({ 
    shares:firebase.database.ServerValue.increment(1)})

   
}