//Javascript sourcecode

function alertAccountName(executionContext)
{
    //Read object for form context
    var formContext = executionContext.getFormContext();

    //Read AccountName Value
    var accountname = formContext.getAttribute("name").getValue();


    //Display account name in a pop up window
    alert("welcome" + accountname);
}