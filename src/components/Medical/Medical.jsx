import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Grid, Button, FormControl, TextField } from '@mui/material';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { PAYMEMPLOYEE, SAVEBLOB } from '../../serverconfiguration/controllers';
import { useLocation } from 'react-router-dom';

const Medical = ({ employeeDetails }) => {
  const [selectedFile, setSelectedFile] = useState({});
  const [base64File, setBase64File] = useState("");
  const [dateofservice, SetDateOfService] = useState("");
  const [hospital, SetHospital] = useState("");
  const [amount, SetAmount] = useState("");
  const [employee, setEmployee] = useState([]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      setBase64File(base64String);
    };
    reader.readAsDataURL(file);
  };

  const location = useLocation();
  const { pnEmployeeId, employeeCode, pnCompanyId, pnBranchId } = location.state || {};

  useEffect(() => {
    async function getData() {
      const employee = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
      setEmployee(employee.data);
    }
    getData();
  }, [pnEmployeeId, employeeCode, pnCompanyId, pnBranchId]);

  const employeecode1 = employeeCode;
  const employeedetails = employee.find(emp => emp.employeeCode == employeecode1);

  const handlesubmit = () => {
    postRequest(ServerConfig.url, SAVEBLOB, {
      query: `INSERT INTO [dbo].[medicalslip]([Date_of_service],[Hospital_Name],[Amount],[Medicalbills],[pn_EmployeeID],[EmployeeCode],[Employee_Full_Name])VALUES('${dateofservice}', '${hospital}', ${amount}, '${base64File}', ${employeedetails.pnEmployeeId}, '${employeecode1}', '${employeedetails.employeeFullName}')`
    })
      .then(response => {
        alert('Records inserted successfully');
      })
      .catch(error => {
        console.error('Error inserting records:', error);
        alert('Failed to insert records');
      });
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Medical Expenses
      </Typography>
      <Grid container justifyContent="center">
        <Grid item>
          <TableContainer component={Paper} style={{ width: 'fit-content', marginright: '200px', marginTop: '10px' }}>
            <TableContainer id="pdf-content" component={Paper} style={{ width: 'fit-content', marginRight: '200px', marginTop: '10px' }}></TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell style={{ backgroundColor: 'blue', textAlign: 'center', color: 'white', padding: '10px', width: '400px' }}>Employee Details</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ padding: '8px', width: '200px' }}>Name: {employeedetails ? employeedetails.employeeFullName : 'No Name Available'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ padding: '8px', width: '200px' }}>employeeCode: {employeedetails ? employeedetails.employeeCode : 'No Name Available'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ padding: '8px', width: '200px' }}>Email: {employeedetails ? employeedetails.reportingEmail : 'No Name Available'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ padding: '8px', width: '200px' }}>PanNo: {employeedetails ? employeedetails.panNo : 'No Name Available'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid item xs={12}>
        <TableContainer component={Paper} style={{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '1100px' }}>
          <Table>
            <TableRow>
              <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}>MEDICAL EXPENSES</TableCell>
              <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
              <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
              <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
              <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}>Date of Service</TableCell>
              <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}>Physician or other Hospital</TableCell>
              <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}>Amount</TableCell>
              <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
              <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}>Uploadbill</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <FormControl fullWidth>
                  <TextField name="DateofService" label="Enter Date" variant="outlined" fullWidth required onChange={(e) => SetDateOfService(e.target.value)} />
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <TextField name="Hospital" label="Enter Hospital" variant="outlined" fullWidth required onChange={(e) => SetHospital(e.target.value)} />
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <TextField name="Amount" label="Enter Amount" variant="outlined" fullWidth required onChange={(e) => SetAmount(e.target.value)} />
                </FormControl>
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                <input type="file" onChange={handleFileSelect} />
                <div style={{ display: 'flex', marginTop: '10px' }}>
                  <Button variant='contained' size='small' onClick={handlesubmit}>SUBMIT</Button>
                  <Button variant='outlined' size='small' style={{ marginLeft: '10px' }}>Add another bill</Button>
                </div>
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>
      </Grid>
     
    </div>
  );
}

export default Medical;
