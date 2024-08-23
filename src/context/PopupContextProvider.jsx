import {useState } from "react";
import PopupContext from "./PopupContext";
export default function PopupContextProvider({children}) {
    const [isVisible, setIsVisible] = useState(false);
    const [page, setPage] = useState(null);

   

    const ShowPopUp = (name) =>{
      setIsVisible(true);
      setPage(name);
    }

    const HidePopUp = (name) =>{
      setIsVisible(false);
      setPage(null);
    }

    const context = {
        ShowPopUp,
        HidePopUp,
        isVisible,
        page,
    }

  return (
    <>
        <PopupContext.Provider value={context}>
            {children}    
        </PopupContext.Provider>        
    </>
  )
}
