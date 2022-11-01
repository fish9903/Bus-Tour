import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from "./view/mainPage";
import BusInfoPage from "./view/busInfoPage";

function App() {
  return(
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/busInfo" element={<BusInfoPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;