
import MenuBar from "./MenuBar";

export default function Header(){
    
    return <>
    <div className="bg-pink-900 w-full h-14 flex justify-between px-7  overflow-x-hidden fixed top-0 left-0 z-30">
        <MenuBar/>
    </div>
    </>
}