import { useEffect, useState } from "react"
import { useLocation } from "react-router";
import { Listing } from "./Listing";

export const Shortlisted = () => {
    const [users, setUsers] = useState([]);
    const flag = useLocation().state.name;

    useEffect(()=>{
        const arr:any = [];
        if(flag == "Shortlisted"){
            let list = localStorage.getItem("shortlisted");
            if(list != null){
                arr.push(...JSON.parse(list))
            }
        }
        if(flag == "Rejected"){
            let list = localStorage.getItem("rejected");
            if(list != null){
                arr.push(...JSON.parse(list))
            }
        }
        setUsers(arr);
    },[])
    return (
        <div>
            <h1>{flag} candidates</h1>
            {
                users.map((item:any)=>{
                    return <h3 key={item.id}>{item.name}</h3>
                })
            }
        </div>
    )
}