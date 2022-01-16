function logout(){
    firebase.auth().signOut()
    location.replace("login.html") //  send to home page to login after logout
}

//get curator details 

var curatorEmail;
var curatorId ;
var curatorName;

checkLogin();
function checkLogin() {
    firebase.auth().onAuthStateChanged((user)=>{
        if(!user){
            location.replace("login.html") // if user is not logged in , send to home page to login
        }else{
            document.getElementById("curatoremail").innerHTML = user.email  // if user is logged in , show my galaxz page
            curatorEmail = user.email;
            
            getCuratorDetails();
            
        }
    })
}



function getCuratorDetails(){
    const database = firebase.database();
    
    database.ref('/curators').orderByChild('curatorEmail')
    .equalTo(curatorEmail).limitToFirst(1)  
    .once("value",function(ALLRecords){
        ALLRecords.forEach(
            function(CurrentRecord) {
               
     curatorId = CurrentRecord.val().curatorId;
     curatorName = CurrentRecord.val().curatorname;
     
     var cname = document.getElementById('curatorname');
     cname.innerText = curatorName;
    
          });
          GetCuratorGalaxzies();
       });  
       
}


// get curator's galaxies

var  galaxzArray = [];

function GetCuratorGalaxzies(){

    // pull all galaxzies created by curator 
    const database = firebase.database();
    
    database.ref('/galaxz').orderByChild("createdById")
    .equalTo(curatorId).limitToLast(20)  
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
            // galaxzArray = galaxzArray.filter(function(filterByStatus) {
            // return filterByStatus.status == "Active"; });
        
           //sorting , the higher the priority, the above galaxz appears
    //        galaxzArray.sort((a, b) => {
    //         return b.priority - a.priority;
           
    //    });

        // current behaviour - new ones at the bottom
        
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
titleDesc.setAttribute('href', "mysolasys.html?gId="+ galaxzArray[i].galaxzId);
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

var solasysBtn = document.createElement('span');
solasysBtn.id = 'solasysBtn'+counter;
//solasysBtn.className = 'img-bottompara1';
solasysBtn.innerText = "Solasys";
document.getElementById('bottompara'+counter).append(solasysBtn);

var solasysval = document.createElement('span');
solasysval.id = 'solasysval'+counter;
solasysval.innerText = galaxzArray[i].numberOfSolasys;
document.getElementById('bottompara'+counter).append(solasysval);

var viewsBtn = document.createElement('span');
viewsBtn.id = 'viewsBtn'+counter;
//viewsBtn.className = 'img-bottompara1';
viewsBtn.innerText = "Views";
document.getElementById('bottompara'+counter).append(viewsBtn);


var viewsval = document.createElement('span');
viewsval.id = 'viewsval'+counter;
viewsval.innerText = galaxzArray[i].views;
document.getElementById('bottompara'+counter).append(viewsval);


var followsBtn = document.createElement('span');
followsBtn.id = 'followsBtn'+counter;
//followsBtn.className = 'img-bottompara1';  
followsBtn.innerText = "Likes";
document.getElementById('bottompara'+counter).append(followsBtn);


var followsval = document.createElement('span');
followsval.id = 'followsval'+counter;
followsval.innerText = galaxzArray[i].followers;
document.getElementById('bottompara'+counter).append(followsval);

var sharesBtn = document.createElement('span');
sharesBtn.id = 'sharesBtn'+counter;
//sharesBtn.className = 'img-bottompara1';
sharesBtn.innerText = "Shares";
document.getElementById('bottompara'+counter).append(sharesBtn);

var sharesval = document.createElement('span');
sharesval.id = 'sharesval'+counter;
sharesval.innerText = galaxzArray[i].shares;
document.getElementById('bottompara'+counter).append(sharesval);

//edit / delete / share link


var actionbuttons = document.createElement('p');
actionbuttons.className = 'post-meta';
actionbuttons.id = 'actionbuttons'+counter;
document.getElementById('galaxzdiv'+counter).append(actionbuttons);

var statusofG = document.createElement('h6');
statusofG.className = 'img-bottompara1';
statusofG.innerText = galaxzArray[i].status;
document.getElementById('actionbuttons'+counter).append(statusofG);

var actionbuttonEdit = document.createElement('img');
actionbuttonEdit.id = 'actionbuttonEdit'+counter;
actionbuttonEdit.className = 'img-bottompara1';
actionbuttonEdit.value = galaxzArray[i].galaxzId;   
actionbuttonEdit.setAttribute('onclick', "EditGalaxz(this.id,this.value)");
actionbuttonEdit.src = 'assets/editG.svg';
document.getElementById('actionbuttons'+counter).append(actionbuttonEdit);

var actionbuttonDelete = document.createElement('img');
actionbuttonDelete.id = 'actionbuttonDelete'+counter;
actionbuttonDelete.className = 'img-bottompara1';
actionbuttonDelete.value = galaxzArray[i].galaxzId;   
actionbuttonDelete.setAttribute('onclick', "DeleteGalaxz(this.value)");
actionbuttonDelete.src = 'assets/deleteG.svg';
document.getElementById('actionbuttons'+counter).append(actionbuttonDelete);

var actionbuttonShare = document.createElement('img');
actionbuttonShare.id = 'actionbuttonShare'+counter;
actionbuttonShare.className = 'img-bottompara1';
actionbuttonShare.value = galaxzArray[i].galaxzId;   
actionbuttonShare.setAttribute('onclick', "ShareGalaxz(this.value)");
actionbuttonShare.src = 'assets/shareG.svg';
document.getElementById('actionbuttons'+counter).append(actionbuttonShare);

//edit galaxz area start
var div3423dfdf423 = document.createElement("div");
div3423dfdf423.id = 'editgalaxzdiv'+counter;
document.getElementById('galaxzdiv'+counter).append(div3423dfdf423);

//edit galaxz area end

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
//if there is no data , ask to add new GALAXZ
var galaxzdiv = document.createElement('div');
galaxzdiv.className = 'post-preview';
galaxzdiv.id = 'galaxzdiv';
document.getElementById('maindiv').append(galaxzdiv);

var title = document.createElement('h2');
title.id = 'post-title';
title.className = 'post-title';
title.innerText = "You do not own GALAXZies, Create your first GALAXZ";
document.getElementById('galaxzdiv').append(title);

}

//create a new GALAXZ 
var div4534 = document.createElement("div");
div4534.className = 'rocketshipgobackahref';
div4534.id = 'div4534';
document.getElementById('maindiv').append(div4534);

var rocketship = document.createElement('img');
rocketship.id = 'rocketship';
rocketship.className = 'rocketshipgoback';
rocketship.src = 'assets/rocketship.png';
rocketship.setAttribute('onclick', "AddNewGalaxz()");
document.getElementById('div4534').append(rocketship);
var br89999 = document.createElement('br');
document.getElementById('maindiv').append(br89999);

}


//ADD GALAXZ START 

// create new galaxz
function AddNewGalaxz(){

    div4534.remove();   // remove the button 
    
var div3423423 = document.createElement("div");
div3423423.id = 'div3423423';
document.getElementById('maindiv').append(div3423423);

var br4ddfdfdsfdsdfd5345 =document.createElement('hr');
document.getElementById('div3423423').append(br4ddfdfdsfdsdfd5345);

var sdfsdfsdfsdfsdf =document.createElement('h5');
sdfsdfsdfsdfsdf.innerText = "Add new GALAXZ";
sdfsdfsdfsdfsdf.setAttribute('style',"color:Green");
document.getElementById('div3423423').append(sdfsdfsdfsdfsdf);

var br4ddfdfdfd5345 =document.createElement('br');
document.getElementById('div3423423').append(br4ddfdfdfd5345);

var titletext33 =document.createElement('h5');
titletext33.innerText = "Galaxz Title";
document.getElementById('div3423423').append(titletext33);

var br4dfd5345 =document.createElement('br');
document.getElementById('div3423423').append(br4dfd5345);

var titletextarea = document.createElement('textarea');
titletextarea.id = 'titletextarea';
titletextarea.className = 'post-title';
titletextarea.setAttribute('placeholder',"80 chars");
titletextarea.setAttribute('rows',"3");
titletextarea.setAttribute('cols',"60");
//titletextarea.setAttribute('minlength',"4");
titletextarea.setAttribute('maxlength',"80");
document.getElementById('div3423423').append(titletextarea);

var dfdfdfdf =document.createElement('br');
document.getElementById('div3423423').append(dfdfdfdf);
var br4dff5345 =document.createElement('br');
document.getElementById('div3423423').append(br4dff5345);

var titledesc33 =document.createElement('h5');
titledesc33.innerText = "Galaxz Description";
document.getElementById('div3423423').append(titledesc33);

var br4dfdf5345 =document.createElement('br');
document.getElementById('div3423423').append(br4dfdf5345);

var descriptiontextarea = document.createElement('textarea');
descriptiontextarea.id = 'descriptiontextarea';
descriptiontextarea.className = 'post-title';
descriptiontextarea.setAttribute('placeholder',"140 chars");
descriptiontextarea.setAttribute('rows',"5");
descriptiontextarea.setAttribute('cols',"60");
//descriptiontextarea.setAttribute('minlength',"4");
descriptiontextarea.setAttribute('maxlength',"140");
document.getElementById('div3423423').append(descriptiontextarea);


//error message label
var errormessage = document.createElement('h6');
errormessage.className = 'post-meta';
errormessage.id = 'errormessage';
errormessage.setAttribute('style',"color:red");
document.getElementById('div3423423').append(errormessage);

//submit  / cancel buttons


var submitcancelbuttons = document.createElement('p');
submitcancelbuttons.className = 'post-meta';
submitcancelbuttons.id = 'submitcancelbuttons';
document.getElementById('div3423423').append(submitcancelbuttons);

var actionbuttonSubmit = document.createElement('img');
actionbuttonSubmit.id = 'actionbuttonSubmit';
actionbuttonSubmit.className = 'img-bottompara1';  
actionbuttonSubmit.setAttribute('onclick', "AddGalaxz()");
actionbuttonSubmit.src = 'assets/submit.svg';
document.getElementById('submitcancelbuttons').append(actionbuttonSubmit);

var actionbuttoncancel = document.createElement('img');
actionbuttoncancel.id = 'actionbuttoncancel';
actionbuttoncancel.className = 'img-bottompara1';  
actionbuttoncancel.setAttribute('onclick', "CancelAddingGalaxz()");
actionbuttoncancel.src = 'assets/cancel.svg';
document.getElementById('submitcancelbuttons').append(actionbuttoncancel);


}

function CancelAddingGalaxz(){
    //clear the text areas
    document.getElementById('titletextarea').value = "";
    document.getElementById('descriptiontextarea').value = "";
    document.getElementById('errormessage').innerText = "";
    
}

function AddGalaxz(){
    
    //validate if text is entered
    if (document.getElementById("titletextarea").value == "")
    {
        var sdfsdfdfddf = document.getElementById('errormessage')
        sdfsdfdfddf.innerText = "Please enter Galaxz Title";
        return false;
    }
    if (document.getElementById("descriptiontextarea").value == "")
    {
        var sdfsdfdfdfdfddf = document.getElementById('errormessage')
        sdfsdfdfdfdfddf.innerText = "Please enter Galaxz Description";
        return false;
    }
    
//add galaxz


const gname = document.getElementById("titletextarea").value;
const gdescription = document.getElementById("descriptiontextarea").value;

const database = firebase.database();
const usersRef = database.ref('/galaxz');
const autoId = usersRef.push().key


usersRef.child(autoId).set({
 name: gname.trim(),
 description: gdescription.trim(),
 createdBy: curatorName,
 createdById: curatorId,
 galaxzId: autoId,
 priority:1001, 
 status: "InActive",
 numberOfSolasys:  0,
 views: 0,
 followers:0,
 shares: 0,
 createdDate: firebase.database.ServerValue.TIMESTAMP

})

var sdfsdfdfddfdfdfddf = document.getElementById('errormessage')
sdfsdfdfddfdfdfddf.innerText = "GALAXZ Added, refresh the page to view it. It is InActive, we will verify and make it Active";
sdfsdfdfddfdfdfddf.setAttribute('style',"color:green");
//clear the textareas
document.getElementById('titletextarea').value = "";
document.getElementById('descriptiontextarea').value = "";

}

//ADD GALAXZ END 



//EDIT GALAXZ START 

//show the text areas under the galaxz

function EditGalaxz(tagid,galId){

    var gname;
    var gdesc;
    // get g name and g desc from db for the edited g
const database = firebase.database();
database.ref('/galaxz').orderByChild('galaxzId')
    .equalTo(galId).limitToFirst(1)  
    .once("value",function(ALLRecords){
        ALLRecords.forEach(
            function(CurrentRecord) {
               
     gname = CurrentRecord.val().name;
     gdesc = CurrentRecord.val().description;
          });
          titletextarea44.innerText = gname;
          descriptiontextarea33.innerText = gdesc;
       });  

  // first remove the edit boxes if its already displayed for another galaxz and then add for other because we are reusing ids
var element =  document.getElementById('clickededitgalaxzdivtag');
if (document.body.contains(element))
{
    element.remove();
}

var galId = galId;
//get the editgalaxzdiv tag of the galaxz where edit button was clicked and append all edinting elements

let extractnumberfromid = tagid.substr(16);
   
var clickededitgalaxzdivtagroot = "editgalaxzdiv"+extractnumberfromid;

var divchild =document.createElement('div');
divchild.id = 'clickededitgalaxzdivtag';
document.getElementById(clickededitgalaxzdivtagroot).append(divchild);

var titletext4433 =document.createElement('h5');
titletext4433.innerText = "Galaxz Title";
document.getElementById('clickededitgalaxzdivtag').append(titletext4433);

var br4dfddfd5345 =document.createElement('br');
document.getElementById('clickededitgalaxzdivtag').append(br4dfddfd5345);

var titletextarea44 = document.createElement('textarea');
titletextarea44.id = 'titletextarea44';
titletextarea44.className = 'post-title';
titletextarea44.setAttribute('placeholder',"80 chars");
titletextarea44.setAttribute('rows',"3");
titletextarea44.setAttribute('cols',"60");
//titletextarea.setAttribute('minlength',"4");
titletextarea44.setAttribute('maxlength',"80");
console.log(gname);
document.getElementById('clickededitgalaxzdivtag').append(titletextarea44);

var dfdfdfdfdfdf =document.createElement('br');
document.getElementById('clickededitgalaxzdivtag').append(dfdfdfdfdfdf);
var br4dfddff5345 =document.createElement('br');
document.getElementById('clickededitgalaxzdivtag').append(br4dfddff5345);

var titledesc334 =document.createElement('h5');
titledesc334.innerText = "Galaxz Description";
document.getElementById('clickededitgalaxzdivtag').append(titledesc334);

var br4dfdfdfd5345 =document.createElement('br');
document.getElementById('clickededitgalaxzdivtag').append(br4dfdfdfd5345);

var descriptiontextarea33 = document.createElement('textarea');
descriptiontextarea33.id = 'descriptiontextarea33';
descriptiontextarea33.className = 'post-title';
descriptiontextarea33.setAttribute('placeholder',"140 chars");
descriptiontextarea33.setAttribute('rows',"5");
descriptiontextarea33.setAttribute('cols',"60");
//descriptiontextarea.setAttribute('minlength',"4");
descriptiontextarea33.setAttribute('maxlength',"140");
document.getElementById('clickededitgalaxzdivtag').append(descriptiontextarea33);


//error message label
var errormessage545 = document.createElement('h6');
errormessage545.className = 'post-meta';
errormessage545.id = 'errormessage545';
errormessage545.setAttribute('style',"color:red");
document.getElementById('clickededitgalaxzdivtag').append(errormessage545);

//submit  / cancel buttons

var actionbuttonSubmit4333 = document.createElement('img');
actionbuttonSubmit4333.id = 'actionbuttonSubmit4333';
actionbuttonSubmit4333.className = 'img-bottompara1'; 
actionbuttonSubmit4333.value = galId;  
actionbuttonSubmit4333.setAttribute('onclick', "UpdateGalaxz(this.value)");
actionbuttonSubmit4333.src = 'assets/submit.svg';
document.getElementById('clickededitgalaxzdivtag').append(actionbuttonSubmit4333);

var actionbuttoncancel74465 = document.createElement('img');
actionbuttoncancel74465.id = 'actionbuttoncancel74465';
actionbuttoncancel74465.className = 'img-bottompara1';  
actionbuttoncancel74465.value = "clickededitgalaxzdivtag"; 
actionbuttoncancel74465.setAttribute('onclick', "CancelUpdatingGalaxz(this.value)");
actionbuttoncancel74465.src = 'assets/cancel.svg';
document.getElementById('clickededitgalaxzdivtag').append(actionbuttoncancel74465);

var br4dfdfddfdfd5345 =document.createElement('br');
document.getElementById('clickededitgalaxzdivtag').append(br4dfdfddfdfd5345);

//edit galaxz area end

}

function CancelUpdatingGalaxz(clickededitgalaxzdivtagchild){
    //hide the div
    document.getElementById('titletextarea44').value = "";
    document.getElementById('descriptiontextarea33').value = "";
    document.getElementById(clickededitgalaxzdivtagchild).remove();
    
}

function UpdateGalaxz(galId){
    
    //validate if text is entered
    if (document.getElementById("titletextarea44").value == "")
    {
        var sdfsdfffdfddf = document.getElementById('errormessage545')
        sdfsdfffdfddf.innerText = "Please enter Galaxz Title";
        return false;
    }
    if (document.getElementById("descriptiontextarea33").value == "")
    {
        var sdfsdfdfddfdfdfddf = document.getElementById('errormessage545')
        sdfsdfdfddfdfdfddf.innerText = "Please enter Galaxz Description";
        return false;
    }
    
//add galaxz


const gname = document.getElementById("titletextarea44").value;
const gdescription = document.getElementById("descriptiontextarea33").value;

const database = firebase.database();

database.ref('/galaxz/' +galId).update({ 
 name: gname.trim(),
 description: gdescription.trim(),
})

var sdfsdfdfddfdfdfddf = document.getElementById('errormessage545')
sdfsdfdfddfdfdfddf.innerText = "GALAXZ Updated, refresh the page to view it";
sdfsdfdfddfdfdfddf.setAttribute('style',"color:green");
//clear the textareas
document.getElementById('titletextarea44').value = "";
document.getElementById('descriptiontextarea33').value = "";

}

//EDIT GALAXZ END 


//DELECT GALAXZ START
function DeleteGalaxz(galId){

// const database = firebase.database();
// database.ref('/galaxz/' +galId).remove();
// var sdfsdfdfddfdfdfddf = document.getElementById('errormessage545')
// sdfsdfdfddfdfdfddf.innerText = "GALAXZ Deleted, refresh the page to view the changes";
// sdfsdfdfddfdfdfddf.setAttribute('style',"color:green");

}

//DELECT GALAXZ END

//SHARE GALAXZ START
function ShareGalaxz(galId){
    var urltoshare = "galaxz.xyz/index.html?gId="+galId;
// var sdfsdfdfddfdfdfddf = document.getElementById('errormessage545')
// sdfsdfdfddfdfdfddf.innerText = "GALAXZ link copied, share the link with others";
// sdfsdfdfddfdfdfddf.setAttribute('style',"color:green");
}

//SHARE GALAXZ END