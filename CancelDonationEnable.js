function CancelDonationEnable(primaryControl) {
    "use strict";
    var formContext = primaryControl;
    var paymentStatus = formContext.getAttribute("csz_paymentstatus").getValue();
    var formStatus = formContext.getAttribute("statecode").getValue();
    if (paymentStatus === 1 && formStatus === 0){ 
       formContext.getAttribute("csz_paymentstatus").setValue(4);
       return true;
    }
   
    else   
        return false;
}

if (formContext.getAttribute("apitil_tickettemplate").getValue() != null) {
    control.setDisabled(true);
    }