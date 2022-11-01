import { useContext, useState } from "react"
import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db} from "../../firebase"
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
const Register = () => {
  const [error, setError] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const {createUser,addDB,getPoint,address,user,searchID} = UserAuth()
  const [points,setPoints] = useState(0);
  const navigate = useNavigate()
  const usersCollectionRef = collection(db,"users");
  const handleLogin = async (e)=>{
    e.preventDefault()
    setError('')
    try{
        await createUser(email,password)
        await addDB(email,0,'True')
        console.log(address)
        console.log(getPoint(address))
        await searchID(email)
        navigate('/')
    }catch(e){
      setError(e.message)
      console.log(e.message)
    }
    
  }
  return (
    <div className="login">
        <form onSubmit={handleLogin}>
            <h1>register</h1>
            <input type="email" placeholder="email" onChange={e=>setEmail(e.target.value)}/>
            <input type="password" placeholder="password"onChange={e=>setPassword(e.target.value)}/>
            <button type="submit">Login</button>
            {error && <span>Wrong email or password!!</span>}
        </form>
    </div>
  )
}

export default Register