using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Workflow;
using System.Activities;


namespace CustomizationOfCustomWorkflow
{
    class Student_NextDateOfBirth : CodeActivity
    {
        [Input("Date of Birth for Record")]
        [RequiredArgument]
        [ReferenceTarget("csz_newstudent")]
        public InArgument<EntityReference>Student { get; set; }

  
        protected override void Execute(CodeActivityContext context)
        { 
            try
            {
                IWorkflowContext workflowcontext = context.GetExtension<IWorkflowContext>();
                IOrganizationServiceFactory serviceFactory = context.GetExtension<IOrganizationServiceFactory>();
                IOrganizationService service = serviceFactory.CreateOrganizationService(workflowcontext.InitiatingUserId);

                Guid studentId = this.Student.Get(context).Id;
                Entity studentEntity = service.Retrieve("csz_newstudent"),StudentId;

                DateTime? dateofBirth = new DateTime();
            

                if (studentEntity.Contains("csz_dateofbirth"))
                {

                    DateOfBirth = (DateTime?)studentEntity["csz_dateofbirth"];
                    if (dateofBirth.Value.Year > DateTime.Now.Year)
                    {
                        throw new Exception("Date of birth cannot have year Greater than current year");

                    }else if(dateofBirth.Value.Year == DateTime.Now.Year)
                        {
                        if (dateofBirth.Value.Month > DateTime.Now.Month)
                            throw new Exception("Date of birth cannot have month greater than current month & year");

                    }else if(dateofBirth.Value.Month == DateTime.Now.Month)
                    {
                        if (dateofBirth.Value.Day > DateTime.Now.Day)
                        {
                            throw new Exception("Date of birth cannot be greater than current date");
                        }
                    }
                }
                else
                {
                    dateofBirth = null;
                }
                    if(dateofBirth == null)
                {
                    return;
                }
                DateTime nextDateOfBirth = GetNextDateOfBirth(dateofBirth.Value);
                Entity updateStudent = new Entity("csz_newstudent");
                updateStudent.Id = studentId;
                updateStudent["csz_nextdateofbirth"] = nextDateOfBirth;
                service.Update(updateStudent);
            }
            catch (Exception ex)
            {
                throw new InvalidPluginExecutionException(ex.Message);           }
            

        }

        private DateTime GetNextDateOfBirth(DateTime value)
        {
            DateTime nextDateOfBirth = new DateTime(dateofBirth.year, datofBirth.Month, dateofBirth.Day);

            if(nextDateOfBirth.Month ==2 && nextDateOfBirth ==29)
            {
                if(DateTime.IsLeapYear(DateTime.Now.Year))//Not leap year
                {
                   if(nextDateOfBirth.Month < DateTime.Now.Month)
                    {
                        if (DateTime.IsLeapYear(DateTime.Now.Year+1))
                        {
                            nextDateOfBirth = new DateTime(DateTime.Now.Year + 1, nextDateOfBirth.Month, nextDateOfBirth.Day);
                        }
                        else
                        {
                            nextDateOfBirth = new DateTime(DateTime.Now.Year + 1, nextDateOfBirth.Month, nextDateOfBirth.Day-1);
                        }
                    }
                  

                }
                else
                {
                    if(nextDateOfBirth.Month<DateTime.Now.Month)
                    {
                        nextDateOfBirth = new DateTime(DateTime.Now.Year + 1, nextDateOfBirth.Month, nextDateOfBirth.Day - 1);
                    }
                }
            }
            else
            {
                if(nextDateOfBirth.Month<DateTime.Now.Month)
                {
                    nextDateOfBirth = new DateTime(DateTime.Now.Year + 1, nextDateOfBirth.Month, nextDateOfBirth.Day);
                }
                else if (nextDateOfBirth = DateTime.Now.Month)
                {
                    if(nextDateOfBirth.Day<DateTime.Now.Day)
                    {
                        nextDateOfBirth = new DateTime(DateTime.Now.Year + 1, nextDateOfBirth.Month, nextDateOfBirth.Day);
                    }
                }
                else 
                {
                    nextDateOfBirth = new DateTime(DateTime.Now.Year, nextDateOfBirth.Month, nextDateOfBirth.Day);
                }
            }
        }
    }
}
