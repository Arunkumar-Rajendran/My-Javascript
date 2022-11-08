function Lockfields(executionContext) {
    try
    {
   
    var formContext = executionContext.getFormContext(); // get formContext 
    var FormType = formContext.ui.getFormType();
    var city = formContext.getAttribute("csz_city").getValue();
	var state = formContext.getAttribute("csz_state").getValue();
	if (city === 1 && state == 4 ) {
       
        formContext.getControl("csz_name").setDisabled(true);
        formContext.getControl("csz_demo1").setDisabled(true);
        formContext.getControl("csz_demo2").setDisabled(true);
        formContext.getControl("csz_demo3").setDisabled(true);
        formContext.getControl("csz_demo4").setDisabled(true);
        formContext.getControl("csz_demo5").setDisabled(true);
       
    }
}
catch(e)
{
   alert("An error occurred, please try later");
}
}