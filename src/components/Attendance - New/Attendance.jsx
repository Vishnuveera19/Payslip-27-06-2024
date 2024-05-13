import {  Typography, Grid, FormControl, InputLabel, Card, CardContent, TextField, FormControlLabel, Checkbox} from '@mui/material';
import { useEffect, useState } from 'react';
import { getRequest } from '../../serverconfiguration/requestcomp';
import { PAYMEMPLOYEE } from '../../serverconfiguration/controllers';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { CenterFocusStrong } from '@mui/icons-material';

export default function AttendanceNew() {
  
      const [employee,setEmployee]=useState([])
      const [company,setCompany]=useState([])
      const [branch,setBranch]=useState([])
      const [employeeCode,setEmployeeCode]=useState("")
      const [employeeName,setEmployeeName]=useState("")
      const [checkbox1, setCheckbox1] = useState(false);
      const [checkbox2, setCheckbox2] = useState(false);
      const [checkbox3, setCheckbox3] = useState(false);
      const [presentTimes, setPresentTimes] = useState({});
  const [disableLeaveCheckboxes, setDisableLeaveCheckboxes] = useState({});

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
          empCode: employeeCode,
          empName: employeeName,
        
        };
        console.log(formData)
      };

      
      const handleCheckboxChange = (e, field, employeeCode) => {
        const isChecked = e.target.checked;
        if (isChecked) {
          if (field === 'present') {
            const currentTime = new Date().toLocaleTimeString();
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
                                                <th style={{ padding: '10px' }}>Permission</th>
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
                                  value={presentTimes[e.employeeCode]}
                                  disabled
                                />
                              )}
                            </td>
                                                        <td style={{ padding: '10px' }}><Checkbox
                                disabled={disableLeaveCheckboxes[e.employeeCode]}
                                // Add your onChange handler for Leave checkboxes here
                              /></td>
                                                        <td style={{ padding: '10px' }}><Checkbox></Checkbox></td>
                                                        <td style={{ padding: '10px' }}><Checkbox></Checkbox></td>
                                                        <td style={{ padding: '10px' }}><Checkbox></Checkbox></td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </Grid>

        
                  

                  

          </Grid>
          
              

        </form>
        </CardContent>
        </Card>
        </Grid>
      </div>
    );
  }