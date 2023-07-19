import { useRouter } from "next/router";
import { useRef } from "react";

export default function InputInfo({actionData}){
    const refState = useRef(null);
    const refSymbol = useRef(null);
    const router = useRouter();
    const nextHandler = () => {
        //navigate to nfa-to-dfa/[state]/[symbol]
        const state = refState.current.value;
        const symbol = refSymbol.current.value;
        if(state && symbol){
            actionData(state,symbol)
        }
    }
    return <>
        <div className="w-96 flex flex-col mx-auto mt-10 gap-6">
            <input ref={refState} type="number" className="border-2 h-9 border-pink-800  outline-pink-700" placeholder="How many state of transaction. Ex:2 or 3 or 4"/>
            <input ref={refSymbol} type="text" className="border-2 h-9 border-pink-800  outline-pink-700" placeholder="Please input symbol. Ex: a,b,c,d,.."/>
            <button className="bg-pink-800 w-max mx-auto px-10 rounded-lg font-semibold text-base text-white h-9 hover:bg-pink-700 mt-3 underline" onClick={nextHandler}>APPLY</button>
        </div>
    </>
}