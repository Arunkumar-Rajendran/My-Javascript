function CalculateAge()
    {
    
    if(Xrm.Page.getAttribute("birthdate").getValue() != null) 
    { 
           var currentdate = new Date(); 
           var birthdate = Xrm.Page.getAttribute("birthdate").getValue(); 
           var monthdiff = currentdate.getMonth() - birthdate.getMonth();           
	   var currentage;

           if(monthdiff > -1) 
           {
		currentage = currentdate.getFullYear() - birthdate.getFullYear();                     
                Xrm.Page.getAttribute("new_currentage").setValue(currentage);
           }
           else
           {
		currentage = currentdate.getFullYear() - birthdate.getFullYear() - 1
                Xrm.Page.getAttribute("new_currentage").setValue(currentage);
           }
    }
    }