function OnchangeofNRIC(executionContext) {

    var formContext = executionContext.getFormContext();
    if (formContext.getAttribute("csz_nric") != undefined && formContext.getAttribute("csz_nric") != null) {
        var NRIC = formContext.getAttribute("csz_nric").getValue();
        if (NRIC != "" && NRIC != null) {
            var len4 = NRIC.substring(NRIC.length - 4)
            formContext.getAttribute("csz_nriclast4characters").setValue(len4);
        }

    }
}



