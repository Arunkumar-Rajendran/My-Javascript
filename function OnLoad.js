function OnLoad(executionContext) {
   var formContext = executionContext.getFormContext();
   formContext.getAttribute("new_myoptionalfield").addOnChange(DisplayAlert)
}
 
function DisplayAlert(executionContext) {
     alert("Field has changed");
}
