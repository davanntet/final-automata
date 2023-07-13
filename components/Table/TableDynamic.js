export default function TableDynamic() {
    const numString = [' ','a', 'b', 'c'];
    const numState = ['q0', 'q1', 'q2'];
    return <>
        <div>
            <table className="w-full border-2 text-center border-spacing-4">
                <thead className="border-2">
                    <tr>
                        {numString.map(e => <th className="border-2" key={e.charCodeAt()}>{e}</th>)}
                    </tr>
                </thead>
                <tbody className="border-2">
                    {
                        numState.map(e => 
                        <tr key={e.charCodeAt()}>
                            <th className="border-2"><select><option></option><option>--&gt;</option><option>*</option><option>--&gt;*</option></select>{e}</th>
                            {[...Array(numString.length-1)].map(_=> <td className="border-2" key={_}>
                                <select>
                                    {
                                        numState.map(e=><option key={e.charCodeAt()} value={e}>{e}</option>)
                                    }
                                </select>
                            </td>)}
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    </>
}

