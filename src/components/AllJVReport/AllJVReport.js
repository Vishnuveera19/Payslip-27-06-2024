// SalaryVoucher.js
import React from 'react';
import { Container, Grid, Typography, Divider, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';

const AllJVReport = () => {
  return (
    <Container maxWidth="md" style={{ padding: '20px', border: '1px solid #000', marginTop: '20px' }}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="h6" style={{ textAlign: 'left', fontSize: '17px' }}>
            JOURNAL VOUCHER FOR SALARIES
          </Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'right' }}>
          <Typography>Date: 12/08/2010</Typography>
          <Typography>Page Number: 1</Typography>
          <Typography>Month: 28/02/2010</Typography>
        </Grid>
      </Grid>

      <Divider style={{ margin: '20px 0' }} />

      <Typography variant="subtitle1" style={{textAlign:'left', fontSize:'18px', marginLeft:'50px'}}>Debits</Typography>
      <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell style={{ fontSize: '18px' }}>Attendance Bonus</TableCell>
              <TableCell style={{ fontSize: '18px', textAlign: 'right', paddingRight: '24px' }}>1,800.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontSize: '18px' }}>Account Code Total</TableCell>
              <TableCell style={{ fontSize: '18px', textAlign: 'right', paddingRight: '24px' }}>1,800.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontSize: '18px' }}>Bank</TableCell>
              <TableCell />
            </TableRow>
            <TableRow>
              <TableCell style={{ fontSize: '18px' }}>BASIC PAY</TableCell>
              <TableCell style={{ fontSize: '18px', textAlign: 'right', paddingRight: '24px' }}>8,970.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontSize: '18px' }}>EMPLOYEE'S PROVIDENT FUND</TableCell>
              <TableCell style={{ fontSize: '18px', textAlign: 'right', paddingRight: '24px' }}>340,755.35</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontSize: '18px' }}>EMPLOYER'S PENSION FUND</TableCell>
              <TableCell style={{ fontSize: '18px', textAlign: 'right', paddingRight: '24px' }}>59,753.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontSize: '18px' }}>EMPLOYER'S PROVIDENT FUND</TableCell>
              <TableCell style={{ fontSize: '18px', textAlign: 'right', paddingRight: '24px' }}>82,912.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontSize: '18px' }}>HRA</TableCell>
              <TableCell style={{ fontSize: '18px', textAlign: 'right', paddingRight: '24px' }}>36,954.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontSize: '18px' }}>INSURANCE AMOUNT</TableCell>
              <TableCell style={{ fontSize: '18px', textAlign: 'right', paddingRight: '24px' }}>115,455.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontSize: '18px' }}>LOAN</TableCell>
              <TableCell style={{ fontSize: '18px', textAlign: 'right', paddingRight: '24px' }}>1,100.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontSize: '18px' }}>OTHER ALLOWANCE</TableCell>
              <TableCell style={{ fontSize: '18px', textAlign: 'right', paddingRight: '24px' }}>39,600.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontSize: '18px' }}>Others</TableCell>
              <TableCell style={{ fontSize: '18px', textAlign: 'right', paddingRight: '24px' }}>53,519.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontSize: '18px' }}>VDA</TableCell>
              <TableCell style={{ fontSize: '18px', textAlign: 'right', paddingRight: '24px' }}>3,197.50</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontSize: '18px' }}>Account Code Total</TableCell>
              <TableCell style={{ fontSize: '18px', textAlign: 'right', paddingRight: '24px' }}>910,980.85</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontSize: '18px' }}>ASS</TableCell>
              <TableCell style={{ fontSize: '18px', textAlign: 'right', paddingRight: '24px' }}>123456</TableCell>

            </TableRow>
            <TableRow>
              <TableCell style={{ fontSize: '18px' }}>Account Code Total</TableCell>
              <TableCell style={{ fontSize: '18px', textAlign: 'right', paddingRight: '24px' }}>169,305.80</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Divider style={{ margin: '20px 0' }} />

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell style={{ fontSize: '18px' }}>Total Gross Salary</TableCell>
              <TableCell style={{ fontSize: '18px', textAlign: 'right', paddingRight: '24px' }}>1,082,086.65</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontSize: '18px' }}>Total Gross Salary</TableCell>
              <TableCell style={{ fontSize: '18px', textAlign: 'right', paddingRight: '24px' }}>0.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AllJVReport;
