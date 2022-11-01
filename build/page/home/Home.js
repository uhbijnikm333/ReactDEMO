import { async } from "@firebase/util";
import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { UserAuth } from "../../context/AuthContext";

const Home = ()=>{
    const {user,points,logout,address,addPointUser,getUsers,searchID,getPoint} = UserAuth();
    //console.log(points)
    const navigate = useNavigate()
    const [num,setNum] = useState(4)
    const [dbUsers,setDbUsers] = useState([])
    searchID()
    
    console.log(address)
    getPoint(address)
    console.log(points)
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
      searchID()
      
      const newFields = {points : points + 1 }
      console.log(newFields)
      await addPointUser(address,newFields)
    }
    return(
        <div>
          
            
            {user ?
              (points!=undefined)?
              (
                
                  <Fragment>
                  <h1>歡迎來到智慧垃圾桶</h1>
                  <h1>你好，{user.email}點數:{points}</h1>
                  <button onClick={handleLogout}>登出</button>
                  <button onClick={handleUpPoint}>增加點數</button>
                  </Fragment>
              )
              :(<h1>loaging</h1>)
              :(
                
                <nav>
                <h1>歡迎來到智慧垃圾桶</h1>
                <Link to="/LoginPage">Login</Link> |{" "}
                <Link to="/RegisterPage">Register</Link>
            </nav>)
            }
        </div>  
    )
}
export default Home