import React, { PureComponent, useEffect, useState } from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { collection , getDocs} from "firebase/firestore";
import "../home/Home"
import { UserAuth } from '../../context/AuthContext';
import { Bar ,Line} from 'react-chartjs-2';

import{Chart as ChartJS} from 'chart.js/auto'
const Dashboard =()=>{
    const [historyArray,setHistoryArray] = useState()
    const [grap,setGrap] = useState()
    useEffect(()=>{
      
      let date
      const listHistory= async()=> {
        let list = []
        let dateList = []
        let sumGlassNumber = 0
        let sumPaperNumber = 0
        let sumPlasticNumber = 0
        let sumMetalNumber = 0
        const plan = collection(db, "user")
        const plan2 =  await getDocs(plan)
        //console.log(plan2)
        for(const itemDocs of plan2.docs){
          //console.log(itemDocs.id)
          const ref = collection(db, "user",itemDocs.id,"history")
          const ref3 = await getDocs(ref)//從firebase的NoSQL抓的後端資料
          //console.log(ref3)
          for(const Doc of ref3.docs){
            //console.log(Doc)
            date = new Date(Doc.data().date.seconds*1000);
              list.push(
                <tr>                
                <th>{Doc.data().currentMechines}</th>
                                
                <th>{(Doc.data().date.seconds*1000)}</th>
                                
                <th>{Doc.data().glassNumber}</th>
                <th>{Doc.data().paperNumber}</th>
                <th>{Doc.data().plasticNumber}</th>
                <th>{Doc.data().metalNumber}</th>
                </tr>              
              )
              
              sumGlassNumber +=Doc.data().glassNumber
              sumPaperNumber +=Doc.data().paperNumber
              sumPlasticNumber +=Doc.data().plasticNumber
              sumMetalNumber +=Doc.data().metalNumber
              
          }
          
        }
        
        dateList.push(
          {
            "玻璃":sumGlassNumber,
            "紙類":sumPaperNumber,
            "塑膠":sumPlasticNumber,
            "金屬":sumMetalNumber
          }
        )
        setHistoryArray(list)
        setGrap(dateList)
      }
      listHistory()
      
      
    },[])
    //console.log(grap)
    const {user,searchID} =UserAuth();
    const data = [
        {
          name: '玻璃',
          
          glass: 1200 
        },
        {
          name: '紙類',
          
          paper: 1398
        },
        {
          name: '塑膠',
          plastic: 2000
          
        },
        {
          name: '金屬',
          
          metal: 2000
        },
        
      ];
      
      //console.log(data)
      

    return(
        <>
        <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">智慧垃圾網</a>
            <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <input class="form-control form-control-dark w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search"/>
            <div class="navbar-nav">
                <div class="nav-item text-nowrap">
                
                <Link to="/" className="nav-link px-3">返回首頁</Link>
                </div>
            </div>
        </header>
        <div class="container-fluid">
  <div class="row">
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div class="position-sticky pt-3 sidebar-sticky">
        

        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
          <span>功能列表</span>
          <a class="link-secondary" href="#" aria-label="Add a new report">
            <span data-feather="plus-circle" class="align-text-bottom"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          
          <li class="nav-item">
            <a class="nav-link" href="#grap">
              <span data-feather="file-text" class="align-text-bottom"></span>
                垃圾使用狀況分析
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#history">
              <span data-feather="file-text" class="align-text-bottom"></span>
              使用的歷史紀錄
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">垃圾使用狀況分析</h1>
        
      </div>
    <section id = "grap"> 
    {grap?(
      <Bar  
        
        data={{
          labels: ['玻璃', '紙類', '塑膠', '金屬'],
          datasets: [{
            label: '回收總數:',
            data: grap[0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 3
        }],
        }}
      />):(<div>loading</div>)
    }
    </section> 
   <section id="history">   
      <h2>Section title</h2>
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
              <tbody id='log'>
                  {historyArray}
              </tbody>
            </table>
      </div>
      </section>
    </main>
  </div>
</div>
        </>
    );
}
export default Dashboard;