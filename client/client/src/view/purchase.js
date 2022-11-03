import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function Purchase() {
  const [purchaseId, setPurchaseId] = useState("");
  const [purchaseInfo, setPurchaseInfo] = useState([]);

  const searchId = async (id) => {
    try {
      const res = await axios.get(`/server/purchaseInfo/${purchaseId}`);
      console.log("purchaseID:" + purchaseId);
      if (typeof (res.data) === "string") {
        console.log("res.data: " + res.data);
        window.alert("구매내역 없음!");
        //setPurchaseId([]);
      } else {
        const str = JSON.stringify(res.data);
        const arr = JSON.parse(str);
        window.alert(str);
        //setPurchaseId(arr);
      }

    } catch (err) {
      console.log("error in server request");
    }
  }

  const handleChange = ({target: {value}}) => setPurchaseId(value);

  // submit 
  const handleSubmit = async (event) => {
    event.preventDefault();

    searchId(purchaseId);
  }

  useEffect(() => {
    //callApi();
  }, [])

  return (
    <div>
      구매 내역<br/>
      <form onSubmit={handleSubmit}>
        <input
          type="purchaseId"
          name="purchaseId"
          value={purchaseId}
          onChange={handleChange}
        />
        <button type="submit">구매내역 조회</button>
      </form>
      <Link to='/'>
        <button>Main page</button>
      </Link>
    </div>
  )
}

export default Purchase