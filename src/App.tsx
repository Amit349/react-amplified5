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


//import { ForHeader } from './pages/components/header'
//import {hh} from './pages/components/headerCopy'








function App({ signOut, user }:{signOut:any , user:any }){
  // eslint-disable-next-line @typescript-eslint/no-redeclare
  

  
  const week = ["日", "月", "火", "水", "木", "金", "土"];
  const today = new Date();

  const showDate = new Date(today.getFullYear(), today.getMonth(), 1);

  let dateNumber:number[] = []


  function createProcess(year: number, month: number) {
    // eslint-disable-next-line no-useless-concat
    let calendar = "<table>" + "<tr className='dayofweek'>"
      for (let i = 0; i < week.length; i++) {
        calendar += "<th>" + week[i] + "</th>"
      }
      calendar += "</tr>"

    //このようなjsxで書かれたHTMLタグをmaterial-UIの<Box>コンポーネント(又は複数の種類のコンポーネント)に書き換えたい
   

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
    return calendar;
  }


  function ShowProcess(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    // document.querySelector('#header')!.innerHTML = year + "年 " + (month + 1) + "月";
 


    let calendar = createProcess(year, month);
    document.querySelector('#calendar')!.innerHTML = calendar ;//←この部分を<Calendar>コンポーネントに付けたい

      dateNumber = [year,month]
    console.log(dateNumber)
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
    let B = 0
    console.log(B)
    B++
    if (B === 3) {
      console.log(B)
    }
  }


  return (
    <>
      <View style={styles.container}>
        <Heading level={3}>Hello {user.username}</Heading>
        <Abutton onClick={signOut}>Sign out</Abutton>
      </View>

      <div className="wrapper">
        
       
        
        {/*ここでHeaderコンポーネントを呼び出したい*/}





        <div id="next-last-btn">
          <Button variant="contained" id="last" onClick={last}>＜</Button>
          <Button variant="contained" id="next" onClick={next}>＞</Button>
        </div>
        <div id="calendar"></div>


      </div>

    </>

  )
}
export let dateNumber: number[]


const styles = {
  container: { width: 250, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 25 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default withAuthenticator(App);