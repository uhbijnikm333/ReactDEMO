import { createContext, useContext, useEffect, useState,useLayoutEffect} from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth, db } from "../firebase";
import { collection ,addDoc, updateDoc, doc, deleteDoc, getDocs, setDoc, getDoc} from "firebase/firestore";

const UserContext = createContext()
const usersCollectionRef = collection(db,"users")

export const AuthContextProvider = ({children})=>{
  const [address,setAddress] = useState('')
  const [user,setUser] = useState({})
  const [points,setPoints] = useState()
  console.log(points)
  useLayoutEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, currentUser=>{
      setUser(currentUser)
    })
    /*return () =>{
      unsubscribe();
    }*/ 
  },[]);
  useLayoutEffect(()=>{
    searchID()
    //console.log(address)
  },[address])
 
  const getPoint = async(id)=>{
      const ref2 = doc(db,"users",id)
      console.log(id)
      const docReef = await getDoc(ref2)
      console.log( docReef.data().points)
      setPoints(docReef.data().points)
      console.log(points)
      //return docReef.data().points
  }
  const searchID = async()=>{
    
    const querySnapshot = await getDocs(usersCollectionRef)
    
      for(const doc of querySnapshot.docs){
        //console.log(user.email, " => ", doc.data().name);

       
        if(user.email == doc.data().name ){
          //console.log(user.email)
          //console.log(doc.id, " => ", doc.data().name);
          setAddress(doc.id)
          //console.log(doc.id)
            break;
        }
      }
      
      /*const ref2 = doc(db,"users","ui0Fn82RqQCKsa78Oi5q")
      const docReef = await getDoc(ref2)
      console.log( docReef.data().point)*/
  }
  const createUser = (email,password) =>{
    return createUserWithEmailAndPassword(auth,email,password)
  }
  const signIn = (email,password) =>{
    return signInWithEmailAndPassword(auth,email,password)
  }
  const logout =  ()=>{
    return signOut(auth);
  }
  const addDB = (email,Num) =>{
    //return addDoc(usersCollectionRef,{name:email,point:Number(point)})
    return addDoc(collection(db,"users"),{
      name:email,
      points:Num
    });
    /*return setDoc(doc(usersCollectionRef,"users",email),{
      name:email,
      point:password
    });*/
  }
  const getUsers = () =>{
    
    return getDocs(usersCollectionRef)
  }
  const addPointUser = (id,points) =>{
    //console.log(points)
    const userDoc = doc(db,"users",id)
    console.log(points)
    return updateDoc(userDoc,points)
  }
  const deleteUser = (id) =>{
    const userDoc = doc(db,"users",id)
    return deleteDoc(userDoc)
  }
  return(
    <UserContext.Provider value={{createUser ,getPoint,points,address,points,user,logout,signIn,addDB,addPointUser,deleteUser,getUsers,searchID}}>
        {children}
    </UserContext.Provider>
  )
}

export const UserAuth = ()=>{
  return useContext(UserContext)
}