import { createContext, useState } from "react";

export const MarksContext=createContext()


export default function MarksObtained({children}){
    const [marks,setMarks]=useState(0)

    return(    
    <MarksContext.Provider value={{marks,setMarks}}>
        {children}
    </MarksContext.Provider>
    )

}