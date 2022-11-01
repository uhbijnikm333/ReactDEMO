import { useState } from "react"
import "./login.scss"
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import {db} from "../../firebase";
import { collection,getDocs,addDoc} from "firebase/firestore"


const Login = () => {
  const {signIn,searchID} = UserAuth();
  const {addDB} = UserAuth();
  const [points,setPoints] = useState(0);
  const [error, setError] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate()
  //const {dispatch} = useContext(AuthContext)
  const usersCollectionRef = collection(db,"users");
  
  const handleLogin = async (e)=>{
    e.preventDefault()
    setError('')
    try{
      await signIn(email,password)
      searchID()
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
            {error && <span>Wrong email or password!!</span>}
            {/*<UsersContext.Provider value={email}>
                <Home />
             </UsersContext.Provider>*/}
        </form>
    </div>
  )
}

export default Login