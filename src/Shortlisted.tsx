import { useEffect, useState } from "react"
import { useLocation } from "react-router";
import {Link} from "react-router-dom";
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
            <Link to="/"><button>BACK</button></Link>
            <h1>{flag} candidates</h1>
            {
                users.map((item:any)=>{
                    return <h3 key={item.id}>{item.name}</h3>
                })
            }
        </div>
    )
}