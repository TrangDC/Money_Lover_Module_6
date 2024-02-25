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


function App() {
    const user = JSON.parse(window.localStorage.getItem('google_user'));

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Error />} />
                    <Route path='/auth/*' element={user ? <AuthenticatedRoutes /> : <Error />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/upload' element={<UploadImage />} />
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
