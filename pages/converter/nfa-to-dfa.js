import TableDynamic from "@/components/Table/TableDynamic";
import { useRouter } from "next/router";
import { useRef } from "react";

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
        newPairState.push(datas[0].ε.split(','))
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
            const ing = newPairState.findIndex(ex=> JSON.stringify(ex)==JSON.stringify(newArr2))
            if(ing == -1){
                result.push(Object.fromEntries([['start',state == 'q0'],['final',pairState.includes(startfinal.final)],['value',state],[symbol,'q'+(newPairState.length)]]))
                newState.push('q'+(newPairState.length))
                oldState.push('q'+(newPairState.length))
                newPairState.push(newArr2)
            }else{
                result.push(Object.fromEntries([['start',state == 'q0'],['final',pairState.includes(startfinal.final)],['value',state],[symbol,oldState[ing]]]))
            }
        }
        // console.log(pairState)
    }
    
    // console.log(newPairState)
    //  console.log(newState,oldState,newPairState)
    const result1 = result.filter((e,idx)=>idx%2==0)
    const result2 = result.filter((e,idx)=>idx%2==1)
    const mergeResult = []
    for(let i=0;i<result1.length;i++){
        mergeResult.push(Object.assign(result1[i],result2[i]))
    }
    // console.log(mergeResult)
    minimization(mergeResult,header,oldState)
    
}

function minimization(result,header,states){
    //step 1 
    // console.log(result)
    result = []
    states = ['q0','q1','q2','q3','q4','q5','q6','q7']
    let newState = []
    let checked = []
    result.push(Object.fromEntries([['start',true],['final',false],['value','q0'],['a','q1'],['b','q5']]))
    result.push(Object.fromEntries([['start',false],['final',false],['value','q1'],['a','q6'],['b','q2']]))
    result.push(Object.fromEntries([['start',false],['final',true],['value','q2'],['a','q0'],['b','q2']]))
    result.push(Object.fromEntries([['start',false],['final',false],['value','q3'],['a','q2'],['b','q6']]))
    result.push(Object.fromEntries([['start',false],['final',false],['value','q4'],['a','q7'],['b','q5']]))
    result.push(Object.fromEntries([['start',false],['final',false],['value','q5'],['a','q2'],['b','q6']]))
    result.push(Object.fromEntries([['start',false],['final',false],['value','q6'],['a','q6'],['b','q4']]))
    result.push(Object.fromEntries([['start',false],['final',false],['value','q7'],['a','q6'],['b','q2']]))
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
                    let subIndex = states.indexOf(e2[0])
                    if(result[subIndex].final){
                        return [e2[0],1]
                    }
                    return [e2[0],'']
                })
               return [e[0],Object.fromEntries(e1)]
            }
        })
        //iteration 2
        
        //iteration 3

    // console.log(checked,newState)
    // console.log(result)
    console.log(newResult1)
    
}

export default function NFAtoDFA(){
    const params = useRouter();
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
                    // console.log(([header[index],tran]))
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
        // console.log(start,end,twoinone)
        let startfinal={}
        if(twoinone == -1){
            startfinal.start = 'q'+start
            startfinal.final = 'q'+end
        }else{
            startfinal.start = 'q'+twoinone
            startfinal.final = 'q'+twoinone
        }

        converter(datas,header,numState,startfinal)
    }
    return <>
        <TableDynamic ref={refState} state={data.state} symbol={data.symbol}/>
        <div className="w-full flex  justify-center">
            <button className="bg-pink-800 text-center mx-auto px-6 rounded-lg hover:bg-pink-700 py-1 text-white font-bold" onClick={stateHandler}>Convert to DFA</button>
        </div>
    </>
}    