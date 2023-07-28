export default function minimization(result,header,states){
    //step 1 
    
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
    checked.sort((a, b) => parseInt(a.match(/\d+/)) - parseInt(b.match(/\d+/)));
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

        newResult1 = newResult1.map(e=>{
            const index = states.indexOf(e[0])
            const indexData = result[index]
            let e1=Object.entries(e[1])
            e1 = e1.map(e2=>{
                let subIndex = states.indexOf(e2[0].trim())
                if(indexData.final!=result[subIndex].final){
                        return [e2[0],1]
                }else{
                        return [e2[0],'']
                }
            })
            return [e[0],Object.fromEntries(e1)]
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
    const finalResult = final_result(result,header,group,newResult3,states);
    
    // console.log(group)
    return {result:result,minimize:finalResult,step2:newResult1,class:group,step1:checked,dstep1:states};
}

function final_result(result,header,group,newResult3,states){
    const finalResult = newResult3.map((e,idx)=>{
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
    return finalResult;
}