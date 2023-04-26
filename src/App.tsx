/* src/App.js */
import React, { useEffect } from 'react'
//import PropTypes from 'prop-types';


import { Amplify, } from 'aws-amplify'
import awsExports from "./aws-exports"

import { withAuthenticator, Button as Abutton, Heading, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

//import style from '@/styles/Home.module.css'
//import { borders } from '@material-ui/system';
import Button from '@mui/material/Button';


import { ForHeader } from './pages/header'
import { Grid } from '@mui/material';








function App(){
  // eslint-disable-next-line @typescript-eslint/no-redeclare
  

  
  const week = ["日", "月", "火", "水", "木", "金", "土"];
  const today = new Date();

  const showDate = new Date(today.getFullYear(), today.getMonth(), 1);




  function CreateProcess(year: number, month: number) {
    // eslint-disable-next-line no-useless-concat
    let calendar = "<table>" + "<tr className='dayofweek'>"
      for (let i = 0; i < week.length; i++) {
        calendar += "<th>" + week[i] + "</th>"
      }
      calendar += "</tr>"

   

    let count = 0;
    let startDayOfWeek = new Date(year, month, 1).getDay();
    let endDate = new Date(year, month + 1, 0).getDate();
    let lastMonthEndDate = new Date(year, month, 0).getDate();
    let row = Math.ceil((startDayOfWeek + endDate) / week.length);

    for (let i = 0; i < row; i++) {
      calendar += "<tr>"
      for (let j = 0; j < week.length; j++) {
        if (i === 0 && j < startDayOfWeek) {
          calendar += "<td class='disabled'>" + (lastMonthEndDate - startDayOfWeek + j + 1) + "</td>";
        } else if (count >= endDate) {
          count++;
          calendar += "<td class='disabled'>" + (count - endDate) + "</td>";
        } else {
          count++;
          if (year === today.getFullYear()
            && month === (today.getMonth())
            && count === today.getDate()) {
            calendar += "<td class='today'>" + count + "</td>";
          } else {
            calendar += "<td>" + count + "</td>";
          }
        }
      }
      calendar += "</tr>";
    }          //↑のようなタグも全てコンポーネントに書き換えた方が良いのか？
    return calendar
      
      

      
    
  }


  function ShowProcess(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    // document.querySelector('#header')!.innerHTML = year + "年 " + (month + 1) + "月";
 

    let calendar = CreateProcess(year, month);
   document.querySelector('#calendar')!.innerHTML = calendar ;//←この部分を<Calendar>コンポーネントに付けたい

      //dateNumber = [year,month]
 return year
  }



  useEffect(() => {

    ShowProcess(today)
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function last() {
    showDate.setMonth(showDate.getMonth() - 1);
    ShowProcess(showDate);
    console.log(showDate)
  }


  function next() {
    showDate.setMonth(showDate.getMonth() + 1);
    ShowProcess(showDate);
    console.log("chip")
    console.log(showDate)
    
  }

  return (
    
    <>
     

      <div className="wrapper">
        <ForHeader ></ForHeader>
        <Grid >
    kkk
         
        </Grid>
        
       
        




        <div id="next-last-btn">
          <Button variant="contained" id="last" onClick={last}>＜</Button>
          <Button variant="contained" id="next" onClick={next}>＞</Button>
        </div>
        <div id="calendar"></div>


      </div>

    </>

  )
}
export let dateNumber: number = 9




export default (App);