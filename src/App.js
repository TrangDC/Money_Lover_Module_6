
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./new_src/components/shared/Layout";
import Main from "./components/HomePage/Main/Main";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import LoginPage from "./components/LoginPage/LoginPage";
import Dashboard from "./new_src/Dashboard";
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
