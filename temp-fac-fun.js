// INPUT ELEMENT
var inputTempTownElement = document.querySelector(".tempInput");

// DISPLAY ELEMENT
var displayTempTownElement = document.querySelector(".displayTownTemp");

var townTempOptionsElement = document.querySelector(".townTemp");

// BUTTON ELEMENTS
var addButtonTempElement = document.querySelector(".addTempBtn");
var resetTempButtonElement = document.querySelector(".resetTempBtn");
var refreshTempBtnElement = document.querySelector(".clearTempBtn");

// ERROR MESSAGE ELEMENT
var errorTempMsgElement = document.querySelector(".tempErrors");
var successTempMsgElement = document.querySelector(".tempSuccess");

// TEMPLATE SETUP
var totalsTemplateElement = document.querySelector(".userTemplate").innerHTML;
var template = Handlebars.compile(totalsTemplateElement);

var userList = [];

// SETTING UP LOCAL STORAGE
if(localStorage['townsTemplate']) {
   userList = JSON.parse(localStorage.getItem('townsTemplate')).split(',')
}

// CREATING AN INSTANCE FOR A FACTORY FUNCTION
var registrationTempInstanceFactory = registrationFactoryFunction();


// CREATING A FUNCTION THAT WILL DISPLAY REG NUMBERS
function displayTempRegNumbers(reg) {

    var regNumberTemp = document.createElement("p");

    regNumberTemp.className = 'regTemp';
    regNumberTemp.innerHTML = template({registration : reg});

    displayTempTownElement.insertBefore(regNumberTemp, displayTempTownElement.firstChild);
}

userList.forEach(displayTempRegNumbers);

// CREATING A FUNCTION THAT WILL GET REGISTRATIONS FROM A USER
function getUserRegistrations(){

    //  ERROR MESSAGES
    var correctFormat = " is not written in a correct format or is a duplicate."
    var nothingToAddTemp = "There is no registration to add. Please enter a valid registration.";
    var successMsg = " was registered successfully!"

   reg = inputTempTownElement.value;

    while (displayTempTownElement.firstChild) {
        displayTempTownElement.removeChild(displayTempTownElement.firstChild);
     }

    townTempList = registrationTempInstanceFactory.caseFormat(reg);

    if (reg == "") {

        errorTempMsgElement.innerHTML = nothingToAddTemp;

                setTimeout(function(){
                    errorTempMsgElement.innerHTML = "";
                }, 2000)
            }

    townTempList.forEach(function(reg){
        if(registrationTempInstanceFactory.checkRegNumbers(reg)) {
            registrationTempInstanceFactory.regList(reg);
            successTempMsgElement.innerHTML = reg + successMsg;
            setTimeout(function(){
                successTempMsgElement.innerHTML = template({registration : ""});
            }, 2000) 
        }else if(userReg.includes(reg)){

            errorTempMsgElement.innerHTML = reg + correctFormat;
            
            setTimeout(function(){
                errorTempMsgElement.innerHTML = "";
            }, 2000)             
      }  
      userList.forEach(displayTempRegNumbers);
    })
 
    localStorage.setItem('townsTemplate',userList);
    // errorTempMsgElement.innerHTML = "";
    inputTempTownElement.value = "";
    townTempOptionsElement.selectedIndex = 0;

   userList.forEach(displayTempRegNumbers);
  
}
addButtonTempElement.addEventListener("click", getUserRegistrations)


townTempOptionsElement.onchange = function() {

    while (displayTempTownElement.firstChild) {
        displayTempTownElement.removeChild(displayTempTownElement.firstChild);
        }
    
    var townFiltered = townTempOptionsElement.selectedIndex;

    var regAvailable = townTempOptionsElement.options[townFiltered].value;

    var filterResults = registrationTempInstanceFactory.registrations(regAvailable);
   
   
        filterResults.forEach(displayTempRegNumbers);
   
}

// CLEAR TOWNS IN DOM AND STORAGE
function resetReg(){
    displayTempTownElement.innerHTML = "";
   userList = [];
    localStorage['townsTemplate'] = userList;
}
resetTempButtonElement.addEventListener("click", resetReg)

// REFRESH PAGE AND DISPLAY ALL DATA
function refreshPage(){
    while (displayTempTownElement.firstChild) {
        displayTempTownElement.removeChild(displayTempTownElement.firstChild);
    }
    townTempOptionsElement.selectedIndex = 0;
   userList.forEach(displayTempRegNumbers);

}refreshTempBtnElement.addEventListener('click', refreshPage)

