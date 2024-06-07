
import React from 'react';
import { Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Divider, Button } from '@mui/material';
import { TIMECARD, SHIFTMONTH, PAYMPAYBILL, PAYMEMPLOYEE, PAYMEMPLOYEEPROFILE1, REPORT, PAYMEMPLOYEEWORKDETAILS} from '../../serverconfiguration/controllers';
import { useState, useEffect } from 'react';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { useLocation } from 'react-router-dom';

const PayslipNewFormat = () => {

    const[data, setdata] = useState([]);
    const[employee, setEmployee] =useState([]);
    const[employeeprofile, setemployeeprofile] = useState([])
    const[totalsalary, setTotalSalary] = useState([{}])
    const[employeework, setemployeework] = useState([])
    

    const location = useLocation()

const {pnEmployeeId, employeeCode, dDate, month, year} = location.state || {}

    useEffect(() => {
async function getData() {
  const data = await getRequest(ServerConfig.url, PAYMPAYBILL);
  setdata(data.data);
  const employee = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
  setEmployee(employee.data)
  const employeeprofile = await getRequest(ServerConfig.url, PAYMEMPLOYEEPROFILE1 );
  setemployeeprofile(employeeprofile.data)
  const employeework = await getRequest(ServerConfig.url, PAYMEMPLOYEEWORKDETAILS);
  setemployeework(employeework.data)
  const totalsalary =  await postRequest(ServerConfig.url, REPORT, {
    "query": `EXEC FinalSalaryCalculation1 @EmployeeCode = '${employeeCode}', @Month = ${month}, @Year = ${year}, @D_dates = '${dDate}'`});
  setTotalSalary(totalsalary.data)
} 
console.log(totalsalary)

getData();
}, [pnEmployeeId, employeeCode, month, year, dDate]);

const handlesave = () => {
   postRequest(ServerConfig.url, REPORT, {
    "query": `INSERT INTO [dbo].[Final_Salary]([pn_CompanyID],[pn_BranchID],[pn_EmployeeID],[EmployeeCode],[Employee_First_Name],[Year],[Month],[Calc_Days],[Paid_Days],[Present_Days],[Absent_Days],[WeekOffDays],[Holidays],[TotLeave_Days],[Ded_Amount],[Earned_Basic],[Earn_Amount],[Actual_salary],[Gross_salary],[NetPay])VALUES(1,10,12345,'${employeeCode}','${paympaybill.employeeFirstName}','2023','05',30.0,28.0,26.0,2.0,4.0,1.0,2.0,200.0,3000.0,5000.0,1200,1200,${totalsalary[0].MonthlySalary})
`});
  
}
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};


const employeeCode1 = employeeCode; 
const empId = pnEmployeeId;
const d_date = dDate

const paympaybill = data.find(emp => emp.employeeCode == employeeCode1 && emp.dDate == d_date);
const employeetable = employee.find(emp => emp.employeeCode == employeeCode1)
const employeePtable = employeeprofile.find(emp => emp.pnEmployeeId == empId)
const employeewtable = employeework.find(emp => emp.pnEmployeeId == empId) 


  return (
    <Paper style={{ padding: '20px', margin: '20px', border: '2px solid black' }}>
      <Typography variant="h4" align="center">
        HESPERUS AUTOMATION
      </Typography>
      <Typography variant="subtitle1" align="center">
        16/1, Butt Road, Guindy, Chennai - 600 032
      </Typography>
      <Typography variant="h6" align="center">
        SERVICE CARD CUM PAYSLIP FOR THE MONTH OF FEBRUARY 2010
      </Typography>
      <Box display="grid" gridTemplateColumns="1fr auto 1fr" alignItems="center">
      <Box gridColumn="2">
        <Typography variant="h6" align="center">
          FORM XIX
        </Typography>
      </Box>
      <Box gridColumn="3" textAlign="right">
        <Typography variant="h6">
          Licence No.: CH 6934
        </Typography>
      </Box>
    </Box>

    <Divider  sx={{ borderBottomWidth: 2, borderColor: 'black', marginBottom: '20px'}} />
      
    <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
  <Grid item xs={3} container direction="column" alignItems="left">
    <Typography variant='h6' align='left'>Roll No.: 0001</Typography>
    <Typography  variant='h6' align='left'>Location: Adyar</Typography>
  </Grid>
  <Grid item xs={3} container direction="column" alignItems="center">
  <Typography variant='h6' align='center'>
  Name: {paympaybill ? paympaybill.employeeFirstName : 'No Name Available'}
</Typography>
    <Typography variant='h6' align='center'>Designation: {paympaybill ? paympaybill.designationName : 'No Name Available'} </Typography>
    <Typography variant='h6' align='center'>F / H's Name: {employeePtable ? employeePtable.fatherName : 'No Name Available'}</Typography>
  </Grid>
  <Grid item xs={3}>
    <Typography variant='h6' align="right">Month of Pay: {month}</Typography>
    <Typography variant='h6' align="right">Date of Birth: {employeetable ? formatDate(employeetable.dateofBirth) : 'No Date Available'}</Typography>
    <Typography variant='h6' align="right">Date of Joining:  {employeewtable ?  formatDate(employeewtable.joiningDate) : 'No Name Available'} </Typography>
  </Grid>
</Grid>

<Divider  sx={{ borderBottomWidth: 2, borderColor: 'black', marginTop: '20px' }} />

<Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" marginTop={'20px'}>
  <Grid item xs={1.71} container direction="column" alignItems="left">
    <Typography align='left' style={{ fontSize: '20px' }}>Calc Days: {paympaybill ? paympaybill.calcDays : 'No Name Available'}</Typography>
  </Grid>
  <Grid item xs={1.71} container direction="column" alignItems="left">
    <Typography align='left' style={{ fontSize: '20px' }}>Paid Days: {paympaybill ? paympaybill.paidDays : 'No Name Available'}</Typography>
  </Grid>
  <Grid item xs={1.71} container direction="column" alignItems="left">
    <Typography align='left' style={{ fontSize: '20px' }}>Prs Days: {paympaybill ? paympaybill.presentDays: 'No Name Available'}</Typography>
  </Grid>
  <Grid item xs={1.71} container direction="column" alignItems="left">
    <Typography align='left' style={{ fontSize: '20px' }}>Abs Days: {paympaybill ? paympaybill.absentDays : 'No Name Available'}</Typography>
  </Grid>
  <Grid item xs={1.71} container direction="column" alignItems="left">
    <Typography align='left' style={{ fontSize: '20px' }}>Leave Days: {paympaybill ? paympaybill.totLeaveDays : 'No Name Available'}</Typography>
  </Grid>
  <Grid item xs={1.71} container direction="column" alignItems="left">
    <Typography align='left' style={{ fontSize: '20px' }}>Holidays: {paympaybill ? paympaybill.holidays : 'No Name Available'}</Typography>
  </Grid>
  <Grid item xs={1.71} container direction="column" alignItems="left">
    <Typography align='left' style={{ fontSize: '20px' }}>Weekoff Days: {paympaybill ? paympaybill.weekOffDays : 'No Name Available'}</Typography>
  </Grid>
</Grid>

<Divider  sx={{ borderBottomWidth: 2, borderColor: 'black', marginTop: '30px' }} />

      <TableContainer component={Paper} style={{ marginTop: '30px' }}>
        <Table>
          <TableHead>
            <TableRow style={{ border: '3px solid black'}} >
              <TableCell style={{ border: '3px solid black', fontSize: '18px'}}>Rate of Pay</TableCell>
              <TableCell style={{ border: '3px solid black', fontSize: '18px'}}>Earnings</TableCell>
              <TableCell style={{ fontSize: '18px'}}>Deductions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ border: '3px solid black'}}>
          <TableRow>
  <TableCell style={{ border: '3px solid black' }}>
    <Typography style={{ fontSize: '18px' }}>BASIC PAY: {paympaybill ? paympaybill.actBasic : 'No Name Available'}</Typography>
    <Typography style={{ fontSize: '18px' }}>HRA: {paympaybill ? paympaybill.value1 : 'No Name Available'}</Typography>
    <Typography style={{ fontSize: '18px' }}>OTHER ALLOWANCE: {paympaybill ? paympaybill.value2 + paympaybill.value3 + paympaybill.value4 + paympaybill.value5 + paympaybill.value6 + paympaybill.value7 + paympaybill.value8 : 'No Name Available'}</Typography>
    <Typography style={{ fontSize: '18px' }}>VDA: {paympaybill ? paympaybill.value9 : 'No Name Available'} </Typography>
    <Typography style={{ fontSize: '18px' }}>ASS: {paympaybill ? paympaybill.value10 : 'No Name Available'}</Typography>
    <Typography style={{ marginTop: '50px', fontSize: '18px' }}>Actual Salary: {paympaybill ? paympaybill.actBasic + paympaybill.value1 + paympaybill.value2 + paympaybill.value3 + paympaybill.value4 + paympaybill.value5 + paympaybill.value6 + paympaybill.value7 + paympaybill.value8 + paympaybill.value9 + paympaybill.value10 : 'No Name Available'}</Typography>
    
  </TableCell>
              <TableCell style={{ border: '3px solid black'}}>
                <Typography style={{ fontSize: '18px' }}>EARNED BASIC: {paympaybill ? paympaybill.earnedBasic : 'No Name Available'}</Typography>
                <Typography style={{ fontSize: '18px' }}>HRA: {paympaybill ? paympaybill.value1 : 'No Name Available'}</Typography>
                <Typography style={{ fontSize: '18px' }}>OTHER ALLOWANCE: {paympaybill ? paympaybill.value2 + paympaybill.value3 + paympaybill.value4 + paympaybill.value5 + paympaybill.value6 + paympaybill.value7 + paympaybill.value8 : 'No Name Available'}</Typography>
                <Typography style={{ fontSize: '18px' }}>VDA {paympaybill ? paympaybill.value9 : 'No Name Available'}</Typography>
                <Typography style={{ fontSize: '18px' }}>ASS {paympaybill ? paympaybill.value10 : 'No Name Available'}</Typography>
                <Typography style={{ marginTop: '50px', fontSize: '18px'}}>Total Earnings: {paympaybill ? paympaybill.earnedBasic + paympaybill.value1 + paympaybill.value2 + paympaybill.value3 + paympaybill.value4 + paympaybill.value5 + paympaybill.value6 + paympaybill.value7 + paympaybill.value8 + paympaybill.value9 + paympaybill.value10 : 'No Name Available'} </Typography>
               
              </TableCell>
              <TableCell >
                <Typography style={{ fontSize: '18px' }}>PF: {paympaybill ? paympaybill.epf : 'No Name Available'}</Typography>
                <Typography style={{ fontSize: '18px' }}>ESI: {paympaybill ? paympaybill.valueA2 : 'No Name Available'}</Typography>
                <Typography style={{ fontSize: '18px' }}>Loan: {paympaybill ? paympaybill.valueA3 : 'No Name Available'}</Typography>
                <Typography style={{ fontSize: '18px' }}>Others: {paympaybill ? paympaybill.valueA4 : 'No Name Available'}</Typography>
               <Typography style={{ marginTop: '50px', fontSize: '18px' }}>Total Deductions: {paympaybill ? paympaybill.epf + paympaybill.valueA1 + paympaybill.valueA2 + paympaybill.valueA3 + paympaybill.valueA4 + paympaybill.valueA5 + paympaybill.valueA6 + paympaybill.valueA7 + paympaybill.valueA8 + paympaybill.valueA9 + paympaybill.valueA10 : 'No Name Available'} </Typography>
                
              </TableCell>
            </TableRow>
           
          </TableBody>
          <TableHead>
            <TableRow style={{ border: '3px solid black'}} >
              <TableCell style={{ fontSize: '18px' }} >GrossPay: {paympaybill ? paympaybill.grossSalary : 'No Name Available'} </TableCell>
              <TableCell style={{ fontSize: '18px' }}>Netpay: {totalsalary[0].MonthlySalary}</TableCell>
              
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" marginTop={'20px'}>
  <Grid item xs={4} container direction="column" alignItems="left">
    <Typography align='left' style={{ fontSize: '18px' }}>Pay Date : 11/03/2010</Typography>
  </Grid>
  <Grid item xs={4} container direction="column" alignItems="center">
    <Typography align='left' style={{ fontSize: '18px' }}>Employer Signature</Typography>
  </Grid>
  <Grid item xs={4} container direction="column" alignItems={"right"}>
    <Typography align='right' style={{ fontSize: '18px' }}>Employee Signature</Typography>
  </Grid>
      </Grid>
      <Button variant='contained' color='primary' onClick={handlesave} style={{marginTop: '20px', marginLeft:'1500px'}} >SAVE</Button>
    </Paper>
  );
};

export default PayslipNewFormat;
