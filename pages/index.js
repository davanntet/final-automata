import TableDynamic from "@/components/Table/TableDynamic";
import TestingComponent from "@/components/TestingComponent";
import Header from "@/components/header/Header";

export default function Home({numState}) {
  return <>
    <div className="w-full">
      <Header/>
      <TableDynamic/>
      <TestingComponent/>
    </div>
  </>
}
export async function getStaticProps() {
  return {
      props:{
          numState:['q1','q2','q3']
      }
  }
}