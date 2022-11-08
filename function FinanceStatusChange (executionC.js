function FinanceStatusChange (executionContext)
 {
    //Initiated Form Context.
    var formContext = executionContext.getFormContext();
  
    var financestatus = formContext.getAttribute("csz_financestatus").getValue();
    var generatereceipt = formContext.getAttribute("csz_generate").getValue();

    if (financestatus == 3)
     {
        //Using SetVisible propertly for hiding field State
        formContext.getAttribute("csz_state").setVisible(true);
    }
}
