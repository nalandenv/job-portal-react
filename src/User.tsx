import { useLocation} from "react-router"
import { Link } from "react-router-dom";

export const User = (props:any) =>{
    const {user, index} = useLocation().state;
    return(
        <div style={{width:"50%", margin:"0 auto", textAlign:"center"}}>
            <h2>{user.name}</h2>
            <img style={{width:"50%", borderRadius:"10px"}} src={user.Image} alt="" />
            <p>Id: {user.id}</p>
            <div style={{width:"50%",display:"flex", flexDirection:"row", justifyContent:"space-between", margin:"0 auto"}}>
            <Link to="/" state={{select:true, index:index}} style={{width:"45%"}} >
            <button  style={{width:"100%",height:"50px", color:"#ffffff", borderRadius:"10px", backgroundColor:"#42f56f", border:"none", cursor:"pointer"}}>Select</button>
            </Link>
            <Link to="/" state={{select:false, index:index}} style={{width:"45%"}} >
                <button style={{width:"100%", height:"50px", color:"#ffffff",borderRadius:"10px",backgroundColor:"#fc3f5c", border:"none", cursor:"pointer"}}>Reject</button>
            </Link>
            </div>
        </div>
    )
}