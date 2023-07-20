import ANSOne from "@/components/Answer/ANSOne";
import TableDynamic from "@/components/Table/TableDynamic";
import converter from "@/function/converter";
import { useRef, useState } from "react";

//create a function to convert NFA to DFA using javascript code


export default function NFAtoDFA({data}){
    // const params = useRouter();
    if(!data) return <></>
    const [resultValue,setResultValue]=useState(null)
    // const data = params.query
    const refState = useRef(null)
    let datas = []
    let header = []
    if(!data.state || !data.symbol) return <>Loading...</>
    const numState = [...Array(parseInt(data.state))].map((_,i)=>"q"+(i))
    const stateHandler = ()=>{
        datas = []
        header = []
        const value = refState.current.children
        let tbody =  value[1].children
        let theader = value[0].children[0].children
        for(const obj of theader){
            header.push(obj.textContent)
        }
        header.shift()
        for(const obj of tbody){
            const val = obj.children
            const objData = [];
            let index = 0;
            for(const ob of val){
                if(index >1){
                    const tran = ob.children[0].children[0].children[0].textContent
                    objData.push([header[index-2],tran])
                }else if(index==0){
                    objData.push(['is',ob.textContent])
                }else if(index==1){
                    objData.push(['state',ob.children[1].textContent])
                }
                index++;
            }
            datas.push(Object.fromEntries(objData))
        }
        //find start and final state
        const start = datas.findIndex(e=>e.is=='0')
        const end = datas.findIndex(e=>e.is=='1')
        const twoinone = datas.findIndex(e=>e.is=='2')
        let startfinal={}
        if(twoinone == -1){
            startfinal.start = 'q'+start
            startfinal.final = 'q'+end
        }else{
            startfinal.start = 'q'+twoinone
            startfinal.final = 'q'+twoinone
        }
        
        const result = converter(datas,header,numState,startfinal)
        setResultValue(result)
        console.log(result)
    }
    return <>
        <TableDynamic ref={refState} state={data.state} symbol={data.symbol}/>
        <div className="w-full flex  justify-center">
            <button className="bg-pink-800 text-center mx-auto px-6 rounded-lg hover:bg-pink-700 py-1 text-white font-bold" onClick={stateHandler}>Convert</button>
        </div>
        <ANSOne result={resultValue}/>
    </>
}    