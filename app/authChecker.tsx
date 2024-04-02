'use client'
import { ReactNode } from "react";
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import useAuthCheck from "@/hooks/useAuthCheck";
import { usePathname, useRouter } from "next/navigation";
import HeaderBanner from "@/components/HeaderBanner/HeaderBanner";
import HeaderComponent from "@/components/HeaderContainer/HeaderContainer";



function AuthChecker ({ children }:{children: ReactNode}){
   const authCheck = useAuthCheck();
   const router = useRouter();
   const pathname = usePathname();
   console.log(pathname)
   return !authCheck? <div>Loading...</div>
   :
   <>
         {/* {(pathname==='/' || pathname==="/home") &&  <HeaderBanner/>} */}
         {pathname==="/" || pathname==="/home" ? <HeaderComponent/> : <Header/>}
         {/* <HeaderComponent/> */}
         {children}
         <Footer/>
   </>
}
export default AuthChecker