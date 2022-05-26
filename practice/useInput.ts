import { useState } from "react"
import React from "react";
const useInput = (initialvalue:string) => {
        const [value,setValue]=useState<string>(initialvalue);
        const bind ={
            value: value,
            onChange: (e:React.MouseEvent<HTMLInputElement, MouseEvent>)=>{
              
            }
        }

        const printValue=()=>{
                console.log(value);
        }

        return [bind,printValue]
}

export default useInput


