analytics.logEvent('MyGalaxz Page used', { name: ''});

function logout(){
    firebase.auth().signOut()
    location.replace("login.html") //  send to home page to login after logout
}

//get curator details 

var curatorEmail;
var curatorId ;
var curatorName;


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
                document.getElementById("curatoremail").innerHTML = user.email  // if user is logged in , show my galaxz page
                curatorEmail = user.email;
                curatorId = user.uid;
               // var uid = user.uid;
                getCuratorDetails();
            }
            
            
        }
    })
}



function getCuratorDetails(){
    const database = firebase.database();
    
    database.ref('/curators').orderByChild('curatorId')
    .equalTo(curatorId).limitToFirst(1)  
    .once("value",function(ALLRecords){
        ALLRecords.forEach(
            function(CurrentRecord) {
               
     curatorName = CurrentRecord.val().curatorName;
     
     document.getElementById('curatorname').innerText = curatorName;
     
    
          });
          GetCuratorGalaxzies(curatorId);
       });  
       
}


// get curator's galaxies

var  galaxzArray = [];
var counter = 0;  
var isitnewG = "No";  

function GetCuratorGalaxzies(curatorId){
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
          // galaxzArray.sort((a, b) => {
           //return b.priority - a.priority;

            // current behaviour - new ones at the top
           galaxzArray.reverse();
           
    //    });
    
        AddGalaxzCell(galaxzArray);
        });

}


//this one to get the galaxz added by curator in real time
function GetNewAddedGalaxz(NewAddedGalaxzId){
isitnewG = "Yes";
galaxzArray = []; //clear the array to remove existing ones

    // pull the newly added g
    const database = firebase.database();
    
    database.ref('/galaxz').orderByChild("galaxzId")
    .equalTo(NewAddedGalaxzId).limitToLast(1)  
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
 
//only execute this once
if(counter==0){    
//share profile 
document.getElementById('curatorprofilelink').setAttribute('href', "https://galaxz.xyz/curatorprofile.html?cId="+curatorId+"&cName="+curatorName);

var sharelinktitle = document.createElement('h6');
sharelinktitle.setAttribute('style',"color:#0085A1");
sharelinktitle.innerText = "Use the share buttons on Galaxzies to share individual Galaxz url with Readers or share the profile url below";
document.getElementById('shareGalaxzinfo').append(sharelinktitle);

// add galaxz button
var addGalaxz = document.createElement('img');
addGalaxz.id = 'addGalaxz';
addGalaxz.className = 'mygalaxzinfo';
addGalaxz.src = 'assets/submit.svg';
addGalaxz.setAttribute('onclick', "AddNewGalaxz()");
document.getElementById('info').append(addGalaxz);
var bdsfdfdfdsdfsdfr = document.createElement("br");
document.getElementById('info').append(bdsfdfdfdsdfsdfr);
}

//add div holder for add galaxz div to hold childs
var gadddivholderroot = document.createElement("div");
gadddivholderroot.id = 'gadddivholderroot';
document.getElementById('maindiv').append(gadddivholderroot);

var bdsfsdfsdfr = document.createElement("br");
document.getElementById('maindiv').append(bdsfsdfsdfr);

//placeholder div for newly added Galaxz so that it appears at the top
var newlyaddedGplaceholderdiv = document.createElement('div');
newlyaddedGplaceholderdiv.className = 'post-preview';
newlyaddedGplaceholderdiv.id = 'newlyaddedGplaceholderdiv';
document.getElementById('maindiv').append(newlyaddedGplaceholderdiv);

//add galaxzies from db

 for (i=0 ;i < galaxzArray.length; i++){
   
var galaxzdiv = document.createElement('div');
galaxzdiv.className = 'post-preview';
galaxzdiv.id = 'galaxzdiv'+counter;
if(isitnewG == "Yes"){
document.getElementById('newlyaddedGplaceholderdiv').prepend(galaxzdiv);  // prepend to add elements to the top , appeand to add elements below
}
if(isitnewG == "No"){
document.getElementById('maindiv').append(galaxzdiv);
}

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
statusofG.id = 'statusofG'+counter;
statusofG.innerText = galaxzArray[i].status;
if(statusofG.innerText=="Active"){
statusofG.setAttribute('style',"color:green");
}
if(statusofG.innerText=="InActive"){
statusofG.setAttribute('style',"color:red");
}
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
actionbuttonDelete.setAttribute('onclick', "DeleteGalaxz(this.id,this.value)");
actionbuttonDelete.src = 'assets/deleteG.svg';
document.getElementById('actionbuttons'+counter).append(actionbuttonDelete);

var actionbuttonShare = document.createElement('img');
actionbuttonShare.id = 'actionbuttonShare'+counter;
actionbuttonShare.className = 'img-bottompara1';
actionbuttonShare.value = galaxzArray[i].galaxzId;   
actionbuttonShare.setAttribute('onclick', "ShareGalaxz(this.value)");
actionbuttonShare.src = 'assets/shareG.svg';
document.getElementById('actionbuttons'+counter).append(actionbuttonShare);

//edit galaxz area div start
//root div for edit galaxz elements
var div3423dfdf423 = document.createElement("div");
div3423dfdf423.id = 'editgalaxzdiv'+counter;
document.getElementById('galaxzdiv'+counter).append(div3423dfdf423);

//edit galaxz area div end

var hr = document.createElement("hr");
hr.className='my-4';
hr.id = 'hr'+counter;
document.getElementById('galaxzdiv'+counter).append(hr);

++counter;  
 }
++counter;  //counter outside if as well, because it should be incremented even when there are zero galaxzies under curator or plus button is added twice

//remove the last hr only if there is data in the array
if (galaxzArray.length>1)
{
    let len = galaxzArray.length-1;
    document.getElementById('hr'+len).remove();
   
}

}


//ADD GALAXZ START 

// create new galaxz
function AddNewGalaxz(){

document.getElementById('addGalaxz').style.display = 'none';   // remove the "add galaxz" button 
let succmess = document.getElementById('successmessage');
if(document.body.contains(succmess)){
    succmess.innerText = "";   // clear ,not remove element as needed again, the "success message" if present 
}

var div3423423 = document.createElement("div");  //child div appended to root div
div3423423.id = 'div3423423';
document.getElementById('gadddivholderroot').append(div3423423);

//add success  message label to root div
var successmessage = document.createElement('h6');
successmessage.className = 'post-meta';
successmessage.id = 'successmessage';
successmessage.setAttribute('style',"color:green");
document.getElementById('gadddivholderroot').append(successmessage);

//append all add elements to chhild div
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
titletextarea.setAttribute('placeholder',"80 chars max");
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
descriptiontextarea.setAttribute('placeholder',"180 chars max");
descriptiontextarea.setAttribute('rows',"5");
descriptiontextarea.setAttribute('cols',"60");
//descriptiontextarea.setAttribute('minlength',"4");
descriptiontextarea.setAttribute('maxlength',"180");
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



// var br4ddfdfdsfdsdfd5345 =document.createElement('hr');
// document.getElementById('div3423423').append(br4ddfdfdsfdsdfd5345);

}

function CancelAddingGalaxz(){
    //clear the text areas
    document.getElementById('titletextarea').value = "";
    document.getElementById('descriptiontextarea').value = "";
    document.getElementById('errormessage').innerText = "";
    document.getElementById('div3423423').remove();  //hide the child div with all add elements
    document.getElementById('addGalaxz').style.display = 'block'  // add the "ADD galaxz" button 
    
    
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
    if (document.getElementById("titletextarea").value.length >80 )
    {
        var sdfsdfdfddf = document.getElementById('errormessage')
        sdfsdfdfddf.innerText = "Please enter Galaxz Title less than 80 chars";
        return false;
    }
    if (document.getElementById("descriptiontextarea").value.length >180)
    {
        var sdfsdfdfdfdfddf = document.getElementById('errormessage')
        sdfsdfdfdfdfddf.innerText = "Please enter Galaxz Description less than 180 chars";
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
 priority:1,   //so that it appears at the bottom , admin will update the priority
 status: "InActive",
 numberOfSolasys:  0,
 views: 0,
 followers:0,
 shares: 0,
 createdDate: firebase.database.ServerValue.TIMESTAMP,
 adminGpriority:1,   //gstatus and gpriority is used for displaying data on galaxz home page , we control that not the user
 adminGstatus: "InActive",

})

var sdfsdfdfddfdfdfddf = document.getElementById('successmessage')
sdfsdfdfddfdfdfddf.innerText = "GALAXZ Added. It is InActive now, add SOLASYSes and PLANETS, then make it Active by editing and Share with READERS.";
sdfsdfdfddfdfdfddf.setAttribute('style',"color:green");

//clear the textareas
document.getElementById('titletextarea').value = "";
document.getElementById('descriptiontextarea').value = "";
document.getElementById('div3423423').remove();  //hide the text area
document.getElementById('addGalaxz').style.display = 'block'  // add the button 


GetNewAddedGalaxz(autoId);  // add the newly added Galaxz to the UI

}


//ADD GALAXZ END 



//EDIT GALAXZ START 

//show the text areas under the galaxz
var gtitleedited;
var gdescedited ;
var statusofG;


function EditGalaxz(tagid,galId){

    let gname;
    let gdesc;
    let status;
    

    // get g name and g desc from db for the edited g
const database = firebase.database();
database.ref('/galaxz').orderByChild('galaxzId')
    .equalTo(galId).limitToFirst(1)  
    .once("value",function(ALLRecords){
        ALLRecords.forEach(
            function(CurrentRecord) {
               
     gname = CurrentRecord.val().name;
     gdesc = CurrentRecord.val().description;
     status = CurrentRecord.val().status;
          });
          titletextarea44.innerText = gname;
          descriptiontextarea33.innerText = gdesc;
          if(status == "Active"){
           document.getElementById('radiobuttonActive').setAttribute('checked',"checked");
        }
        if(status == "InActive"){
           document.getElementById('radiobuttonInactive').setAttribute('checked',"checked");
        }

       });  

  // first remove the edit boxes if its already displayed for another galaxz and then add for other because we are reusing ids
var element =  document.getElementById('clickededitgalaxzdivtag');
if (document.body.contains(element))
{
    element.remove();
}
var successmessage443333 =  document.getElementById('successmessage443');
if (document.body.contains(successmessage443333))
{
    successmessage443333.remove();
}

var galId = galId;
//get the editgalaxzdiv tag of the galaxz where edit button was clicked and append all editing elements

let extractnumberfromid = tagid.substr(16);
   
var clickededitgalaxzdivtagroot = "editgalaxzdiv"+extractnumberfromid;

gtitleedited = "post-title"+extractnumberfromid;  // UpdateGalaxzAfterEdit() to work
 gdescedited = "post-subtitle"+extractnumberfromid; // for UpdateGalaxzAfterEdit() to work
 statusofG = "statusofG"+extractnumberfromid;  //for UpdateGalaxzAfterEdit() to work
 
//success message tag to rootedit div
var successmessage443 =document.createElement('h6');
successmessage443.id = 'successmessage443';
successmessage443.className = 'post-meta';
successmessage443.setAttribute('style',"color:green");
document.getElementById(clickededitgalaxzdivtagroot).append(successmessage443);

//child tag under rootedit div which hold all editing elements 
var divchild =document.createElement('div');
divchild.id = 'clickededitgalaxzdivtag';
document.getElementById(clickededitgalaxzdivtagroot).append(divchild);


var titletexfdft4433 =document.createElement('h5');
titletexfdft4433.innerText = "Update Galaxz";
titletexfdft4433.setAttribute('style',"color:green");
document.getElementById('clickededitgalaxzdivtag').append(titletexfdft4433);

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
descriptiontextarea33.setAttribute('placeholder',"180 chars");
descriptiontextarea33.setAttribute('rows',"5");
descriptiontextarea33.setAttribute('cols',"60");
//descriptiontextarea.setAttribute('minlength',"4");
descriptiontextarea33.setAttribute('maxlength',"180");
document.getElementById('clickededitgalaxzdivtag').append(descriptiontextarea33);

var br4dfdfdfd5dfd345 =document.createElement('br');
document.getElementById('clickededitgalaxzdivtag').append(br4dfdfdfd5dfd345);

var titletexfdft4433 =document.createElement('h6');
titletexfdft4433.innerText = "Active";
document.getElementById('clickededitgalaxzdivtag').append(titletexfdft4433);

var radiobuttons = document.createElement('INPUT');
radiobuttons.setAttribute('type',"radio");
radiobuttons.id = 'radiobuttonActive';
radiobuttons.className = 'radiobuttons';
radiobuttons.setAttribute('name',"Samename");
radiobuttons.setAttribute('value',"Active");
document.getElementById('clickededitgalaxzdivtag').append(radiobuttons);

var titletexfddffdft4433 =document.createElement('h6');
titletexfddffdft4433.innerText = "InActive";
document.getElementById('clickededitgalaxzdivtag').append(titletexfddffdft4433);

var radiobuttons = document.createElement('INPUT');
radiobuttons.setAttribute('type',"radio");
radiobuttons.id = 'radiobuttonInactive';
radiobuttons.className = 'radiobuttons';
radiobuttons.setAttribute('name',"Samename");
radiobuttons.setAttribute('value',"InActive");
document.getElementById('clickededitgalaxzdivtag').append(radiobuttons);



//error message label
var errormessage545 = document.createElement('h6');
errormessage545.className = 'post-meta';
errormessage545.id = 'errormessage545';
errormessage545.setAttribute('style',"color:red");
document.getElementById('clickededitgalaxzdivtag').append(errormessage545);

//submit  / cancel buttons

var actionbuttonSubmit4333 = document.createElement('img');
actionbuttonSubmit4333.id = 'clickededitgalaxzdivtag';   //send this id of div holding all edit elemets so that div can be removd
actionbuttonSubmit4333.className = 'img-bottompara1'; 
actionbuttonSubmit4333.value = galId;  
actionbuttonSubmit4333.setAttribute('onclick', "UpdateGalaxz(this.id,this.value)");
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

function UpdateGalaxz(childdivid,galId){
    
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
    if (document.getElementById("titletextarea44").value.length > 80)
    {
        var sdfsdfffdfddf = document.getElementById('errormessage545')
        sdfsdfffdfddf.innerText = "Please enter Galaxz Title less than 80 chars";
        return false;
    }
    if (document.getElementById("descriptiontextarea33").value.length > 180)
    {
        var sdfsdfdfddfdfdfddf = document.getElementById('errormessage545')
        sdfsdfdfddfdfdfddf.innerText = "Please enter Galaxz Description less than 180 chars";
        return false;
    }
     
//update galaxz


const gname = document.getElementById("titletextarea44").value;
const gdescription = document.getElementById("descriptiontextarea33").value;
const status = document.querySelector('input[name = Samename]:checked').value;

const database = firebase.database();

database.ref('/galaxz/' +galId).update({ 
 name: gname.trim(),
 description: gdescription.trim(),
 status:status,
})

var sdfsdfdfddfdfdfddf = document.getElementById('successmessage443')
sdfsdfdfddfdfdfddf.innerText = "GALAXZ Updated";
//clear the textareas
document.getElementById('titletextarea44').value = "";
document.getElementById('descriptiontextarea33').value = "";
document.getElementById(childdivid).remove();
UpdateUIAfterEdit(galId);

}

// update the UI with new details
function UpdateUIAfterEdit(galId){
let gname;
let gdesc
let status
 
    // get g name and g desc for the edited after eding is done
const database = firebase.database();
database.ref('/galaxz').orderByChild('galaxzId')
    .equalTo(galId).limitToFirst(1)  
    .once("value",function(ALLRecords){
        ALLRecords.forEach(
            function(CurrentRecord) {
               
     gname = CurrentRecord.val().name;
     gdesc = CurrentRecord.val().description;
     status = CurrentRecord.val().status;
          });
          
          document.getElementById(gtitleedited).innerText = gname;
          document.getElementById(gdescedited).innerText = gdesc;
          if(status=="Active"){
            document.getElementById(statusofG).innerText = status;
            document.getElementById(statusofG).setAttribute('style',"color:green");
            }
            if(status=="InActive"){
                document.getElementById(statusofG).innerText = status;
                document.getElementById(statusofG).setAttribute('style',"color:red");
                }
       

       });  
    }

//EDIT GALAXZ END 


//DELECT GALAXZ START
function DeleteGalaxz(tagId,galId){
    //first remove the error message
    var element =  document.getElementById('cantdeletegalaxz');
      if (document.body.contains(element))
       {
     element.remove();
       }


      //show po up
      var showpopup = document.getElementById('modal-container');
      showpopup.classList.add('show');
      showpopup.style.display = "flex";
    //close popup
      var  closepopup = document.getElementById('closepopup');
        closepopup.onclick = function() {
        showpopup.style.display = "none";
    }
      //delete Galaxz
      var deleteGalaxzeee = document.getElementById('deleteGalaxzeee');
      deleteGalaxzeee.onclick = function() {
        showpopup.style.display = "none";
       
       let extractnumberfromid = tagId.substr(18);
       var clickedgalaxzdiv = "galaxzdiv"+extractnumberfromid;
       var numberofsolasys = "solasysval"+extractnumberfromid;
       var noofsolasys = document.getElementById(numberofsolasys).innerText;
       
       //can delete only if number of  solasys = 0
       if(noofsolasys > 0){
        var clickededitgalaxzdivtagroot = "editgalaxzdiv"+extractnumberfromid;
        //success message tag to rootedit div
        var cantdeletegalaxz =document.createElement('h6');
        cantdeletegalaxz.id = 'cantdeletegalaxz';
        cantdeletegalaxz.className = 'post-meta';
        cantdeletegalaxz.innerText = "There are SOLASYSes under this GALAXZ, delete them first to delete GALAXZ";
        cantdeletegalaxz.setAttribute('style',"color:red");
        document.getElementById(clickededitgalaxzdivtagroot).append(cantdeletegalaxz);
       }
      else{
        const database = firebase.database();
        database.ref('/galaxz/' +galId).remove();
        document.getElementById(clickedgalaxzdiv).remove();   // remove the deleted galaxz from UI
       }
    
    }

    //click anywhere , close pop up
    // window.onclick = function(event) {
    //     if (event.target == showpopup) {
    //         showpopup.style.display = "none";
    //         //console.log("clicked")
    //     }
    //   }

}

//DELECT GALAXZ END

//SHARE GALAXZ START
function ShareGalaxz(galId){
    var urltoshare = "https://galaxz.xyz/index.html?gId="+galId;
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
  
  //click anywhere , close pop up
    // window.onclick = function(event) {
    //     if (event.target == showpopup) {
    //         showpopup.style.display = "none";
    //     }
    //   }
}

//SHARE GALAXZ END
