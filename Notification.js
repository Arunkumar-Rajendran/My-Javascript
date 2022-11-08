

var nameValidation = function(formExecutionContext){
var formContext = formExecutionContext.getFormContext();
var firstNamevalue = formContext.getAttribute("").getvalue();
var namepattern = new RegExp("^[a-zA-Z0-9\\-\\s]+$");
if (namepattern.test(firstNamevalue)){
    formContext.ui.setFormNotification("first name has correct value","INFO","firstnamenotify");
    if(firstNamevalue == "warning"){
       formContext.ui.setFormNotification("first name has correct value","INFO","firstnamenotify");
    }

    if (firstNamevalue == "alert"){
        Xrm.Utility.alertdialog("This is alert msg",function()
        {
            formContext.ui.clearFormNotification("firstNamenotify");
            alert("This is OK call back");
        }
    }


    if (firstNamevalue == "confirm"){
        Xrm.Utility,confirmDialog("This is .confirm dialog",function()
        {
          formContext.ui.clearFormNotification("firstNamenotify"); 
          alert("This is confirm OK"); 
        } function(){
         formContext.ui.clearFormNotification("firstNamenotify");
         alert ("This is confirm cancel");
        }
    }
} else {
   formContext.ui.setFormNotification("First name should be alphanumeric or space or -","ERROR","firstnamenotify");
  
}
return{
    nameValidation : nameValidation
}
}







