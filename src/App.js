
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layout/Layout";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import LoginPage from "./components/LoginPage/LoginPage";
import Dashboard from "./components/HomePage/Dashboard";
import WalletPage from "./components/UserPage/wallet/WalletPage";
import InformationUser from "./components/UserPage/InformationUser";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path="/home" element={<Dashboard />}/>
                    <Route path="/wallets" element={<WalletPage />}/>
                    <Route path="/profile" element={<InformationUser />}/>
                </Route>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
            </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
