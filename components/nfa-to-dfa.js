import ANSOne from "@/components/Answer/ANSOne";
import TableDynamic from "@/components/Table/TableDynamic";
import converter from "@/function/converter";
import determine from "@/function/determine";
import process_string from "@/function/process_string";
import { useRef, useState } from "react";

//create a function to convert NFA to DFA using javascript code


export default function NFAtoDFA({data}){
    // const params = useRouter();
    if(!data) return <></>
    const [resultValue,setResultValue]=useState(null)
    const [determine_fa,setDetermine_fa]=useState(null)
    // const data = params.query
    const refState = useRef(null)
    let x = ''
    let datas = []
    let header = []
    if(!data.state || !data.symbol) return <>Loading...</>
    const numState = [...Array(parseInt(data.state))].map((_,i)=>"q"+(i))
    const stateHandler = (type)=>{
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
                    let tran = ob.children[0].children[0].children[0].textContent
                    if(tran.trim()==String.fromCharCode(8203)) tran = 'Ø'
                    // console.log("Tran:"+tran +"type:"+tran.trim().charCodeAt(0));
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
        // const start = datas.findIndex(e=>e.is=='0')
        // const end = datas.findIndex(e=>e.is=='1')
        // const twoinone = datas.findIndex(e=>e.is=='2')
        // let startfinal={}
        // if(twoinone == -1){
        //     startfinal.start = 'q'+start
        //     startfinal.final = 'q'+end
        // }else{
        //     startfinal.start = 'q'+twoinone
        //     startfinal.final = 'q'+twoinone
        // }
        const startfinal = {start:'',final:[]}
        for(let data of datas){
            if(data.is=='0'){
                startfinal.start = data.state
            }
            if(data.is=='1'){
                startfinal.final.push(data.state)
            }
            if(data.is=='2'){
                startfinal.start = data.state
                startfinal.final.push(data.state)
            }
        }
        console.log(startfinal)
     
        if(type==1){
            const result = determine(datas,header)
            setDetermine_fa(result)
        }else if(type==2){
            const result = converter(datas,header,numState,startfinal)
            console.log(result)
            setResultValue(result)
        }else if(type==3){
            let str = prompt("Enter String",x)
            x = str!=null?str:x
            if(str!=null){
                if(determine_fa){
                    process_string(datas,startfinal,x)
                }else{
                    const datas1 = converter(datas,header,numState,startfinal).minimization.minimize;
                    let start1;
                    let final1=[];
                    for(let data of datas1){
                        if(data.start){
                            start1 = data.value
                        }
                        if(data.final){
                            final1.push(data.value)
                        }
                    }
                    const startfinal1 = {start:start1,final:final1}
                    console.log(datas1)
                    console.log(startfinal1)
                    process_string(datas1,startfinal1,x)
                }

                 
            }
           
        }
     
    }
    return <>
        <TableDynamic ref={refState} state={data.state} symbol={data.symbol}/>
        <div className="w-full flex  justify-center">
            <button className="bg-pink-800 text-center mx-auto px-6 rounded-lg hover:bg-pink-700 py-1 text-white font-bold" onClick={()=>{stateHandler(1)}}>Determine FA</button>
        </div>
        {
            determine_fa != null &&
            <div className="text-center mt-10 text-xl font-bold">
                {determine_fa?'This is Deterministic Finite Automata':'This is Non-Deterministic Finite Automata'}
            </div>
        }
        {
            determine_fa != null &&
            <div className="flex mt-12"> 
                {!determine_fa&&
                    <div className="w-full flex  justify-center">
                        <button className="bg-pink-800 text-center mx-auto px-6 rounded-lg hover:bg-pink-700 py-1 text-white font-bold" onClick={()=>{stateHandler(2)}}>Convert to DFA</button>
                    </div>
                }
                <div className="w-full flex  justify-center">
                    <button className="bg-pink-800 text-center mx-auto px-6 rounded-lg hover:bg-pink-700 py-1 text-white font-bold" onClick={()=>{stateHandler(3)}}>Process String</button>
                </div>
            </div>
        }
        <ANSOne result={resultValue}/>
    </>
}    