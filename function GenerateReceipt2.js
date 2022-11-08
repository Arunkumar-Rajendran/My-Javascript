function GenerateReceiptEnable(executionContext) {
 
    var formContext = executionContext.getFormContext();
    var financestatus = formContext.getAttribute("csz_financestatus").getValue();
    
    if (financestatus === 3) {
        formContext.getAttribute("csz_generate").setValue(true);
    }
 else
 {
    formContext.getAttribute("csz_generate").setValue(false);
 }
}

