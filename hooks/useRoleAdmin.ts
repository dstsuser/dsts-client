const { useSelector } = require("react-redux")

const useRoleAdmin = ()=>{
    const auth = useSelector((state:any)=>state.auth)
    if(auth?.user?.roles.includes('ADMIN')){
        return true;
    }
    return false;
}

export default useRoleAdmin;