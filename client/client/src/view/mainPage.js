import axios from "axios";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";

function MainPage() {
  const [messsage, setMessage] = useState('');

  const callApi = async () => {
    try{
      axios.get("/server").then((res) => {
        console.log(res.data);
        setMessage(res.data);
      });
    } catch(err){
      console.log("error in .../server request");
    }
    
  }

  useEffect(() => {
    callApi();
  }, []);

  return (
      <div>
        {messsage}<br/>
        <Link to='/busInfo'><button>Tour 예약</button></Link>
        <Link to='/purchaseInfo'><button>구매내역 확인</button></Link>
      </div>
  )
}

export default MainPage;