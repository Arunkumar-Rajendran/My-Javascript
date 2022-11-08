function GenerateReceiptEnable(primaryControl) {
    "use strict";
    var formContext = primaryControl;
    var financestatus = formContext.getAttribute("csz_financestatus").getValue();
    var formStatus = formContext.getAttribute("statecode").getValue();
    if ( financestatus === 3 && formStatus === 0) 
    return true;   
    else     
    return false;
    
}

function GenerateReceiptAction(primaryControl)
{
    alert("Button clicked");
    var formContext = primaryControl;
    var GenerateReceipt = formContext.getAttribute("csz_generate").getValue();
    if (formContext.getAttribute("csz_generate")!=null)  
    formContext.getAttribute("csz_generate").setValue(1);
    }





