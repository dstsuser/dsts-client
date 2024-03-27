const { useSelector } = require("react-redux")

const useAuth = ()=>{
    const auth = useSelector((state:any)=>state.auth)
    if(auth?.token && auth?.user){
        return true;
    }else{
        return false;
    }
}

export default useAuth;