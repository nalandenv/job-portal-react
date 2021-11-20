import { useState, useEffect } from "react"
import { Link, useLocation} from "react-router-dom"
import axios from "axios";
export const Listing = () =>{
    const [users, setUsers] = useState([]);

    const [search, setSearch] = useState("");
    const location =  {...useLocation()?.state};
    useEffect(()=>{
        window.history.replaceState({}, document.title)
        const fetchUsers = async () => {
            const res = await axios.get("https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json");
                const selectedList = localStorage.getItem("shortlisted");
                const rejectedList = localStorage.getItem("rejected");
                const sList:any = [];
                const rList:any = [];
                let data = res.data;
                if(selectedList != null ){
                    sList.push(...JSON.parse(selectedList));
                }
                if(rejectedList != null){
                    rList.push( ...JSON.parse(rejectedList));
                }
                if(location.index >=0){
                    data = data.filter((item:any) => !sList.find(({ id }:any) => item.id === id));
                    data = data.filter((item:any) => !rList.find(({ id }:any) => item.id === id));
                    if(location.select == true){
                        sList.push(data[location.index])
                        localStorage.setItem("shortlisted", JSON.stringify(sList));
                    }
                    if(location.select == false){
                        rList.push(data[location.index])
                        localStorage.setItem("rejected", JSON.stringify(rList));
                    }
                    
                }
                data = data.filter((item:any) => !sList.find(({ id }:any) => item.id === id));
                data = data.filter((item:any) => !rList.find(({ id }:any) => item.id === id));
                setUsers(data);
        }
        fetchUsers();
    },[]);

    const _handleSearch = () =>{

        let data  = users.filter((user:any)=>{
            if(user.name.includes(search)){
                return user.name;
            }
           });
           
    }
    return (
    <div style={{maxWidth:"70%", margin:'0 auto', textAlign:"center"}}>
        <h3>Available candidates</h3>
        <div className="search">
            <input type="text" onChange={(e) => { setSearch(e.target.value)}}/>
            <button onClick={_handleSearch}>Search</button>
        </div>
        <div style={{display:"flex", flexWrap:"wrap"}}>
        {
            users.map((user:any, index:any)=>{
                return(
                    <Link key={user.id} style={{textDecoration:"none", color:"black"}} to={`${user.id}`} state={{user, index}} >
                    <div style={{width:"150px", margin:"10px", border:"2px solid grey", textAlign:"center", borderRadius:"10px"}} >
                            <p style={{ textAlign:"center"}}>{user.id}</p>
                        <img style={{width:"100px", maxHeight:"100px", borderRadius:"10px"}} src={user.Image} alt="" />
                        <h4>{user.name}</h4>
                    </div>
                    </Link>
                )
            })
        }
        </div>
        <div>
            <Link to="/shortlisted" state={{name:"Shortlisted"}}>
                <button>Shortlisted</button>
            </Link>
            <Link to="/rejected" state={{name:"Rejected"}}>
                <button>Rejected</button>
            </Link>
        </div>
    </div>
    )
}