import axios from "axios";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";

function BusInfoPage() {
  const [busInfo, setBusInfo] = useState([]);

  const callApi = async () => {
    try{
      const res = await axios.get("/server/busInfo");
      const str = JSON.stringify(res.data);
      const arr = JSON.parse(str);
      setBusInfo(arr);
    } catch(err){
      console.log("error in server request");
    }
    
  }

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div>
        {busInfo.map(busInfo => 
          <div>
            bus(tour) id = {busInfo.id} <br/>
            bus(tour) name = {busInfo.name} <br/>
            bus(tour) size(인원수) = {busInfo.size} <br/>
            <br/>
          </div>
        )}
      <Link to='/'><button>Main page</button></Link>
    </div>
  )
}

export default BusInfoPage;