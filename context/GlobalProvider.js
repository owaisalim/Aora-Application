import { createContext, useContext,useState,useEffect} from "react";
import { getCurrentUser } from "../lib/appwrite";
const GlobalContext = createContext();
export const useGlobalContext = () =>useContext(GlobalContext);
 
const GlobalProvider = ({children})=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getCurrentUser()
        .then((res) =>{
            if(res){
                setIsLoggedIn(true);
                setUser(res)
            } else {
                setIsLoggedIn(false)
                setUser(null);
            }
        })
        .catch((error) =>{
        console.log(error)
        })
        .finally(() =>{
            setIsLoading(false)
        })
    },[])

    // useEffect(()=>{
    //     try {
    //         const _session=account.getSession('current')
    //         _session.then(res=>{
    //             setSessionId(res[''])
    //             const promise=account.get()
    //             promise.then(res=>{
    //                 getCurrentUser(res)
    //             }).catch(err=>{
    //                 console.log(err);      
    //             })
    //         }).catch(err=>{            //  Error is here in the code
    //             console.log(err);   // AppwriteException: User (role: guests) missing scope (account) 
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // })
    return(
        <GlobalContext.Provider 
         value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            isLoading,

         }}
         >
            {children}
       </GlobalContext.Provider>
    );

}  
export default GlobalProvider