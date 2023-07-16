import InputInfo from "@/components/input/InputInfo"

export default function Home() {
  
  return <>
    <div className="w-full">
        <div>
          <div className="flex  flex-col w-96  mt-10 mx-auto">
            <h1 className="text-2xl font-bold text-center w-full">Converter NFA to DFA</h1>
          </div>
          <InputInfo/>
        </div>
    </div>
  </>
}