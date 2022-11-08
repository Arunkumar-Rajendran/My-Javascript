function OnchangeofNRIC(executionContext) {

    var formContext = executionContext.getFormContext();
    if (formContext.getAttribute("csz_icnumber") != undefined && formContext.getAttribute("csz_icnumber") != null) {
        var NRIC = formContext.getAttribute("csz_icnumber").getValue();
        if (NRIC != "" && NRIC != null) {
            var len4 = NRIC.substring(NRIC.length - 4)
            formContext.getAttribute("csz_nriclast4characters").setValue(len4);
        }

    }
}


