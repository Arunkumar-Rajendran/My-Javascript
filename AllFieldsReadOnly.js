function AllFieldsReadOnly(executionContext) {

    var formContext = executionContext.getFormContext();

formContext.ui.controls.forEach(function (control, index) {
            var controlType = control.getControlType();
            if (controlType != "webresource" && controlType != "subgrid" && controlType != "iframe") {
                if( formContext.getAttribute("csz_paymentstatus").getValue()==4)
                {
                control.setDisabled(true);
                }
            }
        })
    }