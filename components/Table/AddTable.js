//create alert message to add row or column of table
export default function AddTable(){
    return <>
        <div className="bg-pink-800 p-3 m-3 flex gap-2 w-max text-center font-semibold">
            <select className="outline-pink-800 border-none w-28 text-center">
                <option >State</option>
                <option >Symbol</option>
            </select> 
            <input type="text" className="outline-pink-800 border-0 text-center"/>
            <button className=" px-5 text-white font-bold hover:bg-pink-700">ADD</button>
        </div>
    </>
}