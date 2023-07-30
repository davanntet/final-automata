

export default function ANSOne({result}){
    if(result ==null){
        return <></>
    }
    const {minimization,pair,state,header,mergeResult} = result;
    const firstStep = minimization.step1;
    const secondStep = minimization.step2;
    const {minimize} = minimization;
    const step1 = result.result;
    const groupClass = minimization.class;
    const secondY = [...firstStep]
    secondY.sort()
    secondY.shift()
    secondY.push(" ")
    secondY.reverse()
    return <div className="px-10 py-10">
        <h1 className="text-xl font-bold">Convert to DFA</h1>
        <div>{state.map((e,ind)=>{
            // const idx=state.indexOf(e.value)
            // return <div>{'{'+pair[idx].join(',')+'}'}</div>
            return <div className="flex space-x-6 tracking-widest text-lg font-semibold" key={ind}><div className="mt-3">{ind==0?'+{q0}--ε-->{'+pair[ind].join(',')+"} = q0 : ":'+q'+ind+'= {'+pair[ind].join(',')+'} : '}</div><div className="mt-3">{
                header.map(h=>{
                    const str = mergeResult[ind][h]
                    const idx = state.indexOf(str)  
                    return <div key={ind+h}>{'{'+pair[ind].join(',')+'}'}<sup className="underline">        {h}        </sup>{'> {'+pair[idx]+'}='+str}</div>
                })
            }</div></div>
        })}</div>
        <div className="tracking-widest text-lg font-semibold mt-10">So,We have:{
            pair.map((e,ind)=>{
                return <div className="ml-10">q{ind+' = {'+e.join(',')+'}'}</div>
            })
            }</div>
        <h1 className="mt-6 text-xl font-bold">Minimization of DFA</h1>
        <h2 className="mt-6 text-lg font-bold ml-10 mb-5">Step 1: <span className="font-semibold ml-1">Remove non accessible states</span></h2>
        <table className="tracking-widest text-lg font-semibold ml-10">
            <tr>
                {state.map(e=>{
                    return <th className="w-40 border-2">{e}</th>
                })}
            </tr>
            <tr>
                {state.map((e,key)=>{
                    return <td key={key} className="w-40 border-2 text-center">{firstStep.includes(e)?<span className="text-center text-green-600">🗸</span>:<span className="text-center text-red-600">x</span>}</td>
                })}
            </tr>
        </table>
        <h2 className="mt-6 text-lg font-bold ml-10">Step 2: <span className="font-semibold ml-1">Mark the distinguishable pairs of states</span></h2>
        <table className="-rotate-90 ml-10 mt-4">
            <tr>{
                secondY.map((e,ind)=>{
                    return <th className="w-14 h-14  text-center rotate-90" key={ind}>{e}</th>
                })
                }</tr>
            {
                secondStep.map((e,ind)=>{
                    const e1 = Object.entries(e[1])
                    e1.reverse()
                    return <tr key={ind}>
                        <th className="w-14 h-14  text-center rotate-90">{e[0]}</th>
                        {
                            e1.map((e2,ind2)=>{
                                return <td key={ind2} className="w-14 h-14 rotate-90 border-2 text-center">{e2[1]}</td>
                            })
                        }
                    </tr>
                })
            }
        </table>
        <h2 className="mt-6 text-lg font-bold ml-10">Step 3: <span className="font-semibold ml-1">Construct the minimized DFA</span></h2>   
        <div className="ml-14  tracking-widest text-lg font-semibold">
            {
                groupClass.map((e,ind)=>{
                    return <div key={ind}>{"q"+ind}={'{'+e+'}'}</div>
                })
            }
        </div>
        <h2 className="mt-6 text-lg font-bold ml-10">Final Result</h2>   
        <table className="ml-14  tracking-widest text-lg font-semibold mt-6">
                 <tr>
                    <th className="h-14  text-center border-2 w-40 text-sm">state/symbol</th>
                    {
                        header.map((h,inh)=>{
                            return <th key={inh} className="h-14  text-center border-2 w-40">{h}</th>
                        })
                    }
                </tr>
            {
                minimize.map((e,ind)=>{
                    return <tr key={ind}>
                        
                        <th className="h-14  text-center border-2 w-40">{e.start&&e.final?'-->*':e.start?'-->':e.final?'*':''} {e.value}</th>
                        {
                            header.map((h,inh)=>{
                                return <td key={inh} className="w-40 h-14 border-2 text-center">{e[h]}</td>
                            })
                        }
                    </tr>
                })
            }
        </table>
    </div>
}