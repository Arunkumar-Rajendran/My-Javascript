function commonEventHandler(executionContext) {
    var formContext = executionContext.getFormContext();    
    var telephoneAttr = formContext.data.entity.attributes.get('telephone1');
    var isNumberWithCountryCode = telephoneAttr.getValue().substring(0,1) === '+';

    // telephoneField will be a form control if invoked from a form OnChange event;
    // telephoneField will be a editable grid GridCell object if invoked from editable grid OnChange event.
    var telephoneField = telephoneAttr.controls.get(0);

    if (!isNumberWithCountryCode) {
        telephoneField.setNotification('Please include the country code beginning with ‘+’.', 'countryCodeNotification');
    }
    else {
        telephoneField.clearNotification('countryCodeNotification');
    }
}