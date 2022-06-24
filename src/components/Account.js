import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {useState,useEffect} from 'react'
function preventDefault(event) {
  event.preventDefault();
}

export default function Accounts(props) {
  let [accounts,setAccounts] = useState([])

  useEffect(()=>{
      getAccounts()
  },[]) //passing the second argument tells React to skip applying an effect if values havent changed
  let getAccounts = async () => {
    let response = await fetch('http://127.0.0.1:8000/api/accounts/')
    let data = await response.json()
    console.log('DATA:',data)
    setAccounts(data)
  }
  return (
    <div className="accounts-list" style={{display:"flex",gap:"30px",flexWrap:"wrap"}}>
  {accounts.map((account,index)=> (
    <React.Fragment key={index}>
      <Grid item >
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    width:386,
                  }}
                >
      <div style = {{display:"flex", flexDirection:"column",gap:"0px",flex:"1 1 40%"}}>
      <Title>Account Number</Title>
      <Typography component="p" variant="h6" color= "text.primary" sz={{fontWeight:'500'}} >
        {account.account_number}
      </Typography>
      </div>
      <div  style ={{display:"flex", width:"100%",justifyContent:'space-between'}}>
      <Typography component="p" variant="h5" sx={{fontWeight: '500'}}>
        Curent Balance 
      </Typography>
      <Typography component="p" variant="h5" sx={{ fontWeight: '500', alignSelf:'flex-end'}}>
        {`$${account.current_balance}`}
      </Typography>

      </div>
      <div style={{alignSelf:"flex-end"}}>
        <Link color="primary" onClick={() => props.onLinkClick('btn1')}> {/*want to be able to change the state of dashboard with this click*/}
          View transactions
        </Link>
      </div>
      </Paper>
      </Grid>

    </React.Fragment>
   ))}
    </div>

  );
}