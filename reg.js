// INPUT ELEMENT
var inputTownElement = document.querySelector(".input");

// DISPLAY ELEMENT
var displayTownElement = document.querySelector(".displayTown");
var townOptionsElement = document.querySelector(".town");

// BUTTON ELEMENTS
var addButtonElement = document.querySelector(".addButton");
var resetButtonElement = document.querySelector(".reset");
var refreshBtnElement = document.querySelector(".clear");

// ERROR MESSAGE ELEMENT
var errorMsgElement = document.querySelector(".errors");
var successMsgElement = document.querySelector(".success");

var userReg = [];

// SETTING UP LOCAL STORAGE
if(localStorage['towns']) {
    userReg = localStorage.getItem('towns').split(',')
}

// CREATING AN INSTANCE FOR A FACTORY FUNCTION
var registrationInstanceFactory = registrationFactoryFunction();

// CREATING A FUNCTION THAT WILL DISPLAY REG NUMBERS
function displayRegNumbers(reg) {

    var regNumber = document.createElement("p");

    regNumber.className = 'reg';
    regNumber.innerHTML = reg;

    displayTownElement.insertBefore(regNumber, displayTownElement.firstChild);
    }
userReg.forEach(displayRegNumbers);

// CREATING A FUNCTION THAT WILL GET REGISTRATIONS FROM A USER
function getUserRegistrations(){
    //  ERROR MESSAGES
    //  var exists = " registration already exists!";
    var correctFormat = " is not written in a correct format or is a duplicate."
    var nothingToAdd = "There is no registration to add. Please enter a valid registration.";
    var successMsg = " was registered successfully!"
   reg = inputTownElement.value;

    while (displayTownElement.firstChild) {
        displayTownElement.removeChild(displayTownElement.firstChild);
     }

    var regex = /^((CJ|CY|CL|CA)\s\d{3}\s\d{3})$/; 
    var regex1 = /^((CJ|CY|CL|CA)\-([0-9]){3}\-([0-9]){3})$/;
    var regex2 = /^((CJ|CY|CL|CA)\-([0-9]){6})$/;
    var regex3 = /^((CJ|CY|CL|CA)\s([0-9]){6})$/;


    console.log("Testing the regex1:  " +regex1.test(reg))
    console.log("Testing the regex2:  " +regex2.test(reg))
    console.log("Testing the regex:  " +regex.test(reg))
    console.log("Testing the regex3:  " +regex3.test(reg))
    townList = registrationInstanceFactory.caseFormat(reg);

    if (reg == "") {

        errorMsgElement.innerHTML = nothingToAdd;

                setTimeout(function(){
                    errorMsgElement.innerHTML = "";
                }, 2000)
            }

    townList.forEach(function(reg){
        if(registrationInstanceFactory.checkRegNumbers(reg)) {
            registrationInstanceFactory.regList(reg);
            successMsgElement.innerHTML = reg + successMsg;
            setTimeout(function(){
                successMsgElement.innerHTML = "";
            }, 2000) 
        }else if(userReg.includes(reg)){

            errorMsgElement.innerHTML = reg + correctFormat;
            
            setTimeout(function(){
                errorMsgElement.innerHTML = "";
            }, 2000)             
      }  
    })
 
    localStorage.setItem('towns', userReg);
    // errorMsgElement.innerHTML = "";
    inputTownElement.value = "";
    townOptionsElement.selectedIndex = 0;

    userReg.forEach(displayRegNumbers);
}
addButtonElement.addEventListener("click", getUserRegistrations)


townOptionsElement.onchange = function() {

    while (displayTownElement.firstChild) {
        displayTownElement.removeChild(displayTownElement.firstChild);
        }
    
    var townFiltered = townOptionsElement.selectedIndex;

    var regAvailable = townOptionsElement.options[townFiltered].value;

    var filterResults = registrationInstanceFactory.registrations(regAvailable);
   
   
        filterResults.forEach(displayRegNumbers);
   
}

// CLEAR TOWNS IN DOM AND STORAGE
function resetReg(){
    displayTownElement.innerHTML = "";
    userReg = [];
    localStorage['towns'] = userReg;
}
resetButtonElement.addEventListener("click", resetReg)

// REFRESH PAGE AND DISPLAY ALL DATA
function refreshPage(){
    while (displayTownElement.firstChild) {
        displayTownElement.removeChild(displayTownElement.firstChild);
    }
    townOptionsElement.selectedIndex = 0;
    userReg.forEach(displayRegNumbers);

}refreshBtnElement.addEventListener('click', refreshPage)

