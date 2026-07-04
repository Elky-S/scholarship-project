import { Route, Routes } from "react-router-dom"
import { Home } from "./components/Home"
import { Login } from "./components/Login"
import { Register } from "./components/Register"
import { Apply } from "./components/Apply"
import { ApplyRequests } from "./components/applyRequests"
import { ViewStatus } from "./components/ViewStatus"
import { Manager } from "./components/Manager"


export const Routing = () => {


    return <>
        <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="login" element={<Login></Login>}></Route>
            <Route path="register" element={<Register ></Register>}></Route>
            <Route path="apply" element={<Apply></Apply>}></Route>
            <Route path="applyRequests" element={<ApplyRequests></ApplyRequests>}></Route>
            <Route path="viewStatus" element={<ViewStatus></ViewStatus>}></Route>
            <Route path="manager" element={<Manager></Manager>}></Route>
        </Routes>
    </>
}



