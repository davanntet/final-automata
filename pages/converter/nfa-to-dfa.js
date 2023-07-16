import TableDynamic from "@/components/Table/TableDynamic";
import { useRouter } from "next/router";

export default function NFAtoDFA(){
    const params = useRouter();
    const data = params.query
    return <>
        <TableDynamic state={data.state} symbol={data.symbol}/>
        <div className="w-full flex  justify-center">
            <button className="bg-pink-800 text-center mx-auto px-6 rounded-lg hover:bg-pink-700 py-1 text-white font-bold">Convert to DFA</button>
        </div>
    </>
}    