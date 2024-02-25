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
import {useState} from "react";
import ChangePassword from "./components/UserPage/ChangePassword";
import ActiveAccount from "./components/UserPage/ActiveAccount";


function App() {
    const [isAuth, setIsAuth] = useState(false); // Tạo state isAuth

    const handleLoginSuccess = () => {
        setIsAuth(true); // Cập nhật isAuth khi đăng nhập thành công
    };

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Error />} />
                    <Route path='/auth/*' element={isAuth ? <AuthenticatedRoutes /> : <Error />} />
                    {/* Truyền handleLoginSuccess và isAuth xuống LoginPage */}
                    <Route path='/login' element={<LoginPage handleLoginSuccess={handleLoginSuccess} isAuth={isAuth} />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/upload' element={<UploadImage />} />
                    <Route path='/changepass' element={<ChangePassword />} />
                    <Route path='/activeauth' element={<ActiveAccount />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

function AuthenticatedRoutes() {
    return (
        <Layout>
            <Route path="home" element={<Dashboard />} />
            <Route path="wallets" element={<WalletPage />} />
            <Route path="profile" element={<InformationUser />} />
        </Layout>
    );
}

export default App;
