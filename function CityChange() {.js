
function CityChange (executionContext)
 {
    //Initiated Form Context.
    var formContext = executionContext.getFormContext();
    //Getting Value From Field City
    var City = formContext.getAttribute("csz_city").getValue();
    //Condition If City Is Null.
    if (City == null)//|| City != undefined)
     {
        //Using SetVisible propertly for hiding field State
        formContext.getAttribute("csz_state").setVisible(true);
    }
}


/*function CityChange() {
    if(Xrm.Page.getAttribute("csz_city").getValue() == null) {
        Xrm.Page.getControl("csz_state").setVisible(false);
    }
    else {
        Xrm.Page.getControl("csz_state").setVisible(true);
    }
 }*/
 