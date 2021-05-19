var billTypeTextElement = document.querySelector(".billTypeText"); 
var callTotalOneElement = document.querySelector(".callTotalOne");
var smsTotalOneElement = document.querySelector(".smsTotalOne");
var totalOneElement = document.querySelector(".totalOne");
var addToBillBtnElement = document.querySelector(".addToBillBtn"); 

var totalsTemplateElement = document.querySelector(".userTemplate").innerHTML;
var template = Handlebars.compile(totalsTemplateElement);

var textInstance = totalBillWidgtet()

function textBillWidget() {
  
   textInstance.getBillString(billTypeTextElement.value)

    callTotalOneElement.innerHTML = template({CallsTotal : textInstance.getCallCost().toFixed(2)});
    smsTotalOneElement.innerHTML = template({SmsTotal : textInstance.getSmsCost().toFixed(2)});
    totalOneElement.innerHTML = template({Totals : textInstance.getBillTotal().toFixed(2)});

 
    if (textInstance.getBillTotal() >= 30 && textInstance.getBillTotal() < 50) {
        document.querySelector(".totalText").classList.add("warning"); 
    } else if (textInstance.getBillTotal() >= 50) {
        document.querySelector(".totalText").classList.remove("warning");
        document.querySelector(".totalText").classList.add("danger");
    }
}
addToBillBtnElement.addEventListener('click', textBillWidget);