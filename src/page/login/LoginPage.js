import { useState } from "react"
import "./login.scss"
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import {db} from "../../firebase";
import { collection,getDocs,addDoc} from "firebase/firestore"
import "../register/RegisterPage"

const Login = () => {
  
  const {signIn,searchID,updateLogin,address} = UserAuth();
  const {addDB} = UserAuth();
  const [points,setPoints] = useState(0);
  const [error, setError] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate()
  //const {dispatch} = useContext(AuthContext)
  
  
  const handleLogin = async (e)=>{
    e.preventDefault()
    setError('')
    //console.log(email)
    try{
      await signIn(email,password)
      searchID(email)
      //console.log(address)
      const PIN = {isUsing :'True' }
      updateLogin(address,PIN)
      navigate('/')
    }catch(e){
      setError(e.message)
      console.log(e.message)
    }
      
  }
  //console.log(email)
  return (
    <div className="login">
        <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <input type="email" placeholder="email" onChange={e=>setEmail(e.target.value)}/>
            <input type="password" placeholder="password"onChange={e=>setPassword(e.target.value)}/>
            <button type="submit">Login</button>
            <span>目前還沒有帳號嗎?</span>
            <Link to = "/RegisterPage">註冊</Link>
            {error && <span>Wrong email or password!!</span>}

        </form>
    </div>
  )
}

export default Login