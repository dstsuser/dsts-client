'use client'
const { userLoggedIn } = require("@/lib/redux/features/auth/authSlice");
const { useState, useEffect } = require("react");
const { useDispatch } = require("react-redux");

const useAuthCheck = () =>{
    const [authChecked,setAuthChecked] = useState(false);
    const dispatch = useDispatch();


    useEffect(()=>{
        const localAuth = localStorage.getItem('auth');
        if(localAuth){
            const auth = JSON.parse(localAuth);
            if(auth.token && auth.user){
                dispatch(userLoggedIn({
                    token: auth.token,
                    user: auth.user
                }))
            } 
        }
        setAuthChecked(true)
    },[dispatch,setAuthChecked])

    return authChecked;
}

export default useAuthCheck;