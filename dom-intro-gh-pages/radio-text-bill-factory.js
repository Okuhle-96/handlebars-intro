function totalBillWidgtet(){
    
    var theBillTotal = 0;
    var theSmsTotal = 0;
    var theCallTotal = 0;

    function getCallCost(){
        return theCallTotal;
    }
    
    function getSmsCost(){
        return theSmsTotal;
    }


    function getBillString(bill){

        var billString = bill.trim();

        if (billString === "sms"){
            theSmsTotal = theSmsTotal += 0.75;
            theBillTotal += 0.75;
            
        }else if(billString === "call"){
            theCallTotal = theCallTotal += 2.75;
            theBillTotal += 2.75;
          
        }
       

    }



    function getBillTotal(){

        return theBillTotal;
   
    }

    return {
       getBillString,
       getBillTotal,

       getCallCost,
       getSmsCost
    }


}




        
    


