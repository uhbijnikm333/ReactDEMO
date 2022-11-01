// This file is intentionally blank
// Use this file to add JavaScript to your project
import "../bootstrap/dist/css/styles.css"
import { async } from "@firebase/util";
import React, { Fragment, useEffect, useState,PureComponent} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { UserAuth } from "../../context/AuthContext";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./slide1.scss"
import "./slide2.scss"
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { auth, db } from "../../firebase";
import { collection ,addDoc, updateDoc, doc, deleteDoc, getDocs, setDoc, getDoc} from "firebase/firestore";
import futureIcon from './future_icon.jpg';
import bigdataIcon from './bigdata_icon.jpg';
import convenientIcon from './convenienticon.jpg';
import future from './future.jpg';
import bigdata from './bigdata.jpg';
import convenient from './convenient.jpg';
import people1 from './people1.jpg';
import people2 from './people2.jpg';
import people3 from './people3.jpg';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

let dateList = []
const Home = ()=>{
    
    const {user,points,logout,address,addPointUser,getUsers,searchID,getPoint,updateLogin} = UserAuth();
    //console.log(points)
    const navigate = useNavigate()
    const [ID,setID] = useState([])
    const [listarray,setListarray] = useState([])
    const [num,setNum] = useState(4)
    const [dbUsers,setDbUsers] = useState([])
    const [error,setError]=useState(false)
    const [show,setShow]=useState(false)
    const [historyArray,setHistoryArray] = useState()
    const [grap,setGrap] = useState()
    const [count,setCount] = useState(0)
   
     //假設有個待辦事項的陣列
     let arrLists = ['打文章','寫程式','耍廢']
     //先建立一個空陣列
     let lists;
     let good = [];
     let len
     //用迴圈將代辦事項的內容一個個放進空陣列中
     /*for(let i=0;i<=arrLists.length-1;i++){
         //記得在JSX中使用JS變數要用花括號包著
         lists.push(<ul><li>{user.email}</li>< li>{arrLists[i]}</li><li>{arrLists[i]}</li></ul>)
     }*/
    let thenRef3
    let date
    const log = document.getElementById("log");
    let mylist = document.getElementById("aim");
    
    
    //const historyCollectionRef = doc(db,"user","history")
    //console.log(historyCollectionRef)
    
    //console.log(address)
    let rap
    let x
    const Repeat=()=> {
        let list = []
        if(user!=null){
            const plan = searchID(user.email)
            
            x = plan.then((item)=>{

                
                if(item.length!=0){
                    const ref = collection(db, "user",item,"history")
                    const ref3 = getDocs(ref)//從firebase的NoSQL抓的後端資料
                    
                    
                    rap = ref3.then((x)=>{
                        /*for(let i=0;i<=arrLists.length-1;i++){
                            //記得在JSX中使用JS變數要用花括號包著
                            lists.push(<ul><li>{user.email}</li><li>{arrLists[i]}</li><li>{arrLists[i]}</li></ul>)
                        }*/
                        for(const Doc of x.docs){
                        //setCount(count = count +1)
                        
                        list.push(
                                    
                            <tr>                
                            <th>{Doc.data().currentMechines}</th>
                                            
                            <th>{Doc.data().date.seconds*1000}</th>
                                            
                            <th>{Doc.data().glassNumber}</th>
                            <th>{Doc.data().paperNumber}</th>
                            <th>{Doc.data().plasticNumber}</th>
                            <th>{Doc.data().metalNumber}</th>
                            </tr>  
                                
                        )//後端得到的資料push到historyArray陣列
                        //console.log(count)
                        
                        document.getElementById("paperNumber").innerHTML = Doc.data().paperNumber
                        document.getElementById("glassNumber").innerHTML = Doc.data().glassNumber
                        document.getElementById("plasticNumber").innerHTML = Doc.data().plasticNumber
                        document.getElementById("metalNumber").innerHTML = Doc.data().metalNumber
                        }
                        setHistoryArray(list)
                    })
                }
                
                
                return rap
            })
        }
        
    }
    Repeat()
    function Item(props) {
        return <li>{props.message}</li>;
      }
      
      function TodoList() {
        const todos = ['finish doc', 'submit pr', 'nag dan to review'];
        return (
          <ul>
            {listarray.map((message) => <Item key={message} message={message} />)}
          </ul>
        );
      }
    getPoint(address)
    const [pin,setPin] = useState("")
    const [showBtd,setShowBtd] = useState(true)
    //console.log(points)
    const handleLogout = async()=>{
        try{
            //console.log(error)
            setError(true)
            if(pin){
                
                const newPin = {isUsing :false }
                const userDoc = doc(db,"mechines",ID)
                updateDoc(userDoc,newPin)
                const newUserId = {user_id :'' }
                updateDoc(userDoc,newUserId)
            }
            
            
            await logout()
            user = null
            
            //console.log(user)
            
            navigate('/Home')
        }catch(e){
            console.log(e.message)
        }

    }
    const handlePin =async(e)=>{
        
        setPin(e.target.value)
       
        if(pin.length==7){
            setShowBtd(false)
        }else{
            setShowBtd(true)
        }
    }
    const handleUpPoint = async()=>{
      //searchID()
      
      const newFields = {points : points + 1 }
      console.log(newFields)
      await addPointUser(address,newFields)
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const usersCollectionRef = collection(db,"mechines")
        const querySnapshots = await getDocs(usersCollectionRef)
        
        for(const Doc of querySnapshots.docs){
            //console.log( Doc.id+'=>'+pin+"=>"+Doc.data().pin);
            if(pin ==Doc.data().pin){
                setError(false)
                setShow(true)
                setID(Doc.id)
                const newPin = {isUsing :true }
                const userDoc = doc(db,"mechines",Doc.id)
                updateDoc(userDoc,newPin)
                const newUserId = {user_id :user.email }
                updateDoc(userDoc,newUserId)
                break;
            }
            setError(true)
        }
        //console.log(error)
        
    }
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll:1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 5000,
        cssEase: "linear"
      };
    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];
      
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    //console.log(user.email)
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index
      }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
        return (
          <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
          >
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        );
        
      };
      
      
    return(
        <>
      
      <nav class="navbar navbar-expand-lg navbar-light bg-secondary ">
        
        <div class="container-fluid">
            <a class="navbar-brand text-white   " href="#">智慧垃圾網</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <li class="nav-item ">
                        <Link to="/DashBoard"class="nav-link active text-white" >總回收量</Link>
                </li>
                <li class="nav-item ">
                {user && <a class="nav-link text-white" href="#history">個人回收紀錄</a>}
                </li>
                <li class="nav-item ">
                {!user &&<a class="nav-link text-white" href="#aim">研究目的</a>}
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="#Developer">創造主旨</a>
                </li>
            </div>
            </div>
        </div>
            
       
        <div className="">
          
            {user?
                <Fragment>
                    <div >
                        <p className="navbar-brand">您好，{user.email}  <button className="btn btn-primary" onClick={handleLogout}>登出</button>   </p>
                    </div>
                    
                </Fragment>
                :
                <Link to="/LoginPage" className="btn btn-primary ">登入</Link>
            }
        </div>
      
    </nav>
      <header className="masthead">
          <div className="container position-relative">
            <div className="row justify-content-center">
              <div className="col-xl-6">
                <div className="text-center text-white">
                  
                  {user?
                  
                    show?
                        <div className="caption">
                            
                               {/*<div >
                                    <h3 className="showItem">正在使用的機器：{ID}</h3>
                                    <h3 className="showItem">使用者名稱:{user.email}</h3>
                                    <h3 className="showItem">環保點數：{points}</h3>
                                </div>*/}
                                

                                <div class="namecard">

                                    <h2>
                                        歡迎回來
                                    </h2>

                                    <ul>
                                        <li>目前點數：0 </li>
                                        <br/>
                                        <li>目前使用機器:first</li>
                                        
                                    </ul>
                  </div>
                                    {/*<PieChart width={800} height={400}>
                                        <Pie
                                            data={data}
                                            cx={400}
                                            cy={200}
                                            labelLine={false}
                                            label={renderCustomizedLabel}
                                            outerRadius={180}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>*/}
                                
                            
                        </div>
                        :
                        (<Fragment>
                        <h1 className="mb-5">請輸入8碼的PIN碼，跟機器做連結!</h1>
                            <form className="form-subscribe"  onSubmit={handleSubmit}>
                                <div className="row">
                                <div className="col">
                                    <input className="form-control form-control-lg"  placeholder="PIN" onChange={handlePin} />
                                    {error &&<div className="shape shake " >PIN碼不存在</div>}
                                </div>
                                <div className="col-auto"><button className="btn btn-primary btn-lg " disabled={showBtd}>Submit</button></div>
                                </div>

                                <div className="d-none" id="submitSuccessMessage">
                                <div className="text-center mb-3">
                                    <div className="fw-bolder">Form submission successful!</div>
                                    <p>To activate this form, sign up at</p>
                                    <a className="text-white" href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                                </div>
                                </div>

                                <div className="d-none" id="submitErrorMessage"><div className="text-center text-danger mb-3">Error sending message!</div></div>
                            </form>
                        </Fragment>)
                        
                    
                    :
                        <h1 className="mb-5">登入後即可輸入PIN碼，跟機器做連結!</h1>
                }
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <section className="features-icons bg-light text-center">
        {user ?
        <section id="history">
        <h1 className="h1">個人回收紀錄</h1>
        <div className="row">
            <div class="col-lg-3 col-6">

                <div class="small-box bg-info text-white">
                    <div class="inner">
                        <h3 id = "plasticNumber">{'value'}</h3>
                        <p>塑膠量</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-bag"></i>
                    </div>
                    
                </div>
            </div>
            <div class="col-lg-3 col-6">

            <div class="small-box bg-success text-white">
                <div class="inner">
                    <h3 id = "metalNumber">{'value'}</h3>
                    <p>金屬量</p>
                </div>
                <div class="icon">
                    <i class="ion ion-bag"></i>
                </div>
                
                </div>
            </div>
        <div class="col-lg-3 col-6">

        <div class="small-box bg-warning ">
            <div class="inner">
                <h3 id = "glassNumber">{'value'}</h3>
                <p class="small-box p" >玻璃量</p>
            </div>
            <div class="icon">
                <i class="ion ion-bag"></i>
            </div>
            </div>
        </div>
    <div class="col-lg-3 col-6">

    <div class=" small-box bg-danger text-white">
        <div class="inner">
            <h3 id = "paperNumber">{'value'}</h3>
            <p>紙類量</p>
        </div>
        <div class="icon">
            <i class="ion ion-bag"></i>
        </div>
        </div>
    </div>
</div>
</section>

            :
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                            <div className="features-icons-icon d-flex"><i className="bi-window m-auto text-primary"></i></div>
                            <img src = {futureIcon} alt="No find"></img>
                            <h3>未來普及化</h3>
                            <p className="lead mb-0">希望未來的人們，不用再為丟個垃圾要分類感到煩惱!</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                            <div className="features-icons-icon d-flex"><i className="bi-layers m-auto text-primary"></i></div>
                            <img src = {bigdataIcon} alt="No find"></img>
                            <h3>數據化科技</h3>
                            <p className="lead mb-0">透過大量的數據，訓練人工智慧分類的準確度</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                            <div className="features-icons-icon d-flex"><i className="bi-terminal m-auto text-primary"></i></div>
                            <img src = {convenientIcon} alt="No find"></img>
                            <h3>方便使用</h3>
                            <p className="lead mb-0">直接將垃圾投入，即可自動幫忙分類!</p>
                        </div>
                    </div>
                </div>
            </div>
        }
        </section>
        <section className="showcase" id="aim">
            {user?
            <div class="table-responsive">
            <table class="table table-striped table-sm">
              <thead>
                <tr>
                  <th scope="col">使用裝置</th>
                  <th scope="col">日期</th>
                  <th scope="col">玻璃數量</th>
                  <th scope="col">紙類數量</th>
                  <th scope="col">塑膠數量</th>
                  <th scope="col">金屬數量</th>
                </tr>
              </thead>
              <tbody id = "log">
                    {historyArray}
              </tbody>
            </table>
          </div>
            :<div className="container-fluid p-0" >
                <div className="row g-0">
                    <div className="col-lg-6 order-lg-2 text-white showcase-img" >
                      <img src = {future} alt="No find"></img>
                    </div>
                    <div className="col-lg-6 order-lg-1 my-auto showcase-text">
                        <h2>普遍到各地</h2>
                        <p className="lead mb-0">希望未來各地的角落，都能有一個隨手一丟就能分類的垃圾桶，達到垃圾不落地的理想，此專題可能無法達到人手一台，但在未來希望可以繼續延伸這種概念!</p>
                    </div>
                </div>
                <div className="row g-0">
                    <div className="col-lg-6 text-white showcase-img" >
                      <img src ={bigdata} alt="No find"></img>
                    </div>
                    <div className="col-lg-6 my-auto showcase-text">
                        <h2>大數據時代</h2>
                        <p className="lead mb-0">大數據時代的來臨，隨著神經網路蓬勃發展，我們只需要寫出神經網路並訓練它，替我們方便垃圾類別的能力，就不用因為我們的方便導致成千上萬的垃圾湧入大海裡了!</p>
                    </div>
                </div>
                <div className="row g-0">
                    <div className="col-lg-6 order-lg-2 text-white showcase-img" >
                      <img src = {convenient} alt="No find"></img>
                    </div>
                    <div className="col-lg-6 order-lg-1 my-auto showcase-text">
                        <h2>便宜方便使用</h2>
                        <p className="lead mb-0">雖然現在已經有蠻多公司已經開發出類似的垃圾桶，但成本貴體積也龐大，所以除了使用方便外，我們希望能夠輕量化以及減少成本的開銷，才能讓大家都有使用的意願!</p>
                    </div>
                </div>
            </div>
            }
        </section>
        <section className="testimonials text-center bg-light" id="Developer">
            <div className="container">
                <h2 className="mb-5">共同開發者</h2>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                            <img className="img-fluid rounded-circle mb-3" src={people1} alt="..." />
                            <h5>劉奕呈</h5>
                            <p className="font-weight-light mb-0">"很感謝前人們的努力，才能讓我們站在巨人的肩膀上俯瞰廣闊的視野，希望我們能用這四年來學過的東西，發揚我們想傳達的觀念!!"</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                            <img className="img-fluid rounded-circle mb-3" src={people2} alt="..." />
                            <h5>連唯軒</h5>
                            <p className="font-weight-light mb-0">"希望有一天真的能看到智慧垃圾桶普及化，雖然我們做得東西可能沒辦法成為普及化的商品，但希望能把我們的概念傳達給更多人!!"</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                            <img className="img-fluid rounded-circle mb-3" src={people3} alt="..." />
                            <h5>劉子瑜</h5>
                            <p className="font-weight-light mb-0">"在我們方便之餘，也記得要還給大自然原有樣貌，唯有垃圾不落地才能為了目標進自己的一小步!!"</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="call-to-action text-white text-center" id="signup">
            <div className="container position-relative">
                <div className="row justify-content-center">
                    {show ?

                        <h1 className="col-lg-6  text-white ">歡迎您使用智慧垃圾桶</h1>
                        :
                        <div className="col-xl-6">
                            <h2 className="mb-4">Ready to get started? Sign up now!</h2>
        
                            <form className="form-subscribe" id="contactFormFooter" Landing Page is just HTML-sb-form-api-token="API_TOKEN" onSubmit={handleSubmit}>
                            
                                <div className="row">
                                    <div className="col">
                                        <input className="form-control form-control-lg"  placeholder="PIN" onChange={handlePin} />
                                        <div className="invalid-feedback text-white" data-sb-feedback="emailAddressBelow:required">Email Address is required.</div>
                                        <div className="invalid-feedback text-white" data-sb-feedback="emailAddressBelow:email">Email Address Email is not valid.</div>
                                    </div>
                                    
                                    <div className="col-auto"><button className="btn btn-primary btn-lg " disabled={showBtd}>Submit</button></div>
                                </div>
                                
                                <div className="d-none" id="submitSuccessMessage">
                                    <div className="text-center mb-3">
                                        <div className="fw-bolder">Form submission successful!</div>
                                        <p>To activate this form, sign up at</p>
                                        <a className="text-white" href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                                    </div>
                                </div>
                                
                                <div className="d-none" id="submitErrorMessage"><div className="text-center text-danger mb-3">Error sending message!</div></div>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </section>
        
        <footer className="footer bg-light">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 h-100 text-center text-lg-start my-auto">
                        <ul className="list-inline mb-2">
                            <li className="list-inline-item"><a href="#!">About</a></li>
                            <li className="list-inline-item">⋅</li>
                            <li className="list-inline-item"><a href="#!">Contact</a></li>
                            <li className="list-inline-item">⋅</li>
                            <li className="list-inline-item"><a href="#!">Terms of Use</a></li>
                            <li className="list-inline-item">⋅</li>
                            <li className="list-inline-item"><a href="#!">Privacy Policy</a></li>
                        </ul>
                        <p className="text-muted small mb-4 mb-lg-0">&copy; Your Website 2022. All Rights Reserved.</p>
                    </div>
                    <div className="col-lg-6 h-100 text-center text-lg-end my-auto">
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item me-4">
                                <a href="#!"><i className="bi-facebook fs-3"></i></a>
                            </li>
                            <li className="list-inline-item me-4">
                                <a href="#!"><i className="bi-twitter fs-3"></i></a>
                            </li>
                            
                            <li className="list-inline-item">
                                <a href="#!"><i className="bi-instagram fs-3"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
</>
        
    )
}
export default Home