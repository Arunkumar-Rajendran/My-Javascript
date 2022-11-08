function markFieldsReadOnly(executionContext) {
    try
    {
   
    var formContext = executionContext.getFormContext(); // get formContext 
    var FormType = formContext.ui.getFormType();
    var paymentstatus = formContext.getAttribute("csz_paymentstatus").getValue();
	var financestatus = formContext.getAttribute("csz_financestatus").getValue();
	if (paymentstatus === 1 && financestatus == 3 ) {
       
        formContext.getControl("csz_donationchannel").setDisabled(true);
        formContext.getControl("csz_donationtype").setDisabled(true);
        formContext.getControl("csz_donatedas").setDisabled(true);
        formContext.getControl("csz_donor").setDisabled(true);
        formContext.getControl("csz_purpose").setDisabled(true);
        formContext.getControl("csz_needtaxdeduction").setDisabled(true);
        formContext.getControl("csz_fundraising").setDisabled(true);
        formContext.getControl("csz_pledge").setDisabled(true);
        formContext.getControl("csz_recurringdonationreference").setDisabled(true);
       
    }
}
catch(e)
{
   alert("An error occurred, please try later");
}
}