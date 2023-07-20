import { useState } from "react";
import MenuBar from "./MenuBar";
import ThreeLine from "./ThreeLine";

export default function Header(){
    const [show,setShow] = useState(false)
    return <>
    <div className="bg-pink-900 w-full h-14 flex justify-between px-7  overflow-x-hidden">
        <MenuBar/>
        <div className="h-full flex items-center" onClick={()=>{setShow(true)}}>
            <ThreeLine/>
        </div>
        <div className="fixed h-full w-full top-0 left-0 z-50" hidden={!show}>
            <div className="absolute h-full w-full  opacity-0 top-0 left-0" onClick={()=>{setShow(false)}}></div>
            <div className={`w-44 h-96 absolute top-0 ${show?'right-0':'-right-44'} bg-red-500`}>
                
            </div>
        </div>
    </div>
    </>
}