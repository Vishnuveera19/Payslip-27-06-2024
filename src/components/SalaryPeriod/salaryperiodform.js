import React, { useState, useEffect } from 'react';
import { postRequest, getRequest } from '../../serverconfiguration/requestcomp'; // Assuming you have getRequest for fetching data
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Card, Typography, Grid, CardContent, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { inputFormElements17 } from './salaryperiod';
import { SALARYPERIOD } from '../../serverconfiguration/controllers';

const SalaryPeriodForm = () => {
  const navigate = useNavigate();
  const margin = { margin: "0 5px" };

  const [formData, setFormData] = useState({
    pn_companyid: '',
    pn_branchid: '',
    period_code: '',
    selection: '',
    p_year: '',
    p_month: '',
    fromdate: '',
    todate: '',
    total_days: '',
    pay_date: '',
    ot_include: false,
  });

  const [companies, setCompanies] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    // Fetch companies data from the backend and populate the dropdown
    async function fetchCompanies() {
      try {
        const response = await getRequest(ServerConfig.url, '/api/companies'); // Assuming this endpoint fetches companies data
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    }

    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleCompanyChange = (e) => {
    const companyId = e.target.value;
    setFormData({
      ...formData,
      pn_companyid: companyId,
    });

    // Fetch branches data based on the selected company and populate the dropdown
    async function fetchBranches() {
      try {
        const response = await getRequest(ServerConfig.url, `/api/companies/${companyId}/branches`); // Assuming this endpoint fetches branches data based on companyId
        setBranches(response.data);
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    }

    fetchBranches();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post form data to the server
      await postRequest(ServerConfig.url, SALARYPERIOD, formData);
      // Navigate back to the table page
      navigate('/SalaryPeriodTable');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Card style={{ padding: 20 }}>
          <CardContent>
            <Typography variant='h5' color='textPrimary' align='center' gutterBottom>
              Salary Period Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Company</InputLabel>
                    <Select
                      value={formData.pn_companyid}
                      onChange={handleCompanyChange}
                      label="Company"
                    >
                      {companies.map(company => (
                        <MenuItem key={company.id} value={company.id}>
                          {company.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Branch</InputLabel>
                    <Select
                      value={formData.pn_branchid}
                      onChange={handleChange}
                      label="Branch"
                    >
                      {branches.map(branch => (
                        <MenuItem key={branch.id} value={branch.id}>
                          {branch.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {inputFormElements17.map(input =>
                  <Grid item xs={12} key={input.name}>
                    <TextField
                      fullWidth
                      {...input}
                      value={formData[input.name]}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                )}
              </Grid>
              <Grid container justifyContent="flex-end" style={{ marginTop: 20 }}>
                <Button style={margin} type="reset" variant='outlined' color='primary' >RESET</Button>
                <Button type="submit" variant='contained' color='primary'>Save</Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SalaryPeriodForm;
