//Call Global Custom Action from Javascript using Web API
function CallCustomActionFromJavaScript() {
    
    //get the current organization url
	var globalContext = Xrm.Utility.getGlobalContext();
    var serverURL = globalContext.getClientUrl();

    //query to send the request to the global Action 
	// Global Action Unique Name - this name is Case Sensitive
    var actionName = "csz_MyCustomAction"; 

    //set the current loggedin userid in to _inputParameter of the 
    var InputParamValue = globalContext.userSettings.userId;
 
    //Pass the input parameters to action
    var data = {
    "MyInputParam": InputParamValue
    };

    //Create the HttpRequestObject to send WEB API Request 
    var req = new XMLHttpRequest();
    req.open("POST", serverURL + "/api/data/v9.2/" + actionName, true);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");

    req.onreadystatechange = function () {
        if (this.readyState == 4 /* complete */)
        {
            req.onreadystatechange = null;
           
            if (this.status == 200 || this.status == 204)
            {
                alert("Action Called Successfully...");

               //Get the output parameter of the action (if any)
               result = JSON.parse(this.response);

               alert(result.MyOutputParam);
            }
            else
            {
                var error = JSON.parse(this.response).error;
                alert("Error in Action: "+error.message);
            }
        }
    };
    //Execute request passing the input parameter of the action 
    req.send(window.JSON.stringify(data));
}