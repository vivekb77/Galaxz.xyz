
firebase.auth().signInAnonymously()
.then(() => {

})
.catch((error) => {
});
    var solasysfromQ = new URLSearchParams(window.location.search);
     var solasysId = solasysfromQ.get('sId');
     var galaxzId = solasysfromQ.get('gId');
 
     var gobacktoS = document.getElementById('gobacktoS');
     gobacktoS.setAttribute('href', "solasys.html?gId="+ galaxzId);
     var br1 = document.createElement("br");
     document.getElementById('gobacktoS').append(br1);
     var rocketship = document.createElement('img');
    rocketship.id = 'rocketship';
    rocketship.className = 'rocketshipgoback';
    rocketship.src = 'assets/rocketship.svg';
     document.getElementById('gobacktoS').append(rocketship);


     var  articlesArray = [];

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
               
               
         // var formatteddate = new Date(createdDate).toDateString();

          var options = { month: 'short', day: 'numeric' };
           var formatteddate0  = new Date(curatedDate);
          var formatteddate = (formatteddate0.toLocaleDateString("en-US", options));

                //create an array , sort on priority
                
                 
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
           //sorting , new articles appear at the top
           articlesArray = articlesArray.filter(function(filterByStatus) {
            return filterByStatus.status == "Active"; });
           articlesArray.reverse();
            AddXanetCell(articlesArray);
        
     });

        
}


function AddXanetCell (articlesArray){
   
    var counter = 0;  // to create unique ids for the tags for each galaxz

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

document.getElementById('curatedBy'+counter).appendChild( document.createTextNode( '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' ) );

var curatedDate = document.createElement('span');
curatedDate.id = 'curatedDate'+counter;
curatedDate.innerText = articlesArray[i].formatteddate;
document.getElementById('toppara'+counter).append(curatedDate);


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
posturl.className = 'post-subtitle';
posturl.innerText = articlesArray[i].url;
document.getElementById('titleDesc'+counter).append(posturl);

var br = document.createElement("br");
document.getElementById('galaxzdiv'+counter).append(br);

var bottompara = document.createElement('p');
bottompara.className = 'post-meta';
bottompara.id = 'bottompara'+counter;
document.getElementById('galaxzdiv'+counter).append(bottompara);



var viewsBtn = document.createElement('img');
viewsBtn.id = 'viewsBtn'+counter;
viewsBtn.className = 'img-bottompara';
viewsBtn.src = 'assets/views.svg';
document.getElementById('bottompara'+counter).append(viewsBtn);

//document.getElementById('viewsBtn'+counter).appendChild( document.createTextNode( '\u00A0\u00A0\u00A0' ) );

var viewsval = document.createElement('span');
viewsval.id = 'viewsval'+counter;
viewsval.innerText = articlesArray[i].views;
document.getElementById('bottompara'+counter).append(viewsval);

document.getElementById('viewsval'+counter).appendChild( document.createTextNode( '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' ) );


var followsBtn = document.createElement('img');
followsBtn.id = 'followsBtn'+counter;
followsBtn.className = 'img-bottompara';
followsBtn.value = articlesArray[i].articleId;   
followsBtn.setAttribute('onclick', "IncrementFollows(this.id)");
followsBtn.src = 'assets/like.svg';
document.getElementById('bottompara'+counter).append(followsBtn);

//document.getElementById('followsBtn'+counter).appendChild( document.createTextNode( '\u00A0\u00A0\u00A0' ) );


var followsval = document.createElement('span');
followsval.id = 'followsval'+counter;
followsval.innerText = articlesArray[i].likes;
document.getElementById('bottompara'+counter).append(followsval);

document.getElementById('followsval'+counter).appendChild( document.createTextNode( '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' ) );

var sharesBtn = document.createElement('img');
sharesBtn.id = 'sharesBtn'+counter;
sharesBtn.className = 'img-bottompara';
sharesBtn.value = articlesArray[i].articleId;
sharesBtn.setAttribute('onclick', "IncrementShares(this.id)");
sharesBtn.src = 'assets/share.svg';
document.getElementById('bottompara'+counter).append(sharesBtn);

//document.getElementById('sharesBtn'+counter).appendChild( document.createTextNode( '\u00A0\u00A0\u00A0' ) );


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
title.className = 'post-title';
title.innerText = "Oops! this SOLASYS is uninhabitable, click the Rocket to go back and check out other SOLASYS";
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

}


//increment views in DB when clicked
function IncrementView(id){
    var clickedArticletag = document.getElementById(id);
    const database = firebase.database();
    database.ref('/articles/' +clickedArticletag.value).update({ 
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
     var urltoshare = "xanets.html?gId="+galaxzId+"&sId="+solasysId;  // sharing the gId solasys.html?gId=-MrKGzWbTPKEoDRYmopf
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
 //close popup
   var  closepopup = document.getElementById('closepopup');
   closepopup.addEventListener('click',()=>{
     showpopup.classList.remove('show');
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

   
}
