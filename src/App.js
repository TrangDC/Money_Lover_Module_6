
import './App.css';
import LoginPage from "./components/LoginPage/LoginPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import InformationUser from "./components/UserPage/InformationUser";
import WalletPage from "./components/UserPage/WalletPage";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<InformationUser />}></Route>
                <Route path='/user/wallet' element={<WalletPage />}></Route>
                <Route path='/login' element={<LoginPage />}></Route>
                <Route path='/register' element={<RegisterPage />}></Route>
            </Routes>
        </BrowserRouter>


    </div>
  );
}

export default App;
