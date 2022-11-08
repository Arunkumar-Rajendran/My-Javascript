//Create a new Javascript Webresource (new_Account.js) and copy paste the below code in it and call it on OnLoad of the Account Form.

//After that, open an existing Account record.
function myFunction() {

    
    //Assign variable
var dataAttribute = Xrm.Page.data.entity.attributes.get("csz_age1").getValue();


//Getting guid from recurring donation entity
var objectiD = Xrm.Page.data.entity.getId("csz_recurringdonation");


var objectiD = Xrm.Page.data.entity.getId("csz_donation");

//console.log(Xrm.Page.getAttribute("csz_recurringdonation").getValue());

if(Xrm.Page.getAttribute("csz_age1").getValue()!=null){
Xrm.Page.getAttribute("csz_age").setValue();
}

else
{
Xrm.Page.getAttribute("csz_donation").setValue('null');
}
alert ("hello");
}

Xrm.WebApi.updateRecord("csz_donation", "6b28f4e7-8418-ed11-b83f-000d3a0a5781", data).then(
    function success(result) {
    // Perform operations on record update
    Xrm.Utility.alertDialog("Donation updated successfully", null);
    },
    function (error) {
    // Handle error conditions
    Xrm.Utility.alertDialog(error.message, null);
    }
    );
    alert("Page is loaded");
  



   

   













// Assign variables to Recurring donation entity attributes
// var dataAttribute = element.getAttribute('csz_age1');
// var dataAttribute = element.getAttribute('csz_address1');
// var dataAttribute = element.getAttribute('csz_phonenumber1');
// console.log(dataAttribute);

// Assign variables to donation entity attributes
// var dataAttribute = element.getAttribute('csz_age');
// var dataAttribute = element.getAttribute('csz_address');
// var dataAttribute = element.getAttribute('csz_phonenumber');
// console.log(dataAttribute);

// if (Xrm.Page.getAttribute("csz_address1").getValue() == "true") {
//     Xrm.Page.getAttribute("csz_address").setValue();
// }
// if (Xrm.Page.getAttribute("csz_phonenumber1").getValue() == "true") {
//     Xrm.Page.getAttribute("csz_phonenumber").setValue();
// }