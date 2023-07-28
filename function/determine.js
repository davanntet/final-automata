
export default function determine(datas,header){
    
    console.log(datas)
    let result =true;
    for(let data of datas){
        for(let head of header){
            if(head == 'ε'){
                if(data[head].trim() != "Ø"){
                    
                    result = false;
                    break;
                }
            }else {
                if(data[head].trim() == "Ø"){
                    result = false;
                    break;
                }else{
                    const arr = data[head].split(',')
                    if(arr.length >1){
                        result = false;
                        break;
                    }
                }
            }
           
        }
        if(!result) break;
    }
    return result;
}