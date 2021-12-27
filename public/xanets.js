
function GetXanets(){

    var solasysfromQ = new URLSearchParams(window.location.search);
   // var galaxzId = solasysfromQ.get('gId');
    var solasysId = solasysfromQ.get('sId');


    const database = firebase.database();
    var  articlesArray = [];

    database.ref('/articles').orderByChild('solasysId')
    .equalTo(solasysId)   // get galaxz which are created by logged in user
    .once("value",function(ALLRecords){
        ALLRecords.forEach(
            function(CurrentRecord) {
               
    var solasysId = CurrentRecord.val().solasysId;
    var articleId = CurrentRecord.val().articleId;
    var curatedBy = CurrentRecord.val().curatedBy;
    var curatedDate = CurrentRecord.val().curatedDate;
    var name = CurrentRecord.val().name;
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
                    "formatteddate":formatteddate,
                    "name":name,
                    "description":description,
                    "url":url,
                    "views":views,
                    "likes":likes,
                    "shares":shares,
                    };
                
                    articlesArray.push(articlesObject)
                  
            });
           //sorting , new solasys appear at the top
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

var curatedBy = document.createElement('span');
curatedBy.id = 'curatedBy'+counter;
curatedBy.innerText = articlesArray[i].curatedBy;
document.getElementById('toppara'+counter).append(curatedBy);

document.getElementById('curatedBy'+counter).appendChild( document.createTextNode( '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' ) );

var curatedDate = document.createElement('span');
curatedDate.id = 'curatedDate'+counter;
curatedDate.innerText = articlesArray[i].formatteddate;
document.getElementById('toppara'+counter).append(curatedDate);


var titleDesc = document.createElement('a');
titleDesc.setAttribute('href', articlesArray[i].url );
titleDesc.setAttribute('target', '_blank');
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
sharesBtn.src = 'assets/share.svg';
document.getElementById('bottompara'+counter).append(sharesBtn);

//document.getElementById('sharesBtn'+counter).appendChild( document.createTextNode( '\u00A0\u00A0\u00A0' ) );


var sharesval = document.createElement('span');
sharesval.id = 'sharesval'+counter;
sharesval.innerText = articlesArray[i].shares;
document.getElementById('bottompara'+counter).append(sharesval);

var hr = document.createElement("hr");
hr.className='my-4';
document.getElementById('galaxzdiv'+counter).append(hr);

++counter;

}

}



