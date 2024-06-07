import React from 'react';
import { Grid, Card, TextField, Button, Typography, CardContent, FormControl, InputLabel } from '@mui/material';

export default function PayslipG({
  paympaybills,
  pnEmployeeId,
  setPnEmployeeId,
  employeeCode,
  setEmployeeCode,
  dDate,
  setDdate,
  month,
  setMonth,
  year,
  setYear
}) {

  const margin = { margin: "0 5px" };

  return (
    <div>
      <Grid style={{ padding: "80px 5px 0 5px" }}>
        <Card style={{ maxWidth: 600, margin: "0 auto" }}>
          <CardContent>
            <Typography variant='h5' color='S- Light' align='center'>Paym Shift</Typography>
            <form>
              <Grid container spacing={2} inputlabelprops={{ shrink: true }}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>EmployeeId</InputLabel>
                    <select
                      name="pnEmployeeId"
                      onChange={(e) => setPnEmployeeId(e.target.value)}
                      style={{ height: '50px' }}
                    >
                      <option value="">Select</option>
                      {paympaybills.map((e) => <option key={e.pnEmployeeId}>{e.pnEmployeeId}</option>)}
                    </select>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <InputLabel shrink>EmployeeCode</InputLabel>
                    <select
                      name="employeeCode"
                      onChange={(e) => setEmployeeCode(e.target.value)}
                      style={{ height: '50px' }}
                    >
                      <option value="">Select</option>
                      {paympaybills.filter((e) => e.pnEmployeeId === pnEmployeeId).map((e) => <option key={e.employeeCode}>{e.employeeCode}</option>)}
                    </select>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <InputLabel shrink>dDate</InputLabel>
                    <select
                      name="dDate"
                      onChange={(e) => setDdate(e.target.value)}
                      style={{ height: '50px' }}
                    >
                      <option value="">Select</option>
                      {paympaybills.filter((e) => e.pnEmployeeId === pnEmployeeId && e.employeeCode === employeeCode).map((e) => <option key={e.dDate}>{e.dDate}</option>)}
                    </select>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Month"
                      label="Month"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setMonth(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Year"
                      label="Year"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setYear(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={1} paddingTop={'10px'}>
                <Grid item xs={12} align="right">
                  <Button style={margin} type="reset" variant='outlined' color='primary'>RESET</Button>
                  <Button variant='contained' color='primary'>SAVE</Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
