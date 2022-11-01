import ReactDOM from "react-dom/client";
import { useContext, useState} from "react"
import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//import Home from "./page/Home";
import LoginPage from "./page/login/LoginPage";
import RegisterPage from "./page/register/RegisterPage";
import Home from "./page/home/Home";
import ProtectedRoute from "./ProtectedRoute";
const App =()=>{
    const [email,setEmail] = useState("");
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="LoginPage" element={<ProtectedRoute><LoginPage /></ProtectedRoute>} />
                    <Route path="RegisterPage" element={<ProtectedRoute><RegisterPage /></ProtectedRoute>} />
                    <Route
                    path="*"
                    element={
                        <main style={{ padding: "1rem" }}>
                        <p>There's nothing here!</p>
                        </main>
                    }
                    />
                </Routes>
            </AuthContextProvider>
        </BrowserRouter>
    );
}
export default App