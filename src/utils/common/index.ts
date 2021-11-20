export const isObjEmpty = (data:any):boolean =>{
    if(!data || typeof data !== "object") return false;
    if(Object.keys(data).length === 0){
        return false;
    }
    return true;
}