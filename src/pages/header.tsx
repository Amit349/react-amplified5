import React from "react";
import { CalendarNum } from '../App';



type Props ={
  CalendarNumber: number[]
}


export const ForHeader = (props:Props) => {
   
    

    console.log(CalendarNum)
 
    return(
     <>
      <h2 id= "header">{props.CalendarNumber[0]}年{props.CalendarNumber[1]} 月</h2>
     </>
    
    )
    };

   
    
