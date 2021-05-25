var userList = [];

// SETTING UP LOCAL STORAGE
if(localStorage['townsTemplate']) {
   userList = localStorage.getItem('townsTemplate').split(',')
}

// CREATING AN INSTANCE FOR A FACTORY FUNCTION
var registrationTempInstanceFactory = registrationTemplateFactoryFunction();

document.addEventListener('DOMContentLoaded', function(){
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
var registrationTemplate = document.querySelector(".userTemplate").innerHTML;
var template = Handlebars.compile(registrationTemplate);

// CREATING A FUNCTION THAT WILL GET REGISTRATIONS FROM A USER

function getUserRegistrations(){

    //  ERROR MESSAGES
    var correctFormat = " is not written in a correct format or is a duplicate."
    var nothingToAddTemp = "There is no registration to add. Please enter a valid registration.";
    var successMsg = " was registered successfully!"

    var reg = inputTempTownElement.value;
    
    var townTempList = registrationTempInstanceFactory.caseFormat(reg);

    if (reg == "") {

        errorTempMsgElement.innerHTML = nothingToAddTemp;

                setTimeout(function(){
                    errorTempMsgElement.innerHTML = "";
                }, 2000)
            }else if(!reg){

                errorTempMsgElement.innerHTML = reg + correctFormat;
                
                setTimeout(function(){
                    errorTempMsgElement.innerHTML = "";
                }, 2000)           
          }
    townTempList.forEach(function(reg){
        
        if(registrationTempInstanceFactory.checkRegNumbers(reg)) {
            registrationTempInstanceFactory.regList(reg);
            userList.push(reg);
            successTempMsgElement.innerHTML = reg + successMsg;
            setTimeout(function(){
                successTempMsgElement.innerHTML = "";
            }, 2000) 
        }else if(userList.includes(reg)){

            errorTempMsgElement.innerHTML = reg + correctFormat;
            
            setTimeout(function(){
                errorTempMsgElement.innerHTML = "";
            }, 2000)           
      }  
    });
 
    localStorage.setItem('townsTemplate', userList);
    console.log(userList)
    inputTempTownElement.value = "";
    
    townTempOptionsElement.selectedIndex = 0;

    displayTempTownElement.innerHTML = template ({ registration : userList});
    
}
addButtonTempElement.addEventListener("click", getUserRegistrations)


townTempOptionsElement.onchange = function() {

    var townTempFiltered = townTempOptionsElement.selectedIndex;

    var regTempAvailable = townTempOptionsElement.options[townTempFiltered].value;

    var filterTempResults = registrationTempInstanceFactory.registrationsTemp(regTempAvailable);
   
    displayTempTownElement.innerHTML = template ({ registration : filterTempResults});
}


// function filterTownTemplate(){
//     var filterTemp = document.querySelector('.value:checked')
//     if (filterTemp){
      
//         var checkfilter = createTemp.regfilter(filterTemp.value)
//         console.log('ínside')
//         if (checkfilter.length == 0){
//             errr.innerHTML = filterTemp.value +' has no registration number plates!'
//             error()
//         }
//       regNumbersListTemp.innerHTML = compiledNuPlate({numberListTemplate: checkfilter})
//     }else {
//         displayTempTownElement.innerHTML = 'Select Town First Please!'
       
//     }
// }townTempOptionsElement.addEventListener('click', filterTownTemplate)

// CLEAR TOWNS IN DOM AND STORAGE
function resetReg(){
    displayTempTownElement.innerHTML = "";
    userList = [];
    localStorage['townsTemplate'] = userList;
}
resetTempButtonElement.addEventListener("click", resetReg)

// REFRESH PAGE AND DISPLAY ALL DATA
function refreshPage(){
 
    townTempOptionsElement.selectedIndex = 0;
   displayTempTownElement.innerHTML = template ({ registration : userList});

}
refreshTempBtnElement.addEventListener('click', refreshPage)
});
