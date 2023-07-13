import History from "./History";
import MenuBar from "./MenuBar";

export default function Header(){
    return <>
    <div className="bg-pink-900 w-full h-14 flex justify-between px-7">
        <MenuBar/>
        <History/>
    </div>
    </>
}