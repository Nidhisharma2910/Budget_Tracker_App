import React,{useState} from "react";

export const Auth = React.createContext();



function AuthContextProvider({children}){
    const [loggedin,setLoggedin] = useState(false)
    const [response,setResponse] = useState([])
    const [key,setKey] = useState("")

    function authenticate(){
        let auth = localStorage.getItem("auth");
        if(auth == undefined){
            setLoggedin(false)
        }else{
            setKey(auth)
            setLoggedin(true)
        }

        return auth
    }

    async function getuser(){
        let auth = authenticate()
        const res = await fetch("http://127.0.0.1:8000/user/u1/",{
            method:"POST",
            headers:{
                "content-type":"application/json",
                "Authorization":"token "+auth
            }
        });
        const data = await res.json();
        setResponse(data.user)
    }
    return <Auth.Provider value={{authenticate:authenticate,authstate:loggedin,getuser:getuser,response:response,key:key}}>
            {children}
        </Auth.Provider>
}

export default AuthContextProvider