import React from 'react';
import { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Grid, Button } from '@mui/material';
import { PAYSLIP } from '../serverconfiguration/controllers';
import { getRequest } from '../serverconfiguration/requestcomp';
import { ServerConfig } from '../serverconfiguration/serverconfig';
import  html2pdf  from 'html2pdf.js/dist/html2pdf.min';
import ReactDOMServer from 'react-dom/server';
import { useRef } from 'react';
import generatePDF from 'react-to-pdf';



const Paycalc = () => {
  const targetRef = useRef();

  // const [loader, setLoader] = useState(false);
  // const downloadPDF = () =>{

  // }
/*const Payslip = () => {

  const printHandler = () => {
    const printElement = ReactDOMServer.renderToString(Payslip());
    html2pdf().from(printElement).save();
  
  }*/
  const[data, setdata] = useState([]);
  useEffect (() => {
    getRequest(ServerConfig.url, PAYSLIP).then((e) => {
      console.log(e.data)
      setdata(e.data)
    })
  },[]);


 
  return (
    <div style={{ textAlign: 'center', margin: '10px' }} ref={targetRef}>
      <Typography variant="h4" gutterBottom >
        PaySlip
      </Typography>
      <Grid container justifyContent="space-between"> 
        <Grid item>
          <TableContainer component={Paper} style={{ width: 'fit-content' , marginLeft:'200px', marginTop: '10px'}}> {/* Adjust width as needed */}
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}>Employee Details</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{  padding: '9px', width: '200px'}}>Name: {data.map((e) => {return e.employeeFirstName  } )}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{  padding: '9px', width: '200px'}}>Address: {data.map((e) =>{return e.addressLine1 } )}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{  padding: '9px', width: '200px'}}  >Desigination:{data.map((e) =>{return e.designationName} )}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{  padding: '9px', width: '200px'}}>Department:{data.map((e) =>{return e.departmentName} )}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item>
          <TableContainer component={Paper} style={{ width: 'fit-content', marginRight:'200px', marginTop: '10px' }}> 
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}>dDate:</TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}>Grade Name:</TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}>Paid Days:</TableCell>
                </TableRow>
                
                {/*  <TableCell >1234</TableCell>
                  <TableCell >5678</TableCell>
  <TableCell >9012</TableCell>*/}
                  {
                    data.map((e)=>{
                      return<TableRow> <TableCell>
                         {e.dDate}
                        </TableCell>
                          <TableCell>
                            {e.gradeName}
                          </TableCell>
                          <TableCell>
                            {e.paidDays}
                          </TableCell>
                        </TableRow>
                    })
                  }
                
                <TableRow>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}>Holidays:</TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}>Present Days:</TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}>Absent Days:</TableCell>
                </TableRow>
                {/* <TableRow>
                  <TableCell >rrrr</TableCell> 
                  <TableCell >ddd</TableCell>   
                  <TableCell >fff</TableCell>
                </TableRow> */}
                {
                  data.map((e)=>{
                    return<TableRow> <TableCell>
                       {e.holidays}
                      </TableCell>
                        <TableCell>
                          {e.presentDays}
                        </TableCell>
                        <TableCell>
                          {e.absentDays}
                        </TableCell>
                      </TableRow>
                  }) 
                }
              </TableBody>
            </Table>
          </TableContainer>
          </Grid>
        
        <Grid item xs={12}>
          <TableContainer component={Paper} style={{ marginTop: '30px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '600px' }}>
            <Table>
              <TableRow>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}>EARNINGS</TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '100px' }}>Amount</TableCell>
              </TableRow>
              {
                data.map((e)=> {
                 return <TableRow>
                  <TableCell >Earn Amount</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell ></TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{e.earnAmount}</TableCell>
                  </TableRow>
                   })
               }
                {
                data.map((e)=> {
                 return <TableRow>
                  <TableCell >Net pay</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell ></TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{e.netPay}</TableCell>
                  </TableRow>
                  })
                }
                  {
                data.map((e)=> {
                 return <TableRow>
                  <TableCell >Gross Salary</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell ></TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{e.grossSalary}</TableCell>
                  </TableRow>
                  })
                }
                 {
                data.map((e)=> {
                 return <TableRow>
                  <TableCell >Net Salary</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell ></TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{e.netSalary}</TableCell>
                  </TableRow>
                  })
                }
                  <TableRow>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }} ></TableCell> 
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }} ></TableCell>  
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '100px' }}></TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '18px', width: '100px' }}></TableCell> 

                  </TableRow>

            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper} style={{ marginTop: '30px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '900px' }}>
            <Table>
              <TableRow>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}>Allowance</TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px', textAlign: 'right' }}>Name</TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}>Value</TableCell>
              </TableRow>
              {
              data.map((e)=>{
                      return <TableRow> <TableCell>
                         Allowance 1
                        </TableCell>
                          <TableCell></TableCell>
                          <TableCell>{e.allowance1}</TableCell>
                          <TableCell></TableCell>
                          <TableCell>{e.value1}</TableCell>
                        </TableRow>
                    })
                    }
                    {
                    data.map((e)=> {
                  return <TableRow>
                  <TableCell >Allowance 2</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{e.allowance2}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{e.value2}</TableCell>
                  </TableRow>
                  })
                   }
                   {
                    data.map((e)=> {
                  return <TableRow>
                  <TableCell >Allowance 3</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{e.allowance3}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{e.value3}</TableCell>
                  </TableRow>
                  })
                  }

                  {
                    data.map((e)=> {
                  return <TableRow>
                  <TableCell >Allowance 4</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{e.allowance4}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{e.value4}</TableCell>
                  </TableRow>
                  })
                }
                {
                    data.map((e)=> {
                  return <TableRow>
                  <TableCell >Allowance 5</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{e.allowance5}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{e.value5}</TableCell>
                  </TableRow>
                  })
                }
                {
                    data.map((e)=> {
                  return <TableRow>
                  <TableCell >Allowance 6</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{e.allowance6}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{e.value6}</TableCell>
                  </TableRow>
                  })
                }
                {
                    data.map((e)=> {
                  return <TableRow>
                  <TableCell >Allowance 7</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{e.allowance7}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{e.value7}</TableCell>
                  </TableRow>
                  })
                }
                {
                    data.map((e)=> {
                  return <TableRow>
                  <TableCell >Allowance 8</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{e.allowance8}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{e.value8}</TableCell>
                  </TableRow>
                  })
                }
                {
                    data.map((e)=> {
                  return <TableRow>
                  <TableCell >Allowance 9</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{e.allowance9}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{e.value9}</TableCell>
                  </TableRow>
                  })
                }
                {
                    data.map((e)=> {
                  return <TableRow>
                  <TableCell >Allowance 10</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{e.allowance10}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{e.value10}</TableCell>
                  </TableRow>
                  })
                }
               
                  <TableRow>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px', textAlign: 'right' }}>Total Allowance :</TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '100px' }}>INR {data.map((e) => {return   e.value1 + e.value2 + e.value3 + e.value4 + e.value5 + e.value6 + e.value7 + e.value8 + e.value9 + e.value10} )}</TableCell>
              </TableRow> 
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper} style={{ marginTop: '30px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '900px' }}>
            <Table>
              <TableRow>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}>Deduction</TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}>Name</TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '100px' }}>Value</TableCell>
              </TableRow>
              {
              data.map((e)=>{
                      return <TableRow> <TableCell>
                         Deduction 1
                        </TableCell>
                          <TableCell></TableCell>
                          <TableCell>{e.deduction1}</TableCell>
                          <TableCell></TableCell>
                          <TableCell>{e.valueA1}</TableCell>
                        </TableRow>
                    })
                    }
                    {
                    data.map((e)=> {
                  return <TableRow>
                  <TableCell >Deduction 2</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{e.deduction2}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{e.valueA2}</TableCell>
                  </TableRow>
                  })
                   }
                   {
                    data.map((e)=> {
                  return <TableRow>
                  <TableCell >Deduction 3</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{e.deduction3}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{e.valueA3}</TableCell>
                  </TableRow>
                  })
                  }

                  {
                    data.map((e)=> {
                  return <TableRow>
                  <TableCell >Deduction 4</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{e.deduction4}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{e.valueA4}</TableCell>
                  </TableRow>
                  })
                }
                {
                    data.map((e)=> {
                  return <TableRow>
                  <TableCell >Deduction 5</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{e.deduction5}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{e.valueA5}</TableCell>
                  </TableRow>
                  })
                }
                {
                    data.map((e)=> {
                  return <TableRow>
                  <TableCell >Deduction 6</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{e.deduction6}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{e.valueA6}</TableCell>
                  </TableRow>
                  })
                }
                {
                    data.map((e)=> {
                  return <TableRow>
                  <TableCell >Deduction 7</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{e.deduction7}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{e.valueA7}</TableCell>
                  </TableRow>
                  })
                }
                {
                    data.map((e)=> {
                  return <TableRow>
                  <TableCell >Deduction 8</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{e.deduction8}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{e.valueA8}</TableCell>
                  </TableRow>
                  })
                }
                {
                    data.map((e)=> {
                  return <TableRow>
                  <TableCell >Deduction 9</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{e.deduction9}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{e.valueA9}</TableCell>
                  </TableRow>
                  })
                }
                {
                    data.map((e)=> {
                  return <TableRow>
                  <TableCell >Deduction 10</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{e.deduction10}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{e.valueA10}</TableCell>
                  </TableRow>
                  })
                }
               
                  <TableRow>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px', textAlign: "right" }}>Total Deductions :</TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '100px' }}>INR {data.map((e) => {return   e.valueA1 + e.valueA2 + e.valueA3 + e.valueA4 + e.valueA5 + e.valueA6 + e.valueA7 + e.valueA8 + e.valueA9 + e.valueA10} )}</TableCell>
              </TableRow> 
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper} style={{ marginTop: '10px', marginLeft: '815px', maxWidth: '300px' }}>
            <Table>
              <TableRow>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px', textAlign: 'right' }}>Total Salary :</TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px', textAlign: 'left' }}>INR </TableCell>
              </TableRow>
              </Table>
          </TableContainer>
          </Grid>
          {/* <div className='receipt_action_div'>
            <div className='actions-right'>
            <button
             className='receipt_model_download-button'
             onClick={downloadPDF}
             disabled={!(loader===false)}
             >
              {loader?(
                <span>Downloading</span>
              ):(
                <span>Download</span>
              )}
             </button>
            </div>       
         </div> */}
      </Grid>
      {/* <Grid item xs={12}>
        <Button onClick={ ()=> generatePDF(targetRef, {filename: 'payslip.pdf'})}>Download Pdf</Button>
      </Grid> */}
    </div>
  );
};




export default Paycalc;
