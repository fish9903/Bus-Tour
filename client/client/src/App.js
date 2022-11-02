import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from "./view/mainPage";
import BusInfoPage from "./view/busInfoPage";
import PurchasePage from "./view/purchase";

function App() {
  return(
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/busInfo" element={<BusInfoPage />}></Route>
          <Route path="/purchaseInfo" element={<PurchasePage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;