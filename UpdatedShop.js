function GenerateTDRButtonEnableRule(formContext) {
    "use strict";
    var formType = formContext.ui.getFormType();
    if (formType !== 1) {
        var _ReceiptNumber = formContext.data.entity.attributes.get("csz_tdrreceiptnumber").getValue();
        if (_ReceiptNumber !== null) 
            return false;
        else
            return true;
    }
}

function GenerateTDRNumber(formContext) {
    "use strict";
	var _bool = formContext.data.entity.attributes.get("csz_generatetdrreceiptnumber").getValue();
	if(_bool === true)
	{
	formContext.getAttribute("csz_generatetdrreceiptnumber").setValue(false);
	formContext.data.entity.save();
	}
	else
	{
	formContext.getAttribute("csz_generatetdrreceiptnumber").setValue(true);
	formContext.data.entity.save();
	}
}
function PopulateNRICUEN(ExecutionContext) {    
    var formcontext = ExecutionContext.getFormContext();
    'use strict';
    var donor = formcontext.getAttribute("csz_donor").getValue();
    
    if (donor !== null && donor !== "") {
        var guid = formcontext.getAttribute("csz_donor").getValue()[0].id;
        var entityName = formcontext.getAttribute("csz_donor").getValue()[0].entityType;
        guid = guid.replace("{", "").replace("}", "");        
        if (entityName == "account") {
           if (formcontext.getAttribute("csz_donatedas") != null && formcontext.getAttribute("csz_donatedas").getValue() == null) {
                formcontext.getAttribute("csz_donatedas").setValue(2);
                formcontext.getAttribute("csz_donatedas").setSubmitMode("always");
            }
            SetUEN(formcontext, guid);
        }
        else if (entityName == "contact") {
            if (formcontext.getAttribute("csz_donatedas") != null && formcontext.getAttribute("csz_donatedas").getValue() == null) {
                formcontext.getAttribute("csz_donatedas").setValue(1);
                formcontext.getAttribute("csz_donatedas").setSubmitMode("always");
            }
            SetNRIC(formcontext, guid);
        }
    }   
}


//addedd on 30/04/2021
function SetNRIC(formcontext, guid) {    
    var globalContext = Xrm.Utility.getGlobalContext();
       
    var req = new XMLHttpRequest();
    req.open("GET", globalContext.getClientUrl() + "/api/data/v9.1/contacts(" + guid + ")?$select=csz_nricfin", true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 200) {
                var result = JSON.parse(this.response);
                console.log('result',result);
                if (result["csz_nricfin"] != null && result["csz_nricfin"] != "")
                    var nric = result["csz_nricfin"];
                var recurringDonationNRIC = formcontext.getAttribute("csz_nricfin").getValue();
                if (recurringDonationNRIC == null || recurringDonationNRIC == "") {
                    formcontext.getAttribute("csz_nricfin").setValue(nric);
                    formcontext.getAttribute("csz_identificationtype").setValue(1)
                    formcontext.getAttribute("csz_identificationtype").setSubmitMode("always");
                }                
            } else {
                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    req.send();    
}

//addedd on 30/04/2021
function SetUEN(formcontext, guid) {    
    var globalContext = Xrm.Utility.getGlobalContext();
       
    var req = new XMLHttpRequest();
    req.open("GET", globalContext.getClientUrl() + "/api/data/v9.1/accounts(" + guid + ")?$select=csz_uenno", true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 200) {
                var result = JSON.parse(this.response);
                console.log('result',result);
                if (result["csz_uenno"] != null && result["csz_uenno"] != "")
                    var uen= result["csz_uenno"];
                var recurringDonationUEN = formcontext.getAttribute("csz_uennumber").getValue();
                if (recurringDonationUEN != null || recurringDonationUEN != "") {
                    formcontext.getAttribute("csz_uennumber").setValue(uen);
                    //formcontext.getAttribute("csz_identificationtype").setValue(1)
                    formcontext.getAttribute("csz_identificationtype").setSubmitMode("always");
                }                
            } else {
                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    req.send();    
}

function HideBankInfoSection(executionContext) {
    "use strict";
    var formContext = executionContext.getFormContext(); // get formContext 
    var GIROMode= formContext.getAttribute("csz_paymentmethod").getValue();
    if (GIROMode!= null && GIROMode!= undefined && GIROMode=== 4){
        formContext.ui.tabs.get("gentab").sections.get("bankinfo").setVisible(true);
     }
    else{
        formContext.ui.tabs.get("gentab").sections.get("bankinfo").setVisible(false);
   }
}
// JavaScript source code
function UENValidate(executionContext) {
    debugger;
    var debug = true;
    var formContext = executionContext.getFormContext();
    if (formContext.getAttribute("csz_uennumber").getValue() != null) {
        var uen = formContext.getAttribute("csz_uennumber").getValue()
        const entityTypeIndicator = [
            'LP', 'LL', 'FC', 'PF', 'RF', 'MQ', 'MM', 'NB', 'CC', 'CS', 'MB', 'FM', 'GS', 'GA',
            'GB', 'DP', 'CP', 'NR', 'CM', 'CD', 'MD', 'HS', 'VH', 'CH', 'MH', 'CL', 'XL', 'CX',
            'RP', 'TU', 'TC', 'FB', 'FN', 'PA', 'PB', 'SS', 'MC', 'SM'
        ];

        if (debug) {
            console.log('(A) Businesses registered with ACRA');
            console.log('(B) Local companies registered with ACRA');
            console.log('(C) All other entities which will be issued new UEN');
        }

        // check that uen is not empty
        if (!uen || String(uen) === '') {
            if (debug) {
                console.log('UEN is empty');
            }
            alert("Invalid UEN!");
            formContext.getAttribute("csz_uennumber").setValue(null);
            return false;
        }

        // check if uen is 9 or 10 digits
        if (uen.length < 9 || uen.length > 10) {
            if (debug) {
                console.log('UEN is not 9 or 10 digits');
            }
            alert("Invalid UEN!");
            formContext.getAttribute("csz_uennumber").setValue(null);
            return false;
        }

        uen = uen.toUpperCase();
        var uenStrArray = uen.split('');

        // (A) Businesses registered with ACRA
        if (uenStrArray.length === 9) {
            // check that last character is a letter
            if (!isNaN(uenStrArray[uenStrArray.length - 1])) {
                if (debug) {
                    console.log('(A) last character is not an alphabet');
                }
                alert("Invalid UEN!");
                formContext.getAttribute("csz_uennumber").setValue(null);
                return false;
            }

            for (var i = 0; i < uenStrArray.length - 1; i++) {
                // check that first 8 letters are all numbers
                if (isNaN(uenStrArray[i])) {
                    if (debug) {
                        console.log('(A) there are non-numbers in 1st to 8th letters');
                    }
                    alert("Invalid UEN!");
                    formContext.getAttribute("csz_uennumber").setValue(null);
                    return false;
                }
            }

            // (A) Businesses registered with ACRA (SUCCESS)
            if (debug) {
                console.log('valid (A) Businesses registered with ACRA');
            }
            //alert("Businesses registered with ACRA!");
            formContext.getAttribute("csz_uentype").setValue(1);
            return true;
        } else if (uenStrArray.length === 10) {
            // check that last character is a letter
            if (!isNaN(uenStrArray[uenStrArray.length - 1])) {
                if (debug) {
                    console.log('(B)(C) last character is not an alphabet');
                }
                alert("Invalid UEN!");
                formContext.getAttribute("csz_uennumber").setValue(null);
                return false;
            }

            // (B) Local companies registered with ACRA
            if (!isNaN(uenStrArray[0]) && !isNaN(uenStrArray[1]) && !isNaN(uenStrArray[2]) && !isNaN(uenStrArray[3])) {
                // check that 5th to 9th letters are all numbers
                if (!isNaN(uenStrArray[4]) && !isNaN(uenStrArray[5]) && !isNaN(uenStrArray[6]) &&
                    !isNaN(uenStrArray[7]) && !isNaN(uenStrArray[8])) {
                    // (B) Local companies registered with ACRA (SUCCESS)
                    if (debug) {
                        console.log('valid (B) Local companies registered with ACRA');
                    }
                    //alert("Local companies registered with ACRA!");
                    formContext.getAttribute("csz_uentype").setValue(2);
                    return true;
                } else {
                    if (debug) {
                        console.log('(B) there are non-numbers in 5th to 9th letters');
                    }
                    alert("Invalid UEN!");
                    formContext.getAttribute("csz_uennumber").setValue(null);
                    return false;
                }
                return true;
            }
            // (C) All other entities which will be issued new UEN
            else {
                // check that 1st letter is either T or S or R
                if (uenStrArray[0] !== 'T' && uenStrArray[0] !== 'S' && uenStrArray[0] !== 'R') {
                    if (debug) {
                        console.log('(C) 1st letter is incorrect');
                    }
                    alert("Invalid UEN!");
                    formContext.getAttribute("csz_uennumber").setValue(null);
                    return false;
                }

                // check that 2nd and 3rd letters are numbers only
                if (isNaN(uenStrArray[1]) || isNaN(uenStrArray[2])) {
                    if (debug) {
                        console.log('(C) 2nd and 3rd letter is incorrect');
                    }
                    alert("Invalid UEN!");
                    formContext.getAttribute("csz_uennumber").setValue(null);
                    return false;
                }

                // check that 4th letter is an alphabet
                if (!isNaN(uenStrArray[3])) {
                    if (debug) {
                        console.log('(C) 4th letter is not an alphabet');
                    }
                    alert("Invalid UEN!");
                    formContext.getAttribute("csz_uennumber").setValue(null);
                    return false;
                }

                // check entity-type indicator
                var entityTypeMatch = false,
                    entityType = String(uenStrArray[3]) + String(uenStrArray[4]);
                for (var i = 0; i < entityTypeIndicator.length; i++) {
                    if (String(entityTypeIndicator[i]) === String(entityType)) {
                        entityTypeMatch = true;
                        console.log('(C) entity-type' + entityTypeIndicator[i]);
                    }
                }
                if (!entityTypeMatch) {
                    if (debug) {
                        console.log('(C) entity-type indicator is invalid');
                    }
                    alert("Invalid UEN!");
                    formContext.getAttribute("csz_uennumber").setValue(null);
                    return false;
                }

                // check that 6th to 9th letters are numbers only
                if (isNaN(uenStrArray[5]) || isNaN(uenStrArray[6]) || isNaN(uenStrArray[7]) || isNaN(uenStrArray[8])) {
                    if (debug) {
                        console.log('(C) 2nd and 3rd letter is incorrect');
                    }
                    alert("Invalid UEN!");
                    formContext.getAttribute("csz_uennumber").setValue(null);
                    return false;
                }

                // (C) All other entities which will be issued new UEN (SUCCESS)
                if (debug) {
                    console.log('valid (C) All other entities which will be issued new UEN');
                }
                formContext.getAttribute("csz_uentype").setValue(3);
                return true;
            }
        }
    }
    //alert("Invalid UEN!");
    //formContext.getAttribute("csz_uennumber").setValue(null);
    return false;
}


//Triggered on change of Donor
function ClearNRICUENFields(ExecutionContext) {    
    var formcontext = ExecutionContext.getFormContext();
    var donor = formcontext.getAttribute("csz_donor").getValue();
    
     if (donor == null && donor == "") {
         formContext.getAttribute("csz_needtaxdeduction").setValue("0");
         formContext.getControl("csz_needtaxdeduction").setDisabled(true);
         formContext.getAttribute("csz_identificationtype").setValue(null);
         formContext.getAttribute("csz_nricfin").setValue(null);
         formContext.getAttribute("csz_uentype").setValue(null);
         formContext.getAttribute("csz_uennumber").setValue(null);
   }
}


//Triggered on change of Donated As, it should clear donor lookup and hide nric/uen fields
function ClearDonor(ExecutionContext) {    
    var formContext = ExecutionContext.getFormContext();
    var donor = formContext.getAttribute("csz_donor").getValue();
    var donatedAs = formContext.getAttribute("csz_donatedas").getValue();
    
   if (donor != null && donor != "") {
         formContext.getAttribute("csz_donor").setValue(null);
   }
   if (donatedAs == "1" && donor == null && donor == "") {
         formContext.getControl("csz_identificationtype").setVisible(false);
         formContext.getControl("csz_nricfin").setVisible(false);
         formContext.getControl("csz_uentype").setVisible(false);
         formContext.getControl("csz_uennumber").setVisible(false);
   }
   else if (donatedAs == "2" && donor != null && donor != "") {
         formContext.getControl("csz_needtaxdeduction").setDisabled(false);
         formContext.getControl("csz_uentype").setVisible(false);
         formContext.getControl("csz_uennumber").setVisible(false);
         formContext.getControl("csz_identificationtype").setVisible(false);
         formContext.getControl("csz_nricfin").setVisible(false);
   }
}

//Triggered on change of Need tax deduction
function HideShowNRICUENFields(ExecutionContext) {    
    var formContext = ExecutionContext.getFormContext();
    var needTaxDeduction = formContext.getAttribute("csz_needtaxdeduction").getValue();
    var donatedAs = formContext.getAttribute("csz_donatedas").getValue();
    
   if (needTaxDeduction == "1" && donatedAs == "1") {
         formContext.getControl("csz_identificationtype").setVisible(true);
         formContext.getControl("csz_nricfin").setVisible(true);
         formContext.getControl("csz_uentype").setVisible(false);
         formContext.getControl("csz_uennumber").setVisible(false);
   }
   else if (needTaxDeduction == "1" && donatedAs == "2") {
         formContext.getControl("csz_identificationtype").setVisible(false);
         formContext.getControl("csz_nricfin").setVisible(false);
         formContext.getControl("csz_uentype").setVisible(true);
         formContext.getControl("csz_uennumber").setVisible(true);
   }
   else if (needTaxDeduction == "0" ){
         formContext.getControl("csz_identificationtype").setVisible(false);
         formContext.getControl("csz_nricfin").setVisible(false);
         formContext.getControl("csz_uentype").setVisible(false);
         formContext.getControl("csz_uennumber").setVisible(false);
   }
  
}

function test(executionContext)
{
    

var currentDateTime = new Date();
console.log(Xrm.Page.getAttribute("csz_stoprecurringdonation").getValue());

if(Xrm.Page.getAttribute("csz_stoprecurringdonation").getValue() == true){
Xrm.Page.getAttribute("csz_stoprecurringdonationdate").setValue(currentDateTime);
}
else
{
Xrm.Page.getAttribute("csz_stoprecurringdonationdate").setValue(null);
}
//alert ("hello");
}
