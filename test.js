function Firstname()
{
    if (Xrm.page.getAttribute("new_firstname").getValue()!=null)
    {
        Xrm.Page.getAttribute("new_lastname").setValue("Test");
    }
    else
    {
        Xrm.Page.getAttribute("new_lastname").setValue("null");
    }
}