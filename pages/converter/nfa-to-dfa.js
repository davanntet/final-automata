import ANSOne from "@/components/Answer/ANSOne";
import TableDynamic from "@/components/Table/TableDynamic";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

//create a function to convert NFA to DFA using javascript code
function converter(datas,header,states,startfinal){
    // console.log(datas)
    const result = []
    header.pop()
    const newState = []
    const newPairState = []
    const oldState = []
    newState.push('q0')
    oldState.push('q0')
    if(datas[0].ε == 'Ø'){
        newPairState.push(['q0'])
    }else{
        const ds = datas[0].ε.split(',')
        ds.push('q0')
        ds.sort()
        newPairState.push(ds)
    }
    while(newState.length >0){
        const state = newState[0]
        newState.shift();
        const index = oldState.indexOf(state.trim())
        const pairState = newPairState[index]
        for(const symbol of header){
            let newArr=[]
            let newArr2=[]
            for(let pair of pairState){
                let ind = states.indexOf(pair.trim())
                const inv = datas[ind][symbol]
                if(inv == 'Ø'){
                    console.log("Ø is found")
                    continue
                }
                newArr.push(...inv.split(','))
            }
           
            for(let pair of newArr){
                try {
                    let ind = states.indexOf(pair.trim())
                    const inv = datas[ind]['ε']
                    newArr2.push(pair)
                    if(inv != 'Ø'){
                        newArr2.push(...inv.split(','))
                    }
                } catch (error) {
                    console.log("something went wrong")
                }
                
            }
            newArr2 = newArr2.map(e=>e.trim())
            newArr2 = Array.from(new Set(newArr2))
            newArr2.sort()
            const ing = newPairState.findIndex(ex=> JSON.stringify(ex)==JSON.stringify(newArr2))
            if(ing == -1){
                result.push(Object.fromEntries([['start',state == 'q0'],['final',state == 'q0'?false:pairState.includes(startfinal.final)],['value',state],[symbol,'q'+(newPairState.length)]]))
                newState.push('q'+(newPairState.length))
                oldState.push('q'+(newPairState.length))
                newPairState.push(newArr2)
            }else{
                result.push(Object.fromEntries([['start',state == 'q0'],['final',pairState.includes(startfinal.final)],['value',state],[symbol,oldState[ing]]]))
            }
        }
        // console.log(pairState)
    }
    
    const result1 = result.filter((e,idx)=>idx%2==0)
    const result2 = result.filter((e,idx)=>idx%2==1)
    const mergeResult = []
    for(let i=0;i<result1.length;i++){
        mergeResult.push(Object.assign(result1[i],result2[i]))
    }
    // return mergeResult
    return {minimization:minimization(mergeResult,header,oldState),pair:newPairState,result,state:oldState,header,mergeResult}
}

function minimization(result,header,states){
    //step 1 
    // console.log(result)
    // result = []
    // states = ['q0','q1','q2','q3','q4']
    // header = ['a','b']
    // result.push(Object.fromEntries([['start',true],['final',false],['value','q0'],['a','q1'],['b','q3']]))
    // result.push(Object.fromEntries([['start',false],['final',false],['value','q1'],['a','q2'],['b','q4']]))
    // result.push(Object.fromEntries([['start',false],['final',false],['value','q2'],['a','q1'],['b','q4']]))
    // result.push(Object.fromEntries([['start',false],['final',false],['value','q3'],['a','q2'],['b','q4']]))
    // result.push(Object.fromEntries([['start',false],['final',true],['value','q4'],['a','q4'],['b','q4']]))
   
    let newState = []
    let checked = []
    newState.pop()
    for(let symbol of header){
        newState.push(result[0][symbol])
    }
    checked.push('q0')
    newState = newState.filter(e=>e!='q0')
    while(newState.length>0){
        const state = newState[0]
        newState.shift()
        checked.push(state)
        const index = states.indexOf(state)
        for(let symbol of header){
            try {
                const value = result[index][symbol]
                if(!checked.includes(value)){
                    newState.push(value)
                } 
            } catch (error) {
                console.log("something went wrong")
            }
            
        }
    }
    checked = Array.from(new Set(checked))
    checked.sort()
    // return checked

    //step 2
        //iteration 1
        let checked1 = [...checked];
        let checked2 = [...checked];
        checked2.pop()
        let newResult1 = checked2.map(e=>{
            checked1.shift()
            return [e,Object.fromEntries(
                checked1.map(ex=>{
                    return [ex,'']
                })
            )]
        })
        // return newResult1
        newResult1 = newResult1.map(e=>{
            const index = states.indexOf(e[0])
            const indexData = result[index]
            if(indexData.final){
                let e1=Object.entries(e[1])
                e1 = e1.map(e2=>{
                    return [e2[0],1]
                })
                return [e[0],Object.fromEntries(e1)]
            }else{
                let e1=Object.entries(e[1])
                e1 = e1.map(e2=>{
                    let subIndex = states.indexOf(e2[0].trim())
                    if(result[subIndex].final){
                        return [e2[0],1]
                    }
                    return [e2[0],'']
                })
               return [e[0],Object.fromEntries(e1)]
            }
        })
        // return newResult1
        //iteration 2
        newResult1 = newResult1.map(e=>{
            const index = states.indexOf(e[0])
            const indexData = result[index]
            let e1=Object.entries(e[1])
            e1 = e1.map(e2=>{
                if(e2[1]==1){
                    return [e2[0],1]
                }else{
                        let sumResult=[]
                        for(let symbol of header){

                            // console.log(symbol)
                        const subIndex = states.indexOf(e2[0])
                        const subIndexData = result[subIndex]
                        const one = subIndexData[symbol]
                        const two = indexData[symbol]
                        const oneIndex = result[states.indexOf(one)]
                        const twoIndex = result[states.indexOf(two)]
                        // console.log(symbol,indexData,two,twoIndex.final,subIndexData,one,oneIndex.final)
                        if(oneIndex.final||twoIndex.final){
                            if(one!=two){
                                sumResult=[e2[0],2]
                                break;
                            }else{
                                sumResult = [e2[0],'']
                            }
                        }else{
                            sumResult=[e2[0],'']
                        }
                        }
                     return sumResult;

                }
            })
            return [e[0],Object.fromEntries(e1)]
        })
        // return newResult1
        //iteration 3
        newResult1 = newResult1.map(e=>{
            const index = states.indexOf(e[0])
            const indexData = result[index]
            let e1=Object.entries(e[1])
            e1 = e1.map(e2=>{
                if(e2[1]==1){
                    return [e2[0],1]
                }else if(e2[1]==2){
                    return [e2[0],2]
                }else{
                        let ans=false
                        for(let symbol of header){
                            // console.log(symbol)
                            const subIndex = states.indexOf(e2[0])
                            const subIndexData = result[subIndex]
                            const one = subIndexData[symbol]
                            const two = indexData[symbol]
                            if(one!=two){
                                ans=true
                            }else if(one==two){
                                ans=false
                                break;
                            }   
                        }
                        if(ans){
                            return [e2[0],3]
                        }else{
                            return [e2[0],'']
                        }
                }
            })
            return [e[0],Object.fromEntries(e1)]
        })
        // return newResult1
    // console.log(checked,newState)
    // console.log(result)

    //group the state into equivalence class
    const newResult2 = [...newResult1]
    let group = []
    let already = []
    for(let e of newResult2){
        const dt = Object.entries(e[1])
        const dts=[]
        if(already.includes(e[0])) continue;
        dts.push(e[0])
        already.push(e[0])
        for(let d of dt){
            if(d[1]==''){
                dts.push(d[0])
                already.push(d[0])
            }
        }
        group.push(dts)
    }
    if(!already.includes(checked[checked.length-1])){
        group.push([checked[checked.length-1]])
        already.push(checked[checked.length-1])
    }

    // console.log(group)
    // console.log(newResult1)
    // return newResult1;
    let newResult3 = []
    for(let e of group){
        newResult3.push(e[0])
    }
    let finalResult = newResult3.map((e,idx)=>{
        let index = states.indexOf(e)
        let indexData = result[index]
        indexData.value = 'q'+idx
        for(let symbol of header){
            const subIndexData = indexData[symbol]
            for(let ex of group){
                if(ex.includes(subIndexData)){
                    indexData[symbol] = 'q'+group.indexOf(ex)
                }
            }
        }
        const subData = group[idx]
        for(let ed of subData){
            let ined = states.indexOf(ed)
            let inedData = result[ined]
            if(inedData.final){
                indexData.final = true
            }
            if(inedData.start){
                indexData.start = true
            }
        }

        return indexData
    })
    // console.log(group)
    return {result:result,minimize:finalResult,step2:newResult1,class:group,step1:checked,dstep1:states};
}

export default function NFAtoDFA(){
    const params = useRouter();
    const [resultValue,setResultValue]=useState(null)
    const data = params.query
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
            <button className="bg-pink-800 text-center mx-auto px-6 rounded-lg hover:bg-pink-700 py-1 text-white font-bold" onClick={stateHandler}>Convert to DFA</button>
        </div>
        <ANSOne result={resultValue}/>
    </>
}    