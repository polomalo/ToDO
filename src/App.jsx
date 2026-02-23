import "./App.css";
import Login from "@components/Identity/Login/Login";
import SignUp from "@components/Identity/SignUp/SignUp";
import ToDo from "@components/ToDo/ToDo";
import { Route, Routes } from "react-router";
import PrivateRoute from "@components/Layout/PrivateRoute";
import { ROUTES } from "@constants/routes";

function App() {
    return (
        <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGNUP} element={<SignUp />} />
            <Route path={ROUTES.TODO} element={<PrivateRoute />} >
                <Route path={ROUTES.TODO} element={<ToDo />}/>
            </Route>
        </Routes>
    );
}

export default App;