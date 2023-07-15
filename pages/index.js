import MultipleSelectCheckmarks from "@/components/Table/TestOption";


export default function Home() {
  return <>
    <div className="w-64 bg-yellow-200 flex flex-col mx-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="bg-pink-800 w-full">Convert NFA to DFA</div>
      <div>Test Process String with NFA</div>
      <div>Test Process String with DFA</div>
    </div>
    <MultipleSelectCheckmarks/>
  </>
}
