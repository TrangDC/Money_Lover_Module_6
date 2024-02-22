
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./new_src/components/shared/Layout";
import Main from "./components/HomePage/Main/Main";
import ManagerUserPage from "./components/UserPage/ManagerUserPage";

function App() {
  return (
    <div className="App">

        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Main />}/>
                    <Route path="/home" element={<ManagerUserPage />}/>
                </Route>
            </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
