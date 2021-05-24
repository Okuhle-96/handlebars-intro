
var regex = /^((CJ|CY|CL|CA)\s\d{3}\s\d{3})$/|/((CJ|CY|CL|CA)\-([0-9]){6})$/|/((CJ|CY|CL|CA)\-([0-9]){3}\-([0-9]){3})$/;
var reg = "CA 199 199" || "CA-199199" || "CA-199-199"
var userReg = [];
describe("Registration Numbers", function(){



    describe("should be able to take registrations in TWO formats", function(){
        it("should be able to return registration number written in space format", function() {
          let reg = registrationFactoryFunction();
         
          assert.equal("CA 199 299", reg.inputTown('CA 199 299'));
            
        });
        it("should be able to return registration number written in a double dash format", function() {
          let reg = registrationFactoryFunction();
         
          assert.equal("CY-199-299", reg.inputTown('CY-199-299'));
            
        });
        it("should be able to return registration number written in a single dash format", function() {
          let reg = registrationFactoryFunction();
         
          assert.equal("CY-199299", reg.inputTown('CY-199299'));
            
        });
      });

    describe("should be able to take in any registrations from The Western Cape", function(){
  

        it("should be able to return registration number from Cape Town", function() {
          let reg = registrationFactoryFunction();
         
          assert.equal("CA 199-289", reg.inputTown('CA 199-289'));
            
        });


    it("should be able to return registration number from Bellville", function() {
      let reg = registrationFactoryFunction();
      assert.equal("CY 199 299", reg.inputTown('CY 199 299'));
    });

    it("should be able to return registration number from Paarl", function() {
      let reg = registrationFactoryFunction();
      assert.equal("CJ 199 299", reg.inputTown('CJ 199 299'));
    });

    it("should be able to return registration number from Stellenbosch", function() {
      let reg = registrationFactoryFunction();
      assert.equal("CL 199 299", reg.inputTown('CL 199 299'));
    });
    
    });


  describe("should be able to return errors", function(){


    it("should return an error message if the is not written in a correct format.", function() {
      let reg = registrationFactoryFunction();
      assert.deepEqual('Registration is not written in a correct format.', reg.returnErrors('CY 199 199'));
    });
    it("should return an empty array if the registration number is not recognised", function() {
      let reg = registrationFactoryFunction();
      assert.deepEqual([], reg.inputTown('CF 199 299'));
    });
  })


  describe("should be able to filter towns", function(){
    it("should be able to return registrations from Cape Town", function(){
      let reg = registrationFactoryFunction();

      userReg = ['CA 884 545', 'CA 333 545', 'CA 444 545', 'CF 884 545', 'CY 884 545']
      // reg.inputTown('CA 884 545');
      // reg.inputTown('CA 333 545');
      // reg.inputTown('CA 444 545');
      // reg.inputTown('CF 884 545');
      // reg.inputTown('CY 884 545');

     assert.deepEqual(['CA 884 545', 'CA 333 545', 'CA 444 545'], reg.registrations('Cape Town'));

    });

    it("should be able to return registrations from Bellville", function(){
      let reg = registrationFactoryFunction();

      userReg = ['CY 884 545', 'CY 333 545', 'CY 444 545', 'CF 884 545']
    
      

     assert.deepEqual(['CY 884 545', 'CY 333 545', 'CY 444 545'], reg.registrations('Bellville'));

    });

    it("should be able to return registrations from Paarl", function(){
      let reg = registrationFactoryFunction();

      userReg = ['CJ 884 545', 'CJ 333 545', 'CJ 444 545', 'CF 884 545']
    

     assert.deepEqual(['CJ 884 545', 'CJ 333 545', 'CJ 444 545'], reg.registrations('Paarl'));

    });

    it("should be able to return registrations from Stellenbosch", function(){
      let reg = registrationFactoryFunction();

      userReg = []
    

     assert.deepEqual([], reg.registrations('CL'));

    }); 
  });

});

