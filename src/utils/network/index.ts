import axios from "axios"

export const GetRequest = async (URL:string) =>{
    if(!URL){
        return;
    }
    try{
        const response = await axios.get(URL);
        return (response.status === 200)? response.data: {};
    } catch(e){
        return;
    }
}