
export default function process_string (datas,startfinal,x){
    let {start} = startfinal
    start = start.trim().replace('q','')
    const symbols = x.trim().split('')
    while(symbols.length>0){
        const symbol = symbols[0]
        symbols.shift()
        const state = datas[start][symbol]
        start = state.replace('q','')
    }
    const {final} = startfinal
    const result = final.includes('q'+start)
    if(result){
        alert("String is Accepted")
    }else{
        alert("String is Rejected")
    }
}