import { forwardRef } from "react"
import MultipleSelectCheckmarks from "./TestOption"

export default forwardRef(function TableDynamic(props,ref) {
    const state = props.state
    const symbol = props.symbol
    if(!state || !symbol) return <>Loading...</>
    const numState = [...Array(parseInt(state))].map((_,i)=>"q"+(i))
    const numString = symbol.split(',')
    numString.push('ε')
    const newState= [...numState,'Ø']
    return <>
        {/* <input type="text" className="border-2 border-pink-800 w-full text-center" placeholder="Enter state" ref={ref}/> */}
        <div className="m-6">
            <table className="w-full border-2 text-center border-spacing-4" ref={ref}>
                <thead className="">
                    <tr className={`flex flex-rows`}>
                        <th className="border-2 border-pink-800 w-full">state/symbol</th>
                        {numString.map(e => <th className="border-2 border-pink-800 w-full" key={e.charCodeAt()}>{e}</th>)}
                    </tr>
                </thead>
                <tbody className="">
                    {
                        numState.map((e,i) => 
                        <tr key={e.charCodeAt()} className={`flex flex-row`}>
                            <label id={e} hidden>{i==0?0:i==numState.length-1?1:''}</label>
                            <th className="border-2 border-pink-800 flex items-center w-full justify-center"><select onChange={(el)=>{
                                document.getElementById(e).textContent = el.target.value;
                            }}><option value={''}></option><option value='0' selected={i==0?true:false}>--&gt;</option><option value={1} selected={i==numState.length-1}>*</option><option value={2}>--&gt;*</option></select><span>{e}</span></th>
                            {[...Array(numString.length)].map(_=> <td className=" border-pink-800 w-full" key={_}>
                            <MultipleSelectCheckmarks names={newState}/>
                            </td>)}
                        </tr>)
                    }
                </tbody>
            </table>
            
        </div>
    </>
}
)