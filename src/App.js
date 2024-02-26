import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import LoginPage from "./components/LoginPage/LoginPage";
import Layout from "./layout/Layout";
import Dashboard from "./components/HomePage/Dashboard";
import WalletPage from "./components/UserPage/wallet/WalletPage";
import InformationUser from "./components/UserPage/InformationUser";
import UploadImage from "./components/FireBase/Upimage";
import Error from "./components/Error";
import CreateWallet from "./components/UserPage/wallet/CreateWallet";


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
                <Route path='/create' element={<CreateWallet/>}/>
            </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
