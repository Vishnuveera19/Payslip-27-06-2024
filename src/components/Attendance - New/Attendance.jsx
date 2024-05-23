import { Typography, Grid, FormControl, InputLabel, Card, CardContent, Checkbox, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { PAYMEMPLOYEE, TIMECARD, UPDATEDTIMECARD, SHIFTMONTH } from '../../serverconfiguration/controllers';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import React from 'react';

function cleararray(arr)
{
  while(arr.length>0) 
     { 
      arr.pop()
     }
}
function getMatchingRecords(array1, array2) {
  return array2.filter(obj1 => {
      return array1.some(obj2 => obj1.employeecode === obj2.pnEmployeeCode);
  });
}

export default function AttendanceNew() {
  const [employee, setEmployee] = useState([]);
  const [updatedTimeCard, setUpdatedTimeCard] = useState([]);
  const [company, setCompany] = useState("");
  const [branch, setBranch] = useState("");
  const [dataArray, setDataArray] = useState([]);
  const [shiftCode, setShiftCode] = useState("");
  const [shiftmonth, setShiftMonth] = useState([]);
  const [att,setAtt]=useState([])
  useEffect(() => {
    async function getData() {
      const data = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
      setEmployee(data.data);
      const timecard = await getRequest(ServerConfig.url, UPDATEDTIMECARD );
      const shiftmonth = await getRequest(ServerConfig.url, SHIFTMONTH);
      setShiftMonth(shiftmonth.data);
      return timecard.data
      
      
    }
    getData().then((e)=>{
      setUpdatedTimeCard(e)
      console.log(e)
    });
    
  }, []);

  const handleSave = () => {
 const resultarr=getMatchingRecords(att,updatedTimeCard)
 resultarr.map((e)=>{
  e.status="P"
  const currentDate = new Date();
  const startTime = new Date(e.start_time);
  e.dates = currentDate.toISOString().split('T')[0] + e.start_time.substring(10, 19);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  e.days = days[currentDate.getDay()];
  e.breakOut = "2024-05-09T12:00:00"
  e.breakIn= "2024-05-09T12:30:00"
  e.earlyOut= "1900-01-01T17:00:00"
  e.lateIn= "2024-05-15T00:00:00"
  e.lateOut= "2024-05-20T00:00:00"
  e.otHrs= "1900-01-01T02:00:00"
  e.leaveCode= "AL"
  e.data= "Y"
  e.pnEmployeeId= "EMP005"
  e.flag= "Z"
  e.intime=e.start_time
  e.outtime=e.end_time
  e.pnCompanyid = e.pn_companyid
  e.pnBranchid= e.pn_branchid
  e.empCode=e.employeecode
  e.empName=e.employee_full_name
  e.shiftCode=e.shift_code
  postRequest(ServerConfig.url,TIMECARD,e).then((e)=>console.log(e))
 })
 console.log(resultarr)   
    // att.map((e)=>{
    
    //   e.status="P"
    //   e.breakOut = "2024-05-09T12:00:00"
    //   e.breakIn= "2024-05-09T12:30:00"
    //   e.earlyOut= "1900-01-01T17:00:00"
    //   e.lateIn= "2024-05-15T00:00:00"
    //   e.lateOut= "2024-05-20T00:00:00"
    //   e.otHrs= "1900-01-01T02:00:00"
    //   e.leaveCode= "AL"
    //   e.data= "Y"
    //   e.pnEmployeeId= "EMP005"
    //   e.flag= "Z"
    // })
    // console.log(att)
    // console.log(updatedTimeCard)
  //   console.log(updatedTimeCard)
  //   const currentDateTime = new Date().toISOString();
  //   console.log("Current Date Time:", currentDateTime);
  //   console.log(employee)
  //   console.log(branch)
  //   const filteredEmployees = employee.filter((r) => r.pnBranchId == branch);
  //   console.log(updatedTimeCard)
  //  console.log(filteredEmployees)
  //    filteredEmployees.forEach((e) => {
  //      console.log(`Employee Code: ${e.employeeCode}, Current Date Time: ${currentDateTime}`);
  //    });

  //    const formdata = updatedTimeCard.map((e) => {
  //     return {
  //       pnCompanyid: e.pn_companyid,
  //       pnBranchid: e.pn_branchid,
  //       empCode: e.employeecode,
  //       empName: e.employee_full_name,
  //       shiftCode: e.shift_code,
  //       dates: e.currentDate,
  //       days: e.currentDay,
  //       intime: e.start_time,
  //       breakOut: "2024-05-09T12:00:00",
  //       breakIn: "2024-05-09T12:30:00",
  //       earlyOut: "1900-01-01T17:00:00",
  //       outtime: e.end_time,
  //       lateIn: "2024-05-15T00:00:00",
  //       lateOut: "2024-05-20T00:00:00",
  //       otHrs: "1900-01-01T02:00:00",
  //       status: "P",
  //       leaveCode: "AL",
  //       data: "Y",
  //       pnEmployeeId: "EMP005",
  //       flag: "Z"
  //     };
  //   });
   // console.log(formdata);
    // formdata.forEach((e) => {
    //     postRequest(ServerConfig.url, TIMECARD, e).then((response) => {
    //        console.log(response);
    //     }).catch((error) => console.log(error));
    //    });
    // const formData = insertTimeCard.map(e => ({
    //   pnCompanyId: company,
    //   pnBranchId: branch,
    //   empCode: e.employeeCode, 
    //   empName: e.employeeFullName,
    //   shiftCode: e.shift_code,
    //   dates: e.dates,
    //   days: e.days,
    //   intime: e.intime,
    //   breakOut: e.break_out,
    //   breakIn: e.break_in,
    //   earlyOut: e.early_out,
    //   outtime: e.outtime,
    //   lateIn: e.Late_in,
    //   lateOut: e.Late_out, 
    //   otHrs: e.ot_hrs,
    //   status: e.status,
    //   leaveCode: e.leave_code,
    //   data: e.data,
    //   pnEmployeeId: e.pn_EmployeeID, 
    //   flag: e.flag
    // }));

    // console.log(formData);
    // formData.forEach((e) => {
    //   postRequest(ServerConfig.url, TIMECARD, e).then((response) => {
    //     console.log(response);
    //   }).catch((error) => console.log(error));
    // });
  };

  const margin = { margin: "0 5px" };

  return (
    <div>
      <Grid style={{ padding: "80px 5px0 5px" }}>
        <Card style={{ maxWidth: 500, margin: "0 auto" }}>
          <CardContent>
            <Typography variant='h5' color='S- Light' align='center'>Attendance</Typography>
            <form>
              <Grid container spacing={2} inputlabelprops={{ shrink: true }}>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Company</InputLabel>
                    <select name="pnCompanyId"
                      onChange={(e) => {
                        setCompany(e.target.value);
                      }}
                      style={{ height: '50px' }}>
                      <option value="">Select</option>
                      {shiftmonth.map((e) => <option key={e.Id}>{e.pnCompanyId}</option>)}
                    </select>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={12} item>
                    <FormControl fullWidth >
                    <InputLabel shrink>BranchId</InputLabel>
                 <select 
                 name="pnBranchId"
                 onChange={(e)=>{
                  setBranch(e.target.value)
                
                 }}
                 style={{ height: '50px' }}
                 inputlabelprops={{ shrink: true }}
                 >
                  <option value="">Select</option>
                     {
                           
                          shiftmonth.filter((e)=>(e.pnCompanyId==company)).map((e)=><option key={e.Id}>{e.pnBranchId}</option>)
                     }
                 </select>
                 </FormControl>
                  </Grid>
                  <Grid xs={12} sm={12} item>
                    <FormControl fullWidth >
                    <InputLabel shrink>ShiftCode</InputLabel>
                 <select 
                 name="shiftCode"
                 onChange={(e)=>{
                  cleararray(att)
                  setShiftCode(e.target.value)
                  
                 }}
                 style={{ height: '50px' }}
                 inputlabelprops={{ shrink: true }}
                 >
                  <option value="">Select</option>
                     {
                          
                          shiftmonth.filter((e)=>(e.pnBranchId==branch)).map((e)=><option key={e.Id}>{e.shiftCode}</option>)
                    
                    }
                 </select>
                 </FormControl>
                  </Grid>
                  <Grid xs={12} sm={12} item>
                                    <table style={{ width: '100%'}}>
                                        <thead>
                                            <tr>
                                                <th style={{textAlign:'left'}}>Employee Code</th>
                                                <th style={{textAlign:'left'}}>Employee Name</th>
                                                <th style={{textAlign:'left'}}>Present</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                          
                                         
                                            {
                                          
                                            shiftmonth.filter((r)=>r.pnBranchId==branch && r.shiftCode==shiftCode).map((e,index)=>{
                                               att.push(e)
                                               console.log(att)
                                                return (
                                                    <tr key={e.pnEmployeeCode}>
                                                        <td style={{textAlign:'left'}}>{e.pnEmployeeCode}</td>
                                                        <td style={{textAlign:'left'}}>{e.pnEmployeeName}</td>
                                                        <td style={{textAlign:'left'}}><Checkbox defaultChecked={true} 
                                                        onChange={(s)=>{
                                                          if(!s.currentTarget.checked)
                                                            {
                                                                   att.pop(e)
                                                                   console.log(att)
                                                            }
                                                            else{
                                                              att.push(e)
                                                              console.log(att)
                                                            }
                                                        }}
                                                        
                                                        ></Checkbox></td>
                                                        
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </Grid>

                <Grid container spacing={1} paddingTop={'10px'}>
                  <Grid item xs={12} align="right">
                    <Button style={margin} type="button" variant='outlined' color='primary' onClick={() => window.location.reload()}>RESET</Button>
                    <Button onClick={handleSave} variant='contained' color='primary'>SAVE</Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
