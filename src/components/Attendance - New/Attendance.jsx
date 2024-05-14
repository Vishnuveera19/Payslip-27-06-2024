import {  Typography, Grid, FormControl, InputLabel, Card, CardContent, TextField, FormControlLabel, Checkbox, Button, } from '@mui/material';
import { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { PAYMEMPLOYEE, TIMECARD } from '../../serverconfiguration/controllers';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { CenterFocusStrong } from '@mui/icons-material';

export default function AttendanceNew() {
  
      const [employee,setEmployee]=useState([])
      const [company,setCompany]=useState([])
      const [branch,setBranch]=useState([])
      const [employeeCode,setEmployeeCode]=useState("")
      const [employeeName,setEmployeeName]=useState("")
      const[shiftCode, setShiftCode]= useState("")
      const[ dates, setDates]= useState("")
      const[ days, setDays]= useState("")
      const[ breakOut, setBreakOut]= useState("")
      const[breakIn, setBreakIn]= useState("")
      const[ outtime, setOutTime]= useState("")
      const[ lateIn, setLateIn]= useState("")
      const[lateOut, setLateOut]= useState("")
      
      const[status, setStatus]= useState("")
      const[ leaveCode, setLeaveCode]= useState("")
      const[ data, setData]= useState("")
      const[pnEmployeeId, setPnEmployeeId]= useState("")
      const[  flag, setFlag]= useState("")
      const [presentTimes, setPresentTimes] = useState({});
      const [disableLeaveCheckboxes, setDisableLeaveCheckboxes] = useState({});
      const [otHrsTimes, setOtHrsTimes] = useState({}); 
      const [halfDayTimes, setHalfDayTimes] = useState({}); 
   



      useEffect(() => {
        async function getData() {
          const data = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
          setEmployee(data.data);
        }
        getData();
      }, []);

      

      const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
          pnCompanyId: company,
          pnBranchId: branch,
          empCode: "EMP004",
          empName: "Shanmuga Priya",
          shiftCode: "Shi2",
          dates: "2024-05-13T00:00:00",
          days: "Tuesday",
          intime: presentTimes,
          breakOut: "1900-01-01T12:00:00",
          breakIn: "1900-01-01T12:30:00",
          earlyOut:  halfDayTimes,
          outtime: "1900-01-01T18:00:00",
          lateIn: null,
          lateOut: null,
          otHrs:  otHrsTimes,
          status:  "P",
          leaveCode:"AL004",
          data:"Y",
          pnEmployeeId:  "EMP004",
          flag: "Y"
        
        };
        console.log(formData)
      };

      
      const handleCheckboxChange = (e, field, employeeCode) => {
        const isChecked = e.target.checked;
        if (isChecked) {
          if (field === 'present') {
            const currentTime = new Date().toISOString();
            setPresentTimes(prevState => ({
              ...prevState,
              [employeeCode]: currentTime
            }));
          }
          setDisableLeaveCheckboxes(prevState => ({
            ...prevState,
            [employeeCode]: true
          }));
        } else {
          if (field === 'present') {
            setPresentTimes(prevState => {
              const newState = { ...prevState };
              delete newState[employeeCode];
              return newState;
            });
          }
          setDisableLeaveCheckboxes(prevState => {
            const newState = { ...prevState };
            delete newState[employeeCode];
            return newState;
          });
        }
      };

      const handleOtHrsTimeChange = (event, employeeCode) => {
        const newValue = event.target.value;
       
        setOtHrsTimes(prevState => ({
            ...prevState,
            [employeeCode]: newValue
        }));
    };
    
    const handleHalfDayTimeChange = (event, employeeCode) => {
        const newValue = event.target.value;
       
        setHalfDayTimes(prevState => ({
            ...prevState,
            [employeeCode]: newValue
        }));
    };
    
    const margin={margin:"0 5px"}
    return (
        <div>
        <Grid style ={{ padding: "80px 5px0 5px" }}>
        <Card style = {{maxWidth: 1000, margin: "0 auto"}}>
        <CardContent>
        <Typography variant='h5' color='S- Light' align='center'>Attendance</Typography>
        <form>
       
        <Grid container spacing={2} inputlabelprops={{shrink:true}}>
            <Grid item xs={12} sm={12} >
              <FormControl fullWidth>
             
              <InputLabel shrink>Company</InputLabel>
                 <select name = "pnCompanyId" 
                 onChange={(e)=>{
                  setCompany(e.target.value)
                  
                 }}
                 style={{ height: '50px' }}
                
                 >
                  <option value="">Select</option>
                     {

                        employee.map((e)=><option>{e.pnCompanyId}</option>)
                        
                     }
                 </select>
              </FormControl >
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
                       
                          employee.filter((e)=>(e.pnCompanyId==company)).map((e)=><option>{e.pnBranchId}</option>)
                     }
                 </select>
                 </FormControl>
                  </Grid>

                  <Grid xs={12} sm={12} item>
                                    <table style={{ width: '100%' }}>
                                        <thead>
                                            <tr>
                                                <th style={{ padding: '10px' }}>Employee Code</th>
                                                <th style={{ padding: '10px' }}>Employee Name</th>
                                                <th style={{ padding: '10px' }}>Present</th>
                                                <th style={{ padding: '10px' }}>Leave</th>
                                                <th style={{ padding: '10px' }}>Ot Hrs</th>
                                                <th style={{ padding: '10px' }}>Half day</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {employee.filter((r)=>r.pnBranchId==branch).map((e)=>{
                                                return (
                                                    <tr key={e.employeeCode}>
                                                        <td style={{ padding: '10px' }}>{e.employeeCode}</td>
                                                        <td style={{ padding: '10px' }}>{e.employeeFullName}</td>
                                                        <td style={{ padding: '10px' }}>
                                                        <Checkbox
                                checked={!!presentTimes[e.employeeCode]}
                                onChange={(event) => handleCheckboxChange(event, 'present', e.employeeCode)}
                              />
                              {presentTimes[e.employeeCode] && (
                                <TextField
                                  id={`presentTime_${e.employeeCode}`}
                                  label="Present Time"
                                  variant="outlined"
                                  size="small"
                                  
                                  onChange={(e) =>setPresentTimes(e.target.value)}
                                  value={presentTimes[e.employeeCode]}
                                  disabled
                                />
                              )}
                            </td>
                                                        <td style={{ padding: '10px' }}><Checkbox
                                disabled={disableLeaveCheckboxes[e.employeeCode]}
                               
                              /></td>
                                                        <td style={{ padding: '10px' }}><Checkbox
    onChange={(event) => handleCheckboxChange(event, 'otHrs', e.employeeCode)}
/>

{presentTimes[e.employeeCode] && (
    <TextField
        id={`otHrsTime_${e.employeeCode}`}
        label="Ot Hrs"
        variant="outlined"
        size="small"
        type='datetime-local'
        onClick={(event) => handleOtHrsTimeChange(event, e.employeeCode) }
        onChange={(e) =>setOtHrsTimes(e.target.value)}
        InputLabelProps={{shrink: true}}
    />
)}</td>
                                                        <td style={{ padding: '10px' }}><Checkbox
    onChange={(event) => handleCheckboxChange(event, 'halfDay', e.employeeCode)}
/>

{presentTimes[e.employeeCode] && (
    <TextField
        id={`halfDayTimes_${e.employeeCode}`}
        label="Half Day "
        variant="outlined"
        size="small"
        type='datetime-local'
        onClick={(event) => handleHalfDayTimeChange(event, e.employeeCode)}
        onChange={(e) =>setHalfDayTimes(e.target.value)}
        InputLabelProps={{shrink: true}}
    />
)}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </Grid>

  
                                <Grid container spacing={1} paddingTop={'10px'}>
                                <Grid item xs ={12} align="right" >
                                <Button style={margin} type="reset" variant='outlined' color='primary' >RESET</Button>
              <Button onClick={()=>{
const formData = {
          pnCompanyId: company,
          pnBranchId: branch,
          empCode: "EMP004",
          empName: "Shanmuga Priya",
          shiftCode: "Shi2",
          dates: "2024-05-13T00:00:00",
          days: "Tuesday",
          intime: presentTimes,
          breakOut: "1900-01-01T12:00:00",
          breakIn: "1900-01-01T12:30:00",
          earlyOut:  halfDayTimes,
          outtime: "1900-01-01T18:00:00",
          lateIn: null,
          lateOut: null,
          otHrs:  otHrsTimes,
          status:  "P",
          leaveCode:"AL004",
          data:"Y",
          pnEmployeeId:  "EMP004",
          flag: "Y"
};
console.log(formData)
postRequest(ServerConfig.url,TIMECARD,formData).then((e)=>{
console.log(e)
}).catch((e)=>console.log(e));

                
              }}  
      variant='contained' color='primary' >SAVE</Button>
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