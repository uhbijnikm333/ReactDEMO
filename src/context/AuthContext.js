import { createContext, useContext, useEffect, useState,useLayoutEffect} from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth, db } from "../firebase";
import { collection ,addDoc, updateDoc, doc, deleteDoc, getDocs, setDoc, getDoc, query, where,Timestamp } from "firebase/firestore";
import { type } from "@testing-library/user-event/dist/type";

const UserContext = createContext()
const userCollectionRef = collection(db,"user")
/*querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});*/
/*console.log(querySnapshot.docs())
for(const doc of querySnapshot.docs){
  console.log(doc.data().id);
}*/
export const AuthContextProvider = ({children})=>{
  
  const [address,setAddress] = useState('')
  const [user,setUser] = useState({})
  const [points,setPoints] = useState()
  const [email,setEmail] = useState('')
  let currentEmail;
  let currentAddress;

  useLayoutEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, currentUser=>{
      searchID(email)
      setUser(currentUser)
     
    })
    /*return () =>{
      unsubscribe();
    }*/ 
  },[]);
  useLayoutEffect(()=>{
    searchID(email)
    //console.log(email)
  },[email])
 
  const getPoint = async(id)=>{
      const ref2 = doc(db,"user",id)
      //console.log(id)
      const docReef = await getDoc(ref2)
      //console.log( docReef.data().points)
      //console.log(docReef.data())
      setPoints(docReef.data().points)
      //console.log(points)
      //return docReef.data().points
  }
  const searchID = async(userName)=>{
    //console.log(userName.indexOf("@") != -1)
    
    if(userName!=null && userName.indexOf("@") != -1){
      
   
    /*const ref = collection(db, "user","c1CXh4ly6hdoQ9j957fR","history")
    const ref3 = getDocs(ref)
    //const ref3 = getDocs(collection(db,  "user","history"))
    console.log(ref)
    console.log(ref3)
    ref3.then((item)=>{
      for(const Doc of item.docs){
        console.log(Doc.data())
      }
      
      
    })*/
      //console.log(getDocs(userCollectionRef))
      const plaze =  query(userCollectionRef, where("userName", "==",userName));
      //console.log(plaze)
      const gad =   getDocs(plaze);
      //console.log(gad)
      //const ref2 = doc(db,"user/"+gad.docs[0].id+'/history')
      
      //const querySnapshot = await getDocs(collection(db, "cities"));
      //console.log(ref2)
      
      gad.then((item)=>{
        //console.log(item)
        /*for(const Doc of item.docs){
          console.log(Doc.data())
        }*/
        currentAddress = item.docs[0].id
        //console.log(currentAddress)
        setAddress(item.docs[0].id)
        //console.log(address)
        return item.docs[0].id
      })
    
    
      return address
    }
    
  }
  const createUser = (email,password) =>{
    currentEmail = email;
    setEmail(email)
    return createUserWithEmailAndPassword(auth,email,password)
  }
  const signIn = (email,password) =>{
    if(email!=' '){
      currentEmail = email;
      //console.log(currentEmail)
      setUser(email)
      setEmail(email)
    }
    return signInWithEmailAndPassword(auth,email,password)
  }
  const logout =  ()=>{
    return signOut(auth);
  }
  const addDB = (email,Num,State) =>{
    //return addDoc(usersCollectionRef,{name:email,point:Number(point)})
    /*return addDoc(collection(db,"user"),{
      userName:email,
      sumPoints:Num,
    });
    return setDoc(doc(usersCollectionRef,"user",email),{
      name:email,
      point:password
    });*/
    const secData = {
      metalNumber : 0,
      glassNumber : 0,
      paperNumber : 0,
      plasticNumber : 0,
      currentMechines:'',
      date:Timestamp.fromDate(new Date("December 10, 1815"))
    };
    const fistData = {
      userName :email,
      sumPoints: Num
    }
  const Doument = doc(collection(db, "user"))
  setDoc(Doument, fistData);
  currentAddress = Doument.id
  setAddress(Doument.id)
  let plan = 'user/'+Doument.id+'/history'
  setDoc(doc(collection(db, plan)), secData);
  }
  const getUsers = () =>{
    
    return getDocs(userCollectionRef)
  }
  const addPointUser = (id,points) =>{
    //console.log(points)
    const userDoc = doc(db,"user",id)
    //console.log(points)
    return updateDoc(userDoc,points)
  }
 
  /*const updateLogin = async(id,isUsing) =>{
    //console.log(points)
    const userDoc = doc(db,"user",id)
    return updateDoc(userDoc,isUsing)
  }
  const deleteUser = (id) =>{
    const userDoc = doc(db,"user",id)
    return deleteDoc(userDoc)
  }*/
  return(
    <UserContext.Provider value={{createUser ,getPoint,points,address,points,user,logout,signIn,addDB,addPointUser,getUsers,searchID}}>
        {children}
    </UserContext.Provider>
  )
}

export const UserAuth = ()=>{
  return useContext(UserContext)
}