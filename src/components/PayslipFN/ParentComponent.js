import { useState,useEffect } from "react";
import { Grid, Card, TextField, Button, Typography, Box, CardContent, FormControl, InputLabel } from '@mui/material';
import PayslipG from "./payslipG";
import PayslipNF from "./PayslipNF";
import { getRequest } from "../../serverconfiguration/requestcomp";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { PAYMPAYBILL } from "../../serverconfiguration/controllers";

const ParentComponent =  () => {

    const [paympaybills, setPaymPayBills] = useState([]);
    const [pnEmployeeId, setPnEmployeeId] = useState("");
    const [employeeCode, setEmployeeCode] = useState("");
    const [dDate, setDdate] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    useEffect(() => {
        async function getData() {
          const data = await getRequest(ServerConfig.url, PAYMPAYBILL);
          setPaymPayBills(data.data);
        }
        getData();
      }, []);

      return (
        <div>
        <PayslipG paympaybills={paympaybills}
        pnEmployeeId = {pnEmployeeId}
        setPnEmployeeId={setPnEmployeeId}
        employeeCode={employeeCode}
        setEmployeeCode={setEmployeeCode}
        dDate={dDate}
        setDdate={setDdate}
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}/>

        <PayslipNF
         pnEmployeeId={pnEmployeeId}
         employeeCode={employeeCode}
         dDate={dDate}
         month={month}
         year={year}/>
         </div>
      );
     
};