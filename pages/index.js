import InputInfo from "@/components/input/InputInfo"
import NFAtoDFA from "./converter/nfa-to-dfa"
import { useState } from "react"


export default function Home() {
  const [value,setValue] = useState(null)
  const stateHandler = (state,symbol)=>{
    setValue({state,symbol})
  }
  return <>
    <div className="w-full">
        <div>
          <div className="flex  flex-col w-96  mt-10 mx-auto">
            <h1 className="text-2xl font-bold text-center w-full">Converter NFA to DFA</h1>
          </div>
          <InputInfo actionData={stateHandler}/>
        </div>
        <div className="px-16 mt-10 mb-10">
          <NFAtoDFA data={value}/>
        </div>
    </div>
  </>
}