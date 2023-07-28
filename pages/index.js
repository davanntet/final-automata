import InputInfo from "@/components/input/InputInfo"
import NFAtoDFA from "@/components/nfa-to-dfa"

import { useState } from "react"


export default function Home() {
  const [value,setValue] = useState(null)
  const stateHandler = (state,symbol)=>{
    setValue({state,symbol})
  }
  return <>
    <div className="w-full relative">
    
        <div>
          <div className="flex  flex-col w-96  mt-10 mx-auto">
          </div>
          <InputInfo actionData={stateHandler}/>
        </div>
        <div className="px-16 mt-10 mb-10">
          <NFAtoDFA data={value}/>
        </div>
    </div>
  </>
}