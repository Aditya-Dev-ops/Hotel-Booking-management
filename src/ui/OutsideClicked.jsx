import { useEffect, useRef } from "react";

export function useOutsideClicked(listenCapturing,Showform){
   const ref = useRef(null);
   useEffect(()=>{
        function HandleClick(e){
        if(listenCapturing.current && !listenCapturing.current.contains(e.target)){
             Showform(false);
        }}
        document.addEventListener('click',HandleClick,true);
        return()=>document.removeEventListener('click',HandleClick,true);
        },[listenCapturing,Showform])   
       
     return ref;
}