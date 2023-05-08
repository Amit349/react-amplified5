import React from "react";
import { ShowProcess, CalendarNum } from '../App';


type Props ={
  count:number
}

export const ForHeader: React.FC<Props> = (props) =>  {
   
    
    console.log(ShowProcess)
    console.log(CalendarNum)
 
    return(
     <>
      <h2 id= "header">{CalendarNum[0]}年{CalendarNum[1]} 月</h2>
     </>
    
    )
    };

   
    
