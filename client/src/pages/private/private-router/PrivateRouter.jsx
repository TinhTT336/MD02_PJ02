import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/admin/sidebar/Sidebar';
import Header from '../../../components/admin/header/Header';
import "./private.css";

export default function PrivateRouter() {
    const navigate = useNavigate();
    const isLogin = true;
    return (
        // isLogin ? <Outlet /> : <Navigate to={"/login"} />
        <>
            {isLogin ? (
                <div className="d-flex">
                    <div className='sidebar'>
                        <Sidebar />
                    </div>
                    <div className='content-container w-100'>
                        <div className="d-flex flex-column" style={{ flex: 1 }}>
                            <Header />
                            <Outlet />
                        </div>
                    </div>
                </div>
            ) : (
                navitage("/login")
            )}
        </>

    )
}
