import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function BusInfoPage() {
  const [busInfo, setBusInfo] = useState([]);

  const callApi = async () => {
    try {
      // sessionStorage.removeItem("busInfo");
      // session에 data가 이미 있는지 확인
      // session에 data가 없으면 server에서 data 얻어옴
      if (sessionStorage.getItem("busInfo") == null) {
        const res = await axios.get("/server/busInfo");
        const str = JSON.stringify(res.data);
        const arr = JSON.parse(str);

        setBusInfo(arr);

        // session에 추가
        sessionStorage.setItem("busInfo", str);
      }
      // session에 이미 data가 있다면 그 data 사용
      else {
        const str = sessionStorage.getItem("busInfo");
        const arr = JSON.parse(str);
        setBusInfo(arr);
      }
    } catch (err) {
      console.log("error in server request");
    }
  }

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div>
      버스 투어 내용
      {busInfo.map(busInfo =>
        <div>
          bus(tour) id = {busInfo.id} <br/>
          bus(tour) name = {busInfo.name} <br/>
          bus(tour) size(인원수) = {busInfo.size} <br/>
          <br/>
        </div>
      )}
      <Link to='/'>
        <button>Main page</button>
      </Link>
    </div>
  )
}

export default BusInfoPage;