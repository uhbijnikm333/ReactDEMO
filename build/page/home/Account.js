import { async } from "@firebase/util";
import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { UserAuth } from "../../context/AuthContext";

const Home = ()=>{
    const {user,logout,addPointUser,getUsers} = UserAuth();
    //console.log(user)
    const navigate = useNavigate()
    const [num,setNum] = useState(2)
    const [dbUsers,setDbUsers] = useState([])
    const handleLogout = async()=>{
        try{
            await logout()
            user = null
            //console.log(user)
            
            //navigate('/Home')
        }catch(e){
            console.log(e.message)
        }

    }
    const handleUpPoint = async()=>{
      //console.log(user)
      const querySnapshot = await getUsers()
      
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(user.email)
        // console.log(doc.id, " => ", doc.data().name);
        if(user.email == doc.data().name){
           addPointUser(doc.id,{num})
        }
      });
      console.log(querySnapshot)
      //await addPointUser('DOjquZ398hzoo5o6BEXU',{num})
    }
    return(
        <div>
            <h1>歡迎來到智慧垃圾桶</h1>
            {user ?
            (
                <Fragment>
                <h1>你好，{user.email}</h1>
                <button onClick={handleLogout}>登出</button>
                <button onClick={handleUpPoint}>增加點數</button>
                </Fragment>
            ):(
                
                <nav>
                <Link to="/LoginPage">Login</Link> |{" "}
                <Link to="/RegisterPage">Register</Link>
            </nav>)
            }
        </div>  
    )
}
export default Home