import React, { useState, createContext } from 'react'


const GlobalContext = createContext("");

const GlobalStateProvider = ({children}) => {

    const [ theme, setTheme ] = useState(localStorage.getItem("selectedTheme"));
    const [ userType, setUserType ] = useState(localStorage.getItem("loginType"));
    const [ menuToggle, setMenuToggle ] = useState(false);



  return (
    <>
        <GlobalContext.Provider value={{ theme, setTheme, userType, setUserType, menuToggle, setMenuToggle }}>
            {children}
        </GlobalContext.Provider>


    </>
  )
}

export { GlobalStateProvider, GlobalContext }