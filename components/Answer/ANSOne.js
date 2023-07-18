

export default function ANSOne({result}){
    if(result ==null){
        return <>Waiting for answer</>
    }
    const {minimization,pair,state,header,mergeResult} = result;
    
    const step1 = result.result;
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
        <div className="tracking-widest text-lg font-semibold">So,We have:{
            pair.map((e,ind)=>{
                return <div >q{ind+' = {'+e.join(',')+'}'}</div>
            })
            }</div>
        <h1 className="mt-6 text-xl font-bold">Minimization of DFA</h1>
    </div>
}