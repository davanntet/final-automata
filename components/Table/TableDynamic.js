import MultipleSelectCheckmarks from "./TestOption"

export default function TableDynamic({state, symbol}) {
    if(!state || !symbol) return <>Loading...</>
    const numState = [...Array(parseInt(state))].map((_,i)=>"q"+(i))
    const numString = symbol.split(',')
    return <>
        {/* <div className="flex items-center justify-center mt-3">
            <AddTable/>
        </div> */}
        
        <div className="m-6">
            <table className="w-full border-2 text-center border-spacing-4 ">
                <thead className="">
                    <tr className={`flex flex-rows`}>
                        <th className="border-2 border-pink-800 w-full">state/symbol</th>
                        {numString.map(e => <th className="border-2 border-pink-800 w-full" key={e.charCodeAt()}>{e}</th>)}
                    </tr>
                </thead>
                <tbody className="">
                    {
                        numState.map(e => 
                        <tr key={e.charCodeAt()} className={`flex flex-row`}>
                            <th className="border-2 border-pink-800 flex items-center w-full justify-center"><select><option></option><option>--&gt;</option><option>*</option><option>--&gt;*</option></select>{e}</th>
                            {[...Array(numString.length)].map(_=> <td className=" border-pink-800 w-full" key={_}>
                            <MultipleSelectCheckmarks names={numState}/>
                            </td>)}
                        </tr>)
                    }
                </tbody>
            </table>
            
        </div>
    </>
}
