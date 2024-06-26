import { createContext, useContext, useState} from "react";
import axios from "axios";
const StateContext = createContext({
    user: null,
    token: null,
    setUser: ()=>{},
    setToken: ()=>{},
    notification:null,
    setNotification:()=>{}
})


export const ContextProvider = ({children})=>{
    const [user, setUser] = useState({})
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))
    const [notification, _setNotification] = useState('')
   

    const setNotification =(message)=>{
        _setNotification(message);

        setTimeout(()=>{
            _setNotification('');
        }, 5000)
    }
    


    const setToken = (token)=>{
        _setToken(token)

        if(token){
            localStorage.setItem('ACCESS_TOKEN', token);
        }else{
            localStorage.removeItem("ACCESS_TOKEN")
        }
    }
    return(
        <StateContext.Provider value ={{
            user,
            token,
            setUser,
            setToken,
            notification,
            setNotification,
            
        }}>

            {children}

        </StateContext.Provider>
    )
}

export const useStateContext = ()=>useContext(StateContext)

