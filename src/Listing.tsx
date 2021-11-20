import { useState, useEffect, useCallback } from "react"
import { Link, useLocation} from "react-router-dom"
import { getItem, setItem } from "./utils/local-storage";
import { SHORTLISTED, REJECTED } from "./utils/local-storage/config";
import { getCandidates } from "./utils/network/routes";
export const Listing = () =>{
    const [users, setUsers] = useState<any>([]);
    const [listedUsers, setListedUsers] = useState<any>([]);
    const location =  {...useLocation()?.state};

    useEffect(()=>{
        window.history.replaceState({}, document.title)
        const fetchUsers = async () => {
            // Calling api and saving returned data in res
            const candidateResponse = await getCandidates();

            // fetching selected & rejected list from localstorage
                const selectedList = getItem(SHORTLISTED);
                const rejectedList = getItem(REJECTED);

                // array store list of candidates
                const sList:any = [];
                const rList:any = [];
                let userData = [...candidateResponse];

                // checking if selected & rejected list is empty
                if(!!selectedList){
                    sList.push(...JSON.parse(selectedList));
                }
                if(!!rejectedList){
                    rList.push( ...JSON.parse(rejectedList));
                }
                // if locationData id is returned then we'll filter the data
                if(location.id){
                    // filtering user list by removing shortlisted and rejected candidates
                    const filterList = [...sList,...rList];
                    userData = userData.filter((item:any) => !filterList.find(({ id }:any) => item.id === id));

                    // fetching candidate based on returned id and array with object of one candidate will be saved
                    let candidate  = userData.filter((user:any)=>{
                        if(user.id === location.id){
                            return user;
                        }
                       });
                    //    condition to check if the user is selected or rejected
                    if(location.select === true){
                        // pushing first element of candidate array as its the only element
                        sList.push(candidate[0]);
                        setItem(SHORTLISTED, sList);
                    }
                    if(location.select === false){
                        rList.push(candidate[0]);
                       setItem(REJECTED, rList);
                    }
                    
                }
                // filtering data again with new user added
                const filterList = [...sList,...rList];
                userData = userData.filter((item:any) => !filterList.find(({ id }:any) => item.id === id));

                setUsers(userData);
                setListedUsers(userData);
        }
        fetchUsers();
    },[]);

    const _handleSearch = useCallback((e:any) =>{
        //Filtering data based on search
        setUsers(listedUsers);
        let data  = listedUsers.filter((user:any)=>{
            if(user.name.includes(e)){
                return user.name;
            }
           });
           setUsers(data);
    },[listedUsers])
    return (
    <div style={{maxWidth:"70%", margin:'0 auto', textAlign:"center"}}>
        
        <div style={{width:"50%", display:"flex", justifyContent:"space-between", margin:"10px auto"}}>
            <Link to="/shortlisted" state={{name:"Shortlisted"}}>
                <button>Shortlisted</button>
            </Link>
            <Link to="/rejected" state={{name:"Rejected"}}>
                <button>Rejected</button>
            </Link>
            <button onClick={()=>{localStorage.clear(); window.location.reload()}}>Reset All Selection</button>
        </div>
        <div className="search">
            <input type="text" onChange={(e)=>{_handleSearch(e.target.value)}}/>
        </div>
        <h3>Available candidates</h3>
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
