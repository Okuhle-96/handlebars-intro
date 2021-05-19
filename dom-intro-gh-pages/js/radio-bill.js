var radioBillAddBtnElement = document.querySelector(".radioBillAddBtn");
var callTotalTwoElement = document.querySelector(".callTotalTwo");
var smsTotalTwoElement = document.querySelector(".smsTotalTwo");
var totalTwoElement = document.querySelector(".totalTwo");

var totalsTemplateElement = document.querySelector(".userTemplate").innerHTML;
var template = Handlebars.compile(totalsTemplateElement);

var instanceFactory = totalBillWidgtet()

function radioBillWidget() {

    var check = document.querySelector("input[name='billItemType']:checked")
    if (check) {
        instanceFactory.getBillString(check.value);
    }

    callTotalTwoElement.innerHTML = template({CallsTotal : instanceFactory.getCallCost().toFixed(2)});
    smsTotalTwoElement.innerHTML = template({SmsTotal : instanceFactory.getSmsCost().toFixed(2)});
    totalTwoElement.innerHTML = template({Totals : instanceFactory.getBillTotal().toFixed(2)});
        
    if (instanceFactory.getBillTotal() >= 30 && instanceFactory.getBillTotal() < 50) {
        document.querySelector(".totalRadio").classList.add("warning"); 
    } else if (instanceFactory.getBillTotal() >= 50) {
        document.querySelector(".totalRadio").classList.remove("warning");
        document.querySelector(".totalRadio").classList.add("danger");
    }
}
radioBillAddBtnElement.addEventListener('click', radioBillWidget);