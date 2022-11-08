
function SetDate(executionContext)
try
{  
     
var formContext = executionContext.getFormContext(); // get formContext 
var FormType = formContext.ui.getFormType();
if(formContext.ui.getFormType() == 1){
 var currentDateTime = new Date();
Xrm.Page.getAttribute("csz_ismanual").setValue(true);
Xrm.Page.getAttribute("csz_dateofpayment").setValue(currentDate);
}

}
catch(e)
{
   alert("An error occurred, please try later");
}
