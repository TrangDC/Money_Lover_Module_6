
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layout/Layout";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import LoginPage from "./components/LoginPage/LoginPage";
import Dashboard from "./components/HomePage/Dashboard";
import WalletPage from "./components/UserPage/wallet/WalletPage";
import InformationUser from "./components/UserPage/InformationUser";
import UploadImage from "./components/FireBase/Upimage";
import Error from "./components/Error";


function App() {

    const user = window.localStorage.getItem('user');
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Error />}></Route>
                <Route path='/auth/*' element={user?<Layout />:<Error />}>
                    <Route path="home" element={user?<Dashboard />:<Error />}/>
                    <Route path="wallets" element={user?<WalletPage />:<Error />}/>
                    <Route path="profile" element={user?<InformationUser />:<Error />}/>
                </Route>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/upload' element={<UploadImage/>}/>
            </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
