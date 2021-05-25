function registrationTemplateFactoryFunction() {

    var capeCities = [];
    var userList = [];
  
    var townsTemplate = {
      'CJ' : 'Paarl',
      'CY' : 'Bellville',
      'CL' : 'Stellenbosch',
      'CA' : 'Cape Town',
    }
  
    // SETTING ERROR MESSAGES
    var exists = " registration already exists!";
    var correctFormat = "Registration is not written in a correct format."
    var nothingToAdd = "There is no registration to add. Please enter a valid registration.";
    var successMsg = " was registered successfully!"
  
    // VALIDATIONS
    var validRegistrations;
    var invalidRegistrations;
    var duplicates = [];
    var invalidRegNums = [];
  
    function regList(inputTempReg) {
      userList.unshift(inputTempReg);
    }
  
    function inputTown(town){
      if(town.startsWith("CA") || town.startsWith("CJ") ||
         town.startsWith("CL") || town.startsWith("CY")){
          capeCities.push(town);
         }
         return capeCities;
    }
  
    function registrationsTemp(inputTempReg) {
  
        var str;
        var townTempFiltered = [];
  
          for (var town in townsTemplate) {
            if (townsTemplate[town] === inputTempReg) {
              str = town;
            }
        }
       
      userList.forEach(function(car) {
          if(car.startsWith(str)) {
           townTempFiltered.push(car);
           }
  
      });
  
      return townTempFiltered;
      
    }
  
    function returnErrors(town){
        if(/^((CJ|CY|CL|CA)\-([0-9]){3}\-([0-9]){3})$/.test(reg) && /^((CJ|CY|CL|CA)\-([0-9]){6})$/.test(reg) && /^((CJ|CY|CL|CA)\-([0-9]){5})$/.test(reg)) {
              if(reg === town){
                return reg + exists;        
              }if (town === ""){
                return nothingToAdd;        
              }if(reg !== town){
                return town + successMsg;           
              }
        }else {
          return correctFormat;   
        }
    }
  
  
    function checkRegNumbers(reg) {
    
      if(/^((CJ|CY|CL|CA)\s([0-9]){3}\-([0-9]){3})$/.test(reg) || /^((CJ|CY|CL|CA)\-([0-9]){6})$/.test(reg) || /^((CJ|CY|CL|CA)\-([0-9]){5})$/.test(reg)) {
        userList.forEach(function(car){
          if(car == reg) {
            invalidRegistrations++;
            duplicates.push(reg);
            return false;
            
          } else {
            validRegistrations++;
          }
        });
      } else {
        invalidRegistrations++;
        invalidRegNums.push(reg);
        return false;
        
      }
      return true;
    }
  
  
    function caseFormat(str) {
  
      str = str.toUpperCase();
    
      var list = str.split(',');
        list.forEach(function(regValue, index ,list){
        regValue = regValue.trim();
        list[index] = regValue;
      });
      return list;
    }
  
    return {
        regList,
        checkRegNumbers,
        registrationsTemp,
        returnErrors,
        inputTown,
        caseFormat
    }
  }
  