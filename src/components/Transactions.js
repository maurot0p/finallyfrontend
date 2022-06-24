import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useState,useEffect} from 'react'

import {Routes, Route, useNavigate} from 'react-router-dom';

import { styled } from '@mui/material/styles';

function preventDefault(event) {
  event.preventDefault();
}
function toDateString(dateString){
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const myDate = new Date(dateString)
  const newString = months[myDate.getMonth()] + ' ' + myDate.getDate() + ', ' + myDate.getFullYear()
  return newString
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor:"rgba(0,0,0,0.1)",
    color: theme.palette.common.black,
    borderWidth: 1,
    borderColor: "grey",
    borderStyle: "solid",
    fontWeight:600,
    
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderWidth: 1,
    borderColor: "grey",
    borderStyle: "solid",
  },
}));

export default function Transactions() {
  let [transactions,setTransactions] = useState([])
  const [isBusy, setBusy] = useState(true)

  useEffect(()=>{
      setBusy(true);
      getTransactions()
  }, [])
  let getTransactions = async () => {
    let response = await fetch('http://127.0.0.1:8000/api/transactions/')
    let data = await response.json()
    console.log('DATA:',data)
    setBusy(false)
    setTransactions(data)
  }
  return (  
 <div classname="transactions-list">
  {isBusy ? (
    <div></div> /*made this because the table was being loaded before the data*/
    ) : (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>ID</StyledTableCell>
            <StyledTableCell align='center'>Date</StyledTableCell>
            <StyledTableCell align='center'>Transaction type</StyledTableCell>
            <StyledTableCell align='center'>Account Number</StyledTableCell>
            <StyledTableCell align='center'>Note</StyledTableCell>
            <StyledTableCell align='center'>Amount</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {transactions && transactions.map((transaction,index)=> (
            <TableRow key={index}>
              <StyledTableCell align='center'>{transaction.id}</StyledTableCell>
              <StyledTableCell align='center'>{toDateString(transaction.date)}</StyledTableCell>
              <StyledTableCell align='center'>{transaction.transaction_type.toUpperCase()}</StyledTableCell>
              <StyledTableCell align='center'>***{transaction.account_id.account_number.substring(transaction.account_id.account_number.length-4,transaction.account_id.account_number.length)}</StyledTableCell>
              <StyledTableCell align='center'>{transaction.note}</StyledTableCell>
              <StyledTableCell align='center'>{transaction.transaction_type=='credit'?`+${transaction.amount}`:`-${transaction.amount}`}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
    )}
    </div>
  );
}