export const setItem = (key:string, value:any):void => {
    if(!key){
        return;
    }
    const _value = (typeof value === "object")? JSON.stringify(value): value;
    localStorage.setItem(key,_value);
}

export const getItem = (key:string) =>{
    if(!key){
        return;
    }
    
    return localStorage.getItem(key);
}