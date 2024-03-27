'use client'
import { ReactNode } from "react";
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import useAuthCheck from "@/hooks/useAuthCheck";



function AuthChecker ({ children }:{children: ReactNode}){
   const authCheck = useAuthCheck();
   return !authCheck? <div>Loading...</div>
   :
   <>
        <Header/>
        {children}
        <Footer/>
   </>
}
export default AuthChecker