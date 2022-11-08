//Auth URL:https://login.microsoftonline.com/common/oauth2/authorize?resource=https://orgbbfe3b74.crm8.dynamics.com/
//Client ID:983d147f-0791-4f3c-a031-dd6cffa4ff0d
//Callback URL:http://localhost

//BPF ID instance:9c32d97c-53f1-ec11-bb3c-000d3af0939b

//BPF ID: %7bD2E22245-BDCA-4ACF-8256-2AA4382A01AC%7d

//api/data/v9.0/processstages?$select=stagename&$filter=processid/workflowid eq %7bD2E22245-BDCA-4ACF-8256-2AA4382A01AC%7d

//stage 2 ID: abe706b4-ea83-41e4-8001-35a6f5ce9141

//stage 1 ID: bde6ae62-9b25-4013-b975-8ae464766630


function AdvanceBPF(executionContext) {
    debugger;
     var formContext = executionContext.getFormContext();
 
     var Stage1 = "bde6ae62-9b25-4013-b975-8ae464766630";
     var Stage2 = "abe706b4-ea83-41e4-8001-35a6f5ce9141";
 
     var entity = {};
     entity["activestageid@odata.bind"] = "/processstages(" + Stage2 + ")"; 
     entity["traversedpath"] = Stage1 + "," + Stage2;
 
   var BPFId = "9c32d97c-53f1-ec11-bb3c-000d3af0939b";
  
   var req = new XMLHttpRequest();
   req.open("PATCH", Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.1/new_accountbpfs(" + BPFId + 
")", true);
   req.setRequestHeader("OData-MaxVersion", "4.0");
   req.setRequestHeader("OData-Version", "4.0");
   req.setRequestHeader("Accept", "application/json");
   req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
   debugger;
   req.onreadystatechange = function() {
       if (this.readyState === 4) {
           req.onreadystatechange = null;
  
           if (this.status === 204) {
            debugger;
               alert("Success");
           } else {
            debugger;
               alert("Error");
           }
       }
   };
   req.send(JSON.stringify(entity));
}
