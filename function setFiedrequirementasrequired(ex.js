function setFiedrequirementasrequired(executionContext) {

    var formContext = executionContext.getFormContext();
   
    var IWISHTORECEIVEPAPERRECEIPTS = formContext.getAttribute("csz_iwishtoreceivepaperreceipts").getValue();
    
    if (IWISHTORECEIVEPAPERRECEIPTS == 1) {
        formContext.getAttribute("csz_residentialaddress").setRequiredLevel("required");
    }
    else {
       
        formContext.getAttribute("csz_residentialaddress").setRequiredLevel("none");

    }
}