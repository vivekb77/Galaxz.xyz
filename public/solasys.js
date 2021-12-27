
function GetSolasys(){

    var galaxzIdfromQ = new URLSearchParams(window.location.search);
    var galaxzId = galaxzIdfromQ.get('gId')


    const database = firebase.database();
    var  solasysArray = [];

    database.ref('/solasys').orderByChild('galaxzId')
    .equalTo(galaxzId)   // get galaxz which are created by logged in user
    .once("value",function(ALLRecords){
        ALLRecords.forEach(
            function(CurrentRecord) {
               
    var galaxzId = CurrentRecord.val().galaxzId;
    var solasysId = CurrentRecord.val().solasysId;
    var createdBy = CurrentRecord.val().createdBy;
    var createdDate = CurrentRecord.val().createdDate;
    var name = CurrentRecord.val().name;
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
                    "createdBy":createdBy,
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

var curatedBy = document.createElement('span');
curatedBy.id = 'curatedBy'+counter;
curatedBy.innerText = solasysArray[i].createdBy;
document.getElementById('toppara'+counter).append(curatedBy);

document.getElementById('curatedBy'+counter).appendChild( document.createTextNode( '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' ) );

var curatedDate = document.createElement('span');
curatedDate.id = 'curatedDate'+counter;
curatedDate.innerText = solasysArray[i].formatteddate;
document.getElementById('toppara'+counter).append(curatedDate);


var titleDesc = document.createElement('a');
titleDesc.setAttribute('href', "xanets.html?gId="+ solasysArray[i].galaxzId+ "&sId=" +solasysArray[i].solasysId);
titleDesc.id = 'titleDesc'+counter;
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
solasysBtn.src = 'assets/noofsolasys.svg';
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
sharesBtn.src = 'assets/share.svg';
document.getElementById('bottompara'+counter).append(sharesBtn);

//document.getElementById('sharesBtn'+counter).appendChild( document.createTextNode( '\u00A0\u00A0\u00A0' ) );


var sharesval = document.createElement('span');
sharesval.id = 'sharesval'+counter;
sharesval.innerText = solasysArray[i].shares;
document.getElementById('bottompara'+counter).append(sharesval);

var hr = document.createElement("hr");
hr.className='my-4';
document.getElementById('galaxzdiv'+counter).append(hr);

++counter;

}

}



