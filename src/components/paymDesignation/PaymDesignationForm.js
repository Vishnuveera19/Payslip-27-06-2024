import { Grid,Card,
  TextField,
  Button,
  Typography,
  Box,
  CardContent,
  FormControl
} from '@mui/material';
import { useState, useEffect } from 'react';
import { PAYMEMPLOYEE, PAYMLEAVE, PAYMDESIGNATION, LEAVEAPPROVEHR } from '../../serverconfiguration/controllers';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import {InputLabel} from '@mui/material';
import { ServerConfig } from '../../serverconfiguration/serverconfig';



export default function DesignationForm() {

const [employee,setEmployee]=useState([])
const [company,setCompany]=useState([])
const [branch,setBranch]=useState([])
const [pnDesignationId,setPnDesignationId]=useState("")
const [vDesignationName,setVDesignationName]=useState("")
const [authority,setAuthority]=useState("")
const [status,setStatus]=useState("")
const[pnCompany, setpnCompany]= useState("")




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
  pnDesignationId: pnDesignationId,
  vDesignationName: vDesignationName,
  authority: authority,
  status: status,
  pnCompany: pnCompany
};
console.log(formData)
};

  const margin={margin:"0 5px"}
  return (
    <div>
      <Grid style ={{ padding: "80px 5px0 5px" }}>
      <Card style = {{maxWidth: 600, margin: "0 auto"}}>
      <CardContent>
      <Typography variant='h5' color='S- Light' align='center'>Paym Designation</Typography>
      <form>
     
      <Grid container spacing={2} inputlabelprops={{shrink:true}}>
          <Grid item xs={12} sm={6} >
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
                <Grid xs={12} sm={6} item>
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


               

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="pnDesignationId"
                 
                  label="pnDesignationId"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setPnDesignationId(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


<Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
                  name="vDesignationName"
                  label="vDesignationName"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setVDesignationName(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>



                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="authority"
                 
                  label="authority"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) =>  setAuthority(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="status"
                 
                  label="status"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setStatus(e.target.value)} 

                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="pnCompany"
                 
                  label="pnCompany"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setpnCompany(e.target.value)} 

                />
                </FormControl>
                </Grid>

              
        </Grid>
        <Grid container spacing={1} paddingTop={'10px'}>
            
            <Grid item xs ={12} align="right" >
              <Button style={margin} type="reset" variant='outlined' color='primary' >RESET</Button>
              <Button onClick={()=>{
const formData = {
  pnCompanyId: company,
  pnBranchId: branch,
  pnDesignationId: pnDesignationId,
  vDesignationName: vDesignationName,
  authority: authority,
  status: status,
  pnCompany: pnCompany
};
console.log(formData)
postRequest(ServerConfig.url,PAYMDESIGNATION,formData).then((e)=>{
console.log(e)
}).catch((e)=>console.log(e));

                
              }}  
      variant='contained' color='primary' >SAVE</Button>
            </Grid>
            </Grid>

      </form>
      </CardContent>
      </Card>
      </Grid>
    </div>
  );
}

