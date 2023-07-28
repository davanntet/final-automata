import minimization from "./minimization"

export default function converter(datas,header,states,startfinal){
    header.pop()
    const result = []
    
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
        ds.sort((a, b) => parseInt(a.match(/\d+/)) - parseInt(b.match(/\d+/)));
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
            newArr2.sort((a, b) => parseInt(a.match(/\d+/)) - parseInt(b.match(/\d+/)));
            const ing = newPairState.findIndex(ex=> JSON.stringify(ex)==JSON.stringify(newArr2))
            console.log("Pair State: "+pairState)
            if(ing == -1){
                let findFinal = pairState.filter(e=>startfinal.final.includes(e))
                result.push(Object.fromEntries([['start',state == 'q0'],['final',state == 'q0'?false:findFinal.length==0?false:true],['value',state],[symbol,'q'+(newPairState.length)]]))
                newState.push('q'+(newPairState.length))
                oldState.push('q'+(newPairState.length))
                newPairState.push(newArr2)
                // console.log('not found',symbol)
            }else{
                let findFinal = pairState.filter(e=>startfinal.final.includes(e))
                result.push(Object.fromEntries([['start',state == 'q0'],['final',findFinal.length==0?false:true],['value',state],[symbol,oldState[ing]]]))
                // console.log('found',symbol)
            }
            
        }
        // console.log(pairState)
    }
    
    const mergeResult = Array.from({length:Math.ceil(result.length/header.length)},(_,index)=>{
        return Object.assign(...result.slice(index*header.length,(index+1)*header.length))
    })
    // return {pair:newPairState,result,state:oldState,header,mergeResult}
    // return mergeResult
    return {minimization:minimization(mergeResult,header,oldState),pair:newPairState,result,state:oldState,header,mergeResult}
}