describe('The Text Bill Factory Function', function(){
    
    it("should return total cost for 2 calls made and 2 sms sent", function(){
        let allTotal = totalBillWidgtet();

        allTotal.getBillString("sms");
        allTotal.getBillString("sms");

        allTotal.getBillString("call");
        allTotal.getBillString("call");

        assert.equal(allTotal.getSmsCost(), 1.50);
        assert.equal(allTotal.getCallCost(), 5.50);
        assert.equal(allTotal.getBillTotal(), 7.00);

    });

    it("should return total cost for 4 calls made", function(){

        let allTotal = totalBillWidgtet();

        allTotal.getBillString("call");
        allTotal.getBillString("call");
        allTotal.getBillString("call");
        allTotal.getBillString("call");

        assert.equal(allTotal.getSmsCost(), 0.00);
        assert.equal(allTotal.getCallCost(), 11.00);
        assert.equal(allTotal.getBillTotal(), 11.00);

    });

    it("should return total cost for 4 smses sent", function(){

        let allTotal = totalBillWidgtet();

        allTotal.getBillString("sms");
        allTotal.getBillString("sms");
        allTotal.getBillString("sms");
        allTotal.getBillString("sms");

        assert.equal(allTotal.getSmsCost(), 3.00);
        assert.equal(allTotal.getCallCost(), 0.00);
        assert.equal(allTotal.getBillTotal(), 3.00);

    });

    
})