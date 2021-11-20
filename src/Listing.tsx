import { useState, useEffect } from "react"
import { Link, useLocation} from "react-router-dom"
import axios from "axios";
export const Listing = () =>{
    const [users, setUsers] = useState([]);
    const [listedUsers, setListedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const location =  {...useLocation()?.state};
    useEffect(()=>{
        window.history.replaceState({}, document.title)
        const fetchUsers = async () => {
            // Calling api and saving returned data in res
            const res = await axios.get("https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json");

            // fetching selected & rejected list from localstorage
                const selectedList = localStorage.getItem("shortlisted");
                const rejectedList = localStorage.getItem("rejected");

                // array store list of candidates
                const sList:any = [];
                const rList:any = [];

                let data = res.data;
                // checking if selected & rejected list is empty
                if(selectedList != null ){
                    sList.push(...JSON.parse(selectedList));
                }
                if(rejectedList != null){
                    rList.push( ...JSON.parse(rejectedList));
                }
                // if location id is returned then we'll filter the data
                if(location.id){
                    // filtering user list by removing shortlisted and rejected candidates
                    data = data.filter((item:any) => !sList.find(({ id }:any) => item.id === id));
                    data = data.filter((item:any) => !rList.find(({ id }:any) => item.id === id));

                    // fetching candidate based on returned id and array with object of one candidate will be saved
                    let candidate  = data.filter((user:any)=>{
                        if(user.id == location.id){
                            return user;
                        }
                       });
                    //    condition to check if the user is selected or rejected
                    if(location.select == true){
                        // pushing first element of candidate array as its the only element
                        sList.push(candidate[0]);
                        localStorage.setItem("shortlisted", JSON.stringify(sList));
                    }
                    if(location.select == false){
                        rList.push(candidate[0]);
                        localStorage.setItem("rejected", JSON.stringify(rList));
                    }
                    
                }
                // filtering data again with new user added
                data = data.filter((item:any) => !sList.find(({ id }:any) => item.id === id));
                data = data.filter((item:any) => !rList.find(({ id }:any) => item.id === id));
                setUsers(data);
                setListedUsers(data);
        }
        fetchUsers();
    },[]);

    const _handleSearch = (e:any) =>{
        //Filtering data based on search
        setUsers(listedUsers);
        let data  = listedUsers.filter((user:any)=>{
            if(user.name.includes(e)){
                return user.name;
            }
           });
           setUsers(data);
    }
    return (
    <div style={{maxWidth:"70%", margin:'0 auto', textAlign:"center"}}>
        <h3>Available candidates</h3>

        <div className="search">
            <input type="text" onChange={(e)=>{_handleSearch(e.target.value)}}/>
        </div>
        <div>
            <Link to="/shortlisted" state={{name:"Shortlisted"}}>
                <button>Shortlisted</button>
            </Link>
            <Link to="/rejected" state={{name:"Rejected"}}>
                <button>Rejected</button>
            </Link>
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
        
    </div>
    )
}